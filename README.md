# Student Portfolio Website

This project is a responsive student portfolio and academic management website built using HTML, CSS, and JavaScript.

## Pages
- Home
- About Me
- Projects
- Academic Planner
- Contact

## Project structure
- `html/` contains the website pages.
- `css/` contains the stylesheet.
- `js/` contains the interactive behavior.
- `assets/images/` contains the portrait image.

## Features
- Responsive layout
- Mobile-friendly navigation
- Task planner with add, complete, and delete actions
- Contact form validation
- GitHub Pages deployment workflow

## Local preview

From the project directory, start a local web server:

```bash
cd /Users/maruf/Desktop/csc106/my-student-profile-page
python3 -m http.server 8000
```

Then visit http://localhost:8000/html/ . The Pages workflow builds a root redirect so the published home page remains at the repository's main Pages URL.

## GitHub Pages deployment

This repository includes a GitHub Actions workflow for deployment via GitHub Pages.

1. Push this repository to GitHub.
2. In GitHub, open the repository.
3. Go to Settings -> Pages.
4. Set the source to "GitHub Actions".
5. The workflow will deploy automatically.
