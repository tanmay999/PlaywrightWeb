const { test, expect, request} = require('@playwright/test')
const APIUtils = require('../utils/APIUtils');
let response;
const loginPayload = {
    "userEmail": "tantanpanapan87@gmail.com", 
    "userPassword": "Tanmay@123" 
};

const orderPayload = {
    "orders": [
        {
            "country": "India",
            "productOrderedId": "6960ea76c941646b7a8b3dd5"
        }
    ]
};

test.describe('Ecommerce Flow', () => {
    test.beforeAll(async () => {
        const apiContext = await request.newContext();
        const apiUtils = new APIUtils(apiContext, loginPayload); 
        response = await apiUtils.createOrder(orderPayload);
    });

    test('Place order and verify in UI', async ({page})=>{
    
    
      await  page.addInitScript ( value=> {
         window.localStorage.setItem('token',value);
       },response.token);
    
        await page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders');
        await page.waitForLoadState('networkidle');
        const rows = page.locator("tbody tr");

  const count = await rows.count();

  let orderFound = false;

  for (let i = 0; i < count; i++) {

    const rowOrderId =
      await rows.nth(i)
        .locator("th")
        .textContent();

    console.log(rowOrderId);

    if (rowOrderId.trim() === response.orderId) {

      orderFound = true;

      await expect(
        rows.nth(i).locator("th")
      ).toHaveText(response.orderId);
      await page.screenshot({path: `takescreenshot${i}.png`});
      break;
    }
  }

  expect(orderFound).toBeTruthy();


    });

});