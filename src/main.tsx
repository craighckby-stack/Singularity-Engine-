import { StrictMode } from 'react';
import { createRoot, Root } from 'react-dom/client';
import App from './App';
import './index.css';

/**
 * Root DOM container identifier for application mounting.
 */
const ROOT_ELEMENT_ID: string = 'root';

/**
 * Resolves and validates the root mount element with explicit type casting.
 */
const rootElement: HTMLElement | null = document.getElementById(ROOT_ELEMENT_ID);

if (!rootElement) {
  throw new Error(`Critical Initialization Error: Target mount element with ID '${ROOT_ELEMENT_ID}' was not found in the DOM.`);
}

/**
 * React application root instance.
 */
const appRoot: Root = createRoot(rootElement);

appRoot.render(
  <StrictMode>
    <App />
  </StrictMode>
);
