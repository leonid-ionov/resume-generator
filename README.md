# Resume Generator

The Resume Generator is a handy app designed to make it easier to create a professional one-page CV. It is built with
TypeScript, React and Next.js (App Router), which provide a fast user interface and easy editing of the application.
The app has a simple form that makes it easy to input your personal, educational, and professional details. Once you
have submitted this information, the app will generate a beautiful single-page resume that you can save in PDF format
and then print or share with others.

## Project Purpose

In today's job market, it's better to use a one-page resume and I used a Photoshop template to create mine. However, it
turned out that aligning the elements and editing such a template was quite time-consuming and inconvenient. Also,
Photoshop has problems saving in PDF format. This small project was created to help easily create, edit, and save
your resume, so you can focus more on crafting your story and less on the details of formatting it.

## Live Demo

To try out the Resume Generator for yourself and create your own professional CV, feel free to visit the live
application deployed on Vercel. Here's
the [Resume Generator Demo Link](https://resume-generator-seven-ebon.vercel.app/).

## Usage Instructions

To use the Resume Generator, user need to:

1. Input their personal, educational, and professional information into the provided form fields.
2. Review the provided data and submit the form.
3. The application will then generate a carefully designed resume that can be previewed by the user.
4. After being satisfied, users can save the resume as a PDF format directly on their devices.

## For developers

To get started with this app:

1. Fork the project.
2. Run `npm install`.

Available scripts:

- `npm run dev` — start the Next.js dev server (http://localhost:3000).
- `npm run build` — create a production build.
- `npm run start` — serve the production build.

## Project Structure

The app uses Next.js App Router. Routing lives in the top-level _'app'_ folder (`/`, `/form`, `/preview`), and each route
is a thin wrapper around a page implementation in _'src/views'_. The project structure otherwise includes folders such
as 'context' and 'utils', which I think don't require additional explanation. However, I still want to say a few words
about these folders:

- The _'src/views'_ folder holds the individual page implementations, and a _'src/features'_ folder that groups all the main functions for each page. These two folders are super important for managing and organizing everything that makes up the app.
- The _'src/components'_ folder holds all the React components used in the whole app.
- This project uses SCSS modules for styling, where the style files of each component are stored with it. The _'src/styles'_ folder include global styles, variables, functions, and mixins shared across the whole app.
- Most types are in their respective component files, so they're self-contained and easy to understand. But there are some types that are shared across the whole app, so they have their own _'src/types'_ folder.

## Key Challenges

Developing the Resume Generator wasn't without challenges:

1. One was to ensure that the generated CV was saved correctly and consistently in PDF format. The easiest option was to take a screenshot of the page and save it as a PDF, but then it would not be possible to highlight text. And in that case we don't have many options. There is a package called React-pdf, but it uses its own components to convert to PDF correctly. And then I would have to completely rewrite the already prepared CV template. I decided to use the jsPDF library, which converts JavaScript to PDF. This worked in the end, although it was a time-consuming process to find options and adjust some styles as a result of conversion.
2. Properly displaying icons in the generated PDF resume was also a difficult task. Since jsPDF does not know how to convert svg. I had to save the icons inside the canvas, then convert it to an image and insert it into the template.
3. Finally, a significant hurdle was saving and loading user form data in JSON format for later use. For this purpose I had to convert uploaded images to base64 string. Also had to redesign some of the form fields. And finally adding these settings as the initial form data.
4. Migrating the app from Vite + React Router to Next.js 15 (App Router) was another challenge. It required moving routing into the `app` directory, wrapping the existing `src/views` pages with thin route components, guarding browser-only code (like `react-quill` and `FileList` checks) behind dynamic imports, and switching the tooling from Vite to Next's build/dev/lint pipeline while keeping the existing test suite green.
