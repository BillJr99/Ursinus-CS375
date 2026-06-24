---
layout: activity
permalink: /Activities/Cloud3
title: "CS375: Software Engineering - RESTful Calls"


info:
  next: ./Cloud4
  prev: ./Cloud2
  
  goals: 
    - To explore Representational State Transfer (REST) as applied to HTTP web calls
    - To articulate the basic RESTful operations and map those to HTTP standard verbs
    - To identify arrays of objects, and elements within objects, of JSON structures
  models:
    - model: |
        <a href="https://twitter.com/NSF/status/1299367852374450185">https://twitter.com/NSF/status/1299367852374450185</a>
      title: RESTful Resources
      questions:
        - What part of the URL represents the tweet ID?
        - How do we know which user made that tweet?
        - What CRUD verb do you think is executed on this URL (Create, Read, Update, Delete)?
        - What HTTP verb do you think is executed (POST, PUT, DELETE)?
        - What is the noun in this transaction?
        - What changes in the URL if we want to get a different tweet from the same user?
    - model: | 
        <img src="../images/restfulexchange.png" alt="A RESTful Exchange Diagram">
      title: RESTful Exchanges
      questions:
        - Modify the program to print out the length of daylight (between sunrise and sunset) in hours, minutes, and seconds.  Note that the sunrise and sunset times are given in Unix epoch time, which is the number of seconds that have elapsed since January 1, 1970.
        
tags:
  - rest
  
---


## Example: Weather Client Example

<iframe height="500px" width="100%" src="https://www.billmongan.com/Ursinus-CS375/assets/code-viewer.html?zip=https%3A%2F%2Fraw.githubusercontent.com%2FBillJr99%2FUrsinus-CS375%2Fgh-pages%2Ffiles%2Freplit%2FWeatherClientExample.zip&title=Weather%20Client%20Example" scrolling="yes" frameborder="no" allowfullscreen="true" sandbox="allow-scripts allow-same-origin"></iframe>
