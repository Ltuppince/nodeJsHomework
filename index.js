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
                <title>Document</title>
            </head>
            <body>
                <h1>${repoData.userName}</h1>
            </body>
            </html>
            `
            const writeFileAsync = util.promisify(fs.writeFile)
            writeFileAsync(path.join(process.cwd(), "index.html"), html)
                .then((htmlFile)=>{
                    //Do PDF conversion here
                })
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

