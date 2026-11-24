import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { Shell } from './components/Shell';
import { NOT_FOUND, ROUTES } from './routes';

export const paths = Object.keys(ROUTES);

export function render(path: string | null) {
  const route = (path && ROUTES[path]) || NOT_FOUND;
  const html = renderToString(
    <StrictMode>
      <Shell path={path ?? ''}>{route.element}</Shell>
    </StrictMode>,
  );
  return { html, title: route.title, description: route.description };
}
