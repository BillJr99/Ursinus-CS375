---
layout: assignment
permalink: /Assignments/Traceroute
title: "CS475: Computer Networks - Traceroute"
excerpt: "CS475: Computer Networks - Traceroute"

info:
  coursenum: CS475
  points: 100
  goals:
    - To implement a socket-based client
    - To construct a message given a protocol specification format
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
  readings:
    - rtitle: "The ICMP Protocol RFC 792"
      rlink: "https://tools.ietf.org/html/rfc792"
    - rtitle: "The ICMP Protocol"
      rlink: "https://en.wikipedia.org/wiki/Internet_Control_Message_Protocol"
    - rtitle: "Ping"
      rlink: "https://en.wikipedia.org/wiki/Ping_(networking_utility)"
      
tags:
  - traceroute

---

In this assignment, you will write an ICMP Ping program, and modify it to support the functionality of traceroute.

## Part 1: The Ping Protocol

Investigate the [ICMP RFC](https://tools.ietf.org/html/rfc792) to discover the message format for a ping echo and echo reply message.  ICMP messages use a checksum, so you will first construct the ping packet, compute its checksum, and then insert the checksum into the message data structure.  Construct a sample ping message, and send a raw socket IP packet to the server of your choice.  Await a reply, extract the message parameters from the packet into the same structure, and print them to the screen.

## Part 2: Traceroute

Encapsulate your ping functionality from part 1 into a function, and call that function in a loop.  Increment your sequence number and time-to-live (TTL) value on each packet sent.  When you receive a response, compute and verify its checksum, extract and verify its sequence number (which should match your most recently sent checksum), and print its contents to the screen.  Continue this loop while the ICMP code received is the `TTL Expired` message (ICMP code 11).  Print the time elapsed between the time you sent this packet and the time you received this response, and the source IP address that sent you the reply.  When you receive an `ICMP Echo Reply` message (ICMP code 0), do the same, but stop the loop.  If you do not receive a reply for a particular TTL hop after some timeout that you may choose, print asterisks to the screen to indicate that no reply was received, and continue.

### Socket Timeout

You can set a socket timeout in case a node doesn't send you back an ICMP packet.  When you set up your socket variable, if you call:

```python
sock.settimeout(5)
```

This will set a timeout of 5 seconds.  When you call:

```python
try:
    packet, src = sock.recfrom(1024)
    # your code here to process the packet...
except socket.timeout:
    print("Timeout waiting for ICMP response")
```

You can catch an exception if the socket times out on receive, so that you don't end up stuck in an infinite loop.  You can modify your `while` loop so that you also quit the loop if the `ttl` reaches a certain value, like `16`, indicating that you are in such an infinite loop.

### Message Packing and Unpacking Using Python

In Python, you can use the [`struct` package](https://docs.python.org/3/library/struct.html#format-characters) to bit-pack your messages for transmission according to a given protocol format.  For example, an ICMP packet consists of the following fields, where the multi-byte fields are in network (big-endian) byte order:

* 1 byte for the ICMP message type
* 1 byte for the ICMP code
* 1 unsigned short (2 bytes) for the checksum
* 1 unsigned short (2 bytes) for the packet ID
* 1 signed short (2 bytes) for the sequence number

We can represent this in Python easily using the `struct` package as follows:

```python
import struct

format = '!BBHHh' # byte, byte, short (2 bytes), short, short, in ! network byte big-endian order
message = struct.pack(format, 0, 0, 0, 0, 0) # replace the 0's with each value specified in the format string
```

Similarly, `struct.unpack` takes a format string and a byte array, and returns a collection of variables, one for each field:

```python
import struct

type, code, checksum, id, seq = struct.unpack(format, message) # see message and format above
```

### Other Hints

Don't forget to re-initialize your variables each time through the loop (for example, your `checksum` should start out as `0`, and your initial `icmptype` is `8`)!  You should set the TTL each time through the loop (incrementing by `1` each time).