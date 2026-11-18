import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { ConvexProvider, ConvexReactClient } from "convex/react";

const convexUrl = import.meta.env.VITE_CONVEX_URL?.trim();

if (!convexUrl) {
    throw new Error(
        "Missing VITE_CONVEX_URL. Set it in .env.local for local development or in your hosting provider's build environment, then rebuild.",
    );
}

const convex = new ConvexReactClient(convexUrl);

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ConvexProvider client={convex}>
            <App/>
        </ConvexProvider>
    </StrictMode>,
)
