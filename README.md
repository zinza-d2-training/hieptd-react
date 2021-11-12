<h1>Project Manager</h1>

App using [React](https://reactjs.org/), [NodeJS](https://nodejs.org/en/), [TypeScript](https://www.typescriptlang.org/)

## 1. Getting started

### 1.1 Requirements

Before starting, make sure you have at least those components on your workstation:

-  An up-to-date release of [NodeJS](https://nodejs.org/) and NPM (Yarn is recommended)
-  Clone [Backend](https://github.com/zinza-d2-training/hieptd-nestjs.git) using [NestJs](https://nestjs.com/)

### 1.2 Project configuration

Start by cloning this project on your workstation.

```sh
git clone https://github.com/zinza-d2-training/hieptd-react.git
```

The next thing will be to install all the dependencies of the project.

```sh
cd ./hieptd-react
npm install
```

or

```sh
cd ./hieptd-react
yarn
```

Once the dependencies are installed :

-  You can now configure your project by creating a new `.env` file containing your environment variables used for development.
-  Place the file in the root of your project.
-  Example: `.env.example`
-  Copy `.env,example` to `.env`

```sh
cp .env.example .env
vi .env
```

-  Configure environment variables by editing the `.env` file.

```sh
# Backend endpoint
REACT_APP_BASEURL=http://localhost:5000
```

### 1.3 Launch

```sh
# Launch the development server with TSNode
## using npm
npm start
## or
yarn start
```

### 1.4 Access to the application

-  You can now head to http://localhost:3000 and see the application in action.
