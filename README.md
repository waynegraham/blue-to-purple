# Blue to Purple Curriculum Review

Review and study guide for the PSBJJ blue-to-purple belt demonstration curriculum.

## Highlights

- Searchable curriculum organized by section with notes for each technique.
- YouTube video modal for technique demos.
- Dark/light mode toggle (Flowbite React) and print-friendly layout.
- Responsive, single-page React app built with Vite + Tailwind CSS.
- GA4 pageview tracking via `react-ga4`.

## Live Demo

GitHub Pages: https://waynegraham.github.io/blue-to-purple

## Project Structure

- `src/App.jsx`: page layout, search/filter logic, video modal, GA4 pageview.
- `src/data/moves.json`: curriculum data (labels, notes, YouTube IDs).
- `src/components/Navigation.jsx`: belt navigation + theme toggle.
- `src/components/Footer.jsx`: footer links + license blurb.
- `src/__tests__/`: Jest + React Testing Library tests.

## Setup

Install dependencies using pnpm (recommended) or npm:

```bash
pnpm install
# or
npm install
```

## Development

```bash
pnpm dev
# or
npm run dev
```

Vite runs at http://localhost:5173 by default.

## Build and Preview

```bash
pnpm build
pnpm preview
# or
npm run build
npm run preview
```

## Linting

```bash
pnpm lint
# or
npm run lint
```

## Testing

```bash
pnpm test
# or
npm test
```

## Deployment

On pushes to `main`, GitHub Actions builds the Vite app and deploys to GitHub Pages (`.github/workflows/deploy.yml`).

## Reference

PSBJJ Study Guide PDF: https://waynegraham.github.io/bjj-study-guide/gracie-jiu-jitsu_compress.pdf

## License

MIT Licensed © 2024 Wayne Graham
