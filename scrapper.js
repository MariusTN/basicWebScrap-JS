const puppeteer = require('puppeteer');

//everything async and await to work properly
async function scrapeProduct(url) {
    //initial setup
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    
    //ImageURL Scrap
    const [element1] = await page.$x('//*[@id="landingImage"]');
    const res = await element1.getProperty('src');
    const imgURL = await res.jsonValue();
    
    //needs some work for Title Text
    const [element2] = await page.$x('//*[@id="productTitle"]');
    const res2 = await element2.getProperty('textContent');
    const titleOfProduct = await res2.jsonValue();

    //Price Scrap
    const [element3] = await page.$x('//*[@id="priceblock_ourprice"]');
    const res3 = element3.getProperty('textContent');
    const productPrice = await res3.jsonValue();

    //consoleLog as we don't have any database to store any data
    //can be scaled to make a massive scrapYard or Price Deals / automatic stuff and so on.
    console.log({titleOfProduct, imgURL, productPrice});
    browser.close();
}


scrapeProduct('https://www.amazon.co.uk/dp/B0791RGQW3?ref_=nav_em_T1_0_4_NaN_1__k_smp_tkl')