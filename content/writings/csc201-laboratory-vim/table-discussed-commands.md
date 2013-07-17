---
title: Table of Discussed Commands
extra_css:
  - /assets/css/csc201-laboratory-vim.css
---
Mode | Command | Outcome
-----|---------|--------
Any  | &lt;Escape&gt; | Enter Command mode
Command | i | Enter Insert mode
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
Command | d[movement] | Delete movement and add them to the<br /> buffer (described in section 5)<br /> *Ex. d4) deletes 4 sentences*
Command | *x*d[movement] | Equivalent to d*x*movement
Command | u | Undo previous changes<br /> (i.e. move back through undo history)
Command | &lt;Ctrl&gt;-r | Redo previously undone changes<br /> (i.e. move forward through undo history)
Command | 0 | Equivalent to &lt;Home&gt;
Command | $ | Equivalent to &lt;End&gt;
Command | *x*x | Delete *x* characters and add them to<br /> the buffer (described in section 5)<br /> *Ex. 5x deletes 5 characters*
Command | *x*~ | Changes the case of the next <em>x</em> letters,<br /> non-letters (whitespace, numbers, etc.)<br /> *Ex. 15~ reverses the case of the next<br /> 15 letters*
Command | r[key] | Replace the character under the cursor with [key]
Command | R | Enter Replace mode
Command | &lt;Insert&gt; | Enter Insert mode
Insert | &lt;Insert&gt; | Enter Replace mode
Command | A | Append - Move cursor to end of current line and<br /> enter Insert mode
Command | o | Open - Create a new line under the current line,<br /> move the cursor to it, and enter Insert mode
Command | O | Open - Create a new line above the current line,<br /> move the cursor to it, and enter Insert mode
Command | *x*dd | Delete *x* lines and place them in the buffer<br /> Similar to "cut"<br /> *Ex. 5dd deletes the next 5 lines*
Command | *x*cc | Delete *x* lines and enter Insert mode<br /> *Ex. 2cc deletes the next 2 lines and enters<br /> Insert mode*
Command | p | Place whatever is in the buffer ("clipboard")<br /> after the cursor. If the buffer contains a line or<br /> more, place the contents of the buffer on the line<br /> following the current line.
Command | P | Place whatever is in the buffer ("clipboard")<br /> before the cursor. If the buffer contains a line or<br /> more, place the contents of the buffer on the line<br /> above the current line.
Command | y[movement] | Yank movement (add it to the buffer)<br /> Similar to "copy"<br /> *Ex. y4w yanks 4 words*
Command | *x*yy | Yanks *x* (places them in the buffer)<br /> Similar to "copy"<br /> *Ex. 5yy yanks the next 5 lines*
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
Command | /[searchTerm] | Searches forward for regular expressions that<br /> match searchTerm and places cursor on<br /> the next match
Command | ?[searchTerm] | Searches backward for regular expressions that<br /> match searchTerm and places cursor on<br /> the next match
Command | * | Searches forward for the word that is currently<br /> under the cursor
Command | n | Place cursor on next match for the most recent<br /> search
Command | N | Place cursor on previous match for the most<br /> recent search
Execute | :set ignorecase | In all searches/regular expressions, be case<br /> insensitive
Execute | :set noignorecase | In all searches/regular expressions, be case<br /> sensitive (Default)
Execute | :s/*oldWord*/*newWord*/g | Replace all *oldWord*s with the *newWord*<br /> on this line
Execute | :%s/*oldWord*/*newWord*/g | Replace all *oldWord*s with the *newWord*<br /> in this file
Execute | :%s/*oldWord*/*newWord*/gc | Replace all *oldWord*s with the *newWord*<br /> in this file, asking for confirmation on each entry
Execute | :set *option* | Set the boolean option, *option* to true<br /> *Ex. :set ignorecase*
Execute | :set no*option* | Set the boolean option, *option* to false<br /> *Ex. :set noignorecase*
Execute | :set *option*=[Value] | Set the option, *option*, to [Value]<br /> *Ex. :set wm=5*
Execute | :set ignorecase | Ignores case while searching
Execute | :set mouse=[Value] | Allows the mouse to be an input in Value<br /> is "a", or nothing if Value is ""<br /> *Ex. :set mouse=a*
Execute | :set wm=[Value] | Set the word margin (the character position<br /> from the right at which point ViM wraps<br /> words) to Value<br /> *Ex. :set wm=5*
Execute | :set bg=[Value] | Tell ViM the terminal's background color<br /> so that it may highlight appropriately<br /> *Ex. :set bg=dark*
Execute | :set bs=[Value] | Tell ViM how to deal with backspaces.<br /> Value can be either a comma separated<br /> list or a numeric value (see help pages)<br /> *Ex. :set backspace=2*
Execute | :set ww=[Value] | Informs ViM which characters wrap around a<br /> newline. See the help pages for specifics<br /> *Ex. :set ww=b,s,&lt;,&gt;,[,]*
Execute | :set autoindent | If this option is set, whenever you press<br /> [Enter] or open a new line, the indentation<br /> of the previous line is used for the new line
Execute | :set sts=[Value] | Tabs will be treated as Value spaces<br /> *Ex. :set sts=4*
Execute | :set sw=[Value] | Shifts ("&gt;&gt;") will be treated as<br /> Value spaces<br /> *Ex. :set sw=4*
Execute | :set expandtab | Expands each tab press into as 'sts' spaces<br /> *Ex. :set noexpandtab*
Execute | :syntax [on/off] | Turns syntax highlighting on or off<br /> *Ex. :syntax on*
Execute | :set syntax=[Value] | Tells ViM which syntax to highlight<br /> *Ex. :set syntax=php*
Execute | :set number | Turns line numbering on
Execute | :set smartindent | Tells ViM to use "smart indenting" which<br /> includes indenting after certain characters<br /> (like '{'). See help page for more
Execute | :set cindent | Tells ViM to use "c indenting" which includes<br /> the indentation in 'smartindent' as well as<br /> after certain c keywords and structures. See<br /> the help page for more
Cmd-Bang | :![Command] | Execute the external Command<br /> *Ex. :!ls -a lists all files in the current directory*
Cmd-Bang | :!gcc *progName.c* -g -Wall | Uses the external gcc to compile *progName.c*<br /> *Ex. :!gcc calc1.c -g -Wall*
Cmd-Bang | :!./*progName* | Runs the file, *progName*, which is in the<br /> current directory<br /> *Ex. :!./a.out runs the output of gcc*
Cmd-Bang | % | Used as a placeholder for the current file's name<br /> *Ex. :!echo % prints the file name*
Command | *x*&gt;&gt; | Shift the next *x* lines 'sw' characters right
Command | *x*&lt;&lt; | Shift the next *x* lines 'sw' characters left
Command | % | Move to the matching paren/brace
Command | zf[Movement] | Make a new fold of the next Movement lines<br /> *Ex. zf} creates a fold of the next paragraph*
Command | zc | Closes the fold that the cursor is in
Command | zo | Opens the fold that the cursor is on
Insert | &lt;Ctrl-v&gt;[Key] | Insert the leteral Key character<br /> *Ex. &lt;Ctrl-v&gt;&lt;Tab&gt; inserts a tab character*

- [&lt; Further Sources](../further-sources)
- [Credits and License &gt;](../credits-license)
