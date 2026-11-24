import type { HeadersFileOptions } from '@vanamalix/ui/vite';
import { SHIELDED_CSP } from '@vanamalix/ui';

/**
 * Response headers. headersFile() (vite.config.ts) renders this into dist/_headers on top of the
 * @vanamalix/edge securityHeaders() baseline (strict CSP, nosniff, X-Frame-Options DENY).
 * Keep a comment on every exception.
 */
export const headers: HeadersFileOptions = {
  comment: 'Generated from headers.config.ts by headersFile() (@vanamalix/ui/vite). Edit that file.',
  // The Shielded site button opens its frame only when pressed (hub docs/platform/SITE-CREDIT.md).
  csp: { ...SHIELDED_CSP },
};
