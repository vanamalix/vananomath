import { StrictMode } from 'react';
import { hydrateRoot } from 'react-dom/client';
import { Footer } from '@vanamalix/ui';
import '@vanamalix/ui/styles.css';
import './styles.css';

// Pages are static HTML. Only the footer is hydrated, for the Shielded site button.
const island = document.getElementById('footer-island');
if (island) hydrateRoot(island, <StrictMode><Footer /></StrictMode>);
