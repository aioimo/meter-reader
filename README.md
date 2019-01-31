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

## Questions and Assumptions
There were a few ambiguous points and I wondered about these questions: 

1. Is the "amount" that is POSTed from the various meters a cumulative amount or the amount since the last POST?

My assumption: the amount is a the energy use since the last POST (i.e. not cumulative, the meter resets once the data is sent).

2. Are the POSTs made regularly or sporadically, and if regularly, with what frequency is this data POSTed to my system from each meter? 

My assumption: The posts are made regularly at a given interval, for example, once per day. 

3. Is there one meter per village or could there be several meters for a single village?

My assumption: there may be several meters for a given village. 

Assumption: The desired data from GET /consumption?duration=24h will return, for each village, the SUM of energy consumption across all meters in the village, submitted in the last 24 hours. 

## General Approach

Based on these assumptions, here was my general approach: 

My system has two primary functionalities. a) To take data submitted to it and store it properly in a database, and b) Upon request, to fetch this data, perform some summations, and return it in a specific format. 

For a) an intermediary step is necessary (calling the external API) in order to find the village name for the given meter, before saving to the database. 

For b) I need to query the database, looking only for the datapoint added in the last 24 hours, aggregate the total consumption per village, and return the data in specified format. 

*To simulate the external API call, I my approach was to create an "external" route with the specified functionality. 