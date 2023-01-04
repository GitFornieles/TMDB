# The Ultimate Entertainment Master Database
![Captura desde 2023-01-03 21-03-41](https://user-images.githubusercontent.com/99204877/210461386-fa2d9b92-c334-43df-8f78-fb3988f30ef3.png)


### Main Description
This simple app shows the user/client some information about different TV SHows and Movies.
The user will be able to search by main title, or by other filters (keywords, cast, release date).
If the visitor chooses to register, the app will also let the registered user to add any of the entertainment resources to a "favorite list" and to a "watched list". This can be done anywhere through the app.
The registered user will also be able to see other user's favorite list.
Notifications are shown through modal adds.

### Tech Description
Born as a simple exercise to practice React concepts; I've also added various functionalities to improve the user experience:
 - Persistence through the use of Redux Persistence
 - JWT protected routes
 - Watched and Favorite information is made available to the entire app through the use React Redux. This enables to show/edit both lists content anywhere through the app.
 - Advanced Search feature.
 All the information is provided by the "The Movie Databse" API. --> [TMDB](https://www.themoviedb.org)

<table align="center">
<tr>
<td><img align="left" alt="JavaScript" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-plain.svg" /></td>
<td>JavaScript</td>
<td><img align="left" alt="HTML" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-plain.svg" /></td>
<td>HTML5</td>
<td><img align="left" alt="React" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" /></td>
<td>React</td>
</tr>
<tr>
<td><img align="left" alt="CSS" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-plain.svg" /></td>
<td>CSS3</td>
<td><img align="left" alt="Redux" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" /></td>
<td>Redux</td>
<td><img align="left" alt="NodeJS" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" /></td>
<td>NodeJs</td>
</tr>
<tr>
<td><img align="left" alt="Express" width="40px" style="padding-right:10px;" src="https://user-images.githubusercontent.com/99204877/207951864-61d16bf3-b546-42ea-87ba-aa69c4ced3c2.jpg" /></td>
<td>Express</td>
<td><img align="left" alt="PostgresSQL" width="40px" style="padding-right:10px;" src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" /></td>
<td>PostgreSQL</td>
</tr>
</table>

<br />

### Requirements

#### Packaje.JSON
    "@reduxjs/toolkit": "^1.8.6",
    "axios": "^1.1.3",
    "babel-plugin-macros": "^3.1.0",
    "bcrypt": "^5.1.0",
    "bluebird": "^3.7.2",
    "cookie-parser": "^1.4.6",
    "cors": "^2.8.5",
    "dotenv": "^16.0.3",
    "express": "^4.18.2",
    "jsonwebtoken": "^8.5.1",
    "pg": "^8.8.0",
    "pg-hstore": "^2.3.4",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-icons": "^4.7.1",
    "react-redux": "^8.0.4",
    "react-router": "^6.4.2",
    "react-router-dom": "^6.4.2",
    "react-scripts": "^4.0.3",
    "redux": "^4.2.0",
    "redux-logger": "^3.0.6",
    "redux-persist": "^6.0.0",
    "sequelize": "^6.25.3",
    "superagent": "^8.0.3",
    "sweetalert2": "^11.6.16"


### Installation

1. Clone
```
    git clone https://github.com/GitFornieles/TMDB.git
```
2. Install dependencies
~~~
    npm install
~~~
3. Create a database named "tuemdb"
~~~
    createdb tuemdb
~~~
4. Rename .env.example to .env

5. Run app
~~~
    npm run start
~~~
6. Your default browser should open the app in:
~~~
    http://localhost:3000
~~~
