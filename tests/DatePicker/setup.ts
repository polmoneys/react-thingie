import { test as setup } from '@playwright/test';

import { BASE_URI, DATEPICKER_URI } from '../utils';

setup.beforeEach(async ({ page }) => {
    //  input fill with date picker
    // vs. click on option DatePicker
    // vs.
    await page.goto(`${BASE_URI}${DATEPICKER_URI}`);
});

setup.afterEach(async ({ page }) => {
    await page.getByRole('button', { name: 'DatePicker' }).click();
});

export default setup;
