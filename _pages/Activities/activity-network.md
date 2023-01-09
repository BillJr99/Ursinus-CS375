---
layout: activity
permalink: /Activities/NetworkLayer
title: "CS475: Computer Networks - The Network Layer"
excerpt: "CS475: Computer Networks - The Network Layer"

info:
  goals: 
    - To describe the roles and responsibilities of the Network Layer
    - To explain network layer protocols including NAT, DNS, DHCP, ICMP/Ping
    - To differentiate between addressing models IPv4 and IPv6, and how to tunnel between them
    - To explain the need for multiplexing on IPv4 networks with private subnets, and the role of NAT and port forwarding
    - To define subnets of arbitrary size using CIDR subnetting and class A/B/C subnets
    - To differentiate between a switch and a router
    - To explain the functionality of a VPN over existing network infrastructure
        
  additional_reading:
    - link: "http://www-net.cs.umass.edu/kurose_ross/ppt-8e/Chapter_4_v8.0.pptx"
      title: Kurose Notes
      
  models:
    - model: |
        <a title="Michel Bakni, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:IPv4_Packet_-en.svg"><img width="512" alt="IPv4 Packet -en" src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/IPv4_Packet_-en.svg/512px-IPv4_Packet_-en.svg.png"></a>
      title: "The IP Packet Header"
      questions: 
        - "What types of protocols can we denote in an IP Packet?"
        - "What is the purpose of the Version field?"
        - "What is the purpose of the TTL field?"
        - "What addresses are placed in the source and destination fields?  How might this differ from the MAC addresses used in the Link Layer header?"
        - "What, if any, information helps the IP protocol to provide throughput control, error correction, or packet ordering?  What, in your own words, is &quot;Best Effort&quot; quality-of-service?"
    - model: |
        <a href="https://commons.wikimedia.org/wiki/File:Ipv4_address.svg#/media/File:Ipv4_address.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/74/Ipv4_address.svg/1200px-Ipv4_address.svg.png" alt="Ipv4 address.svg"></a><br>By <a href="https://en.wikipedia.org/wiki/en:User:Indeterminate" class="extiw" title="w:en:User:Indeterminate">Indeterminate</a> - <span class="int-own-work" lang="en">Own work</span>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=2868206">Link</a>
      title: "IP Addressing"
      questions: 
        - "How large is an IPv4 Address?  What is the largest and smallest value that can be represented by each octet?"
        - "How many IPv4 addresses can be allocated on the Internet?"
    - model: |
        <a href="https://commons.wikimedia.org/wiki/File:PDU_Fragmentaion_-_en.png#/media/File:PDU_Fragmentaion_-_en.png"><img src="https://upload.wikimedia.org/wikipedia/commons/8/80/PDU_Fragmentaion_-_en.png" alt="PDU Fragmentaion - en.png"></a><br>By <a href="https://www.wikidata.org/wiki/Q81411358" class="extiw" title="d:Q81411358"><span title="Syrian Wikimedian">Michel Bakni</span></a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=70267999">Link</a>
      title: "IP Fragmentation"
      questions: 
        - "IP fragments are sized in 8-byte blocks.  Which fields of an IP packet are modified to indicate that this packet is a fragment, and what part of the overall packet it represents?"  
        - "Another layer of the network stack can perform fragmentation in order to regulate transmission rate.  However, no information is retained at this layer about network throughput and performance.  Therefore, what do you think is the purpose of fragmentation at this layer?"
    - model: |
        <p><a href="https://commons.wikimedia.org/wiki/File:Domain_name_space.svg#/media/File:Domain_name_space.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Domain_name_space.svg/1200px-Domain_name_space.svg.png" alt="Domain name space.svg"></a><br>Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=387678">Link</a></p>
        <p><a href="https://commons.wikimedia.org/wiki/File:Example_of_an_iterative_DNS_resolver.svg#/media/File:Example_of_an_iterative_DNS_resolver.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Example_of_an_iterative_DNS_resolver.svg/1200px-Example_of_an_iterative_DNS_resolver.svg.png" alt="Example of an iterative DNS resolver.svg"></a><br>By Lion Kimbro - <span class="int-own-work" lang="en">Own work</span>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=386517">Link</a></p>
        <p><a href="https://commons.wikimedia.org/wiki/File:DNS_in_the_real_world.svg#/media/File:DNS_in_the_real_world.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/09/DNS_in_the_real_world.svg/1200px-DNS_in_the_real_world.svg.png" alt="DNS in the real world.svg"></a><br>By Lion Kimbro - <span class="int-own-work" lang="en">Own work</span>, Public Domain, <a href="https://commons.wikimedia.org/w/index.php?curid=386501">Link</a></p>
      title: "Address Lookups with DNS"
      questions: 
        - "How many DNS servers are there?  How is the DNS &quot;database&quot; stored on the Internet?"
        - "If DNS is distributed, how does one locate the appropriate DNS server corresponding to the network being sought?"
        - "What is the difference between a recursive DNS lookup and an iterative one?"
    - model: |
        <a href="https://commons.wikimedia.org/wiki/File:Subnetting_Concept.svg#/media/File:Subnetting_Concept.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/b3/Subnetting_Concept.svg/1200px-Subnetting_Concept.svg.png" alt="Subnetting Concept.svg"></a><br>By <a href="https://www.wikidata.org/wiki/Q81411358" class="extiw" title="d:Q81411358"><span title="Syrian Wikimedian">Michel Bakni</span></a> - <span class="int-own-work" lang="en">Own work</span>, <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=71691822">Link</a>
      title: "Subnetting"
      questions: 
        - "What is the relationship between the number of node addresses and the subnet number following the network address?"
        - "Write out one of the IP addresses in binary.  Given the number of node addresses available in each subnet, which bits in the address represent the network address, and which represent the node address?"
    - model: |
        <a title="Gelmo96, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:DHCP_session.svg"><img width="256" alt="DHCP session" src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e4/DHCP_session.svg/256px-DHCP_session.svg.png"></a>
      title: "Network Configuration with DHCP"
      questions: 
        - "What information do you expect to be included in a DHCP packet?"  
    - model: |
        <div>
        <p><a href="https://commons.wikimedia.org/wiki/File:NAT_Concept-en.svg#/media/File:NAT_Concept-en.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c7/NAT_Concept-en.svg/1200px-NAT_Concept-en.svg.png" alt="NAT Concept-en.svg"></a><br>By <a href="https://www.wikidata.org/wiki/Q81411358" class="extiw" title="d:Q81411358"><span title="Syrian Wikimedian">Michel Bakni</span></a> - This file was derived from:<a href="//commons.wikimedia.org/wiki/File:Server_symbol-blue.svg" title="File:Server symbol-blue.svg">Server symbol-blue.svg</a><a href="//commons.wikimedia.org/wiki/File:Network_cloud_symbol.svg" title="File:Network cloud symbol.svg">Network cloud symbol.svg</a><a href="//commons.wikimedia.org/wiki/File:Workstation_symbol-Blue.svg" title="File:Workstation symbol-Blue.svg">Workstation symbol-Blue.svg</a><a href="//commons.wikimedia.org/wiki/File:Router_symbol-Blue.svg" title="File:Router symbol-Blue.svg">Router symbol-Blue.svg</a>Wendell Odom (<span style="white-space:nowrap">2013</span>) (in English) Cisco CCENT/CCNA ICND1 100-101 Official Cert Guide (Academic ed.), Pearson Education, Inc., p.&amp;nbsp;582 <a href="https://en.wikipedia.org/wiki/International_Standard_Book_Number" class="extiw" title="en:International Standard Book Number">ISBN</a>: <a href="//commons.wikimedia.org/wiki/Special:BookSources/1587144859" title="Special:BookSources/1587144859">1587144859</a>., <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=86017447">Link</a></p>
        <a title="Yangliy at English Wikibooks, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Network_Address_Translation_(file2).jpg"><img width="512" alt="Network Address Translation (file2)" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/63/Network_Address_Translation_%28file2%29.jpg/512px-Network_Address_Translation_%28file2%29.jpg"></a>
        </div>
      title: "Port Forwarding and Network Address Translation (NAT)"
      questions: 
        - "What is the relationship between a host's IP address and the externally-facing IP address to the network?"
        - "How does one address a packet to a host with a private IP address behind a NAT network?"
        - "When a packet arrives at the local network's router, what additional information is needed to identify which private node should receive the packet?"
        - "What are some of the compromises made by NAT?  What are the benefits?"
        - "What would render NAT unnecessary?"
    - model: |
        <a href="https://commons.wikimedia.org/wiki/File:ICMP_header_-_General-en.svg#/media/File:ICMP_header_-_General-en.svg"><img src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e1/ICMP_header_-_General-en.svg/1200px-ICMP_header_-_General-en.svg.png" alt="ICMP header - General-en.svg"></a><br>By <a href="https://www.wikidata.org/wiki/Q81411358" class="extiw" title="d:Q81411358"><span title="Syrian Wikimedian">Michel Bakni</span></a> - (<span style="white-space:nowrap">2012</span>) <a rel="nofollow" class="external text" href="https://web.archive.org/web/20171120064332/http://www.r-5.org/files/books/computers/internals/net/Richard_Stevens-TCP-IP_Illustrated-EN.pdf">TCP/IP Illustrated Volume 1</a> (Second ed.), Pearson Education, Inc., p.&amp;nbsp;355 <a href="https://en.wikipedia.org/wiki/International_Standard_Book_Number" class="extiw" title="en:International Standard Book Number">ISBN</a>: <a href="//commons.wikimedia.org/wiki/Special:BookSources/0321336313" title="Special:BookSources/0321336313">0321336313</a>., <a href="https://creativecommons.org/licenses/by-sa/4.0" title="Creative Commons Attribution-Share Alike 4.0">CC BY-SA 4.0</a>, <a href="https://commons.wikimedia.org/w/index.php?curid=89010113">Link</a>
      title: "The Internet Control Message Protocol (ICMP)"
      questions: 
        - "What type and code are used for an ICMP Ping echo request and reply?"
        - "What type and code are used for an ICMP TTL Expired message?"
        - "What other control messages are supported by ICMP?"
        - "Why can't we rely on ICMP messages to regulate transmissions on the Internet?"
    - model: |
        <div>
        <a title="Michel Bakni, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:IPv6_address_terminology-en.svg"><img width="512" alt="IPv6 address terminology-en" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/IPv6_address_terminology-en.svg/512px-IPv6_address_terminology-en.svg.png"></a>
        <br>
        <a title="Mro, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Ipv6_header.svg"><img width="512" alt="Ipv6 header" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ab/Ipv6_header.svg/512px-Ipv6_header.svg.png"></a>
        <br>
        <a title="Michel Bakni, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:IPv6_IPv4-Mapped_address_structure-en.svg"><img width="512" alt="IPv6 IPv4-Mapped address structure-en" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/IPv6_IPv4-Mapped_address_structure-en.svg/512px-IPv6_IPv4-Mapped_address_structure-en.svg.png"></a>
        </div>
      title: "IPv6"
      questions: 
        - "How big is an IPv6 address?  How many such addresses are there?"
        - "What is the purpose of the Flow label?"   
        - "How is an IPv4 address represented by an IPv6 address?"
    - model: |
        <div>
        <a title="Mouchoir le Souris at the English Wikipedia, CC BY-SA 3.0 &lt;http://creativecommons.org/licenses/by-sa/3.0/&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:IPTunnelDiagram_01-12-07.jpg"><img width="512" alt="IPTunnelDiagram 01-12-07" src="https://upload.wikimedia.org/wikipedia/commons/2/2d/IPTunnelDiagram_01-12-07.jpg"></a>
        <br>
        <a title="Michel Bakni, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:IPSec_VPN-en.svg"><img width="512" alt="IPSec VPN-en" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/19/IPSec_VPN-en.svg/512px-IPSec_VPN-en.svg.png"></a>
        </div>
      title: "Virtual Private Networking (VPN) and Tunneling"
      questions: 
        - "From the perspective of the network, what is a tunnel?"
        - "How might a tunnel be used to send IPv6 traffic over a network that involves transiting IPv4 nodes and networks?"
        - "How might a tunnel be used to connect a computer to a local corporate network (i.e., a VPN)?"
        
tags:
  - network
  - layer
 
---

