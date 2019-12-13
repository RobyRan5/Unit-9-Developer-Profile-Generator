const inquirer = require("inquirer");
const axios = require ("axios");
const pdf = require ('html-pdf');

class DoMyHomework {rm 
    constructor() {
        this.githubUserName = null;
        this.color = null;
        this.github = null;
        this.color = null;
        this.location = null;
        this.followers = null;
        this.name = null;
        this.numOfRepos = null;
        this.following = null;
        this.NumOfStars = null;
    }

    promptUser(){
        return inquirer.prompt([
        {
            message: "what is your user name",
            name: "gihubUserName"
    }

]).then(({ githubUserName }) => {
    this.githubUserName = githubUserName;
    this.MakeApiRequest();
    })
}
    MakeApiRequest(){
        return Promise.all(
            [
                axios.get('https://api.gitub.com/users/${this.githubUserName}'),
                axios.get('https://api.github.com/users/${this.githubUserName}/starred')
        ])
        .then (([{data: { avatar_url, location, name, blog, bio, public_repos, followers,following } } , {data : {length}}]) => {
            this.avatar_url = avatar_url;
            this.location = location;
            this.name = name;
            this.blog = blog;
            this.bio = bio;
            this.public_repos = public_repos;
            this.followers = followers;
            this.following = following;
            this.stars = length;
            console.log(this);
            this.CreateHtml();
        })
    }

    CreateHtml(){
    this.html = `
    <html>
    <body>
    <div>name: ${this.name}</div>
    <div>bio: ${this.bio}</div>
    <div>location: ${this.location}</div>
    <div>blog: ${this.blog}</div>
    <div>public_repos: ${this.public_repos}</div>
    <div>followers: ${this.followers}</div>
    <div>following: ${this.following}</div>
    <div>stars: ${this.stars}</div>
    </body>
    </html>
    `;
    console.log(this);
    this.createPdf();
    }



    createPdf(){
    pdf.create(this.html).toFile('.class-test.pdf', function (err, res) {
        if (err) return console.log(err);
        console.log(res);
    });
  }
}

var newHomework = new DoMyHomework();
newHomework.promptUser();

