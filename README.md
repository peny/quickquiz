quickquiz
=========

An app for creating questionnaires with a focus on delivering the result on an x/y chart.

## Setup    
* Install node.js
* ```npm install -g grunt-cli```
* ```npm install```  
* ```bower install```
* ```grunt```

***DONE!***

Your required frontend should now be located in */dist*

## Usage

Most of what we're using is now located under ```app/scripts```. It is pretty much a standard [backbone](http://backbonejs.org) project without too much fancy stuff going on.

Running ```grunt server``` should automatically start a debug server.

Visiting the route ```/#quiz/GROUPNAMEVAR``` should bring out the quiz for the group with the name ```GROUPNAMEVAR```.

Visiting the route ```/#quiz/GROUPNAMEVAR/result``` should similary bring out the results from the people that have answered in that group.

The compiled results of several groups can be viewed by accessing the the ```/#quiz/GROUPNAMEVAR,ANOTHERGROUP,ATHIRD/result```, that is, the names of several groups seperated by ```,```.

The results are drawn to a ```<canvas>``` object.
