# Subscriber management App
This a subscriber management application made using Laravel and React.js, the app lets you create and manage your subscribers and their fields. The project is split into two parts Backend and Frontend
## Requirements
  - php 7.2.X
  - node ^9
  - Yarn Package manager
  - Composer

## Installation
### Frontend
- cd into the frontend directory
- Run `yarn`
- To start server run `yarn start`

### Backend
- Switch to backend directory
- Create database.sqlite file in database/ directory
- Run Composer Install
- generate key `php artisan key:generate`
- Run Migrations `php artisan migrate`
- Seed Demo Data `php artisan db:seed`
- Run server `php artisan serve`

## Backend Description
Made using Laravel PHP. Databse used is SQLlite.Models Defined using Eloquent ORM, Migrations are used to Define Database. Client requets are handled by Resource controllers there are two primary controler for Field and Subscriber. The relation b/w Field and Subscriber is many to one.
Validation of valid domain and email status is done through middleware. Middleware in the app also handle the CORS headers. 
The backend implements logging, logs are stored on a daily basis within the Logs directory. The app used different response codes to report the stats of each request. For invalid requests, the reasons for request faliure is sent as a JSON response.

## Front-end Descripion
Made using React.js , The frontend is a single page application that runs independent of the server, communicates with server using fetch requests.
The state within the app is managed by Redux. Every action within the app is logged and stored in a centralized state.
Routing in the app is done through react router.
