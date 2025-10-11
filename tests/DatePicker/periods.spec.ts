import { expect } from '@playwright/test';

// import dayjs from 'dayjs';
// import * as path from 'path';
import setup from './setup';

const STORY = 'DatePicker';
const STORY_LABEL = `User story: ${STORY};`;
// const INCEPTION_DATES = ['2020-03-15', '2021-06-01'];
const OLDEST_INCEPTION_DATES = '2020-03-15';

setup.describe(STORY_LABEL, () => {
    setup('picks oldest inception date', async ({ page }) => {
        await expect(page.getByText('Oldest date')).toBeVisible();
        await expect(page.getByText(OLDEST_INCEPTION_DATES)).toBeVisible();
    });

    setup.skip('change periods and start/end dates ', async ({ page }) => {});

    setup.skip('trigger end of month', async ({ page }) => {});

    setup.skip('custom range', async ({ page }) => {});
});
