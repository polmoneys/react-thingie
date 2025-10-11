import { expect, test } from '@playwright/test';

import { BASE_URI, DATEPICKER_URI } from './utils';

test.describe('Landing lands', () => {
    test.skip('has demos autocompLite', async ({ page }) => {
        await page.goto(BASE_URI);
        await expect(page.getByPlaceholder('Search')).toBeVisible();
    });
    test.skip('has demo (Datepicker) in URL', async ({ page }) => {
        await page.goto(`${BASE_URI}${DATEPICKER_URI}`);
        await expect(page.getByText('Last working day')).toBeVisible();
    });
});
