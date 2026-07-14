# Production Deployment Guide: Startup Roast AI

This guide contains instructions on how to build, test, and host the **Startup Roast AI** application in a production environment on **Vercel** or **Netlify**.

---

## 1. Environment Variables Configuration

Before deploying, ensure you configure the following environment variables. The server routes will automatically pick them up to run Gemini/OpenAI/Claude and Supabase functions in production.

| Variable Name | Required | Description |
| :--- | :--- | :--- |
| `GEMINI_API_KEY` | Optional* | Your Google Gemini API Key. |
| `OPENAI_API_KEY` | Optional* | Your OpenAI API Key. |
| `CLAUDE_API_KEY` | Optional* | Your Anthropic Claude API Key. |
| `SUPABASE_URL` | Optional | Supabase Project Endpoint URL (e.g. `https://xyz.supabase.co`). |
| `SUPABASE_ANON_KEY` | Optional | Supabase Project Anon/Client Key. |

*\*Note: The application requires at least one LLM API Key to run in Online Mode. If none are provided, the platform defaults to the offline Heuristic Mock Generator.*

---

## 2. Deploying to Vercel (Recommended)

Since Vercel is the creator of Next.js, it provides the most optimized, out-of-the-box hosting integration.

### Method A: Direct Vercel Git Integration (Easiest)
1. Push your project code to a private or public Git repository (GitHub, GitLab, or Bitbucket).
2. Log into your [Vercel Dashboard](https://vercel.com).
3. Click **Add New** > **Project**.
4. Import your Git repository.
5. In the **Configure Project** screen:
   - Expand the **Environment Variables** panel.
   - Add the keys listed in Section 1 (e.g. `GEMINI_API_KEY`).
6. Click **Deploy**. Vercel will automatically build the project and assign a production URL.

### Method B: Vercel CLI (Command Line)
1. Install the Vercel CLI on your machine:
   ```bash
   npm install -g vercel
   ```
2. Run the deployment command inside the project directory:
   ```bash
   vercel
   ```
3. Follow the CLI prompts to link your project.
4. Set your environment variables in the project settings on the Vercel dashboard.
5. Deploy to production:
   ```bash
   vercel --prod
   ```

---

## 3. Deploying to Netlify

Netlify supports Next.js via the `@netlify/plugin-nextjs` package (already configured inside our `netlify.toml` file).

1. Push your project code to a Git repository.
2. Log into your [Netlify Dashboard](https://app.netlify.com).
3. Click **Add new site** > **Import an existing project**.
4. Authorize and select your Git repository.
5. Netlify will read the `netlify.toml` file and automatically configure:
   - **Build command:** `npm run build`
   - **Publish directory:** `.next`
6. Click **Advanced build settings** > **Add variable** to input your environment variables (e.g. `GEMINI_API_KEY`).
7. Click **Deploy site**.

---

## 4. Local Production Building & Testing

It is recommended to test the optimized production build locally on your machine before deploying.

1. **Verify your environment variables:** Ensure your API keys are added in `.env.local`.
2. **Compile the production bundle:**
   ```bash
   npm run build
   ```
   This will run TypeScript compilation, Next.js static page checks, and code minification.
3. **Start the production server:**
   ```bash
   npm start
   ```
   This will start the local server on `http://localhost:3000` using the compiled, optimized production files instead of the hot-reloading dev files.
