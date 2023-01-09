---
layout: assignment
permalink: /Assignments/TFTP
title: "CS475: Computer Networks - TFTP Protocol"
excerpt: "CS475: Computer Networks - TFTP Protocol"

info:
  coursenum: CS475
  points: 100
  goals:
    - To implement a protocol according to its RFC
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
  - tftp
  
---

## A tftp Server
You should construct a file transfer server that is using the TFTP protocol ([RFC 1350](https://tools.ietf.org/html/rfc1350)). Part one of this assignment involves constructing the server, while part two involves constructing the client.

Your programs should adhere to the published specifications so that they can inter-operate with existing clients and servers.  The protocol follows this state machine \[[^1]\]:

![TFTP State Machine](https://raw.githubusercontent.com/staskobzar/tftp-ragel/master/doc/tftp_fsm.png)

You could test your server with the tftp client available under most Unix (and Unix-like) operating systems (e.g. Solaris, Linux, OpenBSD, etc.). [Here](https://linuxhint.com/install_tftp_server_ubuntu/) is an article describing how to install and configure tftp on Ubuntu.  However, if you do, note that some extensions to tftp are implemented by modern clients, rendering this spec non-backwards compatible. You'll need to implement slightly different message formats to do so (look at the tftp OACK extensions).  You might, instead, copy your server implementation and write a small client for testing instead, which is also acceptable.

Your server should handle multiple clients at the same time.  You can accomplish this by putting your server code into a threaded routine, and starting the thread with the connection socket as soon as a connection is made by the primary server socket in `main()`.  

### The Protocol State Machine

Before you begin writing code, read the TFTP protocol RFC and sketch a state machine that indicates:

1. What action should be taken when each message is received
2. What response should be sent when each message is received
3. What message should be expected next

For example, upon receiving an `RRQ`, you should read the filename from the message and, if it exists, respond with a `DATA` packet containing the first 512 bytes of the file.  If the file does not exist (or you can't read it), you should respond with an `ERROR` packet and quit.

### Implementing the State Machine

This state machine can be implemented using a `do` loop and an `if` statement that checks the opcode of each message.  Depending on the opcode received, you'll know how to read the rest of the message, what to do, how to respond, and what to expect next.  Initially, you should expect to receive an `RRQ` or a `WRQ` message to kick things off - similarly, this is what you would send first (and you'll know what to expect in reply right away thanks to the state machine you've just made!).  

### Bit Packing with Java

You can use the [`DataInputStream`](https://docs.oracle.com/en/java/javase/11/docs/api/java.base/java/io/DataInputStream.html) and [`DataOutputStream'](https://docs.oracle.com/javase/7/docs/api/java/io/DataOutputStream.html) to send individual bytes, `short` integers, integers, etc., as part of your message format.  For example, to read a `String`, you can call `readChar()` in a loop until the character returned is equal to the null terminator `\0`.  You can append each character to a [`StringBuilder`](https://docs.oracle.com/javase/7/docs/api/java/lang/StringBuilder.html), and call its `toString()` method to obtain the resulting `String`.

#### Network (Big-Endian) Byte Order

When you write a `byte[]` array, you will want to be careful to put the array into network order before sending it with the `DataOutputStream.write(byte[], 0, n)` method.  Similarly, you'll want to re-order the bytes when you receive them from network byte order into your local computer architecture byte ordering.  Java facilitates this byte swapping with the [`java.nio.ByteBuffer`](https://docs.oracle.com/en/java/javase/13/docs/api/java.base/java/nio/ByteBuffer.html) library, which you can use for this purpose.  For example:

```java
import java.nio.ByteBuffer;

// this operation is known as ntohl in C
int networkOrderToInt(byte[] data) {
    ByteBuffer buf = ByteBuffer.wrap(data);
    return buf.getInt(); // can be getShort, getLong, ...
}

// this operation is known as htonl in C
byte[] intToNetworkOrder(int data) {
    ByteBufer buf = ByteBuffer.allocate(4); // sizeof(int) is 4
    buf.putInt(data);
    return buf.array();
}
```

### Notes
The tftp service is using port 69 which requires superuser (administrator) access rights. Since you want to be able to run your server on machines where you may not have superuser privileges, you should include the option to run the server from another (non-privileged) port.

[^1]: Image created by [staskobzar](https://github.com/staskobzar) under the [GPLv3 license](http://www.gnu.org/licenses/gpl-3.0.en.html).