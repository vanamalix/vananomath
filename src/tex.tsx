import katex from 'katex';

/**
 * Maths is rendered to MathML at build time (prerender), so pages ship no maths JavaScript or fonts and
 * need no inline styles (the CSP keeps style-src 'self'). Browsers render MathML natively.
 * Only the server bundle imports this file.
 */
function render(tex: string, displayMode: boolean) {
  return katex.renderToString(tex, { output: 'mathml', displayMode, throwOnError: true, strict: 'error' });
}

/** Inline maths. */
export function M({ t }: { t: string }) {
  return <span className="math" dangerouslySetInnerHTML={{ __html: render(t, false) }} />;
}

/** Display maths, on its own line. */
export function MD({ t }: { t: string }) {
  // Focusable so a keyboard can scroll a wide equation on a narrow screen.
  return <div className="math-display" tabIndex={0} dangerouslySetInnerHTML={{ __html: render(t, true) }} />;
}
