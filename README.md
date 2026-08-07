# Cyclone Game Studio Website

Frontend website for a fictional game studio, built with React, TypeScript, and Vite.
The app includes multi-page navigation, game and merch showcases, event content, and an in-browser Unity WebGL demo.

## Design Reference

- Milanote board: https://app.milanote.com/1WeyYy1cxwxE6X?p=htqbP6GD0Ju

## Features

- Multi-page website with client-side routing
- Responsive layout using React Bootstrap
- Home page with:
  - AI drawing software canvas demo (WebGL)
  - Embedded Unity character/WebGL section
  - Scrollable game catalog cards
- Events page with:
  - News carousel
  - Event card list and CTA buttons
- Store page with:
  - Game product cards
  - Merch product grid
- Team Members page with profile cards and company role descriptions
- Profile page with editable-style account/contact panels
- About page with company information sections and footer links

## Tech Stack

- React 19
- TypeScript
- Vite
- React Router
- React Bootstrap + Bootstrap
- React Icons
- Unity WebGL integration via custom hook (`src/useAni/useAni.tsx`)

## Routes

- `/` -> Home (`VideoHome`)
- `/home` -> Home (`VideoHome`)
- `/about` -> About
- `/teamMembers` -> Team Members
- `/profile` -> Profile
- `/events` -> Events
- `/store` -> Store

## Project Structure

```text
src/
  Routes/
    Route.tsx
  pages/
    VideoHome/
    Events/
    Store/
    About/
    Profile/
    TeamMember/
    webPage_Components/
      AISoftware/
      UnityDemo/
      GameList/
      MerchList/
      EventCards/
      NewsCarousel/
      NavBar/
      BottomWebLinks/
  DrawingFunctions/
  UnityCharacter/
  useAni/
public/
  WebGLBuild/
    Build/
```

## Getting Started

### Prerequisites

- Node.js 20+ recommended
- npm 10+ recommended

### Install

```bash
npm install
```

### Run Development Server

```bash
npm run dev
```

The app will typically be available at http://localhost:5173.

### Build for Production

```bash
npm run build
```

### Preview Production Build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Unity WebGL Integration Notes

Unity files are expected under:

- `public/WebGLBuild/Build/WebGLBuild.loader.js`
- `public/WebGLBuild/Build/WebGLBuild.framework.js`
- `public/WebGLBuild/Build/WebGLBuild.data`
- `public/WebGLBuild/Build/WebGLBuild.wasm`

The Unity loader hook lives in `src/useAni/useAni.tsx` and injects the loader script at runtime.

If the Unity section does not load:

1. Confirm all four build artifacts exist in `public/WebGLBuild/Build`.
2. Check browser console for `Unity loader not found` or asset load errors.
3. Ensure paths remain unchanged if you move Unity build files.

## Scripts

- `npm run dev` -> Start local Vite dev server
- `npm run start` -> Alias for `vite`
- `npm run build` -> Type-check and build (`tsc -b && vite build`)
- `npm run lint` -> Run ESLint
- `npm run preview` -> Preview built app

## Known Notes

- The project includes some absolute import paths in a few components. If you move the repository or share it, convert absolute filesystem imports to project-relative imports.
- Some filenames contain typos (for example `UntyCharacter.tsx`, `TeamnMembers.css`, `BottonWebLinks.tsx`). They work as-is, but keep names consistent when refactoring.

## License

No license file is currently included.
