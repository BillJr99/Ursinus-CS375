---
layout: assignment
permalink: /Assignments/HTTPClient
title: "CS475: Computer Networks - HTTP Client"
excerpt: "CS475: Computer Networks - HTTP Client"

info:
  coursenum: CS475
  points: 100
  goals:
    - To implement a socket-based client
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
  - http

---

In this assignment, you will write an HTTP client.

## HTTP Client
Using network sockets, write a program that accepts a command-line argument representing the web server to connect to. You can send an HTTP request to a given server over port 80 (you may use another command line argument for the port, if custom ports are desired).  You should send the following over your socket:

```
GET /index.html HTTP/1.1\r\n
Host: www.google.com\r\n
\r\n
```

The following python program will get you started:

```python
import socket

def connect(host, port, url):
    conn = socket.socket(socket.AF_INET, socket.SOCK_STREAM) # SOCK_STREAM is a TCP connection over AF_INET, which is IP: TCP/IP
    conn.connect((host, port))
    connstr = "GET " + url + " HTTP/1.1\r\n"
    conn.send(connstr.encode())
    hoststr = "Host: " + host + "\r\n"
    conn.send(hoststr.encode())
    conn.send("\r\n".encode()) # blank line
    
    return conn # so we can read the response later
```

Then, read the entire result and display it on the screen.  To do this, you can read the result from the `conn` object as follows:

```python
def read_response(conn):
    data = ""
    while True:
        chunk = conn.recv(1024)
        if not chunk: 
            break
        data += chunk.decode('utf-8', 'ignore')
        
    return data
```

Test your client by connecting to a known webserver and verify that you receive a response.  Notice that you may encounter an infinite loop inside the `read_response` loop above!  That's because your socket is waiting to receive 1024 bytes of data.  If the response (or the remaining chunk to be read) is smaller than 1024 bytes, the socket will wait, just like a `stdin` reader would wait for you to type input at the keyboard.  Let's fix this!

Read a smaller number of bytes in your loop, until a newline character is received.  You know that the first line of the HTTP response is the status line, which you can `split` by space to determine the response code.  An HTTP response takes the form: 

```
HTTP/1.1 200 OK\r\n
```

Following this line, the HTTP headers take the form:

```
Key: Value\r\n
Key: Value\r\n
Key: Value\r\n
...
\r\n\r\n
```

Print out each header and value via `data.split()`, which returns an array of lines of text in the response.  If `len(line.strip()) == 0`, you know you've reached a blank line.  Until then, you can split the line on the `:` character to separate the key from the value of each line of the header.  Print those separately, and then print the entire body when you have run out of header lines (in other words, after reaching the first blank line!).

## Extra Credit (50%): HTTP Server
Similarly, write an HTTP server that listens on a port (non-administrators can't listen on ports below 1024, so you might try port 8080 or something similar).  

To do this, you will first listen on a web port, as follows:

```python
def server(port):
    host = "0.0.0.0" # ourselves
    sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    sock.bind((host, port))
    sock.listen()
    
    while True: # accept one connection after another; do new requests have to wait while we process each one?
        conn, addr = sock.accept()
        data = ""
        while True:
            chunk = conn.recv(1024)
            if not chunk:
                break
            data += chunk.decode('utf-8', 'ignore')
            
        # Process the request here
```

When you get a request, again read the headers.  You can split the first line of the request by space, and you know that the second token will be the URL (see our HTTP request format above!).  That's going to be a file path on your computer.  You can open that file, read it, and send back the response as a properly formatted HTTP response message.

To read a file in python, you can do the following:

```python
f = open(filename, "r")
for line in f:
  print(line)
```  

To send an HTTP response header `HTTP/1.1 200 OK` followed by a `Content-Length` header indicating the number of bytes in the file we read, followed by the file data itself, over a TCP connection, you can do this:

```python
headers = "HTTP/1.1 200 OK\r\nContent-Length: " + str(len(response_data)) + "\r\n\r\n"
conn.sendall(headers)
conn.sendall(response_data)
conn.sendall("\r\n")
```

Test your server by running a web browser and accessing `http://localhost:<your port number>`.  In addition, test your client against your server (run the server first, then run the client!).

Note: please terminate the server as soon as you are finished with it.  We did not take action to secure this server and so it should not run on a computer that is connected to the Internet without a firewall blocking incoming connections!  For example, it will happily read any file path on your computer given as the HTTP request URL.  What might we do to prevent this?