
  
# Nutrifit

  

## Presentation

Nutrifit is a progressive web application for managing nutrition. It offers various features that assist in tracking daily intake. This application is largest inspired by myfitnesspall who have the same purpose.

The objective of this project was to apply the knowledge I have acquired in different technologies such as ReactJS and Tailwind.

The application is hosted on [nutrifitapp.fr](https://www.nutrifitapp.fr), and a testing account has been set up for your convenience. You can log in using the following credentials: 
- Username: JohnDoe
- Password: johndoe20

Please note that creating new accounts with your personal passwords is not recommended. This application is a student self-project and is not actively maintained, so security measures are not guaranteed.

### Why a Progressive Web App instead of a traditional mobile application?

Due to a limited number of devices and the unfortunate diversity of ecosystems (iPhone, PC, etc.), developing for iOS requires a MacOS machine, which I do not possess. Consequently, I opted for a progressive web app to ensure compatibility with my iPhone.

  

## Features

  

The application provides the following features:

  

- Account creation

- Account login

- Setting nutritional goals

- Creating meals by manual entry

- Creating meals via barcode scanning

- Creating recipes composed of other meals

- Editing meals and recipes

- Adding, editing, or removing intake entries in the diary

- Viewing intake history for different days

- Tracking macros and energy intakes.

  

## Technologies

  

This repository contains the API and front-end of the application, available in the _./NutrifitAPI/_ and _./nutrifit-app/_ directories, respectively.

  

- ReactJS: Front-end framework for building single-page applications

- Tailwind: CSS framework expediting prototyping and enhancing responsiveness

- QuaggaJS: Barcode scanner API for, well, you know...

- Slim 4: PHP framework (back-end) for creating an API

- MariaDB: DBMS for managing food and user data.

- i18next : Translation between English and French.

  
  

## Installation

  

Theses following paragraphs will show us how we can install the application in developpement mode.

  

### Requirements

  

Before begin the installation you need different requirements.

  

- Node.js (version 20 or more) : for front-end server

- PHP (version 8.3 or more) : for back-end server

- Composer (version 2.6 or more) : for dependencies managing in back-end

- A MariaDB database (version 10 or more) : to manage data
  

### Front and back-end installation

To install all of the project for development, use this command (with npm) :

```bash
git clone https://github.com/TheoFaedo/Nutrifit2.git &&
cd Nutrifit2/nutrifit-app &&
npm i &&
cd ../NutrifitAPI &&
composer i &&
cd ..
```

#### Configure api access


To configure the API access for the front-end, there are two files: `nutrifit-app/env.development.torename` for accessing the API in the development version, and `nutrifit-app/env.production.torename` for accessing the API in the production version. In these files, replace the URL in the `REACT_APP_API_URI` variable with the address of your backend server.

If you're not yet ready to push the application to production, you can simply edit the development file. Afterward, you can rename these files by removing the `.torename` suffixes.

### Database installation

Firstly, there is an sql script in *NutrifitAPI/nutrifit2.sql*. You can run this script on your MariaDB server to create the database.

When the structure of the database has been created, you can config the connexion between back-end and this one by edit the db.config.init.torename file. You had to renseign the username and password of an account created for this database, the host address of your database and the database name.

Finally, you can rename this file to *'db.config.ini'*. Now all servers are configured so we can launch them.

### Launch

Then you can launch front-end and back-end server by running these commands :

```bash
//front-end
cd nutrifit-app
npm run start

//back-end
cd NutrifitAPI
composer start
```

## Reflections and improvements

This project is so far away from perfection. It has begun 8 month ago at the day I write this. During this time I have learned lot of concepts in conception, clean code, technical, who show me that some part of my approach can largely be improved.

### The problem of create-react-app

Create-react-app is a package who allow us to create React.js application faster. The reason why I used this package is used in training I followed. The problem here is that create-react-app is no longer recommended since 2023. So it is really a problem for security and maintainability of the app.

For another project, I will be utilizing Vite for the development of a front-end single-page web application.

### Testing

Automated tests are crucial for a project of this scale. They help prevent the emergence of bugs resulting from new changes, thereby avoiding setbacks in development. While there are tests implemented in this project (both for the back-end and front-end), they are not actively maintained. This lapse can be attributed to the project's initial focus on React development before prioritizing test creation. Additionally, finding a suitable testing environment for the Slim API that encompasses all desired testing scenarios has proven challenging (or has not been straightforward to locate).

So, an improvement for my future projects would be to establish an automated testing environment.

### Good react practice

React.js is a framework that grants you the freedom to implement components as you see fit. While this freedom enables the creation of efficient and elegant code, it also opens the door to less optimal implementations. To fully leverage React's potential, adhering to best practices for optimizing performance is highly recommended. However, in my initial foray into React development with this project, my primary focus was on creating a functional product, given that it was my first experience with React.

For my future projects I need to use these good practice to enhance application performances.

