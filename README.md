# PostureGuard AI Dashboard

A production-grade posture monitoring dashboard with real-time insights, weekly analytics, and automated alert tracking.

## Features

- **Real-time Monitoring**: AI-powered posture detection (simulated) with live visual feedback.
- **Analytics**: Weekly posture trends and health index tracking.
- **Alert History**: Detailed log of posture violations with severity levels.
- **Local Persistence**: All data is saved locally in your browser's `localStorage`.
- **Responsive Design**: Fully responsive dashboard built with React, Tailwind CSS, and shadcn/ui.

## Prerequisites

Before you begin, ensure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)

## Getting Started

Follow these steps to run the project locally:

### 1. Clone or Download the Project

If you have the files locally, navigate to the project root directory in your terminal.

### 2. Install Dependencies

Run the following command to install all necessary npm packages:

```bash
npm install
```

### 3. Run the Development Server

Start the local development server with:

```bash
npm run dev
```

The application will be available at `http://localhost:3000` (or the port specified in your terminal).

### 4. Build for Production

To create an optimized production build, run:

```bash
npm run build
```

The production-ready files will be generated in the `dist/` folder.

## Project Structure

- `src/`: Main source code directory.
  - `components/`: Reusable UI components and dashboard views.
  - `lib/`: Utility functions (e.g., shadcn helper).
  - `services/`: Business logic and data persistence (Local Storage).
  - `types/`: TypeScript interfaces and types.
  - `App.tsx`: Main application entry point and routing.
  - `main.tsx`: React DOM rendering.
  - `index.css`: Global styles and Tailwind configuration.
- `public/`: Static assets.
- `package.json`: Project dependencies and scripts.
- `vite.config.ts`: Vite configuration.
- `tsconfig.json`: TypeScript configuration.

## Technologies Used

- **Framework**: [React 19](https://react.dev/)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Components**: [shadcn/ui](https://ui.shadcn.com/)
- **Animations**: [Motion](https://motion.dev/)
- **Charts**: [Recharts](https://recharts.org/)
- **Icons**: [Lucide React](https://lucide.dev/)
