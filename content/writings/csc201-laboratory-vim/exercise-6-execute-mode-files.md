---
title: "Exercise 6: Execute Mode and Files"
---

    <p>We now reach the last major mode of ViM, the "execute" mode. This mode is accessed from command mode by pressing the colon (':'). Notice that a colon also appears at the bottom left of the screen, indicating that you've entered execute mode. You can easily cancel the execute mode by pressing the Escape key to return to command mode. One of the most basic commands involves jumping to a particular line and is of the form ":<em>x</em>", where <em>x</em> is a line number. Try moving to the first line with the command</p>
<div class="code">:1</div>
<p>Simple enough? This is just one of many ways to jump around your text documents (see "marking", for example), but it happens to be one of the most easy to remember. In any event, this is quite useful when debugging for jumping to the exact line that caused a problem.</p>
<p>We next learn some file-manipulation commands, beginning with saving a file. In ViM, the command is called "write", and is performed via</p>
<div class="code">:w <em>filename</em></div>
<p>or ":write <em>filename</em>". <em>filename</em> is not always required, especially if we call vim to open a specific document (see below) or we've written to the file once already. For example, add a new line with some useful information on it, then use ":w".</p>
<p>Now that we can write, we should learn how to open files, but before we can do that, we must learn how to close the document we are currently editing. To close an editing session (I use this terminology because, as we shall see in a moment, ViM may be editing several different files at once), we use the quit command,</p>
<div class="code">:q</div>
<p>or ":quit". Let's exit ViM and return to bash. Try listing the contents of the current directory to make sure vim wrote where you thought it did. Next, we discuss several methods of opening a document with ViM, the most obvious being from the command line. If we invoke vim with a filename as an argument, ViM will start immediately editing that document.</p>
<div class="code">$ vim <em>filename</em></div>
<p>This is not the most efficient method, as it requires us to exit ViM itself. Exit ViM and then open it again without any arguments. The command, "edit",</p>
<div class="code">:e <em>filename</em></div>
<p>or ":edit <em>filename</em>" is the standard method of opening a file within ViM. While opening your file, try using tab-completion. ViM's tab-completion is very similar to bash's with one major difference. Can you spot it? <em>&lt;Hint&gt; try tab completion in a directory with many files in it&lt;/Hint&gt;</em>. ViM's command mode also offers a history similar to that of bash; press ':' to get into command mode and then press the up or down arrows to move through the history of your commands. </p>
<p>Try editing your file and then quiting ViM without saving. Being a forgiving text editor, ViM doesn't want you to lose your work, so it will question your actions if you try to exit without saving. As the helpful error message points out, you can tell ViM that you *really* want to quit (or any other command), regardless of consequences, by adding the '!' at the end of the command. For example, you should now type</p>
<div class="code">:q!</div>
<p>to quit without saving your work.</p>
<p>Another useful method of editing two files at once uses the split command. First, use ViM to create a second, nonsensical file (alternatively, you can use another text file that is ready). Use the edit command to edit our original document (which you saved not too long ago). Now use the "split" command to open a second editing session within ViM:</p>
<div class="code">:split <em>filename</em></div>
<p>where <em>filename</em> is the name of the new text document. Now we have two separate documents. Try to split again, this time with the original document as the parameter. Your screen should be split into three equal editing sessions that are on top of each other. Try editing the file that is now opened twice. How does the other instance of the editing session respond? </p>
<p>You may or may not have noticed that you can only move your cursor in the editing session that you last opened. How can we navigate between the sessions? One method is to use the mouse, but that won't be an option until later. Another method is to hold <em>ctrl</em> and press 'w' (for "window") twice.</p>
<p>As mentioned before, the quit command closes a particular editing session. Please close all sessions but the main document that we have been editing. What's the result of calling split with no parameters?  How could this be useful? As a quick experiment, try splitting a file with itself, editing the file, and then quiting ViM without saving by closing each session one-at-a-time. Why do you think ViM allows you to close all except the last session that is editing a particular file without any errors or warnings? As a side note, you can save all sessions that are split or exit all such sessions with the "all" system, i.e. ":qa" for quit all window and ":wa" for write all windows to their respective files.</p>
<p><em>&lt;Aside&gt;</em>A very efficient command for saving and closing a file is the concatenation of "write" and "quite", i.e. ":wq" <em>&lt;/Aside&gt;</em></p>
<p>Now that we understand how to open, close, and navigate windows, let's discuss quite possibly the most important command in ViM, "help". ViM has an internal help system that requires users to call</p>
<div class="code">:help <em>topic</em></div>
<p>where <em>topic</em> can range from a keystroke (e.g. ":help i"), to a command (e.g. ":help :q"), to a concept (e.g. ":help window"). This help system certainly contains the resources your need to succeed with ViM, but is presented rather tersely and with difficult searchability (hence, I'm writing this lab). When you get a chance, try calling ":help" alone, as it serves as a very good introduction to ViM's concepts.</p>
<table class='summary'>
<tr>
<th>Mode</th>
<th>Command</th>
<th>Outcome</th>
</tr>
<tr>
<td>Execute</td>
<td>:<em>x</em></td>
<td>Jump to line <em>x</em></td>
</tr>
<tr>
<td>Execute</td>
<td>:w [filename]</td>
<td>Write ("save") curent editing session to<br />
            filename. If no filename is specified,<br />
            write to the document associated with this<br />
            session (the last file written to, opened from, etc.)</td>
</tr>
<tr>
<td>Execute</td>
<td>:q</td>
<td>Quit the current editing session.<br />
            ViM will not quit if you have not saved.</td>
</tr>
<tr>
<td>Execute</td>
<td>:wq [filename]</td>
<td>Write ("save") curent editing session to<br />
            filename and then quit. If no<br />
            filename is specified, write to the<br />
            document associated with this session (the<br />
            last file written to, opened from, etc.)</td>
</tr>
<tr>
<td>Execute</td>
<td>:e [filename]</td>
<td>Edit - Open filename using the current<br />
            editing window. This closes the current file.</td>
</tr>
<tr>
<td>Execute</td>
<td>:[command]! [arguments]</td>
<td>Force - Perform the command regardless<br />
            of any rammifications<br />
            <em>Ex. :q! Quits the session whether or not the<br />
            file has been saved.</em></td>
</tr>
<tr>
<td>Execute</td>
<td>:[command]a [arguments]</td>
<td>All - Perform the command to all open<br />
            windows</td>
</tr>
<tr>
<td>Execute</td>
<td>:split [filename]</td>
<td>Opens a new editing session in a new "window"<br />
            to edit filename. If filename is<br />
            blank, open the current document.</td>
</tr>
<tr>
<td>Command</td>
<td>&lt;Ctrl&gt;-w &lt;Ctrl&gt;-w</td>
<td>Move cursor to next window (vertically)</td>
</tr>
<tr>
<td>Execute</td>
<td>:help [keystroke]</td>
<td>Shows help for given keystroke in new<br />
            window. If no topic is given, show<br />
            generic help screen.</td>
</tr>
<tr>
<td>Execute</td>
<td>:help :[command]</td>
<td>Shows help for given command in new<br />
            window. If no topic is given, show<br />
            generic help screen.</td>
</tr>
<tr class='lastrow'>
<td>Execute</td>
<td>:help [topic]</td>
<td>Shows help for given topic in new<br />
            window. If no topic is given, show<br />
            generic help screen.</td>
</tr>
</table>

- [&lt; Exercise 5: Line-Based Editing](../exercise-5-line-based-editing)
- [Exercise 7: Search and Substituting &gt;](../exercise-7-searching-substituting)
