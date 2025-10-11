import { expect } from '@playwright/test';

import setup from './setup';

const STORY = 'Dialog';
const STORY_LABEL = `User story: ${STORY};`;

setup.describe(STORY_LABEL, () => {
    setup.skip(
        'Close Dialog by hitting Escape keyboard key',
        async ({ page }) => {
            await page.locator('Dialog').press('Escape');
        },
    );
});
