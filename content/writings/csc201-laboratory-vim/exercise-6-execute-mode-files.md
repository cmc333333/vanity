---
title: "Exercise 6: Execute Mode and Files"
extra_css:
  - /assets/css/csc201-laboratory-vim.css
---

We now reach the last major mode of ViM, the "execute" mode. This mode is accessed from command mode by pressing the colon (':'). Notice that a colon also appears at the bottom left of the screen, indicating that you've entered execute mode. You can easily cancel the execute mode by pressing the Escape key to return to command mode. One of the most basic commands involves jumping to a particular line and is of the form ":*x*", where *x* is a line number. Try moving to the first line with the command

    :1


Simple enough? This is just one of many ways to jump around your text documents (see "marking", for example), but it happens to be one of the most easy to remember. In any event, this is quite useful when debugging for jumping to the exact line that caused a problem.

We next learn some file-manipulation commands, beginning with saving a file. In ViM, the command is called "write", and is performed via

    :w filename

or ":write *filename*". *filename* is not always required, especially if we call vim to open a specific document (see below) or we've written to the file once already. For example, add a new line with some useful information on it, then use ":w".

Now that we can write, we should learn how to open files, but before we can do that, we must learn how to close the document we are currently editing. To close an editing session (I use this terminology because, as we shall see in a moment, ViM may be editing several different files at once), we use the quit command,

    :q

or ":quit". Let's exit ViM and return to bash. Try listing the contents of the current directory to make sure vim wrote where you thought it did. Next, we discuss several methods of opening a document with ViM, the most obvious being from the command line. If we invoke vim with a filename as an argument, ViM will start immediately editing that document.

    $ vim filename

This is not the most efficient method, as it requires us to exit ViM itself. Exit ViM and then open it again without any arguments. The command, "edit",

    :e filename

or ":edit *filename*" is the standard method of opening a file within ViM. While opening your file, try using tab-completion. ViM's tab-completion is very similar to bash's with one major difference. Can you spot it? *&lt;Hint&gt; try tab completion in a directory with many files in it&lt;/Hint&gt;*. ViM's command mode also offers a history similar to that of bash; press ':' to get into command mode and then press the up or down arrows to move through the history of your commands.

Try editing your file and then quiting ViM without saving. Being a forgiving text editor, ViM doesn't want you to lose your work, so it will question your actions if you try to exit without saving. As the helpful error message points out, you can tell ViM that you *really* want to quit (or any other command), regardless of consequences, by adding the '!' at the end of the command. For example, you should now type

    :q!

to quit without saving your work.

Another useful method of editing two files at once uses the split command. First, use ViM to create a second, nonsensical file (alternatively, you can use another text file that is ready). Use the edit command to edit our original document (which you saved not too long ago). Now use the "split" command to open a second editing session within ViM:

    :split filename

where *filename* is the name of the new text document. Now we have two separate documents. Try to split again, this time with the original document as the parameter. Your screen should be split into three equal editing sessions that are on top of each other. Try editing the file that is now opened twice. How does the other instance of the editing session respond?

You may or may not have noticed that you can only move your cursor in the editing session that you last opened. How can we navigate between the sessions? One method is to use the mouse, but that won't be an option until later. Another method is to hold *ctrl* and press 'w' (for "window") twice.

As mentioned before, the quit command closes a particular editing session. Please close all sessions but the main document that we have been editing. What's the result of calling split with no parameters?  How could this be useful? As a quick experiment, try splitting a file with itself, editing the file, and then quiting ViM without saving by closing each session one-at-a-time. Why do you think ViM allows you to close all except the last session that is editing a particular file without any errors or warnings? As a side note, you can save all sessions that are split or exit all such sessions with the "all" system, i.e. ":qa" for quit all window and ":wa" for write all windows to their respective files.

*&lt;Aside&gt;*A very efficient command for saving and closing a file is the concatenation of "write" and "quite", i.e. ":wq" *&lt;/Aside&gt;*

Now that we understand how to open, close, and navigate windows, let's discuss quite possibly the most important command in ViM, "help". ViM has an internal help system that requires users to call

    :help *topic*

where *topic* can range from a keystroke (e.g. ":help i"), to a command (e.g. ":help :q"), to a concept (e.g. ":help window"). This help system certainly contains the resources your need to succeed with ViM, but is presented rather tersely and with difficult searchability (hence, I'm writing this lab). When you get a chance, try calling ":help" alone, as it serves as a very good introduction to ViM's concepts.

 Mode | Command | Outcome
------|---------|---------
Execute | :*x* | Jump to line *x*
Execute | :w [filename] | Write ("save") curent editing session to<br /> filename. If no filename is specified,<br /> write to the document associated with this<br /> session (the last file written to, opened from, etc.)
Execute | :q | Quit the current editing session.<br /> ViM will not quit if you have not saved.
Execute | :wq [filename] | Write ("save") curent editing session to<br /> filename and then quit. If no<br /> filename is specified, write to the<br /> document associated with this session (the<br /> last file written to, opened from, etc.)
Execute | :e [filename] | Edit - Open filename using the current<br /> editing window. This closes the current file.
Execute | :[command]! [arguments] | Force - Perform the command regardless<br /> of any rammifications<br /> *Ex. :q! Quits the session whether or not the<br /> file has been saved.*
Execute | :[command]a [arguments] | All - Perform the command to all open<br /> windows
Execute | :split [filename] | Opens a new editing session in a new "window"<br /> to edit filename. If filename is<br /> blank, open the current document.
Command | &lt;Ctrl&gt;-w &lt;Ctrl&gt;-w | Move cursor to next window (vertically)
Execute | :help [keystroke] | Shows help for given keystroke in new<br /> window. If no topic is given, show<br /> generic help screen.
Execute | :help :[command] | Shows help for given command in new<br /> window. If no topic is given, show<br /> generic help screen.
Execute | :help [topic] | Shows help for given topic in new<br /> window. If no topic is given, show<br /> generic help screen.

- [&lt; Exercise 5: Line-Based Editing](../exercise-5-line-based-editing)
- [Exercise 7: Search and Substituting &gt;](../exercise-7-searching-substituting)
