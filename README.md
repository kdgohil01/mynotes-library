[![GitHub stars](https://img.shields.io/github/stars/hemathens/mynotes-library?style=social)](https://github.com/hemathens/mynotes-library/stargazers)
[![Kaggle Profile](https://img.shields.io/badge/Kaggle-hem%20ajit%20patel-20BEFF?logo=kaggle)](https://www.kaggle.com/hemajitpatel)
[![LinkedIn](https://img.shields.io/badge/LinkedIn-Hem%20Ajit%20Patel-0A66C2?logo=linkedin)](https://www.linkedin.com/in/hem-patel19)
[![GitHub](https://img.shields.io/badge/GitHub-hemathens-181717?logo=github)](https://github.com/hemathens)

# 📚 MyNotes Library

A minimalist and powerful web-based note-taking app with **Google Sign-In**, **real-time Firestore sync**, and **tag-based filtering** – all beautifully wrapped in a modern Tailwind UI.

---

## ✨ Features

- 🔐 **Google Authentication** (via Firebase Auth)
- 💾 **Create, Save & Edit Notes** (title, description, file links, tags)
- 🔍 **Smart Search & Tag Filtering**
- ☁️ **Real-time Firestore Storage**
- 📱 **Responsive Design with Tailwind CSS**
- 🎨 **Glassmorphism UI + Gradient Text**
- 📊 **Progress Bar on Save**
- 🖼️ **Auto-preview Google Drive Image Links**
- ⚡ Smooth animations & transitions

---

## 📦 Tech Stack

| Tech          | Purpose                         |
|---------------|----------------------------------|
| HTML/CSS      | Markup & base structure          |
| JavaScript    | App logic & DOM manipulation     |
| Firebase      | Authentication & Firestore DB    |
| Tailwind CSS  | Utility-first responsive design  |

---

## 📁 Folder Structure

```php
mynotes-library/
├── public/
│   └── favicon.svg           # Optional: app icon or emojis
│
├── src/
│   ├── auth/
│   │   └── firebase.js       # Firebase config + auth/firestore setup
│   │
│   ├── components/
│   │   ├── NoteForm.js       # JS handling note creation UI + logic
│   │   ├── NoteCard.js       # JS to render each saved note
│   │   └── ProgressBar.js    # UI and logic for progress indication
│   │
│   ├── styles/
│   │   └── style.css         # Your Tailwind + custom CSS
│   │
│   ├── utils/
│   │   └── helpers.js        # Any helper functions (e.g., tag parser, link preview)
│   │
│   └── main.js               # Entry point, listener bindings
│
├── index.html                # Main HTML (loads from src/)
├── README.md
├── .gitignore
└── package.json              # If hosted or packaged with build tooling (optional)
```

---
## 🔧 Setup

1. Clone the repo:
   ```bash
   git clone https://github.com/hemathens/mynotes-library.git
   cd mynotes-library
    ```

2. No build step needed. Simply open index.html in a browser. Make sure Firebase is correctly configured.

3. Optional: Host via Firebase Hosting or Vercel.

---

## 🧪 Future Enhancements

- Tag-based filtering logic

- Edit & delete existing notes

- Drag-and-drop file upload

- Dark mode toggle

- Role-based access

---

## 🧑‍💻 Author & Contributions

Built with ❤️
Contributions made:

-Firebase Auth + Firestore integration

-Full UI overhaul with Tailwind

-Note input form with progress bar

-Search feature + planned tag logic

-Modern animations and transitions

---

## 📄 License

MIT License. Feel free to fork, clone, and contribute.

---

## 🙌 Support

If you liked this project, drop a ⭐ on [GitHub](https://github.com/hemathens/mynotes-library)!
For feedback or collaboration, connect on [LinkedIn](https://www.linkedin.com/in/hem-patel19?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app).
