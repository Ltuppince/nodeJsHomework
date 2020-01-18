function generateHtml(data){

    
            // launch puppeteer API
            // const browser = await puppeteer.launch(); 
            // const page = await browser.newPage();
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
            
            
            // await page.setContent(htmlContent);
            
            // await page.emulateMedia('screen');
            // await page.pdf({
            //     // name of your pdf file in directory
            //     path: 'testpdf.pdf', 
            //     //  specifies the format
            //     format: 'A4', 
            //     // print background property
            //     printBackground: true 
            // });
            // // console message when conversion  is complete!
            // console.log('done'); 
            // await browser.close();
            // process.exit();
  
    return htmlContent
}
//This will allow me to use the function in other files.
module.exports=generateHtml