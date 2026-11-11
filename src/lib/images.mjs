import manifest from '../content/imageManifest.json';
export function responsiveImage(src) { return manifest[src] || {src}; }
