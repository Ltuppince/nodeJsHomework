// Include puppeteer module
const puppeteer = require("puppeteer");
// file system node js module.
const fs = require("fs");
const path = require("path");
const util = require("util");
const axios = require("axios");
const inquirer = require("inquirer");

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
    choices: ["red", "blue", "green", "	lightcoral", "purple", "orange", "white", "peachpuff", "springgreen",
              "steelblue", "gainsboro", "goldenrod", "slategray	", "navajowhite", "	chocolate"]
  }
];


const init = new Promise(function(resolve, reject) {
  inquirer.prompt(questions).then(({ github, color }) => {
    console.log(`Github: ${github}, Color: ${color}`);
    const queryUrl = `https://api.github.com/users/${github}`;
    let repoData = {};
    


    axios.get(queryUrl).then(function(res) {
        let userStars;
        if(res.data.stars){
            userStars = res.data.stars
        }else{
            userStars = 'No Stars At This Time Looser'
        }
      repoData = {
        profileImage: res.data.avatar_url,
        userName: res.data.login,
        location: res.data.location,
        profile: res.data.html_url,
        blog: res.data.blog,
        bio: res.data.bio,
        publicRepos: res.data.public_repos,
        followers: res.data.followers,
        stars: userStars,
        following: res.data.following,
        color: color
      };
      //   console.log(repoData);
    });
    setTimeout(() => {
        
        resolve(repoData);
    }, 2000);
  });
});
init.then(function(val) {
  makePdf(val)
});
// (async function() {
const makePdf = async function(res) {
  try {
    // launch puppeteer API
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    // const res = await init();
    const htmlContent = `
       <style> 
        body {
            background-color: ${res.color}
        }
       </style>
    <body>
        <body>
            <div class="jumbotron">
                <img src="${res.profileImage}" class="rounded-circle mx-auto d-block mb-5" alt="userImage">
                    <h1 class="display-4">${res.userName}</h1>
                    <h1 class="display-4">${res.profile}</h1>

            <div class="container">
        
                <div class="row"> 
                    <div class="col-xs-12 col-md-6">
                        <h3>Public Repositories:
                            <span id="repos">${res.publicRepos}</span>
                        </h3>
                    </div>
        
                    <div class="col-xs-12 col-md-6">
                        <h3>Location:
                            <span id="location">${res.location}</span>
                        </h3>
                    </div>
                    <div class="col-xs-12 col-md-6">
                        <h3>Blog:
                            <span id="blog">${res.blog}</span>
                        </h3>
                    </div>
                </div>
        
                <div class="row">
                    <div class="col-xs-12 col-md-6">
                        <h3>GitHub Followers:
                            <span id="followers">${res.followers}</span>
                        </h3>
                    </div>
        
                    <div class="col-xs-12 col-md-6">
                        <h3>Following:
                            <span id="following">${res.following}</span>
                        </h3>
                    </div>
                    <div class="col-xs-12 col-md-6">
                        <h3>Bio:
                            <span id="bio">${res.bio}</span>
                        </h3>
                    </div>
                    <div class="col-xs-12 col-md-6">
                        <h3>GitHub Stars:
                            <span id="githubStars">${res.stars}</span>
                        </h3>
                    </div>
                </div>
        
            </div>
        
        
        </body>
        
    </body>
    </html>`;

    await page.setContent(htmlContent);
    await page.emulateMedia("screen");
    await page.pdf({
      // name of your pdf file in directory
      path: "testpdf.pdf",
      //  specifies the format
      format: "A4",
      // print background property
      printBackground: true
    });
    // console message when conversion  is complete!
    console.log("done");
    await browser.close();
    process.exit();
  } catch (e) {
    console.log("our error", e);
  }

  // })();
};
