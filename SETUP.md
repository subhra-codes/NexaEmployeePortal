# Nexa / People — Employee Registration & Admin Portal

A responsive employee onboarding form and administrator directory built with React + Vite, Firebase Authentication, and Cloud Firestore. Designed for a portfolio/lab project.

## Features

- Modern responsive onboarding UI with personal, job, workplace, and optional emergency-contact details.
- Client-side email validation and 10-digit Indian mobile validation.
- Automatically generated employee ID in the format `NX-YYYY-XXXXXX`.
- Firestore transaction-based duplicate checks for email and phone during public registration.
- Admin login, employee directory, search, department filter, CSV export, edit, and delete.
- Firestore rules restrict employee directory reads and employee record changes to the configured admin email.

## 1. Create the Firebase project (free tier)

1. Visit [Firebase Console](https://console.firebase.google.com/) and create a project.
2. In **Build → Firestore Database**, create a database (production mode is fine).
3. In **Project settings → Your apps**, register a Web app and copy its Firebase config.
4. Paste the config values into `src/firebase.js`, replacing all `YOUR_...` placeholders.
5. In **Build → Authentication → Sign-in method**, enable **Email/Password**.
6. In Authentication → Users, add your admin user with an email and password.
7. Replace `admin@example.com` in BOTH `src/main.jsx` and `firestore.rules` with the exact admin email you created. Keep the two values identical.
8. In Firestore → Rules, paste the contents of `firestore.rules` and click **Publish**.

> Important: This is a learning/portfolio implementation. The browser Firebase config is not a secret, but Firestore Security Rules are the actual access control. Do not loosen the admin-only employee read/update/delete rules. For a real company HR system, use a trusted backend with custom claims, audit logging, server-side validation, and privacy/legal review. Public registration means anyone with the site URL can submit a registration; consider adding App Check or a CAPTCHA before using it beyond a demo.

## 2. Run locally

Install Node.js LTS, extract this folder, then open a terminal inside it:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`). The form will not persist records until Firebase is configured.

To test the production build:

```bash
npm run build
npm run preview
```

## 3. Deploy to GitHub Pages

1. Create a new **public** GitHub repository and upload/push the contents of this folder (not the parent ZIP).
2. In the repository, open **Settings → Pages** and choose **GitHub Actions** as the build/deployment source.
3. Add this workflow as `.github/workflows/deploy.yml` (included in this project).
4. Push to the `main` branch. GitHub Actions builds the Vite app and publishes it to Pages.
5. Your URL will be `https://YOUR_GITHUB_USERNAME.github.io/YOUR_REPOSITORY/`.

Firebase Console → Authentication → Settings → Authorized domains: add `YOUR_GITHUB_USERNAME.github.io` if it is not already listed.

## 4. Data and access notes

- Employee records are stored in the Firestore `employees` collection.
- `uniqueEmails` and `uniquePhones` are index collections used to stop duplicate submissions. They contain only an employee document pointer.
- The employee ID is generated in the browser for this student project. For high-integrity production identifiers, generate IDs in a trusted backend or Cloud Function.
- Admin email/phone edits use a Firestore transaction to check and update the uniqueness index documents. For production, move high-integrity HR operations to a trusted backend and add audit logging.
- Do not enter real sensitive employee data into a public portfolio demo. Use fictional test records.
