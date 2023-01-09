---
layout: activity
permalink: /Activities/TransportLayer
title: "CS475: Computer Networks - The Transport Layer"
excerpt: "CS475: Computer Networks - The Transport Layer"

info:
  goals: 
    - To describe the role of the Transport Layer
    - "To describe protocols for various levels of quality-of-service including UDP and TCP"
    - To explain how congestion management is handled in a distributed and passive manner using TCP
    - "To differentiate between quality-of-service levels with different Transport Layer protocols"
    - "To define a sliding window protocol using TCP for efficient and in-order buffered communications"
        
  additional_reading:
    - link: "http://www-net.cs.umass.edu/kurose_ross/ppt-8e/Chapter_3_v8.0.pptx"
      title: Kurose Notes
    - link: "https://tools.ietf.org/html/rfc768"
      title: "The UDP Protocol RFC768"
    - link: "https://www.baeldung.com/udp-in-java"
      title: "Example UDP Socket Program"
          
  models:
    - model: |
        <style type="text/css">
        .tg  {border-collapse:collapse;border-spacing:0;}
        .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}
        .tg .tg-0lax{text-align:left;vertical-align:top}
        </style>
        <table class="tg">
        <thead>
          <tr>
            <th class="tg-c3ow">Source Port (16 bits)</th>
            <th class="tg-c3ow">Destination Port (16 bits)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tg-0lax">Length (16 bits)</td>
            <td class="tg-0lax">Checksum (16 bits)</td>
          </tr>
        </tbody>
        </table>
      title: "User Datagram Protocol (UDP)"
      questions: 
        - "What do you think a port number represents?  In other words, how does the Transport Layer multiplex or share the network?"
        - "Review the UDP RFC and describe the format of the checksum."
        - "Error detection is also employed at the link layer.  Why might error detection occur at this layer?"
        - "UDP does not inherently acknowledge packet receipt.  Why is it valuable to detect packet errors anyway?"
        - "What must one do if ordered, reliable packet delivery is essential?"
        - "What kind of applications might benefit from a transport layer protocol that does not provide reliable automatic retransmission?"
        - "Review the example socket program using the UDP protocol.  What revisions might you make to incorporate ordered packet delivery, and reliable retransmission of packets?"
    - model: |
        <style type="text/css">
        .tg  {border-collapse:collapse;border-spacing:0;}
        .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg .tg-c3ow{border-color:inherit;text-align:center;vertical-align:top}
        .tg .tg-0lax{text-align:left;vertical-align:top}
        </style>
        <table class="tg">
        <thead>
          <tr>
            <th class="tg-c3ow">Source Port (16 bits)</th>
            <th class="tg-c3ow" colspan="3">Destination Port (16 bits)</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tg-0lax" colspan="4">Sequence Number (32 bits)</td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="4">Acknowledgement Number (32 bits)</td>
          </tr>
          <tr>
            <td class="tg-0lax">Offset (4 bits)</td>
            <td class="tg-0lax">Reserved (3 bits)</td>
            <td class="tg-0lax">Bit Flags (9): Nonce, <br>Congestion Window <br>Reduced, ECN Echo, <br>Urgent, ACK, Push, <br>Connection Reset, <br>SYN, FIN</td>
            <td class="tg-0lax">Window Size (16 bits)</td>
          </tr>
          <tr>
            <td class="tg-0lax">Checksum (16 bits)</td>
            <td class="tg-0lax" colspan="3">Urgent Pointer (16 bits)</td>
          </tr>
          <tr>
            <td class="tg-0lax" colspan="4">Options</td>
          </tr>
        </tbody>
        </table>
      title: "Transmission Control Protocol (TCP)"
      questions: 
        - "Which field helps ensure that packets are delivered in the order in which they are sent?"
        - "What is the disadvantage of starting the sequence numbering at 0?"
        - "How might the sender and receiver agree on starting sequence numbers?"
        - "Which fields are used to establish and terminate a connection?"
    - model: |
        <a title="Clemente, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:TCP_CLOSE.svg"><img width="256" alt="TCP CLOSE" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/TCP_CLOSE.svg/256px-TCP_CLOSE.svg.png"></a>
        <br>
        <a title="Scil100, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Tcp_state_diagram_fixed_new.svg"><img width="512" alt="Tcp state diagram fixed new" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/f6/Tcp_state_diagram_fixed_new.svg/512px-Tcp_state_diagram_fixed_new.svg.png"></a>
      title: "The Three-Way Handshake"
      questions: 
        - "Review the flowchart to terminate a connection.  How many connections are present in a typical TCP communication, and why?"
        - "The SYN packet is used to synchronize, or start, a connection.  Three messages are used to establish such a bidirectional connection: what do you think they contain?"
        - "Do you think a UDP connection is also bidirectional?  Why or why not?"
    - model: |
        <style type="text/css">
        .tg  {border-collapse:collapse;border-spacing:0;}
        .tg td{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg th{border-color:black;border-style:solid;border-width:1px;font-family:Arial, sans-serif;font-size:14px;
          font-weight:normal;overflow:hidden;padding:10px 5px;word-break:normal;}
        .tg .tg-1wig{font-weight:bold;text-align:left;vertical-align:top}
        .tg .tg-fymr{border-color:inherit;font-weight:bold;text-align:left;vertical-align:top}
        .tg .tg-0pky{border-color:inherit;text-align:left;vertical-align:top}
        .tg .tg-0lax{text-align:left;vertical-align:top}
        </style>
        <table class="tg">
        <thead>
          <tr>
            <th class="tg-fymr">Sender</th>
            <th class="tg-1wig">Receiver</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tg-0pky">Send 100 Bytes SEQ=0</td>
            <td class="tg-0lax">ACK 100</td>
          </tr>
          <tr>
            <td class="tg-0pky">Send 100 Bytes SEQ=100</td>
            <td class="tg-0lax">ACK 200</td>
          </tr>
          <tr>
            <td class="tg-0pky">Send 100 Bytes SEQ=200</td>
            <td class="tg-0lax">(Lost)</td>
          </tr>
          <tr>
            <td class="tg-0pky">Send 100 Bytes SEQ=300</td>
            <td class="tg-0lax">(Received, ACK 200)</td>
          </tr>
          <tr>
            <td class="tg-0pky">Send 100 Bytes, SEQ=400</td>
            <td class="tg-0lax">(Received, ACK 200)</td>
          </tr>
          <tr>
            <td class="tg-0lax">Retransmit Starting at SEQ=200</td>
            <td class="tg-0lax">ACK 500</td>
          </tr>
        </tbody>
        </table>
      title: "Reliable Retransmission Protocol with TCP"
      questions:
        - "What does ACK 100 imply?"
        - "Why does the sender continue to send ACK 200 message even as additional packets are received?"
        - "Why did the sender retransmit duplicate packets, and what happens to those packets?"
        - "What might be an improved sequencing protocol?"
    - model: |
        <a title="Mike de, CC BY-SA 3.0 &lt;http://creativecommons.org/licenses/by-sa/3.0/&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Tcp.svg"><img width="512" alt="Tcp" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/db/Tcp.svg/512px-Tcp.svg.png"></a>
        <br>
        <a title="Fleshgrinder, GPLv3 &lt;http://www.gnu.org/licenses/gpl-3.0.html&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:TCP_Slow-Start_and_Congestion_Avoidance.svg"><img width="512" alt="TCP Slow-Start and Congestion Avoidance" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/24/TCP_Slow-Start_and_Congestion_Avoidance.svg/512px-TCP_Slow-Start_and_Congestion_Avoidance.svg.png"></a>
        <br>
        <a title="NetMasterNa, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:CongWin_in_TCP_Tahoe_e_Reno.png"><img width="512" alt="CongWin in TCP Tahoe e Reno" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/CongWin_in_TCP_Tahoe_e_Reno.png/512px-CongWin_in_TCP_Tahoe_e_Reno.png"></a>
      title: "Congestion and Flow Control with TCP"
      questions: 
        - "Which phase of TCP transmission features the fastest growth?"
        - "When a loss occurs, implying congestion, slow start begins again by sending 1 maximum-segment-size (MSS) and doubling with each successful ACK received.  At what point does Slow Start transition to congestion avoidance following a loss?"
        - "What are some ways a sender might determine that a loss has occurred?"
        - "Might it be a good idea to &quot;fast retransmit&quot; a packet that has been lost perhaps for reasons other than congestion, without restarting Slow Start?"
        - "How might you compute a round trip time estimate for determining that a packet has been lost?  Should you assume a loss as soon as this estimate has been reached?"
        - "How does TCP Tahoe improve over TCP Reno by avoiding a return to Slow Start from the beginning on packet loss?"
        - "What would be the advantages and disadvantages of leaving Slow Start after observing rising round trip times, rather than waiting for a loss, as TCP Vegas does?"
        - "Suppose you have a UDP socket open and transmitting, causing congestion on the network.  The TCP senders throttle back automatically due to congestion control.  What happens to the UDP sender?  Over time, what happens to the throughputs of the TCP senders?  What can we do to make throughput more fair for everyone?"
    - model: |
        <div>
        <span>\(RTT_{i} = \alpha \times RTT_{i-1} + (1 - \alpha) \times t\)</span>
        </div>
      title: "Avoiding a Return to Slow Start by Monitoring the Round Trip Time"
      questions: 
        - "Describe, in your own words, how the Round Trip Time is updated at each iteration."
        - "What do you think is the purpose of the <span>\\(\\alpha\\)</span> term, which is a value between <code>0</code> and <code>1</code>?"
        - "What does it mean if <span>\\(\\alpha\\)</span> is <code>0.5</code>?  How about <code>0</code> and <code>1</code>?"
    - model: |
        <div>
        <span>\(RTT_{i} = RTT_{i-1} \times (\alpha \times (t - RTT_{i-1}))\)</span>
        <br>
        <span>\(Deviation_{i} = Deviation_{i-1} + \frac{1}{4} \times (|t - RTT_{i-1}| - Deviation_{i-1})\)</span>
        <br>
        <span>\(TimeOut = RTT_{i} + 4 \times Deviation_{i}\)</span>
        </div>
      title: "Improved Round Trip Time Estimation with the Jacobson/Karels Algorithm"
      questions: 
        - "What new feature of the Round Trip Time is being utilized to estimate a good timeout interval?"
        - "Why do you think powers of <code>2</code> were selected for the constants in these formulas?"
        - "How does the role of <span>\\(\\alpha\\)</span> differ between the original definition and this one?"
    - model: |
        <div>
        <img src="https://d3i71xaburhd42.cloudfront.net/9b7eb88be27bdbc790969c8997e76ce2fbb56b12/4-Figure1-1.png" alt="Nagle's Algorithm Transmission Timeline; Mogul, J. and G. Minshall. &quot;Rethinking the TCP Nagle algorithm.&quot; Comput. Commun. Rev. 31 (2001): 6-20.">
        </div>
      title: "The Small Packet Problem and Nagle's Algorithm"
      questions: 
        - "How large would each packet be if a sentence was transmitted one character at a time over TCP?"
        - "How might we reduce this overhead?  Specifically, from the diagram, how long does Nagle propose to buffer data before sending a single unifed packet?  In other words, what event triggers a a TCP transmission when using Nagle's Algorithm?"
        - "What do you think the <code>TCP_NODELAY</code> TCP configuration parameter means?  How about <code>TCP_QUICKACK</code>?  What problem do you think each one solves?"
        
tags:
  - transport
  - layer
 
---

