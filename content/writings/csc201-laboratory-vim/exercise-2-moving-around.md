---
title: "Exercise 2: Moving Around"
---
In both insert and command mode, movement keys include those that one would generally expect. The arrow keys move the cursor on their associated direction, Home jumps to the beginning of the line the cursor is currently on, End, jumps to the end of the current line, Page Up and Down are aptly named, and so forth. In command mode, however, we have additional means of moving around our text; these are very important as almost all actions in ViM can be used with a particular movement. First, arrow your way to the upper-left corner of the document (we'll set up the mouse soon enough). Now press

<div class="code">w</div>

Notice that your cursor jumped to the second word, "ccow." This is because the 'w' key moves you forward one word. This may seem pointless, but let us now combine it with insert mode. Type

<div class="code">cw</div>

You have entered the "change" command and given it a direction. The "change" command deletes everything that was in the location you specified (here a 'word') and places you into insert mode. Type "cow" to modify this phrase, and then escape from insert mode. Please return your cursor to the beginning of the first line in command mode. It's nice to move forwards or backwards (with the 'b' rather than 'w' key) by a word at a time, but that's not very efficient. ViM solves this problem by allowing almost all movement keys the option of a given scaler that tells the program to execute that command x number of times. For example, try

<div class="code">3w</div>

Your cursor should have moved to "ovverr". This makes perfect sense as we jumped to "cow" (1w), "jumpedd" (2w), and finally "ovverr" (3w). In fact, we can combine the scaler notation with almost all commands. Try moving to the beginning of "jumpedd" with the command by typing 8 followed by the left-arrow key.

Of course, we are not limited to movement only by characters, lines, and words. Move your cursor to somewhere in the middle of the second line and press

<div class="code">)</div>

What do you think this command means? Try it again. Do the results surprise you? Continue pressing ')' until you reach the end of the document and then try '(' until you reach the top. Can you guess what the '(' and ')' commands mean? These move the cursor a "sentence" forwards or backwards, where a sentence is defined as ending with '.', '?', or '!' followed by an end-of-line, space, or tab. Though we don't have any paragraphs to work with the '{' and '}' commands work analogously for paragraphs, where a "paragraph" is defined as the text between empty lines (i.e. blank line, text, text, text, blank line). ViM was designed with these somewhat unnatural (for now) movement commands, so we will be seeing them in combination with many other commands below. How would we combine the "change" command with the paragraph motion? From the third line, how could we move to the end of the document using one command that involves ')'?<br />

<em>&lt;Hint&gt;</em> Two strokes, beginning with a number<em>&lt;\Hint&gt;</em></p>

Mode | Command | Outcome
-----|---------|--------
Any | &lt;Arrow Keys&gt; | Move the cursor in the direction pointed<br /> by the arrow key
Any | &lt;Page Up/Down&gt; | Move the cursor one page up or down
Any | &lt;Home/End&gt; | Move the cursor to start or end of a line
Command | w | Move forward one word
Command | b | Move back one word
Command | ) | Move forward one sentence
Command | ( | Move back one sentence
Command | } | Move forward one paragraph
Command | { | Move back one paragraph
Command | *x*[movement] | Move movement *x* times<br /> *Ex. 15} moves us 15 paragraphs forward*
Command | c[movement] | "Change" - Deletes everything within the next<br /> movement away and enters insert mode<br /> *Ex. c3w deletes the next 3 words and<br /> enters insert mode*

- [&lt; Exercise 1: Insert Mode](../exercise-1-insert-mode)
- [Exercise 3: Simple Editing &gt;](../exercise-3-simple-editing)
