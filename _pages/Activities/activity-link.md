---
layout: activity
permalink: /Activities/LinkLayer
title: "CS475: Computer Networks - The Link Layer"
excerpt: "CS475: Computer Networks - The Link Layer"

info:
  goals: 
    - To explain the role and responsibility of the Link Layer
    - To demarcate a protocol data unit using bit flags
    - To use an ARP table to track mac addresses on a switch
    - To differentiate between a hub and a switch
    - To define a packet including its boundaries and standardizing features
    - To explain the use of a sliding window protocol for efficient in-order transmission
    - To explain the role and function of Link Layer protocols such as ARP and the Ethernet and WiFi frame
        
  additional_reading:
    - link: "http://www-net.cs.umass.edu/kurose_ross/ppt-8e/Chapter_6_v8.0.pptx"  
      title: Kurose Notes
       
  models:
    - model: |
        <a href="https://commons.wikimedia.org/wiki/File:Ethernet_Type_II_Frame_format.svg#/media/File:Ethernet_Type_II_Frame_format.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Ethernet_Type_II_Frame_format.svg/1200px-Ethernet_Type_II_Frame_format.svg.png" alt="Ethernet Type II Frame format.svg"></a><br>Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=1546835">Link</a>
      title: "A Link Layer Ethernet Frame Encapsulating a Packet"
      questions: 
        - "What constitutes an address at the link layer?  How large is this address, and how does it differ from an IP address?"
        - "The Ethernet frame is nothing more than a sequence of bits.  How might we indicate <a href=\"https://en.wikipedia.org/wiki/Ethernet_frame#Structure\">when a packet begins and ends</a> so that receivers know how to parse the data?"
        - "An 802.11 WiFi frame supports additional message types to request permission and acknowledge permission to and from an access point to communicate.  Why does this differ from an 802.3 Ethernet frame?"
        - "An 802.11 WiFi frame contains an additional address field beyond the sender and receiver links.  What address might this represent?"
    - model: |
        <div align="left">
        <code style="display:block; white-space:pre-wrap">
        let x = the bits representing the coefficients of a polynomial with coefficients 1 or 0
        let i = 0
        let result = input + ([0] * len(x)) # append len(x) 0 bits to the end of input
        repeat until result[:len(input)] == 0: # until the non-remainder bits are 0
            let wnd = result[i:i+len(x)] # the leftmost bits of the input
            wnd = wnd XOR x
            result[i:i+len(x)] = wnd
            i = i + 1
        crc_encoding = result[:-len(x)] # the rightmost bits of the output
        </code>
        </div>
      title: "The Cyclic Redundancy Check (CRC)"
      questions: 
        - "How often does this CRC execute while a packet transits from a source to a destination across multiple hops?"
        - "In addition to the CRC, a final check is made by the receiver at a higher layer of the network stack.  Why might this extra check occur?"
        - "CRC can be used to <a href=\"https://www.drdobbs.com/an-algorithm-for-error-correcting-cyclic/184401662\">correct</a> single bit errors.  What types of bit errors can the CRC detect, even if it cannot correct them?"
        - "The resulting encoding can be thought of as a remainder.  In your own words, what is the relationship between the remainder, the input, and the polynomial coefficient bits?"
    - model: |
        <div>
        <img src="https://wiki.wireshark.org/AddressResolutionProtocol?action=AttachFile&do=get&target=arp.png" alt="Wireshark ARP Trace">
        <br>
        <a title="Geek2003, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:2550T-PWR-Front.jpg"><img width="512" alt="2550T-PWR-Front" src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/2550T-PWR-Front.jpg/512px-2550T-PWR-Front.jpg"></a>
        </div>
      title: "The ARP Protocol"
      questions: 
        - "How might each computer keep track of the MAC addresses of the nodes around it?"
        - "What would happen if a node's IP address changes?  What can we do about this?"
        - "What would happen if a new node connected to a switch?  Does the switch have to be set up to communicate with it?  Why or why not?"
        - "Initially, a switch might not know which interface a particular node is connected to.  Switches are unable to send ARP packets on their own: what should the switch do if it receives a packet destined for a node whose MAC address is currently unknown to it?"
        - "How might an &quot;improved hub&quot; (called a &quot;switch&quot;) use this information to reduce collisions within its collision domain?  Beyond the information provided by an ARP packet, what information does the switch need to store?" 
        - "Suppose a packet transits from a source to a destination through several intermediate nodes.  How might the Link Layer frame be updated at each step?"
        - "What happens if the MAC Address of the next hop is unknown to a particular node, and it does not learn it after sending an ARP request?"
        
tags:
  - link
  - layer
 
---

