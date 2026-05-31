# 📅 Social Media Post Scheduler

A clean, responsive post scheduling web app that sends form data to a Make.com webhook — automatically logging submissions to Google Sheets and sending a confirmation email via Gmail.

![Post Scheduler Preview](preview.png)

---

## ✨ Features

- Real-time form validation (empty fields, email format, future date check)
- Loading spinner during submission
- Success and error feedback messages
- No page reload on submit
- Automatic logging to Google Sheets
- Confirmation email sent via Gmail
- Mobile responsive design
- Clean minimalist UI with smooth transitions and hover effects

---

## 🔄 How It Works

1. User fills out the scheduling form (caption, platform, date/time, name, email)
2. Form validates inputs and sends a JSON POST request to Make.com webhook
3. Make.com logs the submission as a new row in Google Sheets
4. Make.com sends a confirmation email to the user via Gmail
5. User sees a success message in the browser

---

## 🛠️ Tech Stack

**Frontend:**
- HTML5
- CSS3 (custom variables, animations)
- JavaScript (ES6+, Fetch API)

**Backend / Automation:**
- [Make.com](https://make.com/) — webhook automation
- [Google Sheets](https://sheets.google.com/) — submission logging
- [Gmail](https://gmail.com/) — confirmation email

---

## 📁 File Structure

```
scheduler/
├── index.html    — form structure and markup
├── style.css     — styling, animations, and responsive design
├── script.js     — validation, submission, and UI state logic
└── README.md     — project documentation
```

---

## 🚀 Getting Started

### 1. Clone the repo:
```bash
git clone https://github.com/morscodes777/social-post-scheduler.git
cd social-post-scheduler
```

### 2. Set up Make.com scenario:

**Create a new scenario:**
1. Add a **Webhooks → Custom Webhook** module as the trigger
2. Copy the generated webhook URL

**Add Actions:**
1. **Google Sheets → Add a Row** — logs submission data to your spreadsheet
2. **Gmail → Send an Email** — sends confirmation email to the user

### 3. Configure the webhook URL:

Open `script.js` and replace the placeholder on line 1:
```javascript
const WEBHOOK_URL = "https://hook.us2.make.com/your-actual-webhook-url";
```

### 4. Test it out:

Open `index.html` in your browser — no installs, no build steps, no dependencies.

> Make sure to click **"Run once"** in Make.com the first time, then enable **Scheduling** so the scenario runs automatically.

---

## 📋 Google Sheets Structure

Create a spreadsheet named `Post Scheduler Log` with these headers in row 1:

| A | B | C | D | E | F |
|---|---|---|---|---|---|
| Caption | Platform | Scheduled At | Name | Email | Submitted At |

Map each column in Make.com using:
- `{{1.caption}}`, `{{1.platform}}`, `{{1.scheduledAt}}`, `{{1.name}}`, `{{1.email}}`, `{{now}}`

---

## 📧 Gmail Confirmation Email

The confirmation email is sent using this template in the Make.com Gmail module:

```html
Hi {{1.name}},<br><br>
Your post has been scheduled successfully!<br><br>
Caption: {{1.caption}}<br>
Platform: {{1.platform}}<br>
Scheduled At: {{1.scheduledAt}}<br><br>
Thanks for using PostScheduler!
```

---

## 🎨 Design Details

- Off-pure colors (no pure black/white)
- Warm off-white background (`#f0eeea`)
- Accent color: burnt orange (`#e8440a`)
- Google Fonts: Syne (display) + DM Sans (body)
- Focus states with orange glow
- Button hover lift effect with shadow
- Feedback messages animate in with `fadeIn`

---

## ✅ Form Validation Rules

| Field | Rule |
|---|---|
| Post Caption | Cannot be empty |
| Platform | Must select an option |
| Scheduled Date & Time | Cannot be empty, must be in the future |
| Your Name | Cannot be empty |
| Email Address | Cannot be empty, must match email format |

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).