# ryandotcom: Personal Portfolio

My personal portfolio: featured projects with a case-study page for each, experience, and a contact form.

![Next.js](https://img.shields.io/badge/Next.js%2016-000000?style=flat-square&logo=nextdotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind%204-06B6D4?style=flat-square&logo=tailwindcss&logoColor=white)

**Live:** [ryandotcom.vercel.app](https://ryandotcom.vercel.app)

## Features

- Every project lives in one data file, [`src/data/projects.ts`](src/data/projects.ts). Adding an entry creates its card and its `/projects/<slug>` case-study page (problem, approach, architecture, results, next steps).
- Profile, experience, education, and skills live in [`src/data/site.ts`](src/data/site.ts)
- Statically generated pages, dark/light toggle with no flash on load
- Contact form that sends email through EmailJS, with no backend to host
- Downloadable résumé at `/Ryan_Dsouza_Resume.pdf`

## Run locally

Copy `.env.example` to `.env.local` and fill in your EmailJS credentials, then:

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
```

Deployed on Vercel; every push to `main` redeploys.
