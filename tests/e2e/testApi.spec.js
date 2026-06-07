const {test,expect,request} = require('@playwright/test')
 const loginPayload = {
    "userEmail": "tantanpanapan87@gmail.com",
    "userPassword": "Tanmay@123"
}

const orderPayload = {
    "orders": [
        {
            "country": "India",
            "productOrderedId": "6960eae1c941646b7a8b3ed3"
        }
    ]
}

let token;
let orderId;


test.beforeAll(async () => {
  console.log('This will run before all tests');
 const apiContext =  await request.newContext();
  const loginResponse =  await apiContext.post('https://rahulshettyacademy.com/api/ecom/auth/login', {
      data: loginPayload
})
expect(loginResponse.status()).toBe(200);
const loginResponseJson = await loginResponse.json();
expect(loginResponseJson.token).toBeTruthy();
  token =  loginResponseJson.token;
console.log(token);


// place a sample order using API
const orderResponse = await apiContext.post('https://rahulshettyacademy.com/api/ecom/order/create-order', {
  data: orderPayload ,
  headers: {
    'Authorization': token,
    'Content-Type': 'application/json'
  }
})

expect(orderResponse.status()).toBe(201);
const orderResponseJson = await orderResponse.json();
console.log(orderResponseJson);
expect(orderResponseJson.orders).toBeTruthy();
console.log(orderResponseJson.orders);
orderId = orderResponseJson.orders[0];
console.log(orderId);

});




test('Home page direct ',async ({page})=>{

 await  page.addInitScript ( value=> {
    window.localStorage.setItem('token',value);
  },token);
 console.log('This is token is set in session storage');

  await page.goto('https://rahulshettyacademy.com/client/#/dashboard/cart');
  await page.waitForLoadState('networkidle');
  const MyCartTitle = page.locator("div[class$='heading cf'] h1");
  await expect(MyCartTitle).toHaveText('My Cart');
});

test('Order Page Validation',async ({page})=>{

  await  page.addInitScript ( value=> {
     window.localStorage.setItem('token',value);
   },token);

    await page.goto('https://rahulshettyacademy.com/client/#/dashboard/myorders');
    await page.waitForLoadState('networkidle');
    const orderTable = page.locator('tbody');
    const orderRow = orderTable.locator('tr').nth(0);
    const orderIdLocator = orderRow.locator('th');
    await expect(orderIdLocator).toHaveText(orderId);
   
  });



test.beforeEach(() => {
  console.log('This will run before each test');
});

test.afterAll(() => {
  console.log('This will run after all tests');
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