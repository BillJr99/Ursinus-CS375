---
layout: activity
permalink: /Activities/SocketProgramming
title: "CS475: Computer Networks - Socket Programming"
excerpt: "CS475: Computer Networks - Socket Programming"

info:
  goals: 
    - To implement a multithreaded, multiplexed socket I/O application that implements an application layer protocol
      
  models:
    - model: |
        <a href="https://www.baeldung.com/a-guide-to-java-sockets">Socket Programming Tutorial</a>
        <br>
        <a href="https://www.infoworld.com/article/2853780/socket-programming-for-scalable-systems.html">Threaded Socket Programming Example</a>
      title: "TCP Socket Programming"
      questions: 
        - "Create a socket to connect to your favorite web server and make an HTTP request, printing its response to the screen." 
        - "What port number does your server socket use, and what port should your client use to connect?"
        - "How do we free up the primary server socket port for subsequent connections, so that they can be handled simultaneously?"
      embed: |
        <iframe height="400px" width="100%" src="https://repl.it/@BillJr99/ThreadedSocketClientExample?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>  
        <br>
        <iframe height="400px" width="100%" src="https://repl.it/@BillJr99/ThreadedSocketServerExample?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>          
    - model: |
        <div>
        <iframe height="400px" width="100%" src="https://repl.it/@BillJr99/MultiThreadedSocketClientExample?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>  
        <br>
        <iframe height="400px" width="100%" src="https://repl.it/@BillJr99/MultiThreadedSocketServerExample?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>         
        </div>
      title: "Multithreaded TCP Socket Programming"
      questions: 
        - "What is different about this example?  What can it do that the prior example cannot?"
        - "Suppose you have multiple concurrent chat connections, but only one <code>System.in</code> standard input stream.  How might you determine which socket should send each line that the user types in?"
    - model: |
        <div>
        <iframe height="400px" width="100%" src="https://www.baeldung.com/udp-in-java"></iframe>  
        </div>
      title: "UDP Socket Programming"
      questions: 
        - "Describe, in your own words, the behavior of the client and the server in this example."
        - "How does a UDP socket program differ from a TCP socket program, in terms of its design and behavior?"
        
tags:
  - socket
  - programming
 
---

