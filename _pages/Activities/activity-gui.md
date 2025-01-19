---
layout: activity
permalink: /Activities/GUI
title: "CS375: Software Engineering - GUI"


info:
  goals:
    - To implement a Progressive Web App (PWA) in JavaScript, HTML5, and CSS
    - To create interactive user interfaces using Python
    - To explain best practices in developing user interfaces for usability

  models:
    - model: |
        Review the example below as a class.
      title: A Static Progressive Web App for Mobile Clients
      questions:
        - How do we name elements in HTML5 for dynamic updating?  What is the name of the main body element that we're updating?
        - What JavaScript command is used to set the content of a web page element?
        - How do we define each list item to be a box?
        - How do we ensure that each box appears in a dynamically-sized grid?
        - How do we intercept a fetch and serve the content locally, serving as a cache?
        - Load the web page in a Chrome browser on your mobile device, if you have one.  From the Chrome menu, you can add the app to your home screen.  Try changing the navigation color and the home screen icon.
      embed: <iframe height="800px" width="100%" src="https://repl.it/@BillJr99/pwa-example-static-linkclass?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>  
    - model: |
      title: A Dynamic PWA Using a Backend Web Service
      embed: <iframe height="400px" width="100%" src="https://repl.it/@BillJr99/pwa-example-dynamic?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe><br /><br /><iframe height="400px" width="100%" src="https://repl.it/@BillJr99/pwa-example-server?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>          
      questions:
        - "In <code>script.js</code>, where has the <code>courses</code> array gone?"
        - How has the service worker changed to intercept fetches and forward them to the web server if they are remote data calls?
        - What would happen if the server side data changed?  What could we do about this?  
    - model: |
        <iframe width="560" height="315" src="https://www.youtube.com/embed/wuzV9P8geDg" title="YouTube video player" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
      title: "Application Graphical User Interface (GUI) with Python"
      embed: <iframe height="400px" width="100%" src="https://repl.it/@BillJr99/GUIExample?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>
      questions:
        - "In your own words, what is a callback function?"
        - "Design a GUI using <code>pygubu-designer</code> with an input and a display element, and connect them with a callback."
        - "Choose a UI design basic principle and describe it in your own words with an example.  You may draw a sketch or use PowerPoint to do this."

  additional_reading:
    - link: "https://www.usability.gov/what-and-why/user-interface-design.html"
      title: "User Interface Design Basics from usability.gov"

tags:
  - gui
  - pwa
  - html5
  - javascript
  - css  

---

