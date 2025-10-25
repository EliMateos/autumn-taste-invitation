# Autumn Taste Invitation

An elegant interactive dinner invitation that turns guest preferences into a gourmet experience — collect allergies, dislikes, and notes in a game-inspired autumn theme. 🍁✨

![Status](https://img.shields.io/badge/status-stable-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)
![Deploy](https://img.shields.io/badge/deploy-GitHub%20Pages-black)

## ✨ Features
- Polished autumn theme (MasterChef–Gourmet vibes)
- Multi-step flow with live progress
- Allergies with **“Other”** free text and **“None”** exclusivity
- Friendly validations and summary screen
- Sends results to Google Sheets via Google Apps Script (GAS)
- Works on any static host (GitHub Pages, Netlify, Vercel)

## 🚀 Quick start

### 1) Clone
```bash
git clone https://github.com/<your-user>/autumn-taste-invitation.git
cd autumn-taste-invitation
```

### 2) Configure the backend (Google Apps Script)
1. Create a new Google Sheet (e.g. “E&V Dinner Responses”).
2. From the Sheet: **Extensions → Apps Script**.
3. Replace the code with [`apps-script/gas-backend.gs`](apps-script/gas-backend.gs).
4. **Deploy → New deployment → Web app**:
   - **Execute as:** your account
   - **Who has access:** **Anyone with the link**
5. Copy the deployment URL (ends with `/exec`).

### 3) Wire the frontend
Open `index.html` and set your endpoint:
```js
const GAS_ENDPOINT = "https://script.google.com/macros/s/XXXXX/exec";
```

### 4) Run locally
Open `index.html` in your browser (double-click). No build step required.

### 5) Deploy to GitHub Pages
- Push to `main`.
- Enable **Settings → Pages → Build and deployment → Source: GitHub Actions**.
- The included workflow (`.github/workflows/deploy.yml`) auto-publishes your static site.

## 🧩 Data model
Frontend POST:
```json
{
  "timestamp": "ISO-8601",
  "nombre": "string",
  "contacto": "string",
  "preferencia_otono": "string",
  "alergias": "string (comma separated)",
  "no_me_gusta": "string",
  "manias": "string"
}
```

Sheet columns:
```
timestamp | nombre | contacto | preferencia_otono | alergias | no_me_gusta | manias
```

## 🔐 Security & privacy
- GAS endpoint is public; treat it as a form endpoint.
- To stop collecting data, disable/delete the GAS deployment.
- Revoke access anytime under Google Account → Security → Third‑party access.

## 🧪 Troubleshooting
- **“Enter dinner” doesn’t advance**: name is required.
- **Allergies step**: mark at least one (e.g. “None”).
- **No rows in the Sheet**:
  - Web app must be “Anyone with the link”.
  - Check **Apps Script → Executions**.
  - The frontend includes a no‑CORS fallback POST.

## 📦 Tech stack
- Pure HTML/CSS/JS
- Google Apps Script (Web App)
- GitHub Pages

## 📝 License
MIT — see [LICENSE](LICENSE).

## 🤝 Contributing
See [CONTRIBUTING.md](CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](CODE_OF_CONDUCT.md).

