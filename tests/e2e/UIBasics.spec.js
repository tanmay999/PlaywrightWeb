 const{test,expect} = require('@playwright/test');


 test('First playWright test',async function(){
  await page.goto('https://google.com');
  console.log(await page.title());
  expect(await page.title()).toHaveTitle('Google');
 });

  test('First playWright test pass',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('rahulshettyacademy');
    await page.locator("input[type='password']").fill('Learning@830$3mK2');
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
 });


   test.only('First playWright test fail',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await page.locator('#username').fill('tanmay');
    await page.locator("input[type='password']").fill('$3mK2');
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();
    await expect(page.locator("[style*='block']")).toHaveText('Incorrect username/password.');
    await expect(page.locator("[style*='block']")).toContainText('Incorrect username');
   await page.screenshot({ path: 'screenshotErrorLogin.png' });
 });