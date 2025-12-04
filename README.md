# Ray Marcus - Interactive 3D Website MVP

This is a Next.js 15 + React Three Fiber project creating an immersive 3D bedroom experience for R&B artist Ray Marcus.

## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **3D Engine**: React Three Fiber / Three.js
- **React Version**: React 18 (for R3F stability)
- **Styling**: Tailwind CSS
- **State**: Zustand
- **Animations**: Framer Motion

## Setup Instructions

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) to view the site.

## Deployment (Vercel)

1. Push this repository to GitHub.
2. Go to [Vercel](https://vercel.com) and import the project.
3. Keep default settings (Next.js preset).
4. Click **Deploy**.

## Project Structure

- `app/`: Next.js App Router pages and layout.
- `components/`: React components (3D objects and UI modals).
- `lib/`: Data and State management.
- `public/assets/textures/`: Texture assets.

## Customization (Phase 2)

### Replacing Dummy Data
Edit `lib/data.ts` to update:
- Album titles and tracks.
- Video URLs (YouTube embed links).
- Bio text.
- Instagram link.

### Replacing Textures
Replace the files in `public/assets/textures/` with real images:
- `bedroom_texture.jpg`: Wall/floor texture or baked room map.
- `cd_placeholder.jpg`: Album art.
- `poster_placeholder.jpg`: Poster art.
- `diary_texture.jpg`: Diary cover texture.

### TODO List for Polish
- [ ] Add real audio snippets for albums.
- [ ] Implement custom 3D models (glTF) for the room and furniture.
- [ ] Add sound effects (hover, click).
- [ ] Improve lighting with shadows and environment maps.
- [ ] Add mobile touch controls optimization.
