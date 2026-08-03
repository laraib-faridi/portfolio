# Laraib Faridi — Portfolio Website

A premium, fully responsive personal portfolio built with **HTML5, CSS3, and vanilla JavaScript** only (no frameworks, no jQuery).

## 📁 Folder Structure
```
Portfolio/
├── index.html
├── css/
│   ├── style.css        → base styles, layout, components, dark mode
│   └── responsive.css   → tablet & mobile breakpoints
├── js/
│   └── script.js        → all interactivity (single file, well commented)
├── images/              → drop your photos here (see filenames below)
├── assets/
│   └── Laraib_Faridi_CV.pdf → your résumé PDF — replace it with your actual CV before publishing
└── README.md
```

## 🖼️ Replacing placeholder images
Add these files to the `images/` folder (recommended sizes in brackets). Until you do,
the site automatically shows styled placeholder graphics so nothing looks broken:

| File | Used for |
|---|---|
| `profile.jpg` | Hero photo (500×600) |
| `about.jpg` | About section photo (480×520) |
| `project1.jpg` – `project6.jpg` | Portfolio project thumbnails (500×350) |
| `cert1.jpg` – `cert4.jpg` | Certificate images (400×280) |
| `client1.jpg` – `client3.jpg` | Testimonial avatars (60×60) |
| `favicon.png` | Browser tab icon |

## ✏️ Customizing content
- **Name, role, bio:** edit the Hero and About sections in `index.html`.
- **Typing effect roles:** edit the `roles` array near the top of `script.js`.
- **Skills / percentages:** edit `data-percent` attributes in the Skills section.
- **Projects, experience, education, certificates, achievements, testimonials:**
  each is a repeated card block in `index.html` — copy/paste a block and edit the text.
- **Colors:** all colors are CSS variables at the top of `css/style.css` under `:root`
  (and `[data-theme="dark"]` for dark mode) — change them once and the whole site updates.
- **Contact form:** currently validates and shows a success message client-side only.
  To actually receive messages, connect it to a backend endpoint or a service like
  Formspree/EmailJS inside the `form.addEventListener('submit', ...)` handler in `script.js`.

## 🚀 Running the site
Just open `index.html` in a browser — no build step or server required.
For best results (and to avoid any file:// restrictions in some browsers), you can also
serve it locally, e.g. `npx serve .` or the VS Code "Live Server" extension.

## ✅ Features included
Sticky navbar with active-link highlight, dark/light mode toggle, animated typing effect,
scroll-reveal animations, animated skill bars & counters, project filtering, testimonial
slider, custom cursor with mouse glow (desktop), scroll progress bar, back-to-top button,
ripple buttons, glassmorphism cards, and full client-side contact form validation.
