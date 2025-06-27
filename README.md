# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/419f2799-3fcc-4c19-bbc8-60f13b08a400

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/419f2799-3fcc-4c19-bbc8-60f13b08a400) and start prompting.

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

## Environment Variables Setup

This project uses environment variables to manage API keys and sensitive information. Follow these steps to set up your environment:

1. Create a `.env.local` file in the root directory (it's already included in `.gitignore` to prevent committing sensitive data)
2. Copy the variables from `.env.example` and replace with your actual API keys:

```
# For AI Assistant functionality in browser (Google Gemini API)
VITE_GEMINI_API_KEY=your_actual_gemini_api_key

# For AI Assistant functionality in Supabase Functions (Google Gemini API)
GEMINI_API_KEY=your_actual_gemini_api_key

# For email sending functionality (Resend API)
RESEND_API_KEY=your_actual_resend_api_key

# For authentication (if using NextAuth)
NEXTAUTH_SECRET=your_generated_secret_here
NEXTAUTH_URL=http://localhost:8080
```

**Note**: For browser-side code, make sure to prefix your environment variables with `VITE_` to make them available to the client-side code.

### Important Security Notes:
- Never commit your actual API keys to version control
- Do not share `.env` files containing real API keys
- For production, set environment variables through your hosting platform's secure environment configuration
- Consider rotating API keys periodically for enhanced security

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/419f2799-3fcc-4c19-bbc8-60f13b08a400) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)
