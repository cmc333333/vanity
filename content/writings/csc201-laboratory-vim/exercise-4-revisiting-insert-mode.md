---
title: "Exercise 4: Revisiting Insert Mode"
extra_css:
  - /assets/css/csc201-laboratory-vim.css
---
Now that we've covered some more command mechanics, I'd like to mention a few more means of editing text. The 'i' command is only the most basic method of entering insert mode; as we've already seen, using the 'c'hange command to replace whole words is much more efficient when editing rather than producing documents. A related command is the replace command, which comes in two formats. Move your cursor to the word "Fyre" on the fourth line. We could fix this misspelling by trying cw to change the word, but a more efficient method requires that we place the cursor over the y and type

    ri

We should parse this command into two strokes, 'r', which enters temporary replace mode and 'i', the letter that will replace the character at the cursor position. It's important to note that there is no immediate feedback when initially pressing 'r'; this is because the 'r' command is specifically designed to be used for one-character changes. A more substantive mode is the "Replace" mode (the 'R' command), which overwrites the character at the current cursor position. If you are familiar with MS-Word, this will resemble turning off insertion editing when pressing the Insert key. Let's test this mode:

    R

Notice the "-- REPLACE --" notification. You can still maneuver around as you can in Insert or Command modes, so please move to the first character in the word "Joy" and type "Ice". Simple, eh? Press escape to exit Replace mode. We can move around more quickly in command mode, so let's move to the word "Spike" in one key stroke. How can we do that again? Now, enter Replace mose to edit the word "Spike" and replace it with "Toast". Now try to replace the word "Ice" with "Huge". Do the results surprise you? We can also enter Replace mode from within Insert mode by pressing the "Insert" key. For example, enter insert mode ('i') and then press the "Insert" key, noticing that the "-- INSERT --" has become "-- REPLACE --" in the lower left corner.

We now quickly discuss two other methods of inserting text which you will find useful while editing code. Neither is especially complex, but both save quite a bit of time after a long coding session. Let's begin by moving to the word "The" on the first line. Try the command,

    A

You will see that we've entered insert mode and placed the cursor at the end of the line. The command we entered stands for Append, which is extremely useful for syntactical mistakes. For example, let's add a period at the end of the line. Next, try to add some more words at the end of the fourth line. Notice that this command can be called anywhere on the line you wish to edit.

Next we learn the "open" command, which is a bit misleading as it allows us to "open" a line rather than a file. After placing the cursor anywhere on the third line, type the command

    o

As you can see, we create a new line below the line the cursor was originally on and enter insert mode. A related command, 'O' performs the same operation by opening a line above the cursor's line. As you become more familiar with ViM, you will come to understand the relations between lower-case commands and their upper-case siblings. For now let's just exit insert mode and undo any lines we opened. Do you remember the command to undo?

 Mode | Command | Outcome
------|---------|---------
Command | r[key] | Replace the character under the cursor with [key]
Command | R | Enter Replace mode
Command | &lt;Insert&gt; | Enter Insert mode
Insert | &lt;Insert&gt; | Enter Replace mode
Command | A | Append - Move cursor to end of current line and<br /> enter Insert mode
Command | o | Open - Create a new line under the current line,<br /> move the cursor to it, and enter Insert mode
Command | O | Open - Create a new line above the current line,<br /> move the cursor to it, and enter Insert mode
    
- [&lt; Exercise 3: Simple Editing](../exercise-3-simple-editing)
- [Exercise 5: Line-Based Editing &gt;](../exercise-5-line-based-editing)
