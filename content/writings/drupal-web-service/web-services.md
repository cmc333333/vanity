---
title: Web Services
---
## Web 2.0 : The Need

Before I explain what web services are, let me describe their purpose in our society. You see, there has been a recurring struggle in computer history. Throughout this history, different organizations and market forces have attempted to restrict public access to the benefits of technology. Each push, however, has been combated by other forces which strive for openness and equality.

Take, for example, the *old days*, when almost all hardware was proprietary. In this period, hardware replacements could only be bought from the original vendor and vendor lock-in was more or less guaranteed. If I had bought a Commodore which needed its RAM replaced, I could not go to my friend who had a dead Atari because the two systems were completely incompatible. This problem was resolved by mass standardization, of course, resulting in cheaply produced, interchangeable parts.

Unable to make money in hardware, vendors decided to lock-in their customers by producing proprietary hardware. These are the *Microsoft days*, a time in which not only were consumers unable to swap out word processors and web browsers, but also unable to control the quality of their software. If I found a security flaw in my pdf reader there was absolutely no way to fix it or guarantee that my vendor would. Further, if I needed to extend the functionality of an application, most of this software offered no solution. These problems were resolved by open source alternatives, including Linux, Open Office, Firefox, and the like. I must admit, I'm quite partial to open source (and this presentation will probably emphasize that further.)

With cheap hardware and free software, tech companies have discovered a new strategy for vendor lock-in: Proprietary *Data*. Though Facebook, Twitter, GitHub, etc. were build on open technologies, and though access to their data is generally free in the monetary sense, going through their interface to get to your data is severely limiting. Until they released their APIs, you could not write software that used your own data. You could not searched through your tweets or create a graph of your friends unless Facebook, etc. already implemented that functionality. In my opinion, web services are the solution to this problem; with them, you can access your data and use it how you see fit. Web services prevent vendor lock-in by allowing you to use the data in ways the vendors did not expect and as we have seen again and again, this results in highly creative mash-ups and highly useful data sets.

## Use Their Hardware

Web services allow for two basic types of operations; the first is using
someone else' hardware. For example, consider
[http://chart.apis.google.com/chart?cht=gom&amp;chd=t:25&amp;chs=250x100&amp;chl=Sharp](http://chart.apis.google.com/chart?cht=gom&amp;chd=t:25&amp;chs=250x100&amp;chl=Sharp).

Google offers a nice api for creating charts on the fly. As you can see by the "GET" parameters, I'm defining the type of chart ("gom"), the chart's data ("t:25"), it's size (250x100 pixels), and the label for the needle. Changing these parameters will result in a different image altogether. While we could do this ourselves using PHP's graphics manipulation functions, there's almost no point. Why would we spend the CPU cycles to perform these operations when Google is guaranteed to be faster (and less buggy)? In this way, we can use Google's might for our own, hopefully benign ends.

## Use Their Data

The second use of Web Services is to access data which someone else controls.
Let us consider
[http://data.alexa.com/data?cli=10&amp;dat=snbamz&amp;url=google.com](http://data.alexa.com/data?cli=10&amp;dat=snbamz&amp;url=google.com)

This is a service given by Alexa, the leading web statistics provider in the world. This service allows us to find the current rank and change in rank of every site on the Internet. In this case, we are looking at Google's rank, which, for the foreseeable future, will remain number one. This data is *not* something that we can collect ourselves, but Alexa has been kind enough to offer it to the world for free (as far as I am aware). We are using their web services to access their data in a way that might be useful to us (to routinely discover our page rank, for example).
    
- [&lt; Drupal as a Web Service](../)
- [Drupal's Services Module &gt;](../drupals-services-module)