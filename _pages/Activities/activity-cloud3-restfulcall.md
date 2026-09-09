---
layout: activity
permalink: /Activities/Cloud3
title: "CS375: Software Engineering - RESTful Calls"


info:
  next: ./Cloud4
  prev: ./Cloud2
  
  goals: 
    - To explore Representational State Transfer (REST) as applied to HTTP web calls
    - To articulate the basic RESTful operations and map those to HTTP standard verbs
    - To identify arrays of objects, and elements within objects, of JSON structures
    - To observe a RESTful HTTP exchange on the wire with Wireshark and identify the protocol layers that carry it
  models:
    - model: |
        <a href="https://twitter.com/NSF/status/1299367852374450185">https://twitter.com/NSF/status/1299367852374450185</a>
      title: RESTful Resources
      questions:
        - What part of the URL represents the tweet ID?
        - How do we know which user made that tweet?
        - What CRUD verb do you think is executed on this URL (Create, Read, Update, Delete)?
        - What HTTP verb do you think is executed (POST, PUT, DELETE)?
        - What is the noun in this transaction?
        - What changes in the URL if we want to get a different tweet from the same user?
    - model: | 
        <img src="../images/restfulexchange.png" alt="A RESTful Exchange Diagram">
      title: RESTful Exchanges
      questions:
        - Modify the program to print out the length of daylight (between sunrise and sunset) in hours, minutes, and seconds.  Note that the sunrise and sunset times are given in Unix epoch time, which is the number of seconds that have elapsed since January 1, 1970.
        
  additional_reading:
    - link: https://www.wireshark.org/docs/wsug_html_chunked/
      title: "Wireshark User's Guide"

tags:
  - rest
  
---


## Example: Weather Client Example

<iframe height="500px" width="100%" src="https://www.billmongan.com/Ursinus-CS375-Spring2025/assets/code-viewer.html?zip=https%3A%2F%2Fraw.githubusercontent.com%2FBillJr99%2FUrsinus-CS375%2Fgh-pages%2Ffiles%2Freplit%2FWeatherClientExample.zip&title=Weather%20Client%20Example" scrolling="yes" frameborder="no" allowfullscreen="true" sandbox="allow-scripts allow-same-origin"></iframe>

## Seeing a RESTful Call on the Wire with Wireshark

So far, an HTTP request has been a line of code that returns some JSON, as if by magic.  In this section you will *watch the magic happen*: capture the actual network packets of an HTTP request with [Wireshark](https://www.wireshark.org/) (a free, industry-standard packet analyzer) and read the request and response byte-for-byte.  Seeing the layers with your own eyes turns "the network" from a black box into something you can debug -- an essential skill the first time your web service "doesn't work" and you need to know whether the request ever left your machine.

### Step 1: Capture

1. Install Wireshark from [wireshark.org](https://www.wireshark.org/download.html) (accept the defaults, including the packet-capture driver).
2. Open Wireshark and double-click your active network interface (the one whose activity sparkline is moving -- usually `Wi-Fi` or `en0`/`eth0`).  Packets immediately begin scrolling by: your computer is chattier than you think!
3. In the green **display filter** bar at the top, type `http` and press Enter.  The scroll quiets down: you are now seeing only plain-HTTP packets.
4. Generate a request you control.  In a terminal, run:

```
curl http://httpbin.org/get
```

(We deliberately use `http://`, not `https://`, so the traffic is readable -- see the note on HTTPS below.)

5. Click the red square to stop the capture.

### Step 2: Read the Layers

Click on the packet whose Info column says `GET /get HTTP/1.1`.  The middle pane shows the same packet dissected layer by layer -- this is the protocol stack from your networking lectures, live:

| Layer (click to expand) | What you should see | What it is for |
|---|---|---|
| **Frame** | Total size in bytes, arrival timestamp | Wireshark's record of the raw capture |
| **Ethernet II** | Two 6-byte MAC addresses (source and destination) | Delivery to the *next hop* on the local network (your router) |
| **Internet Protocol (IP)** | Your machine's IP address, and the server's | End-to-end delivery across the Internet |
| **Transmission Control Protocol (TCP)** | Source port (a random high number) and destination port **80**; sequence and acknowledgment numbers | Reliable, ordered byte stream between the two programs; port 80 is how the server knows this stream is for the web server process |
| **Hypertext Transfer Protocol (HTTP)** | `GET /get HTTP/1.1`, `Host: httpbin.org`, `User-Agent: curl/...` | The request itself -- notice it is human-readable text! |

Notice the nesting: the HTTP text rides inside a TCP segment, which rides inside an IP packet, which rides inside an Ethernet frame -- envelopes within envelopes, each layer addressed to a different audience (your router, the destination host, the server process, the web application).

### Step 3: Follow the Conversation

Right-click the `GET` packet and choose **Follow, then HTTP Stream** (or TCP Stream).  Wireshark reassembles the entire conversation into one readable transcript: your request in one color, and the server's response -- `HTTP/1.1 200 OK`, `Content-Type: application/json`, and then the JSON body itself -- in another.  This is exactly the text your RESTful client library parses for you.

While you are there, scroll up in the packet list just before your `GET`: you should spot three TCP packets labeled `[SYN]`, `[SYN, ACK]`, `[ACK]` -- the three-way handshake that opened the connection -- and, just before those, possibly a DNS query resolving `httpbin.org` to an IP address.

### Questions

1. In your capture, what are the source and destination port numbers of the request packet?  Which one identifies "the web server," and what is the other one for?
2. In the HTTP stream transcript, identify the request line, one request header, the response status line, and the `Content-Type` header.  What CRUD operation and RESTful noun does the request line express?
3. Run the Weather Client example above while capturing.  Can you find its request?  What is the resource path, and what query parameters does it carry?
4. Now capture `curl https://httpbin.org/get` (HTTPS this time) and filter on `tcp.port == 443`.  You can still see the IP addresses, ports, and a `TLS Client Hello` -- but the HTTP request and JSON are gone, replaced by `Application Data` gibberish.  What does this tell you about (a) what an eavesdropper on public Wi-Fi can and cannot learn about your users, and (b) why production RESTful services always use HTTPS even though it makes debugging with Wireshark harder?  (Tip: for debugging *your own* HTTPS service, developers use the browser's Network tab or a proxy like `mitmproxy`, which can decrypt traffic they are authorized to see.)
