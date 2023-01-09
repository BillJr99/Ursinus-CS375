---
layout: activity
permalink: /Activities/Layers
title: "CS475: Computer Networks - Layers"
excerpt: "CS475: Computer Networks - Layers"

info:
  goals: 
    - To identify the layers of the OSI Reference Model for networking
    - To map the TCP/IP model layers to those of the OSI Reference Model
        
  additional_reading:
    - link: "http://www-net.cs.umass.edu/kurose_ross/ppt-8e/Chapter_1_v8.1.pptx"
      title: Kurose Notes
     
  models:
    - model: |
        <style type="text/css">
        .tg  {border-collapse:collapse;border-spacing:0;}
        .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg .tg-7btt{border-color:inherit;font-weight:bold;text-align:center;vertical-align:top}
        .tg .tg-fymr{border-color:inherit;font-weight:bold;text-align:left;vertical-align:top}
        .tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
        </style>
        <table class="tg">
        <thead>
          <tr>
            <th class="tg-7btt">Layer</th>
            <th class="tg-7btt">Layer Name</th>
            <th class="tg-7btt">Protocol Data Unit</th>
            <th class="tg-fymr">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tg-fymr">7</td>
            <td class="tg-0pky">Application</td>
            <td class="tg-0pky"></td>
            <td class="tg-0pky">Application-level messages</td>
          </tr>
          <tr>
            <td class="tg-fymr">6</td>
            <td class="tg-0pky">Presentation</td>
            <td class="tg-0pky"></td>
            <td class="tg-0pky">Encoding, compression, encryption, etc.</td>
          </tr>
          <tr>
            <td class="tg-fymr">5</td>
            <td class="tg-0pky">Session</td>
            <td class="tg-0pky"></td>
            <td class="tg-0pky">User state to maintain a sense of "connection" at the application, for example, cookies to represent a shopping cart</td>
          </tr>
          <tr>
            <td class="tg-fymr">4</td>
            <td class="tg-0pky">Transport</td>
            <td class="tg-0pky">Datagram</td>
            <td class="tg-0pky">Segmentation, robust/reliable communications, including sequencing and acknowledgements</td>
          </tr>
          <tr>
            <td class="tg-fymr">3</td>
            <td class="tg-0pky">Network</td>
            <td class="tg-0pky">Packet</td>
            <td class="tg-0pky">Addressing and routing information</td>
          </tr>
          <tr>
            <td class="tg-fymr">2</td>
            <td class="tg-0pky">Link</td>
            <td class="tg-0pky">Frame</td>
            <td class="tg-0pky">Error correction and resubmission between two nodes (or a "hop") on the network path</td>
          </tr>
          <tr>
            <td class="tg-fymr">1</td>
            <td class="tg-0pky">Physical</td>
            <td class="tg-0pky">Bit</td>
            <td class="tg-0pky">Representing a binary 1 and a 0 over a wired or wireless communication</td>
          </tr>
        </tbody>
        </table>
        <br>
        <small>Adapted from <a href="https://en.wikipedia.org/wiki/OSI_model#Layer_architecture">Wikipedia</a></small>
      title: "The OSI Reference Model"
      questions: 
        - "Describe the functionality of each of the layers for a shopping service over HTTP that employs user accounts and a shopping cart.  What functionality exists at each layer?"
        - "What do you think would happen with this shopping service if the user started using a wireless connection to communicate with the web site?"
    - model: |
        <a title="en:User:Kbrose, CC BY-SA 3.0 &lt;http://creativecommons.org/licenses/by-sa/3.0/&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:IP_stack_connections.svg"><img width="256" alt="IP stack connections" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c4/IP_stack_connections.svg/256px-IP_stack_connections.svg.png"></a>
        <br>
        <a title="en:User:Cburnett original work, colorization by en:User:Kbrose, CC BY-SA 3.0 &lt;http://creativecommons.org/licenses/by-sa/3.0/&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:UDP_encapsulation.svg"><img width="512" alt="UDP encapsulation" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3b/UDP_encapsulation.svg/512px-UDP_encapsulation.svg.png"></a>
      title: "The TCP/IP Architecture"
      questions: 
        - "How do you think the OSI Layers map to the TCP/IP architecture?"
        - "What does TCP stand for?"
        - "Is TCP present in this architecture?  What is there in its place in this implementation, and what are some differences between it and TCP?"
        - "What kinds of services might be helpful at each layer to communicate a sentence from one side of the classroom to someone on the other side of the classroom?"
        
tags:
  - layers
 
---

