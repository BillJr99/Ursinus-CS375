---
layout: assignment
permalink: /Assignments/TCPOverUDP
title: "CS475: Computer Networks - TCP over UDP"
excerpt: "CS475: Computer Networks - TCP over UDP"

info:
  coursenum: CS475
  points: 100
  goals:
    - To enumerate and implement the major components of the TCP protocol
  rubric:
    - weight: 60
      description: Algorithm Implementation
      preemerging: The algorithm fails on the test inputs due to major issues, or the program fails to compile and/or run
      beginning: The algorithm fails on the test inputs due to one or more minor issues
      progressing: The algorithm is implemented to solve the problem correctly according to given test inputs, but would fail if executed in a general case due to a minor issue or omission in the algorithm design or implementation
      proficient: A reasonable algorithm is implemented to solve the problem which correctly solves the problem according to the given test inputs, and would be reasonably expected to solve the problem in the general case
    - weight: 30
      description: Code Quality and Documentation
      preemerging: Code commenting and structure are absent, or code structure departs significantly from best practice, and/or the code departs significantly from the style guide
      beginning: Code commenting and structure is limited in ways that reduce the readability of the program, and/or there are minor departures from the style guide
      progressing: Code documentation is present that re-states the explicit code definitions, and/or code is written that mostly adheres to the style guide
      proficient: Code is documented at non-trivial points in a manner that enhances the readability of the program, and code is written according to the style guide
    - weight: 10
      description: Writeup and Submission
      preemerging: An incomplete submission is provided
      beginning: The program is submitted, but not according to the directions in one or more ways (for example, because it is lacking a readme writeup)
      progressing: The program is submitted according to the directions with a minor omission or correction needed, and with at least superficial responses to the bolded questions throughout
      proficient: The program is submitted according to the directions, including a readme writeup describing the solution, and thoughtful answers to the bolded questions throughout
      
tags:
  - tcp
  - udp
  
---

In this assignment, you will implement (a subset of) TCP on top of UDP, in your choice of language.

This project is to be done in groups of up to 3. However, each team must swap programs black-box with another team, and write a simple client that makes a TCP connection over UDP and replies. To save time, this can be as simple as an echo program, but something sufficient to demonstrate that your protocol is working.

As you know, TCP includes many features to support reliable transmission, flow control and congestion control. In congestion control, you can use TCP well known procedures like slow start, fast retransmission and additive increase/multiplicative decrease. The 3–way handshake for TCP connection setup is required but special cases need not be supported. To protect packets against bit level errors, use a checksum mechanism similar to TCP. You need to take a look at TCP RFC (RFC 793) for details.

The TCP like mechanism chosen for reliable transmission in this project is cumulative acknowledgment of the last in-order delivered byte for every packet received. Pay attention that the delayed acknowledgement method is not required so you will acknowledge every packet arrived at the receiver. The sequence numbers are measured in bytes like TCP with an initial random sequence number (Note that your protocol will totally work on bytes rather than messages).

When a packet ACK times out, window size is set to 2 packets. For RTO calculation you will use the options field of TCP to send a timestamp. Note that you should also add padding to the header to align it to 32 bits and also cover the options in checksum. You should update your RTT calculation and RTO for every packet acked.

You will implement an API for applications to be able to use it for sending and receiving data. The API your protocol supports should be as follows but another private fields and private methods can be added to it:

```cpp
class Socket {
    private:
        // some needed fields and methods

    public:
        // this method creates a connection to server and creates 
        // a thread to buffer and acknowledge arrived packets
        // read size bytes from SOCKET BUFFER and save it to
        Socket (char* serverHost, int serverPort); 

        // readBuffer and returns the number of bytes in the 
        // readBuffer
        int read (char* readBuffer, int size);

        // if write buffer was greater than MSS then divide 
        // writeBuffer to packet with MSS size and then send 
        // there
        bool write (char* writeBuffer, int size);

        // closes the socket and makes the resources free.
        bool close ();
}

class ServerSocket {
    private:
        // the list of connected sockets to this server
        vector<Socket> connectedSockets;

        // some needed fields and methods

    public:
        // this method creates a thread to accept connection from 
        // client socket
        ServerSocket (int port);

        // this method remove a socket object from first of 
        // connected sockets or wait to a connection established.
        Socket accept ();

        // closes the socket and makes the resources free.
        void close ();
}
```