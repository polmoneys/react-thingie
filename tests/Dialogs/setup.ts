import { test as setup } from '@playwright/test';

import { BASE_URI, DIALOGS_URI } from '../utils';

setup.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URI}${DIALOGS_URI}`);
});

setup.afterEach(async ({ page }) => {
    await page.getByRole('button', { name: 'Dialog' }).click();
});

export default setup;
