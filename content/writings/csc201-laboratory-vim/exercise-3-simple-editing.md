---
title: "Exercise 3: Simple Editing"
extra_css:
  - /assets/css/csc201-laboratory-vim.css
---
We begin with the "delete" command. As with most commands, this takes a movement parameter. Please maneuver your cursor to the word "a" on the second line of our example text. We delete this word by typing

    dw

That is, delete word. Next, please navigate to the word "fun" and delete it using only 'w' and "dw". Now, delete the word "paper" using only two commands, one to move to the word and a second to delete it. Are you getting the hang of moving by words?

Next, return the cursor to the first letter of the first "do" word in the line. Though we won't take this route, how could we fix this typo using a scaler version of "cw"? Instead, we will perform a similar operation and delete all four words with the command

    4dw

*&lt;Aside&gt;* 4dw literally means (delete word) four times; and equivalent statement would be d4w delete (4 words). In ViM, there are several different methods of performing the same operation; you will learn which method feels right for you.*&lt;/Aside*;</em> Wait! We have made a mistake! What can we do? Of course, ViM has a solution, the Undo command ('u'). Please revert the text to include two "do not"s with the Undo command.

This line still is not correct, however, so let's fix it by deleting the two words "do not". How could we do that with one command? This version looks a little better, but I'm not sure. Try undo-ing again. Actually, the version with only one "do not" looks correct, so let's redo our undo with the Redo command (Ctrl-r). Whew. Much better.

Let's move our cursor to the beginning of the "sOMEBODY" line. Type the 'End' key, followed by the 'Home' key to return to the start of the line we've been working on. 'End' and 'Home' were not standard when Vi (a predecessor to ViM) was created, so an alternative (and much more widely used) version of the end-of-line command is the '$' key, while the start-of-line command is '0'. Try it now. As '$' is a motion, we can combine it with the delete and change commands. Try deleting everything after the first period.

Our next objective is to learn some single character commands. We begin with deletion of one character with a single stroke (d-&lt;right arrow&gt; has too many key strokes, after all). Move your cursor to the second d in "jumpedd" on the first line. Type

    x

This should delete the single character. Fix "ovverr" through the same method. The 'x' command is also a form of movement, so we can use it to delete several character at a time if needed. For example, try to delete two ms from "mmmoon" with the

    2x

command. Try to get rid of the os as well. How can we undo this mistake?

We can also modify the case for a given character with the '~' (tilda) command. Move your cursor to "sOMEBODY" and press

    ~

Notice that tilda not only inverts the case, but also moves the cursor forward, hence we can keep pressing tilda until "sOMEBODY" is fixed. Please move the cursor to "THIS LINE" using only word movement. How could we fix the case of "THIS LINE" using only one command (two key strokes)? *&lt;Hint&gt;* Both 'x' and '~' operate immediately on exactly one character. Think of the 2x example and test what the '~' command does to a space*&lt;/Hint&gt;*

 Mode | Command | Outcome
 -----|---------|--------
Command | d[movement] | Delete movement and add them to the<br /> buffer (described in section 5)<br /> *Ex. d4) deletes 4 sentences*
Command | *x*d[movement] | Equivalent to d*x*movement
Command | u | Undo previous changes<br /> (i.e. move back through undo history)
Command | &lt;Ctrl&gt;-r | Redo previously undone changes<br /> (i.e. move forward through undo history)
Command | 0 | Equivalent to &lt;Home&gt;
Command | $ | Equivalent to &lt;End&gt;
Command | *x*x | Delete *x* characters and add them to<br /> the buffer (described in section 5)<br /> *Ex. 5x deletes 5 characters*
Command | *x*~ | Changes the case of the next <em>x</em> letters,<br /> non-letters (whitespace, numbers, etc.)<br /> *Ex. 15~ reverses the case of the next<br /> 15 letters*

- [&lt; Exercise 2: Moving Around](../exercise-2-moving-around)
- [Exercise 4: Revisiting Insert Mode &gt;](../exercise-4-revisiting-insert-mode)
