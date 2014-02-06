---
title: Lift Encrypted Fields
url: https://github.com/cmc333333/Lift-Encrypted-Fields
languages: [Scala]
libraries: [Lift, Bouncy Castle]
summary: |
  This library adds authenticated encryption fields to a popular web
  framework. It is the result of personal research, but quickly ended up in
  production. The library also represents my desire to give back to the
  Scala/Lift community.
---

I recently took a course in cryptography from Stanford's Dan Boneh (via
Coursera) which I cannot recommend enough; one of my big take-aways from this
class was the importance of Authenticated Encryption -- that is a mode of
encrypting multiple blocks of data so that not only is the data non-legible,
but also tamper-resistant. For a bit more detailed description of
authenticated encryption, see notes for a
[talk](http://cmlubinski.info/cryptography-and-security-coders#encryption-modes)
I gave which touched on the topic.  One problem I found was that almost no
software (including Lift, the web-framework I use most often) used
authenticated encryption.

This led me to write a library which would add this functionality (and in the
future, additional functionality to solve other, often poorly-implemented
security concepts, such as password hashing) to Lift records (often known as
"models" in other frameworks.) In addition, writing this library would allow
me to implement some of the skills learned in the online course and also allow
me to give something back to the Lift community. Though I began work on this
library in my spare time, it became so useful that it runs at the heart of
many of Toodalu's upcoming applications.


## Code

The library is one of my latest pet projects, so it will likely change a bit
between the time that I write this and the time that it is reviewed. I
therefore apologize before-hand; filenames may have changed and functionality
may have moved around a bit. If you'd like to revert to the code-base at the
time of this writing, review everything before and including change-set
443f18fcc327.

The first interesting bit comes in the KeyManager
(/src/main/scala/liftencryptedfields/KeyManager.scala .) Dealing with key
storage is always a problem; instead of requiring the keys be provided as a
string in a configuration file (or as an application parameter,) I chose to
follow a standard created by Sun for JVM applications: keystores.
Unfortunately, the keystore's location and password must be given to the
application some how, so I added these as configuration parameters -- this
isn't ideal, but it does reduce configuration from one line per key to a
constant two-lines. To make things a bit simpler on the library's users, it
uses the Record's class name + field name to determine which key from the
keystore to use.

Next up, a list of conversions from a useful type (such as a string, integer,
enumeration, etc.) into an array of bytes which can then be encrypted
(/src/main/scala/liftencryptedfields/conversions.scala .) The list is not
exhaustive (currently containing strings and enumerations) and is meant to be
easily extendible. To add a new conversion, you need only write a method which
marshalls the data as an array of bytes and another method which de-marshalls
that data. As new needs arise, I will continue to extend these conversions to
cover the new use cases.

The algorithmic meat of the library rests in its Utility object
(/src/main/scala/liftencryptedfields/Utility.scala .) This object contains a
random number generator which lazily reseeds itself every hour (a must for any
secure randomness,) as well as methods for AES-GCM-encrypting/decrypting data.
Attempting to write encryption functions by yourself is always a bad idea, so
instead of implementing GCM here, I rely on a well-vetted crypto library
called "bouncy castle" (isn't that wonderful?) The library isn't exactly
super-simple, however, so my library handles all of the book keeping, such as
keeping track of the initialization vector (similar to a salt.)

The other classes might be interesting if you have a particular fascination
with type theory (as I do,) but they do not contain much in the way of high
concepts. For the most part, they are wrappers on previously discussed methods
to allow a Record's field to be an encrypted string/enumeration/optional
string/ etc. 


## Technology Choices

* Scala - As mentioned in the first sample, Scala is a wonderful language in
  which I spend most of my coding time. As such, it proved a natural choice
  for implementing authenticated encryption.
* Lift - Again, Lift is a popular web framework; the project has had a short
  life time, but has evolved rapidly. While its built-in security measures
  aren't particularly impressive, I use their record ("model") system in many
  projects, so it makes sense to choose this framework for this library.
* Bouncy Castle - Perhaps the best crypto alternative in the JVM ecosystem,
  Bouncy Castle adopts many crypto algorithms before they move in to mainline
  Java. This includes GCM, which is at the heart of this library.
* Authenticated Encryption - This mechanism for encryption is essential for
  cutting-edge applications, but should really be more widely adopted. Data
  which has been tampered with cannot be decrypted, greatly improving the
  security of shared resources (and further firewalling the data.)
