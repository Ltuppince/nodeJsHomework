// Include puppeteer module
const puppeteer = require('puppeteer'); 
// file system node js module.
const fs = require('fs'); 
const axios = require("axios");

// axios
//   .get("https://www.omdbapi.com/?t=The%20Matrix&apikey=trilogy")
//   .then(function(res) {
//     console.log(res.data);
//   });


(async function() {
    try {
        // launch puppeteer API
		const browser = await puppeteer.launch(); 
        const page = await browser.newPage();
        const htmlContent = // defines html/css content
            `<body>
<style>
h1 {
    background-color: green;
}
div {
    background-color: lightblue;
}
p {
    background-color: yellow;
}
</style>
<h1>CSS background-color example!</h1>
<div>
This is a text inside a div element.
<p>This paragraph has its own background color.</p>
We are still in the div element.
</div>

  </body>`;

        await page.setContent(htmlContent);

        await page.emulateMedia('screen');
        await page.pdf({
            // name of your pdf file in directory
			path: 'testpdf.pdf', 
            //  specifies the format
			format: 'A4', 
            // print background property
			printBackground: true 
        });
        // console message when conversion  is complete!
		console.log('done'); 
        await browser.close();
        process.exit();
    } catch (e) {
        console.log('our error', e);
    }
})();
