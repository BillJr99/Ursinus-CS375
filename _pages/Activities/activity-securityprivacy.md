---
layout: activity
permalink: /Activities/SecurityPrivacy
title: "CS475: Computer Networks - Security and Privacy"
excerpt: "CS475: Computer Networks - Security and Privacy"

info:
  goals: 
    - To explain the need for security and privacy protocols since these were not built into the Internet originally
    - To describe the functionality of protocols used to implement authentication, authorization, non-repudiation
    - To explain the role of cryptography in security and privacy, as well as its underlying algorithms
    - To explain and execute the process for public-key cryptography
    - To explain how public key cryptography is used to generate a digital signature that enforces non-repudiation
    
  additional_reading:
    - link: "http://www-net.cs.umass.edu/kurose_ross/ppt-8e/Chapter_8_v8.0.pptx"
      title: Kurose Notes
    - link: "https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Authorization"
      title: "HTTP Authorization Headers"

  models:
    - model: |    
        <img src="../images/activity-securityprivacy/csunplugged-public-map.png" alt="Public Key Map from CSUnplugged, shared under a Creative Commons BY-NC-SA 4.0 License">
      title: Public-Key Cryptography
      questions:
        - Choose a secret numeric value that you want to send securely to a partner.
        - Fill in the nodes of the public map with integers that add up to the secret value you chose.
        - For each node, replace the value with the sum of itself plus the original value found in the adjacent neighbors.
        - Send this graph to your partner.  Can your partner figure out the value without any help (probably not!)?
        - Your partner (and only your partner) should look at the Private Map (see below), which highlights the nodes that should be added together to obtain the value.
        - How did this work?  If every student used a unique "map," how could you use this approach to send data securely to anyone?
    - model: |    
        <img src="../images/activity-securityprivacy/csunplugged-public-map2.png" alt="Public Key Map from CSUnplugged, shared under a Creative Commons BY-NC-SA 4.0 License">
      title: Digital Signatures
      questions:
        - If I encrypt something using someone's private map, who can decode it?
        - If I encrypt something using my own public map, who can decode it?
        - How could you use these maps to ensure that a particular person actually sent a particular value?
        - How can I use this approach to ensure that the data that I sent was not altered along the way?
    - model: |
        <div align="left">
        <pre>
        <code>
        const express = require('express')
        const https = require('https')
        
        const app = express();
        
        // Usual routes
        app.get('/test', (req, res) => {
            res.send("Hello World!");
        });
        
        const sslOptions = {
            key: fs.readFileSync('./private_key.pem'),
            cert: fs.readFileSync('./certificate_chain.pem'),
            ca: [
                fs.readFileSync('./cert_authority.cer') //,      
                // ...
            ],
            ciphers: [
                "ECDHE-RSA-AES128-SHA256",
                "DHE-RSA-AES128-SHA256",
                "AES128-GCM-SHA256",
                "RC4",
                "HIGH",
                "!MD5",
                "!aNULL"
                ].join(':'),            
        };
        
        const httpsServer = https.createServer(sslOptions, app);
        httpsServer.listen(8443, () => {
            console.log("HTTPS Running");
        });
        
        // I suggest omitting this, otherwise you have a route that can be invoked in clear text!
        const httpServer = http.createServer(app);
        httpServer.listen(8080, () => {
            console.log("HTTP Running");
        });
        </code>
        </pre>
        </div>
      title: SSL Certificates
      embed: <iframe height="400px" width="100%" src="https://repl.it/@BillJr99/RESTfulServiceExample?lite=true" scrolling="no" frameborder="no" allowtransparency="true" allowfullscreen="true" sandbox="allow-forms allow-pointer-lock allow-popups allow-same-origin allow-scripts allow-modals"></iframe>       
      questions:
        - What is an SSL Certificate Chain?
        - What is a Certificate Authority?
        - "Using this command, generate and use your own SSL certificate: <code>openssl genrsa -out private_key.pem && openssl req -new -key private_key.pem -out csr.pem && openssl x509 -req -days 9999 -in csr.pem -signkey private_key.pem -out certificate_chain.pem</code>.  Add these to a node.js program and invoke an endpoint over https."
        - Did you get a warning from your browser and, if so, why?
    - model: |
        <a title="I, Giaros / CC BY-SA (http://creativecommons.org/licenses/by-sa/3.0/)" href="https://commons.wikimedia.org/wiki/File:PublicKeyCertificateDiagram_It.svg"><img width="512" alt="PublicKeyCertificateDiagram It" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/PublicKeyCertificateDiagram_It.svg/512px-PublicKeyCertificateDiagram_It.svg.png"></a>
      title: Signing of a Public Key by a Certificate Authority
      questions:
        - Although you can self-sign a certificate, why might it be more authoritative to have a trusted third party validate your identity and sign your key to form a certificate?
    - model: |
        <a href="https://tldp.org/HOWTO/SSL-Certificates-HOWTO/x64.html">Read this Article on SSL Certificates</a>
      questions:
        - Is the public/private key from the SSL certificate actually used to encrypt data between the client and server?  Why or why not?  If not, what is used instead?
      title: SSL Handshake and Encryption
    - model: |
        <a title="Fleshgrinder, Public domain, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Full_TLS_1.2_Handshake.svg"><img width="256" alt="Full TLS 1.2 Handshake" src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Full_TLS_1.2_Handshake.svg/256px-Full_TLS_1.2_Handshake.svg.png"></a>
      title: "Transport Layer Security (TLS)"
      questions: 
        - "How do the two peers agree upon the cipher algorithm to use?"
        - "How do the two peers exchange their keys?  How can they exchange keys securely?"
        - "How might we prevent someone from re-ordering our encrypted packets, or from observing encrypted traffic and &quot;replaying&quot; it by resubmitting the traffic on our behalf?"
    - model: |
        <a title="Mpk1024, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Ipsec-ah.svg"><img width="512" alt="Ipsec-ah" src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a8/Ipsec-ah.svg/512px-Ipsec-ah.svg.png"></a>
        <br>
        <a title="Mpk1024, CC BY-SA 4.0 &lt;https://creativecommons.org/licenses/by-sa/4.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Ipsec-esp-tunnel-and-transport.svg"><img width="512" alt="Ipsec-esp-tunnel-and-transport" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Ipsec-esp-tunnel-and-transport.svg/512px-Ipsec-esp-tunnel-and-transport.svg.png"></a>
        <br>
        <a title="Ford prefect, CC BY 3.0 &lt;https://creativecommons.org/licenses/by/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Ipsec-modes.svg"><img width="512" alt="Ipsec-modes" src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Ipsec-modes.svg/512px-Ipsec-modes.svg.png"></a>
      title: "IPSec for Virtual Private Networks (VPN)"
      questions: 
        - "What is the difference between using IPSec in Transport mode as opposed to Tunnel mode?"
        - "Why might a tunnel be used in conjunction with an encrypted connection to provide Virtual Private Networking?  Note that this is sometimes implemented with the Layer 2 Transport Protocol (L2TP) over IPSec"
    - model: |
        <a title="Jan Engelhardt, CC BY-SA 3.0 &lt;https://creativecommons.org/licenses/by-sa/3.0&gt;, via Wikimedia Commons" href="https://commons.wikimedia.org/wiki/File:Netfilter-packet-flow.svg"><img width="512" alt="Netfilter-packet-flow" src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Netfilter-packet-flow.svg/512px-Netfilter-packet-flow.svg.png"></a>
      title: "Firewalls"
      questions: 
        - "What are some sensible rules to block traffic, except that traffic originated by you, or incoming traffic to certain applications?"
        - "What would you do if you wanted to allow an exception to these rules for a particular connection?"
        
tags:
  - security
  - privacy
  - cryptography
  - signatures
---

The CS Unplugged Materials are shared by [CSUnplugged](https://classic.csunplugged.org/public-key-encryption/) under a [Creative Commons BY-NC-SA 4.0 License](http://creativecommons.org/licenses/by-nc-sa/4.0/).

The Private Map for this activity can be found [here](../images/activity-securityprivacy/csunplugged-private-map.png) and [here](../images/activity-securityprivacy/csunplugged-private-map2.png)