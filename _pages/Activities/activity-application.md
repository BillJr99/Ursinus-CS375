---
layout: activity
permalink: /Activities/ApplicationLayer
title: "CS475: Computer Networks - The Application Layer"
excerpt: "CS475: Computer Networks - The Application Layer"

info:
  goals: 
    - To describe the functionality of application layer protocols including HTTP and SMTP
        
  additional_reading:
    - link: "http://www-net.cs.umass.edu/kurose_ross/ppt-8e/Chapter_2_v8.1.pptx"
      title: Kurose Notes
      
  models:
    - model: |
        <a title="TheJosh, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Http_request_telnet_ubuntu.png"><img width="512" alt="Http request telnet ubuntu" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c6/Http_request_telnet_ubuntu.png/512px-Http_request_telnet_ubuntu.png"></a>
      title: "HTTP"
      questions: 
        - "If a web page contained an image, what would need to happen?  How might this be optimized?  Hint: this optimization is implemented in HTTP/1.1"
        - "What information could be stored to maintain state between requests; that is, to associate a request with a particular user or session?  Why isn't a stateful session mechanism built into HTTP?"
        - "Look up a few HTTP response code numbers.  What pattern do you see?"
        - "What are some HTTP client headers and what do they do?"
        - "How do you upload a file via HTTP?"
        - "Since socket I/O is typically a blocking call, how can you know how much data to read from the socket so that you don't block forever waiting for data that never arrives?"
    - model: |
        <script type="syntaxhighlighter" class="brush: java"><![CDATA[
        S: 220 smtp.example.com ESMTP Postfix
        C: HELO relay.example.com
        S: 250 smtp.example.com, I am glad to meet you
        C: MAIL FROM:<bob@example.com>
        S: 250 Ok
        C: RCPT TO:<alice@example.com>
        S: 250 Ok
        C: RCPT TO:<theboss@example.com>
        S: 250 Ok
        C: DATA
        S: 354 End data with <CR><LF>.<CR><LF>
        C: From: "Bob Example" <bob@example.com>
        C: To: Alice Example <alice@example.com>
        C: Cc: theboss@example.com
        C: Date: Tue, 15 Jan 2008 16:02:43 -0500
        C: Subject: Test message
        C: 
        C: Hello Alice.
        C: This is a test message with 5 header fields and 4 lines in the message body.
        C: Your friend,
        C: Bob
        C: .
        S: 250 Ok: queued as 12345
        C: QUIT
        S: 221 Bye
        {The server closes the connection}
        ]]></script>  
        <br>        
        (From Wikipedia)
      title: "SMTP"
      questions: 
        - "How does a mail client indicate to the server that they are finished sending a message?  What if the sender wishes to transmit that character?"
        - "How might a sender authenticate against the server?"
        - "Where does the sender indicate their email address?  What unfortunate consequence could result from this?"
        - "How might a sender attach a file?"
        - "What might you do if you were sending non-text, like an MP3 file, over a text-based protocol like this one?"  
    - model: |
        <iframe width="560" height="315" src="https://www.youtube-nocookie.com/embed/TJiW31F5xrE" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
      title: "End-to-End Review"
      questions: 
        - "Describe, in your own words, the life of a packet from end to end!" 
        
tags:
  - application
  - layer
 
---

