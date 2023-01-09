---
layout: activity
permalink: /Activities/MotivatingExamples
title: "CS475: Computer Networks - Motivating Examples"
excerpt: "CS475: Computer Networks - Motivating Examples"

info:
  goals: 
    - To explore network tools and protocols including nslookup, HTTP, and traceroute
    - To motivate the need for loosely interconnected networking protocols to provide different but compatible levels of service
  models:
    - model: |
        <img src="../images/activity-motivatingexamples/traceroute.png" alt="A Wireshark trace of the traceroute program">
      title: "Control Messages with ICMP and ping"
      questions: 
        - "What do you think Time-to-Live means?"  
        - "The Wireshark trace returns results from each network node on the path to the destination, but the resposne message appears to be an error.  What do you think the Time-to-Live has to do with finding each hop on the path?"
        - "Generally, the round-trip-time increases as the length of the path increases, but not strictly so.  Why do you think this is?"
    - model: |
        <img src="../images/activity-motivatingexamples/dns.png" alt="A Wireshark trace of a DNS lookup">
      title: "IP Address Resolution with the DNS Protocol"
      questions: 
        - "What port number is used to make the DNS request?"  
        - "What domain did I search for, and what answer(s) were returned?"
        - "Where in the Wireshark trace are the returned addresses found?"
        - "Why do you think more than one answer was returned for this request?"
    - model: |
        <img src="../images/activity-motivatingexamples/httprequest.png" alt="A Wireshark trace of an HTTP request">
        <br>
        <img src="../images/activity-motivatingexamples/httpresponse.png" alt="A Wireshark trace of an HTTP response">
      title: "The HTTP Application-Layer Protocol"
      questions: 
        - "What text is contained in the HTTP request?"
        - "What kind of data formatting do you see in the request?  Do you see this format replicated in the response, and if so, what kinds of information are returned aside from the webpage itself?"
        - "What would happen if an image or other media was encountered in the HTTP response?"
        - "The command I used to connect to the web server was <code>telnet www.google.com 80</code>.  Similarly, you typically enter <code>http://www.google.com</code> into a web browser.  Why was it unnecessary to run a DNS lookup and enter the IP address here instead?" 

tags:
  - examples

 
---

