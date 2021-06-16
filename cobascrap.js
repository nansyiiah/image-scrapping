var request = require('request');
var scraper = require('images-scraper');
const stream = require('stream');
const { promisify } = require('util');
const fs = require('fs');
const got = require('got');
const delay = require('delay');
const readlineSync = require('readline-sync');

var searchingz = readlineSync.question('Search : ');

const google = new scraper({
    puppeteer: {
        headless: false,
    }
});
const pipeline = promisify(stream.pipeline);

async function downloadImage(url, name) {
  await pipeline(
    got.stream(url),
    fs.createWriteStream(name)
  );
}

(async () => {
    const result = await google.scrape(searchingz,200);
    // console.log('result', result);
    const downloads = []
    for (var i = 0; i<result.length; i++){
        var murl = result[i]["url"];
        var name = result[i]["title"]
        await downloadImage(murl, `${searchingz}${i}.jpg`);
        await delay(500) 
    }
    
})();