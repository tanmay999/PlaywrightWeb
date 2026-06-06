 const{test,expect} = require('@playwright/test');


 test('First playWright test',async function(){
  await page.goto('https://google.com');
  console.log(await page.title());
  expect(await page.title()).toHaveTitle('Google');
 });

  test.only('First playWright test Auto Prac',async ({browser})=>{
   const context = await browser.newContext();
    const page = await context.newPage();
    const hideText = page.locator("#hide-textbox");
    const showText = page.locator('#show-textbox');
    const textBox = page.locator('#displayed-text');
    const alertButton = page.locator('#alertbtn');
    const confirmButton = page.locator('#confirmbtn');
    const frameLocator =page.frameLocator('#courses-iframe');


    await page.goto('https://rahulshettyacademy.com/AutomationPractice/');

    await page.waitForLoadState('networkidle');
    await hideText.click();
    await expect(textBox).toBeHidden();
    await showText.click();
    await expect(textBox).toBeVisible();

    await alertButton.click();
    page.on('dialog', dialog => {
      console.log(dialog.message());
      expect(dialog.message()).toBe('Hello , share this practice page and share your knowledge');
      dialog.accept();
    });

   
  await frameLocator.locator("a[href*='lifetime-access']:visible").nth(0).click();
 });
 


  test('First playWright test pass',async ({browser})=>{
    const context = await browser.newContext();
    const page = await context.newPage();
    const username =  page.locator('#username');
    const cardTiles =  page.locator('.card-title a');

    await page.goto('https://rahulshettyacademy.com/loginpagePractise/');
    await username.fill("");
    await username.fill('rahulshettyacademy')

    await page.locator("input[type='password']").fill('Learning@830$3mK2');
    await page.locator('#terms').check();
    await page.locator('#signInBtn').click();

    console.log(await cardTiles.nth(0).textContent());
    expect(await cardTiles.nth(0).textContent()).toContain('iphone');
    const allTextContent = await cardTiles.allTextContents();
    console.log(allTextContent);
 });


   test('First playWright test fail',async ({browser})=>{
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