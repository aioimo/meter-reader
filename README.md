## Setup
Add `.env` file as follows

`````
PORT=3000
ENV=development
`````

## Install Packages
````
$ npm i
````

## To Run
````
$ npm run start
````

## Directory Structure

`````
bin/
configs/
models/
routes/
.gitignore
app.js
package.json
README.md
`````



## General Approach

I understood the task to be as follows:  

My system has two primary functionalities. a) To take data submitted to it (via POST /counter_callback) and store it properly in a database, and b) Upon request, to fetch all data (via GET /consumption_report?duration=24h) which has been submitted in the last 24 hour period. 

For a) an intermediary API call to external system (via GET /counter?id=1) is necessary in order to find the village name for the given meter, before saving to the database. 

For b) I need to query the database, filtering only for the datapoint added in the last 24 hours.

*To simulate the external API call, my approach was to create an "external" route to act as a stand-in for a real external API.

## Technologies and frameworks

The solution was developed with Node.js and uses MongoDB, mongoose (to interface with MongoDB), express, and axios (to make the external API call). 


## Assumptions

1. All data points submitted in the 24h period should appear in the consumption report, even if one meter submitted more than one data point. 

2. More recent data should be first in the response.


## Functionality of fake external API route

The API expects a meter number, and returns the village name. The village naming convention is simply "Village Number X" where X is the meter number, thus ensuring there is one and only one meter per village. 