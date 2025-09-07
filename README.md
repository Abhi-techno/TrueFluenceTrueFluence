# TrueFluence - AI-Powered Influencer Marketing Platform

TrueFluence is a next-generation, AI-powered influencer collaboration and management platform built with Next.js and Appwrite. It's designed to connect authentic influencers with brands in a transparent, secure, and efficient ecosystem. The application is mobile-first and leverages generative AI to streamline key marketing workflows.

## Key Features

- **Secure Authentication**: Complete user authentication system with email/password signup, login, and logout.
- **Custom OTP Password Reset**: A secure, multi-step "Forgot Password" flow using a custom OTP system. Users receive a 6-digit code via email to verify their identity and reset their password, all without leaving the app.
- **AI-Powered Chatbot**: An interactive chatbot to onboard new users, guiding them based on whether they are a "Brand" or an "Influencer".
- **AI Influencer Matchmaking**: A smart system for brands to find the perfect-fit influencers based on niche, audience size, budget, and campaign goals.
- **AI Campaign Brief Generation**: An assistant that helps brands create comprehensive campaign briefs by inputting key details.
- **AI Growth Insights**: A tool for influencers to get AI-powered analytics on their social media performance, including engagement rates and authenticity scores.
- **User Profile Management**: A dedicated profile page for users to view their details and log out.
- **Modern, Responsive UI**: Built with shadcn/ui and Tailwind CSS, the application features a sleek, mobile-first design with a persistent bottom navigation bar for easy access to all features.
- **Theming**: Includes a dark/light mode switcher that respects user's system preferences.

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/) (App Router)
- **Backend & Auth**: [Appwrite Cloud](https://appwrite.io/)
- **Generative AI**: [Google AI & Genkit](https://firebase.google.com/docs/genkit)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **UI Components**: [shadcn/ui](https://ui.shadcn.com/)
- **State Management**: [Zustand](https://zustand-demo.pmnd.rs/)
- **Form Handling**: [React Hook Form](https://react-hook-form.com/) & [Zod](https://zod.dev/)
- **Icons**: [Lucide React](https://lucide.dev/)

---

## Project Setup & Deployment

Follow these steps to set up, run, and deploy your own instance of TrueFluence.

### 1. Appwrite Backend Setup

This project relies on Appwrite for authentication and its database features.

**A. Create an Appwrite Cloud Project:**

1.  Go to [cloud.appwrite.io](https://cloud.appwrite.io/) and sign up or log in.
2.  Create a new Project. Give it a name like "TrueFluence".
3.  You will be redirected to the project dashboard. Keep this tab open.

**B. Create a Web App:**

1.  In your Appwrite project dashboard, navigate to **Build** -> **Platforms**.
2.  Click **Add a Platform** and choose **Web App**.
3.  Give it a name (e.g., "TrueFluence Web") and set the **Hostname** to `localhost`. We will add the production hostname later.
4.  Click **Create**.

**C. Enable Email/Password Auth:**

1.  Navigate to **Auth** -> **Providers**.
2.  Click on the **Email/Password** provider and enable it.

**D. Create an API Key:**

1.  Navigate to **Project Settings** -> **API Keys**.
2.  Click **Create API Key**.
3.  Give it a name (e.g., "App Server Key") and check all the boxes under **Scopes** to grant it full permissions.
4.  Click **Create**.
5.  **Important**: Copy the **API Key Secret** immediately and save it somewhere safe. You will need this for your environment variables.

### 2. Environment Variables

Create a file named `.env` in the root of your project. Copy the contents of `.env.example` into it and fill in the values you obtained from Appwrite.

```env
# Appwrite Client-Side Variables (publicly accessible)
NEXT_PUBLIC_APPWRITE_ENDPOINT="https://cloud.appwrite.io/v1"
NEXT_PUBLIC_APPWRITE_PROJECT_ID="<YOUR_PROJECT_ID>"

# Appwrite Server-Side Variables (kept secret)
APPWRITE_API_KEY="<YOUR_API_KEY_SECRET>"
APPWRITE_DATABASE_ID="truefluence_db"
APPWRITE_OTPS_COLLECTION_ID="otps"

# Google AI API Key for Genkit
# Get yours from https://aistudio.google.com/app/apikey
GEMINI_API_KEY="<YOUR_GEMINI_API_KEY>"
```

-   `<YOUR_PROJECT_ID>`: Found in your Appwrite project's **Settings** page.
-   `<YOUR_API_KEY_SECRET>`: The secret you saved when creating the API key.
-   `<YOUR_GEMINI_API_KEY>`: The API key for Google AI Studio to power the Genkit features.

The `APPWRITE_DATABASE_ID` and `APPWRITE_OTPS_COLLECTION_ID` are predefined and will be created automatically by the app on first run.

### 3. Running Locally

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/your-username/truefluence.git
    cd truefluence
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

The application will now be running on `http://localhost:9003`. The first time you use the "Forgot Password" feature, the application will automatically create the required database and collection in your Appwrite project.

### 4. Deploying to Vercel

This project is optimized for deployment on [Vercel](https://vercel.com).

1.  **Push your code to a GitHub repository.**

2.  **Create a new Vercel project:**
    -   Go to your Vercel dashboard and click **Add New...** -> **Project**.
    -   Import your GitHub repository. Vercel will automatically detect that it's a Next.js project.

3.  **Configure Environment Variables:**
    -   In the Vercel project settings, navigate to the **Environment Variables** section.
    -   Add all the variables from your `.env` file (`NEXT_PUBLIC_APPWRITE_ENDPOINT`, `NEXT_PUBLIC_APPWRITE_PROJECT_ID`, `APPWRITE_API_KEY`, etc.).
    -   Click **Save**.

4.  **Add Production Hostname to Appwrite:**
    -   Go back to your Appwrite project dashboard.
    -   Navigate to **Build** -> **Platforms**.
    -   Click on your Web App platform.
    -   Click **Add Hostname** and enter the domain Vercel assigned to your project (e.g., `truefluence-app.vercel.app`).
    -   Click **Create**.

5.  **Deploy:**
    -   Click the **Deploy** button in Vercel. Vercel will build and deploy your application. Once complete, your site will be live!

