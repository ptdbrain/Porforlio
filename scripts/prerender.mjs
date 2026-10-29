import { build } from 'esbuild';
import { mkdir, readFile, writeFile, rm } from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { resolveRoute, routeMetadata } from '../src/lib/routes.mjs';

const root = process.cwd();
const data = JSON.parse(await readFile(path.join(root,'src/content/portfolio.json'),'utf8'));
const outDir=path.join(root,'dist');
const cacheDir=path.join(root,'node_modules/.cache/ptd-prerender');
await mkdir(cacheDir,{recursive:true});
const rendererPath=path.join(cacheDir,'renderer.cjs');
const siteUrl=(process.env.VITE_SITE_URL || 'https://porforlio-delta.vercel.app').replace(/\/$/,'');
await build({entryPoints:['src/prerender.jsx'],outfile:rendererPath,bundle:true,platform:'node',format:'cjs',jsx:'automatic',packages:'external',define:{'import.meta.env.VITE_SITE_URL':JSON.stringify(siteUrl)},logLevel:'warning'});
const { render }=await import(pathToFileURL(rendererPath).href);
const template=await readFile(path.join(outDir,'index.html'),'utf8');
const escape=(text) => String(text).replace(/[&<>"']/g,char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
const paths=['/','/work','/personal','/contact',...data.projects.map(p=>`/projects/${p.slug}`),'/404'];
for(const pathname of paths){
  const route=resolveRoute(pathname,data.projects);
  const meta=routeMetadata(route,data);
  const canonical=siteUrl+pathname;
  const tags=[
    `<meta property="og:title" content="${escape(meta.title)}" />`,
    `<meta property="og:description" content="${escape(meta.description)}" />`,
    `<meta property="og:type" content="${meta.type}" />`,
    `<meta property="og:url" content="${escape(canonical)}" />`,
    `<meta name="twitter:card" content="${meta.image?'summary_large_image':'summary'}" />`,
    `<meta name="robots" content="${route.kind==='not-found'?'noindex, follow':'index, follow'}" />`,
    `<meta name="theme-color" content="${route.kind==='work'||route.kind==='project'?'#0b111b':'#f5f3ed'}" />`,
    `<link rel="canonical" href="${escape(canonical)}" />`,
    meta.image?`<meta property="og:image" content="${escape(new URL(meta.image,siteUrl).href)}" />`:'',
  ].filter(Boolean).join('\n    ');
  const html=template.replace(/<title>[^<]*<\/title>/,`<title>${escape(meta.title)}</title>`).replace(/<meta\s+name="description"\s+content="[^"]*"\s*\/?\s*>/,`<meta name="description" content="${escape(meta.description)}" />`).replace('</head>',`${tags}\n  </head>`).replace('<div id="root"></div>',`<div id="root">${render(pathname)}</div>`);
  const filename=pathname==='/'?'index.html':pathname==='/404'?'404.html':pathname.slice(1)+'.html';
  await mkdir(path.dirname(path.join(outDir,filename)),{recursive:true});
  await writeFile(path.join(outDir,filename),html);
}
await writeFile(path.join(outDir,'sitemap.xml'),`<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${paths.filter(p=>p!=='/404').map(p=>`<url><loc>${escape(siteUrl+p)}</loc></url>`).join('')}</urlset>\n`);
await writeFile(path.join(outDir,'robots.txt'),`User-agent: *\nAllow: /\nSitemap: ${siteUrl}/sitemap.xml\n`);
await rm(rendererPath);
console.log(`Prerendered ${paths.length} pages with route-specific content and metadata.`);
