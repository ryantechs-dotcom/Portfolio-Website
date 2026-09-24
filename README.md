# ryandotcom: Personal Portfolio

My personal portfolio site: a single-page React + TypeScript app with smooth-scroll navigation, project cards linked to this GitHub, a skills section, and a working contact form.

![React](https://img.shields.io/badge/React%2019-20232A?style=flat-square&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

**Live:** ryandotcom.vercel.app

## Features

- Sections: intro, about, academic journey, projects, skills, contact
- Scroll-to-section navigation that highlights the section you're viewing
- Contact form that sends email through EmailJS, with no backend to host
- Lucide icons, responsive Tailwind layout

## Run locally

Create `.env` with your EmailJS credentials:

```
REACT_APP_SERVICE_ID=...
REACT_APP_TEMPLATE_ID=...
REACT_APP_USER_ID=...
```

```bash
npm install
npm start        # http://localhost:3000
npm run build    # production build for Vercel / Netlify / GitHub Pages
```
