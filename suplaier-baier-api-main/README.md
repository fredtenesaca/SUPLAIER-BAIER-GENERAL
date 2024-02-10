# Express API Starter

Includes API Server utilities:

* [morgan](https://www.npmjs.com/package/morgan)
  * HTTP request logger middleware for node.js
* [helmet](https://www.npmjs.com/package/helmet)
  * Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
* [dotenv](https://www.npmjs.com/package/dotenv)
  * Dotenv is a zero-dependency module that loads environment variables from a `.env` file into `process.env`

Development utilities:

* [nodemon](https://www.npmjs.com/package/nodemon)
  * nodemon is a tool that helps develop node.js based applications by automatically restarting the node application when file changes in the directory are detected.
* [eslint](https://www.npmjs.com/package/eslint)
  * ESLint is a tool for identifying and reporting on patterns found in ECMAScript/JavaScript code.
* [mocha](https://www.npmjs.com/package/mocha)
  * ☕️ Simple, flexible, fun JavaScript test framework for Node.js & The Browser ☕️
* [supertest](https://www.npmjs.com/package/supertest)
  * HTTP assertions made easy via superagent.

## Setup

```
npm install
```

## Lint

```
npm run lint
```

## Test

```
npm run test
```

## Development
.
```
npm run dev
```


## Guide to installing Docker Desktop and using commands to launch Docker services.

Docker Configuracion:
1.	Required tool
Docker guide installation: https://arquitectoit.com/docker/instalar-docker-desktop/
2.	Download the general Repository where you will have the backend, frontend and Docker       configurations integrated:
https://github.com/fredtenesaca/SUPLAIER-BAIER-GENERAL.git

3.	The corresponding docker files, Dockerfile and docker-compose.yml, are already configured in the repository.
4.	Now, you just have to run the docker compose up command to raise the docker services from the command console.
5.	Now you can test each of the docker services in your browser by clicking on their corresponding links.
