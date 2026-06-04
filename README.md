# Porforlio

React and Vite bilingual portfolio for Phan Trong Dat / Dat Brain, focused on AI Engineering, Computer Vision, RAG/LLM, and full-stack AI products.

## Run Locally

Install dependencies, then use the Vite workflow:

```powershell
npm install
npm test
npm run dev
npm run build
npm run preview
```

The build output is generated in `dist/`.

## Deploy To Vercel

This project is configured for a simple Vercel deployment:

- `vercel.json` runs `npm run build`.
- Vercel serves the generated `dist/` directory.
- `cleanUrls` is enabled so static URLs stay clean.

Recommended flow:

1. Push this repository to GitHub.
2. In Vercel, choose **Add New Project**.
3. Import the GitHub repository.
4. Keep Framework Preset as **Other** if Vercel does not auto-detect it.
5. Confirm:
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. Deploy.

## Custom Domain

After the Vercel project is deployed:

1. Open the Vercel project dashboard.
2. Go to **Settings** > **Domains**.
3. Add your domain, for example `example.com` or `www.example.com`.
4. Follow the DNS records Vercel shows for that domain.
5. Wait for DNS propagation. It can take minutes, but some records may take up to 24 hours.

For a domain managed outside Vercel, update DNS at your domain registrar. For a domain using Vercel nameservers, manage DNS inside Vercel.

## Customize

- Update contact values in `script.js` inside `contactConfig`.
- Edit the opening intro in `src/components/BrainIntro.jsx`.
- Edit the portfolio page in `src/components/PortfolioHome.jsx`.
- Update portfolio data in `src/data/portfolioData.json`.
- Add a CV file to `assets/` later and set the `cv` value.
- Add real GitHub or demo URLs to project data when available.

## Structure

- `index.html`: Vite HTML entry.
- `src/main.jsx`: React entry.
- `src/App.jsx`: switches from `BrainIntro` to `PortfolioHome`.
- `src/components/BrainIntro.jsx`: full-screen neural brain intro animation.
- `src/components/PortfolioHome.jsx`: portfolio page.
- `src/data/portfolioData.json`: bilingual content and project data.
- `styles.css`: Digital AI Lab visual system, intro animation, and responsive layout.
- `vercel.json`: Vercel build and routing configuration.
- `tests/site.test.js`: Node tests for content and behavior.
- `tests/deploy.test.js`: Node tests for deploy configuration and build output.
