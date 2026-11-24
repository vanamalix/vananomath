import { expect, test } from '@playwright/test';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { axeViolations, shot } from '@vanamalix/testing/playwright';

const sitemap = readFileSync(path.resolve('dist', 'sitemap.xml'), 'utf8');
const PATHS = [...sitemap.matchAll(/<loc>https?:\/\/[^/]+([^<]*)<\/loc>/g)].map((m) => m[1] || '/');

for (const p of PATHS) {
  test(`${p} loads, has no axe violations and no console errors`, async ({ page }, info) => {
    const errors: string[] = [];
    page.on('console', (m) => m.type() === 'error' && errors.push(m.text()));
    page.on('pageerror', (e) => errors.push(e.message));
    const res = await page.goto(p);
    expect(res?.status()).toBe(200);
    await expect(page.locator('h1')).toHaveCount(1);
    expect(await axeViolations(page)).toEqual([]);
    expect(errors).toEqual([]);
    await shot(page, `${info.project.name}${p === '/' ? '-home' : p.replace(/\//g, '-')}`);
  });
}

for (const p of PATHS) {
  test(`${p} has no horizontal scroll`, async ({ page }, info) => {
    await page.goto(p);
    // On a phone, overflow makes the browser zoom out, so the layout width grows past the device width.
    const width = await page.evaluate(() => Math.max(document.documentElement.scrollWidth, window.innerWidth));
    expect(width).toBeLessThanOrEqual(info.project.use.viewport!.width);
  });
}

test('unknown pages get the 404 page', async ({ page }) => {
  const res = await page.goto('/no-such-proof');
  expect(res?.status()).toBe(404);
  await expect(page.locator('h1')).toHaveText('Page not found');
});

test('the footer island hydrates: the Shielded button opens its dialog', async ({ page }) => {
  await page.goto('/');
  await page.getByRole('button', { name: 'Enter the Shielded Site' }).click();
  await expect(page.getByRole('dialog', { name: 'Shielded Site' })).toBeVisible();
});

test('the header links to albe', async ({ page }) => {
  await page.goto('/');
  await expect(page.getByRole('navigation', { name: 'Primary' }).getByRole('link', { name: /albe/ })).toHaveAttribute('href', 'https://albe.vananomad.com/');
});
