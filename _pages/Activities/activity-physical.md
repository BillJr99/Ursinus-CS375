---
layout: activity
permalink: /Activities/PhysicalLayer
title: "CS475: Computer Networks - The Physical Layer"
excerpt: "CS475: Computer Networks - The Physical Layer"

info:
  goals: 
    - To define the behaviors at the physical layer
    - To define a 1 and a 0 on an electronic medium
    - To explain the Ethernet protocol including protocols for collision avoidance
    - To explain CSMA its use on the Internet
    - To explain Non-CSMA Multiple Access protocols such as CDMA
    - To explain the unique challenges of wireless technologies including 802.11 as a physical layer with respect to collisions and hidden peers

  additional_reading:
    - link: "http://www-net.cs.umass.edu/kurose_ross/ppt-8e/Chapter_7_v8.0.pptx"
      title: Kurose Notes
    - link: "http://www.ece.ualberta.ca/~elliott/ee552/studentAppNotes/2000f/misc/CDMA/"
      title: "CDMA Example"
    - link: "https://en.wikipedia.org/wiki/Code-division_multiple_access#Example"
      title: "CDMA Example on Wikipedia"
      
  models:
    - model: |
        <img src="https://www.publicdomainpictures.net/pictures/180000/velka/walkie-talkie-1467272392l2b.jpg" alt="Walkie-Talkie Public Domain Image">
      title: "Communication over a Shared Medium"
      questions: 
        - "How might you ensure that only one person speaks at a time?"      
        - "How do we know if a message is destined for us as opposed to someone else?  What information would we need, and at what layer would we find it?"
        - "At what point would you determine that your message was corrupted due to a collision?  What would you do about it?"
        - "Hubs are essentially repeater devices that echo the data from one sender to all ports on the hub.  Why is this inefficient, and what could we do about it?"
        - "Hubs even echo a packet back to the sender: why is this useful for collision detection purposes?  Draw a diagram showing that a collision can occur even if two senders begin transmission on a clear line."
    - model: |
        <a title="helix84, CC BY-SA 3.0 &lt;http://creativecommons.org/licenses/by-sa/3.0/&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Pure_ALOHA.svg"><img width="512" alt="Pure ALOHA" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/Pure_ALOHA.svg/512px-Pure_ALOHA.svg.png"></a>
        <br>
        <a title="helix84, CC BY-SA 3.0 &lt;http://creativecommons.org/licenses/by-sa/3.0/&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Slotted_ALOHA.svg"><img width="512" alt="Slotted ALOHA" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7a/Slotted_ALOHA.svg/512px-Slotted_ALOHA.svg.png"></a>
        <br>
        <a title="!Original: KyurimVector: fl.  This vector image includes elements that have been taken or adapted from this file: Aloha SvG.PNG (by Kyurim)., CC0, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Aloha_PureVsSlotted.svg"><img width="256" alt="Aloha PureVsSlotted" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Aloha_PureVsSlotted.svg/256px-Aloha_PureVsSlotted.svg.png"></a>
      title: "One Approach to Multiple Access: The ALOHA Protocol"
      questions: 
        - "In Pure ALOHA, those who wish to transmit do so without checking if the medium is clear.  Collisions can happen at any time.  If a collision occurs, the nodes back off for a random period of time.  If any part of a transmission is corrupted, the whole frame is discarded; therefore, for how long is the transmission of two packets of size T vulnerable to collision with one another?"        
        - "What is the difference between Pure ALOHA and Slotted ALOHA?  What is the vulnerable time period for two packets of size T using Slotted ALOHA?  Which is more efficient?"
    - model: |
        <div align="left">
        The probability of <code>x</code> nodes transmitting a frame at the beginning of a Slotted ALOHA frame, when assuming that, on average, nodes transmit with probability <code>G</code>, is defined by a Poisson Distribution (an asymptotic extension of the Binomial Distribution): <span>\(P(x) = \frac{G^{x} e^{-G}}{x!}\)</span>.  
        </div>
      title: "ALOHA Transmission Efficiency"
      questions: 
        - "What is <code>P(1)</code>, the probability that exactly one node will transmit in a frame using Slotted ALOHA?"
        - "In unslotted ALOHA, we must assume that only one node transmits during a specific frame, and also that no node transmits during the prior frame, to avoid a collision.  These are independent events, so the unslotted probability is <code>P = P(1) P(0)</code>.  What is this, and how does it relate to the Slotted ALOHA probability of successful transmission?"
        - "Take the derivative of the probability function for slotted ALOHA and for unslotted ALOHA, and set it equal to 0 to maximize the function.  At what value of <code>G</code> is each maximized?  Plug in this value and set <code>x</code> equal to 1 to observe the maximum transmission efficiency."        
    - model: |
        <a title="Stefan Schmidt, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Manchester_encoding_both_conventions.svg"><img width="512" alt="Manchester encoding both conventions" src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Manchester_encoding_both_conventions.svg/512px-Manchester_encoding_both_conventions.svg.png"></a>
      title: "Communicating a bit via the Ethernet Standard IEEE 802.3"
      questions: 
        - "In your own words, how is a 0 or a 1 represented by 802.3 Manchester Encoding?"
        - "Look at a vew values of the 802.3 Manchester encoding, the data, and the clock.  Write down a few sample values at a few snapshots in time.  What binary expression might relate the data and clock to the Manchester encoding?"       
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
            <th class="tg-7btt">Access Protocol</th>
            <th class="tg-7btt">Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td class="tg-fymr">1-Persistent CSMA/CD (Ethernet - Unslotted)</td>
            <td class="tg-0pky">Listen before sending (CSMA) and send when clear; if a collision is detected via the receiving line (CD), stop transmitting and randomly wait before retrying when the medium is clear.  Alternatively, CSMA without CD cannot stop transmitting as soon as the collision is detected, but rather it completes the frame despite the data corruption.</td>
          </tr>
          <tr>
            <td class="tg-fymr">Non-Persistent CSMA</td>
            <td class="tg-0pky">Same as above, but also waits a random period of time even if the medium is clear.</td>
          </tr>
          <tr>
            <td class="tg-fymr">P-Persistent CSMA (WiFi)</td>
            <td class="tg-0pky">Similar to above, but waits for a random period of time only if the medium was first detected to be busy.  Transmit at the beginning of a known time slot interval.</td>
          </tr>
        </tbody>
        </table>
        <br>
        <small>Adapted from <a href="https://en.wikipedia.org/wiki/Carrier-sense_multiple_access#Access_modes">Wikipedia</a>
        <br>
        <a title="Runtux rob-nowman, renepick, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:CSMACD-Algorithm.svg"><img width="512" alt="CSMACD-Algorithm" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/CSMACD-Algorithm.svg/512px-CSMACD-Algorithm.svg.png"></a>
      title: "Carrier Sense Multiple Access Protocols"
      questions: 
        - "Why not use Non-persistent CSMA for Ethernet as opposed to 1-Persistent CSMA?  What is the benefit, but what is the sacrifice?"
        - "What might be an appropriate upper-bound for the random wait time if a collision occurs?  How might this upper bound change if collisions continue to happen?  What are the benefits and drawbacks of a very short or very long upper bound?"
        - "In what ways is Ethernet more efficient than Aloha?"
    - model: |
        <a title="Raysonho @ Open Grid Scheduler / Grid Engine, CC0, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:EthernetCableYellow3.jpg"><img width="512" alt="EthernetCableYellow3" src="https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/EthernetCableYellow3.jpg/512px-EthernetCableYellow3.jpg"></a>
        <br>
        <a title="Per Mejdal Rasmussen, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Twisted_pair_based_ethernet.svg"><img width="512" alt="Twisted pair based ethernet" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Twisted_pair_based_ethernet.svg/512px-Twisted_pair_based_ethernet.svg.png"></a>
        <br>
        <a title="Zephyris at the English language Wikipedia, CC BY-SA 3.0 &lt;http://creativecommons.org/licenses/by-sa/3.0/&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:CAT5e_Cable.jpg"><img width="512" alt="CAT5e Cable" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/CAT5e_Cable.jpg/512px-CAT5e_Cable.jpg"></a>
      title: "Wired Ethernet"
      questions: 
        - "What are some ways an Ethernet cable can be multiplexed to support faster throughput (or more &quot;lanes&quot;)?" 
        - "What do you think are the speed limiting factors for throughput on an Ethernet cable?"
        - "In a twisted-pair cable such as CAT5e or CAT6 Ethernet, there are two cables for each Ethernet connector pin (each of these pins has a pin connector and a ring connector).  How might differential voltages on these lines be used to identify a 1 or a 0 bit?"
        - "Do you think thicker copper wire can support higher frequency RF oscillations?  What effect would this have on throughput?"
    - model: |
        <a title="Andrei Stroe, CC BY-SA 3.0 &lt;http://creativecommons.org/licenses/by-sa/3.0/&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Wifi_hidden_station_problem.svg"><img width="512" alt="Wifi hidden station problem" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2b/Wifi_hidden_station_problem.svg/512px-Wifi_hidden_station_problem.svg.png"></a>
        <br>
        <a title="jjgarcia.tsc, Attribution, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Csma_ca.svg"><img width="256" alt="Csma ca" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1d/Csma_ca.svg/256px-Csma_ca.svg.png"></a>
        <br>
        <a title="Michael Gauthier, Wireless Networking in the Developing World KelleyCook, image improvements Whidou, French translation, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:2.4_GHz_Wi-Fi_channels_(802.11b,g_WLAN).svg"><img width="512" alt="2.4 GHz Wi-Fi channels (802.11b,g WLAN)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/2.4_GHz_Wi-Fi_channels_%28802.11b%2Cg_WLAN%29.svg/512px-2.4_GHz_Wi-Fi_channels_%28802.11b%2Cg_WLAN%29.svg.png"></a>
      title: "Wireless Protocols Including IEEE 802.11"
      questions: 
        - "Why can't we use CSMA/CD with WiFi like we could with Ethernet?  Hint: the problem described by the three wireless nodes A, B, and C above is called the &quot;Hidden Node Problem&quot;"
        - "What are some ways we can mitigate the Hidden Node Problem?"
        - "In the Carrier Sense Multiple Access with Collision Avoidance (CSMA/CA) algorithm described in the flowchart above, what does RTS and CTS mean?"
        - "To whom is an RTS or CTS message sent, if this feature is used?"
        - "If a node hears an RTS message sent, but does not hear the corresponding CTS, what might be happening?"
        - "How might we multiplex multiple WiFi access points across the 2.4GHz spectrum using Frequency Division Multiple Access (FDMA)?  Which channel selections best avoid interference between access points in the 2.4GHz spectrum?"
    - model: |
        <div align="left">
        Assuming orthogonal vectors a and b (called chip sequences or codes), generated from a <a href="https://en.wikipedia.org/wiki/Walsh_matrix">Hadamard-Walsh Code</a>: <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/c416b33910828e0941fec78eec1170c79e7ca146" alt="Orthogonal Vector Dot Product Definition from Wikipedia"><br>
        <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/b5ac33e7c151f5eb8508fccd2e5305ec34da894b" alt="Orthogonality Properties from Wikipedia"><br>
        <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/912606ea626c1650f13c67d9a1a6d863dbea09a1" alt="Orthogonality Properties from Wikipedia"><br>
        <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/813662c13436da6b0d1ac81794f2b6153b43b91e" alt="Orthogonality Properties from Wikipedia"><br>
        <img src="https://wikimedia.org/api/rest_v1/media/math/render/svg/26c2776779006d52a1a7f74012c9639d3dd5a997" alt="Orthogonality Properties from Wikipedia">
        </div>
        <br>
        <p><a href="https://commons.wikimedia.org/wiki/File:Cdma_orthogonal_signals.png#/media/File:Cdma_orthogonal_signals.png"><img src="https://upload.wikimedia.org/wikipedia/commons/2/25/Cdma_orthogonal_signals.png" alt="Cdma orthogonal signals.png"></a><br><a href="http://creativecommons.org/licenses/by-sa/3.0/" title="Creative Commons Attribution-Share Alike 3.0">CC BY-SA 3.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=443155">Link</a></p>
      title: "The Code Division Multiple Access Protocol (CDMA)"
      questions: 
        - "What is a Walsh Matrix?"        
        - "A spreading sequence <code>v</code> is computed from each node's chip code such that each 1 in the vector remains a 1, and each 0 becomes a -1.  Why do you think this is done?"
        - "Each node transmits <code>v</code> for a 1 and <code>-v</code> for a 0 bit.  What do you think is transmitted if no data is intended to be sent on the medium?"
        - "What would happen if one takes the dot product of a received vector with a sender's spreading code?  How might this change if there is interference due to simultaneous transmissions on the line?  Specifically, what is the most important attribute of each value in the resulting vector of the dot product to determine what corresponding bit was transmitted (hint: it's not the magnitude of the value itself!)?"
        - "How is constructive interference used to encode and, thus, to extract data from a shared medium when collisions occur between senders?"
        - "What sacrifice was made to enable this spread-spectrum technique?"
        
tags:
  - physical
  - layer
 
---

