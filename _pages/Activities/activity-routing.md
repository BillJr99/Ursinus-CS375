---
layout: activity
permalink: /Activities/Routing
title: "CS475: Computer Networks - Routing Protocols"
excerpt: "CS475: Computer Networks - Routing Protocols"

info:
  goals: 
    - To describe the routing process for local area and wide area networks
    - To explain and differentiate between Distance Vector, Hierarchical, and BGP routing protocols
        
  additional_reading:
    - link: "http://www-net.cs.umass.edu/kurose_ross/ppt-8e/Chapter_5_v8.0.pptx"  
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
            <th class="tg-7btt">Class</th>
            <th class="tg-7btt">Leading Bits</th>
            <th class="tg-fymr">Number of Networks</th>
            <th class="tg-fymr">Size of Each Network</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tg-0pky">A</td>
            <td class="tg-0pky">0</td>
            <td class="tg-0pky">128</td>
            <td class="tg-0pky">16M</td>
          </tr>
          <tr>
            <td class="tg-0pky">B</td>
            <td class="tg-0pky">10</td>
            <td class="tg-0pky">16K</td>
            <td class="tg-0pky">64K</td>
          </tr>
          <tr>
            <td class="tg-0pky">C</td>
            <td class="tg-0pky">110</td>
            <td class="tg-0pky">2M</td>
            <td class="tg-0pky">256</td>
          </tr>
          <tr>
            <td class="tg-0pky">D</td>
            <td class="tg-0pky">1110</td>
            <td class="tg-0pky">Multicast</td>
            <td class="tg-0pky"></td>
          </tr>
          <tr>
            <td class="tg-0pky">E</td>
            <td class="tg-0pky">1111</td>
            <td class="tg-0pky">Reserved</td>
            <td class="tg-0pky"></td>
          </tr>
        </tbody>
        </table>
      title: "Classful Network Addressing"
      questions: 
        - "How many bits make up the network and node address of a class A, B, and C network?"
        - "Using Classless Inter-Domain Routing, how many subnet bits would correspond to a Class A, B, and C network?"
        - "Does a router need to store forwarding information for every single host on the Internet?  How might it group its routing table for efficiency?  This is called Hierarchical Routing."
    - model: |
        <div>
        <a title="Ibmua, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Dijkstra_Animation.gif"><img width="256" alt="Dijkstra Animation" src="https://upload.wikimedia.org/wikipedia/commons/5/57/Dijkstra_Animation.gif"></a>
        <br>
        <div align="left">
        <code style="display:block; white-space:pre-wrap">
        let Q = []
        
        for vertex in G:
            distance[vertex] = inf
            prev[vertex] = nil
            Q.append(vertex)
        
        distance[source] = 0
        
        while not Q.empty():
            let u = Q[distance.argmin] # the cheapest destination so far
            Q.remove(u)
            
            for v in u.neighbors:
                # proposed distance is the current cost to get to u by the 
                # cheapest means, plus the cost to get from u to v
                let dist = distance[u] + u.cost(v) 
                
                if dist < distance[v]: # is this chepaer than the current cost to v?
                    distance[v] = dist
                    prev[v] = u
        </code>
        </div>
        </div>
      title: "Link-State Routing Algorithms: Open Shortest Path First (OSPF) and Dijkstra's Algorithm"
      questions: 
        - "Once a shortest path has been identified to a particular destination, how might it be communicated from router to router?  In other words, what information is needed by each router in order to forward information to the next destination?  Specifically, how is this information different from that used by a switch?"
        - "Initially, who is the cheapest destination, when nearly all of the nodes are infinite cost?"
        - "Dijkstra's Algorithm is called a &quot;greedy algorithm&quot;; why do you think this is?"
        - "Execute Dijkstra's Algorithm on the graph above, using node <strong>a</strong> as the source."
        - "How many cost comparisons are required to execute this algorithm?"
    - model: |
        <div align="left">
        <code style="display:block; white-space:pre-wrap">
        distance = [inf] * N
        prev = [null] * N
        distance[source] = 0
        
        for i in range(V.length):
            for (u, v, w) in edges:
                dist = distance[u] + v
                if dist < distance[v]:
                    distance[v] = dist
        </code>
        </div>
      title: "Distance Vector Routing: Routing Information Protocol (RIP) and Bellman-Ford"
      questions: 
        - "What is the length of the longest path you can traverse after each iteration of the loop?"
        - "What would happen if the graph had a negative weight edge cycle?"
        - "Execute the Bellman-Ford Algorithm on the graph above, using node <strong>a</strong> as the source."
        - "How many cost comparisons are required to execute this algorithm?"
    - model: |
        <a title="David Condrey, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Small_Network.png"><img width="128" alt="Small Network" src="https://upload.wikimedia.org/wikipedia/commons/2/2f/Small_Network.png"></a>
      title: "The Count-to-Infinity Problem and Route Poisoning"
      questions: 
        - "Suppose the top right node learns that it can reach the bottom-most node by going through the node at top center.  The node at top center knows that it can reach the node at the top right via a direct connection.  If the connection from the node at the top center to the bottom-most node is severed, why might it believe that it can still reach it by routing traffic through the node at the top right?  How would their network costs be affected?  What would happen to the perceived cost from the perspective of the top-right node as the top-center node updates its own cost?  This is called the Count-to-Infinity Problem." 
        - "How can we fix this?  Some node should indicate that its cost has become infinite.  Which one?  This is called Route Poisoning"
        - "Alternatively, which link should stop advertising its route and to whom?  This is called Split Horizon."
    - model: |
        <a title="Shiyu Ji, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:RR_BGP.svg"><img width="512" alt="RR BGP" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/RR_BGP.svg/512px-RR_BGP.svg.png"></a>
      title: "Routing at Scale: Hierarchical Routing"
      questions: 
        - "What information needs to be shared among the edge routers, versus that information shared within each network cluster?" 
        
tags:
  - routing
 
---

