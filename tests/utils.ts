import { Page } from '@playwright/test';
// import * as path from 'path';

export const BASE_URI = 'http://localhost:5173/react-thingie/';

export const DATEPICKER_URI = '?demos=DatePicker';
export const DIALOGS_URI = '?demos=Dialog';

export const BUILT_BASE_URI = 'https://kit.test/';
export const GRAPHQL_URI = 'https://back.kit.test/graphql';

// await page.getByRole('button', { name: 'Upload' }).click();
// await expect(page.getByText('Upload files')).toBeVisible();
// await page
//     .getByPlaceholder('Select files to upload')
//     .setInputFiles(FILES);
// await expect(page.getByText('Uploaded documents (2)')).toBeVisible();
// export const FILE_NAME = 'FILE.pdf';
// export const FILE = path.join(__dirname, './FILE.pdf');
// export const FILES = [
//     path.join(__dirname, './FILE.pdf'),
//     path.join(__dirname, './FILE-FORCED.pdf'),
// ];

// test('opens in shareclass display mode when no local storage', async ({ page }) => {
//     await checkLocalStorage(page, 'tableDisplayMode','shareClasses');
// });
export async function checkLocalStorage(
    page: Page,
    key: string,
    expected: string,
) {
    return await page.waitForFunction((_) => {
        return JSON.parse(localStorage[key] ?? '{}');
    }, expected);
}
