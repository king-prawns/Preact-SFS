# Preact-SFS
Preact project - Start from scratch

## Installation
- Install Node.js

Go to [Node website](https://nodejs.org/en/)

- Install [json-server](https://github.com/typicode/json-server)

Full fake REST API
```
$ npm install -g json-server
```
## Usage

- Clone or Download the project

- Install dependencies
```
$ cd my-project
$ npm install
```

- Open first command prompt

a) for dev build
```
$ cd my-project
$ npm start
```

b) for prod build

```
$ cd my-project
$ npm run build
```

Install [http-server](https://github.com/indexzero/http-server)

A command-line http server
```
$ npm install -g http-server
```
then 

```
$ cd my-project\build
http-server
```

- Open second command prompt
```
$ cd my-project\fake_db
$ json-server --watch db.json --port 4000
```

- Go to localhost

a) for dev build: [localhost:3000](http://localhost:3000/)

b) for prod build: [localhost:8080](http://localhost:8080/)

## Features

- component
- include 3rd-party JS library
- [Normalize.css](https://necolas.github.io/normalize.css/)
- [Bootstrap 4](https://v4-alpha.getbootstrap.com/getting-started/download/#package-managers)
- [Superagent](https://github.com/visionmedia/superagent)
- [Preact Router](https://github.com/developit/preact-router)
- [React i18n](https://github.com/i18next/react-i18next)
- [NProgress](https://github.com/rstacruz/nprogress)
- NO unit/integration test has been developed

## Conclusion

This is just a simple example, I hope this will help you to understand better Preact.
