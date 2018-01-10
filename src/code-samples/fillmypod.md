---
title: FillMyPod
url: https://github.com/cmc333333/fillmypod
tags: [Python]
summary: |
  A small Python application which mixes MP3 files from multiple locations.
  Written with generators/iterators to provide more flexibility when
  additional data sources/transforms are written.
---

This small project is my mp3 mixer. It was initially built to solve a very
specific use case: I don't want to listen to multiple files from the same
podcast. Instead, I wanted a way to mix together files from multiple sources
and place them on my mp3 player. To make matters more complicated, certain
podcasts only made sense to listen to in chronological order (e.g. lectures;)
for others, only the latest episode was relevant (e.g. news;) for the vast
majority, I wanted to listen to all episodes in random order. From these
specifications, "FillMyPod" was born.

I chose to present this project not because it's particularly useful for
back-end development, but rather because it shows the use of Python as a
general purpose scripting language. 


## Code

Of the four source files, only sources.py and outputs.py are particularly
interesting (mp3.py defines a data structure and fillmypod.py simply connects
sources to outputs). Presently, there are two sources, a "Chronological"
source (which provides an iterator to files in a directory sorted by their
modification time) and a "Random" source (which provides an iterator to the
files in a random order.) Importantly, both only return iterators. In fact,
one of the few design decisions was to deal with iterators (and generators, as
we will see) rather than concrete collections. The benefit of this design is
that I can add additional sources which are not file-system based. In theory,
I could extend this system to pull its information directly from RSS feeds.

The second file, outputs.py has several additional classes which serve as
transforms for the mp3 files. There are transforms which move the files, copy
the files, rename the files as numbers (based on their order,) limit the total
number of files, print the file paths, and combine multiple other transforms.
Each of these transforms emits a new iterator with the modified mp3s. Again,
additional transforms could easily be added by simply manipulating the stream
of mp3s given.


## Technology Choices

* Python - Python's a great, general-purpose language. In
  this case, it was chosen to limit development time. In particular, there was
  no need for the heavy-hitting of a statically typed language; also Python's
  generally pretty easy to work with.
* Generators/Iterators - Using python's generators and iterators allowed the
  project to lazily evaluate input, which turns out to be a great boon when
  dealing with data from unexpected sources. In effect, instead of
  transforming a collection of data, I transformed a stream of data.
