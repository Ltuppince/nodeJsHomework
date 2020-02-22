// Include puppeteer module
const puppeteer = require('puppeteer'); 
// file system node js module.
const fs = require('fs');
const path = require("path")
const util = require("util"); 
const axios = require("axios");
const inquirer = require("inquirer");
const generateHtml = require ("./generateHtml.Js")
// axios
//   .get("https://www.omdbapi.com/?t=The%20Matrix&apikey=trilogy")
//   .then(function(res) {
//     console.log(res.data);
//   });


const questions = [
    {
        type: "input",
        name: "github",
        message: "What is your GitHub username?"
    },
    {
        type: "list",
        name: "color",
        message: "What is your favorite color?",
        choices: ["red", "blue", "green", "pink"]
    }
]


function init(){
    inquirer.prompt(questions)
    .then(({github, color}) => {
        console.log(`Github: ${github}, Color: ${color}`)
        const queryUrl = `https://api.github.com/users/${github}`;
            
        axios.get(queryUrl).then(function(res) {
            // console.log(res)
            // const repoNames = data.map(function({description}) {
            //     return description;
            // }  ).filter(value => value !== null? true : false);   
            // console.log(repoNames)

            const repoData = {
                profileImage: res.data.avatar_url,
                userName: res.data.login,
                location: res.data.location,
                profile: res.data.html_url,
                blog: res.data.blog,
                bio: res.data.bio,
                publicRepos: res.data.public_repos,
                followers: res.data.followers,
                stars: null,
                following: res.data.following
            }
            console.log(repoData)

            const html = `
            <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <meta http-equiv="X-UA-Compatible" content="ie=edge">
            <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
            <title>Document</title>
        </head>
        <body>
            <body>
                <div class="jumbotron">
                    <img src="${res.data.avatar_url}" class="rounded-circle mx-auto d-block mb-5" alt="userImage">
                        <h1 class="display-4">${res.data.login}</h1>
                        <h1 class="display-4">${res.data.html_url}</h1>

                <div class="container">
            
                    <div class="row"> 
                        <div class="col-xs-12 col-md-6">
                            <h3>Public Repositories:
                                <span id="repos">${res.data.public_repos}</span>
                            </h3>
                        </div>
            
                        <div class="col-xs-12 col-md-6">
                            <h3>Location:
                                <span id="location">${res.data.location}</span>
                            </h3>
                        </div>
                        <div class="col-xs-12 col-md-6">
                            <h3>Blog:
                                <span id="blog">${res.data.blog}</span>
                            </h3>
                        </div>
                    </div>
            
                    <div class="row">
                        <div class="col-xs-12 col-md-6">
                            <h3>GitHub Followers:
                                <span id="followers">${res.data.followers}</span>
                            </h3>
                        </div>
            
                        <div class="col-xs-12 col-md-6">
                            <h3>Following:
                                <span id="following">${res.data.following}</span>
                            </h3>
                        </div>
                        <div class="col-xs-12 col-md-6">
                            <h3>Bio:
                                <span id="bio">${res.data.bio}</span>
                            </h3>
                        </div>
                        <div class="col-xs-12 col-md-6">
                            <h3>GitHub Stars:
                                <span id="githubStars">null</span>
                            </h3>
                        </div>
                    </div>
            
                </div>
            
            
            </body>
            
            </html>
        </body>   

            <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
            <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>    
        </body>
        </html>
                    `
            const writeFileAsync = util.promisify(fs.writeFile)
            writeFileAsync(path.join(process.cwd(), "index.html"), html)
                .then((htmlFile)=>{
                    const puppeteer = require('puppeteer');
 
                    (async () => {
                    const browser = await puppeteer.launch();
                    const page = await browser.newPage();
                    await page.goto('https://example.com');
                    
                    // Get the "viewport" of the page, as reported by the page.
                    const dimensions = await page.evaluate(() => {
                        return {
                        width: document.documentElement.clientWidth,
                        height: document.documentElement.clientHeight,
                        deviceScaleFactor: window.devicePixelRatio
                        };
                    });
                    
                    console.log('Dimensions:', dimensions);
                    
                    await browser.close();
                    })();
                                        //Do PDF conversion here
             })
            //  async function printPDF() {
            //     const browser = await puppeteer.launch({ headless: true });
            //     const page = await browser.newPage();
            //     await page.goto('file:///Users/lorenzot.tuppince/git/nodeJsHomework/index.html', {waitUntil: 'networkidle0'});
            //     const pdf = await page.pdf({ format: 'A4' });
               
            //     await browser.close();
            //     return pdf
            //   }
            //   printPDF();
            // (async () => {
            //     const browser = await puppeteer.launch();
            //     const page = await browser.newPage();
              
            //     // Navigates to the project README file
            //     await page.goto('file://Users/lorenzot.tuppince/git/nodeJsHomework/index.html');
              
            //     // Generates a PDF from the page content
            //     await page.pdf({ path: 'overview.pdf' });
              
            //     await browser.close();
            //   })();

              (async() => {
                const browser = await puppeteer.launch();
                const page = await browser.newPage();
                await page.goto('https://news.ycombinator.com', {waitUntil: 'networkidle2'});
                // page.pdf() is currently supported only in headless mode.
                // @see https://bugs.chromium.org/p/chromium/issues/detail?id=753118
                await page.pdf({
                  path: 'hn.pdf',
                  format: 'letter'
                });
              
                await browser.close();
              })();
 })         
        /**
         * TASKS
         *    - make axios request to get user data (asynchronous)
         *    - generate an html file (asynchronous)
         *    - convert generated .html file to a .pdf (asynchronous)
         *      Profile image - avatar_url
                User name - login
                Links to the following: 
                User location via Google Maps - location
                User GitHub profile - html_url
                User blog - blog
                User bio - bio
                Number of public repositories - public_repos
                Number of followers - followers
                Number of GitHub stars 
                Number of users following - following
         * PROMISES
         *    - We are going to have to nest within .thens
         *    DESIGN:
         *       axios
         *          .then(
         *              generate html
         *                  .then(
         *                      convert to .pdf
         *                   )
         *          )
         * ASYNC/AWAIT
         *    - we just need to make sure we wrap everything within an async function, and call await where necessary
         *    DESIGN:
         *      async function init() {
         *          const { github, color } = await inquirer.prompt(questions)
         *          const url = `https://api.github.com/users/${github}/repos?per_page=100`
         *          const userData = await axios.get(url)
         *          const repos = userData.repos
         *          const userName = userData.username
         *          ...
         *          ...
         *          ... generate html file
         *          ... generate pdf file
         *      }
         */
        
    })
    
}

init()

// inquirer
//   .prompt({
//     message: "Enter your GitHub username:",
//     name: "username"
//   })
//   .then(function({ username }) {
//     const queryUrl = `https://api.github.com/users/${username}/repos?per_page=100`;

//     axios.get(queryUrl).then(function(res) {
//       const repoNames = res.data.map(function(repo) {
//         return repo.name;
//       });

//       const repoNamesStr = repoNames.join("\n");

//       fs.writeFile("repos.txt", repoNamesStr, function(err) {
//         if (err) {
//           throw err;
//         }

//         console.log(`Saved ${repoNames.length} repos`);
//       });
//     });
//   });

