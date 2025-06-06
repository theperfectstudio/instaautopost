const puppeteer = require('puppeteer');

async function postToInstagram(images, caption) {
  console.log("📸 Posting to Instagram with Puppeteer...");
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto('https://www.instagram.com/accounts/login/');

  await page.waitForSelector('input[name="username"]');
  await page.type('input[name="username"]', process.env.INSTAGRAM_USER, { delay: 50 });
  await page.type('input[name="password"]', process.env.INSTAGRAM_PASS, { delay: 50 });
  await page.click('button[type="submit"]');
  await page.waitForNavigation({ waitUntil: 'networkidle0' });

  // simulate posting carousel manually or with plugin (Instagram restricts automation)
  console.log("🖼️ Images:", images);
  console.log("📝 Caption:\n", caption);
  console.log("✅ MOCK POST COMPLETE");
  await browser.close();
}

module.exports = { postToInstagram };
