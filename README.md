# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/1816d493-dddb-48e8-9469-913f09ce0d9f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/1816d493-dddb-48e8-9469-913f09ce0d9f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

This project is configured for both Vercel and GitHub Pages deployment.

### Vercel

- `vercel.json` is already present.
- Build command: `npm run build`
- Output directory: `dist`
- Vercel will serve the SPA routes correctly using the configured rewrite rules.

### GitHub Pages

- A GitHub Actions workflow is added at `.github/workflows/deploy-gh-pages.yml`.
- On push to `main`, the workflow builds the site and deploys the `dist` directory to the `gh-pages` branch.
- A `404.html` fallback page is created automatically after build to support client-side routing.

> Make sure GitHub Pages is configured to serve from the `gh-pages` branch.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/features/custom-domain#custom-domain)
