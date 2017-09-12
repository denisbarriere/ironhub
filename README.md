# <img alt="ironhub" src="https://s3.amazonaws.com/media-p.slid.es/uploads/733340/images/4116665/ironhub-logo__1_.png" height="63" width="350"> 

A single page application, based on the MEAN stack, that was initially built in **two weeks** as my last project of the **one week of pair programming**, as part of the **Ironhack Web Development Bootcamp in Barcelona** (at the end of module 3, weeks 8 and 9 of the program).

Ironhub's MVP includes a directory of Ironhack students and a directory of student projects. The goal of the project is for people at Ironhack (staff, teachers, TAs and students) to have a central place to get people's information and projects.

There are still a lot of things to implement and improve. All is listed in a Trello board I can share.

Finally, the project is deployed to Heroku and can be accessed [here](https://ironhub-app.herokuapp.com).

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes. See deployment for notes on how to deploy the project on a live system.

### Prerequisites

1. Have Node.js installed. Please see [here](https://nodejs.org/en/download/package-manager/) for more installation instructions.
2. Have mongoDB installed.

### Installing

Ironhub is made of two different repositories:
1. The APP: [ironhub-app](https://github.com/denisbarriere/ironhub-app)
2. The API: [ironhub-api](https://github.com/denisbarriere/ironhub-api)

**To install the API**
1. Download the .zip package or clone the project to your local machine
* If you download the .zip file, please extract it to a local directory on your machine 

2. Run the 'npm install' command in your terminal
3. Create .env file in the root folder. It should include:
* the URI of your local database
* the default user password for your user seed file
* the secret word used to secure your Json Web Token

Here is an example:

```
MONGODB_URI=mongodb://localhost/ironhub-master
MONGODB_DEFAULT_PWD=test123
JWT_SECRETORKEY=< your token secret here >
```

4. Start mongoDB locally with the following comamnd line in your terminal: start_mongo
5. Start the by running the following command line in another terminal: 'npm start' or 'npm run start-dev' to run the app with nodemon, so that you don't have to restart the app each time you make a change. 

### Seeding data

Seed data in the following order:
* bootcamps
* projects
* students - please set the right ObjectIDs (found in your local DB) in the 'bootcampIds' Array (e.g. ['598c8337eb88582f1d38e886'])
* users - please set the right ObjectIDs (found in your local DB) in the 'studentId' field

To run the seeds: node ./bin/seeds/<seed filename> (e.g. node ./bin/seeds/seed-users.js)

You are now good to go. You can access the app locally in your web browser at the following URL: [http://localhost:3000/](http://localhost:3000/)

You can create as data as you want in your local.

### API Documentation

The API documentation is coming soon.

Finally, you can also use the API to add contributors to a project. To do so, you first need to login through the API as following:

URL: <base URL>/login

Body:
```
{
	"email": "test@gmail.com",
	"password": "test123"
}
```

You will get a JSON Web token back. It should look like this: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjU5OGNjODU1YjNhNmZkMDAwNGM0YzIyNiIsInVzZXIiOiJkZW5pcy5iYXJyaWVyZUBnbWFpbC5jb20iLCJpYXQiOjE1MDIzOTg1OTl9.g8Va-lb0J87K49g5mYxIJ1RG-fOmemcyeY6OWY7TboY

Then, use the /projects/< project ObjectID from mongoDB >/contributors route to add contributors to a project

URL: /projects/< project ObjectID from mongoDB >/contributors

Header: Add 'JWT < the token ID you got from the /login route >' as value of the 'Authorization' key

Body:
```
{
    "contributors": [
        "598cc855b3a6fd0004c4c226"
    ]
}
```

## Deployment

The project is deployed to Heroku and is accessible [here](https://ironhub-app.herokuapp.com). 
The API URL is [https://ironhub-app.herokuapp.com](https://ironhub-app.herokuapp.com).

Please contact us for deploying new contributions.


## Built With

* [Node.js](https://nodejs.org) - as the JavaScript runtime environment
* [Express](https://expressjs.com/  ) - as the web application framework
* [mongoDB](https://www.mongodb.com/) - as the database program
* [mongoose](http://mongoosejs.com/) - as the mongodb object modeling framework for Node.js
* [JWT](https://jwt.io/) and [Passport-jwt](https://www.npmjs.com/package/passport-jwt) - as the autehtification service for Node.js

## Code Quality

[![DeepScan Grade](https://deepscan.io/api/projects/427/branches/642/badge/grade.svg)](https://deepscan.io/dashboard/#view=project&pid=427&bid=642)

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/denisbarriere/ironhub-api/tags). 

## Authors

* **Denis Barriere** - *Initial release* - [denisbarriere](https://github.com/denisbarriere)

See also the list of [contributors](https://github.com/denisbarriere/ironhub-api/graphs/contributors) who participated in this project.

## License

This project is licensed under the MIT License 2017 - see the LICENSE.md file for details
 - see [LICENCE.md](LICENCE.md) for more details.

## Acknowledgments

* Thanks to [Tair Assimov](https://github.com/assimovt), our module 3 teacher and TAs’ support during this intense weeks 8 and 9.
* Thanks to everyone at Ironhack who contributed to the UX study I made for this project