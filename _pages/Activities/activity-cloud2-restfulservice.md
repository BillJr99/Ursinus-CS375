---
layout: activity
permalink: /Activities/Cloud2
title: "CS375: Software Engineering - RESTful Services"


info:
  next: ./Cloud3
  prev: ./Cloud
  
  goals: 
    - To explore Representational State Transfer (REST) service providers
    - To explain the mapping of RESTful verbs onto the HTTP verbs GET, PUT, POST, and DELETE
    - To explain how stateless HTTP calls can be used to establish state with a client
  models:
    - model: |
        <iframe src="https://api.weatherusa.net/v1/forecast?q=40.1915,-75.4559&daily=0&units=e&maxtime=7d" width="100%"></iframe>
        <br>
        <div align="left">
        <pre>
        <code>
        jsonobj.forEach(function(obj) {
            console.log(obj.field_name);
        });
        </code>
        </pre>
        </div>
      title: JSON Objects
      questions:
        - "This JSON result was returned from a web request to <a href=\"https://api.weatherusa.net/v1/forecast?q=40.1915,-75.4559&daily=0&units=e&maxtime=7d\">https://api.weatherusa.net/v1/forecast?q=40.1915,-75.4559&daily=0&units=e&maxtime=7d</a>, which obtains the 7-day forecast at Ursinus College given the College's latitude and longitude GPS coordinates.  Use a <a href=\"https://jsonformatter.org/json-pretty-print\">JSON Pretty Printer</a> to better format the JSON for reading."
        - What do the curly braces represent?
        - What does the square bracket represent?
        - Modify the program to access this RESTful endpoint and, in a loop, print out each day's date (using <code>validt</code>) and temperature. An example <code>for</code> loop in <a href=\"https://www.w3schools.com/js/js_json_arrays.asp\">JavaScript</a> is given above.
      embed: |
        <iframe height="400px" width="100%" src="https://repl.it/@BillJr99/WeatherClientExample?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>  
    - model: |
        <div align="left">
        <pre>
        <code>
        {
            "response": {
                "version": "0.1",
                "termsofService": "http://www.wunderground.com/weather/api/d/terms.html",
                "features": {
                    "conditions": 1
                }
            },
            "current_observation": {
                "image": {
                    "url": "http://icons-ak.wxug.com/graphics/wu2/logo_130x80.png",
                    "title": "Weather Underground",
                    "link": "http://www.wunderground.com"
                },
                "display_location": {
                    "city": "Philadelphia",
                    "state": "PA",
                    "zip": "19104",
                    "latitude": "39.96150970",
                    "longitude": "-75.19716644",
                    "elevation": "41.00000000"
                },
                "observation_location": {
                    "full": "University City - West Philadelphia, Philadelphia, Pennsylvania",
                    "city": "University City - West Philadelphia, Philadelphia",
                    "state": "Pennsylvania",
                    "latitude": "39.950554",
                    "longitude": "-75.211868",
                    "elevation": "70 ft"
                },
              "temp_f": 76.5,      
            }
        }
        </code>
        <pre>
        </div>
      title: A Sample JSON Response
      questions:
        - "What is the path to <code>longitude</code>?"
        - "What is the path to <code>temp_f</code>?"
    - model: |
        <div align="left">
        <pre>
        <code>
        "forecast": {
            "txt_forecast": {
                "date": "5:00 PM EDT",
                "forecastday": [
                    {
                        "period": 0,
                        "icon": "tstorms",
                        "icon_url": "http://icons-ak.wxug.com/i/c/k/tstorms.gif",
                        "title": "Sunday",
                        "fcttext": "Mostly cloudy with thunderstorms and rain showers. High of 88F. Winds from the SSW at 5 to 15 mph. Chance of rain 30%.",
                        "fcttext_metric": "Mostly cloudy with thunderstorms and rain showers. High of 31C. Breezy. Winds from the SSW at 10 to 20 km/h. Chance of rain 30%.",
                        "pop": "30"
                    }
                 ]
        }
        </code>
        <pre>
        </div>
      title: A Sample JSON Array Response
      questions:
        - "What is the path to the first <code>fcttext</code> element?"  
    - model: |
        <img src="../images/examples/restfulserviceexample/postman-restserviceexample.png" alt="Posting with form parameters">
        <br>
        <img src="../images/examples/restfulserviceexample/postman-restserviceexample-contenttype-applicationjson.png" alt="Posting with application/json Content-Type">
        <br>
        <img src="../images/examples/restfulserviceexample/postman-restserviceexample-get.png" alt="A GET request">
        <br>
        <img src="../images/examples/restfulserviceexample/mongodb-restserviceexample.png" alt="The data store after posting data">
        <br>
        <img src="../images/examples/restfulserviceexample/curl-restserviceexample.png" alt="Posting with cURL from the console">
        <br>
        <img src="../images/examples/restfulserviceexample/curl-restserviceexample-postputget.png" alt="Performing an update with cURL">
        <br>
      title: RESTful Service
      embed: <iframe height="400px" width="100%" src="https://repl.it/@BillJr99/RESTfulServiceExample?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>  
      questions:
        - "Launch the given web service and invoke it using your choice of web client.  To do this, you will want to set up a <a href=\"http://mongodb.com\">mongodb</a> database, add a test user with a password, and allow access from any IP address.  MongoDB will give you a connection string that you can paste into <code>index.js</code> over my default <code>test_user</code> connection string.  <a href=\"https://dev.to/lennythedev/rest-api-with-mongodb-atlas-cloud-node-and-express-in-10-minutes-2ii1\">This article</a> details setting up a MongoDB account and data store.  In the code example, you can update your mongodb link, including your username and password, in the mongoose.connect line.  Be sure to remove these from your code when you're done, or better yet, de-activate that user account on mongodb (you can schedule this to expire when you create it)!"
        - "Invoke the service using a node.js application or a JavaScript browser client.  You can use the Advanced REST Client plugin for Chrome (or Postman, or a similar REST client plugin, on other browsers) or the <code>curl</code> command to execute your web service, in addition to the client code examples we saw previously.  Just update the link to your repl.it server project link in the commands or URL's shown here."
        - What HTTP verb is used to create a new item?  To retrieve an item?  To update an item?  To delete an item?
        - Why is POST used to create items while PUT is used to update them?  Aren't these interchangeable?
        - "What if you wanted to support other verbs on these items, like <code>putOnSale</code>?  Are service endpoints typically nouns or verbs, and how might you re-work a sale verb like this one into an appropriate CRUD endpoint?"
        - What is the advantage of separating your code into a model and a controller implementation?
        - "How would you define a schema that supports an array of sub-objects?  See <a href=\"https://mongoosejs.com/docs/2.7.x/docs/embedded-documents.html\">this article</a> for an example."
        - "How would you define a schema that supports an embedded sub-object?  See <a href=\"https://alexanderzeitler.com/articles/mongoose-referencing-schema-in-properties-and-arrays/\">this article</a> for an example."
        
tags:
  - rest
  
---

