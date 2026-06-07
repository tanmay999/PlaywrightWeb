import {test, expect} from '@playwright/test';

test('Google test', async ({ page }) => {
    await page.goto('https://google.com');

    await expect(page).toHaveTitle(/Google123/);

});

test.afterEach(async ({ page }, testInfo) => {

  if (testInfo.status !== testInfo.expectedStatus) {

    const screenshot = await page.screenshot();

    await testInfo.attach('Failure Screenshot', {
      body: screenshot,
      contentType: 'image/png'
    });
  }

});