# Voice API Documentation Frontend

A modern React-based frontend application for viewing Voice API documentation and integration steps.

## Features

- **Home Page**: Welcome screen with quick overview and navigation
- **Documentation Viewer**: Interactive API documentation with:
  - Category-based navigation (Authentication, Settings, Call Management, Campaign Management, Reporting)
  - Detailed endpoint information (headers, parameters, response schemas)
  - Code examples with copy-to-clipboard functionality
  - Response code indicators
- **Steps UI**: Step-by-step integration guide with:
  - Progress tracking
  - Interactive checklist
  - Visual completion indicators
  - Quick reference to common endpoints

## Tech Stack

- **React 18** - UI library
- **Vite** - Build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **Lucide React** - Icon library
- **shadcn/ui components** - Reusable UI components

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
```bash
cd frontend
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build for production
- `npm run preview` - Preview the production build

## Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   ├── Button.jsx
│   │   ├── Card.jsx
│   │   ├── DocumentationViewer.jsx
│   │   └── StepsUI.jsx
│   ├── lib/
│   │   └── utils.js
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Components

### App
Main application component that handles view routing between Home, Documentation, and Steps.

### DocumentationViewer
Displays API documentation with:
- Sidebar navigation for categories
- Detailed API endpoint information
- Parameter tables
- Response schemas
- Copy-to-clipboard functionality

### StepsUI
Integration guide with:
- Progress tracking
- Interactive step completion
- Substep checklists
- Quick reference section

### Button & Card
Reusable UI components styled with TailwindCSS.

## Customization

### Colors
Edit `src/index.css` to customize the color scheme. The application uses CSS custom properties for theming.

### API Data
Modify the `apiData` object in `DocumentationViewer.jsx` to update the API documentation content.

### Steps
Update the `steps` array in `StepsUI.jsx` to modify the integration steps.

## Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## License

MIT
