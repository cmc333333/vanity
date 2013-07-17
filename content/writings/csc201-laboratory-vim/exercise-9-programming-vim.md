---
title: "Exercise 9: Programming with ViM"
extra_css:
  - /assets/css/csc201-laboratory-vim.css
---
Though ViM was designed to be a multifunctional text editor, it is probably most useful as a coding tool. As such, it implements several useful features, such as auto-indent, code folding, and code highlighting. Many of these are options that somewhat alter the way ViM is acting; they may be placed in your .vimrc if you want them to always be set, or can be set in any particular editing session. Let's look first at the options and then at the key commands.

*Nice indentation* - The default indentation for most text editors (including ViM) is a tab character. While that is very simple, it has the tremendous problem that when it is printed, a tab is expanded into *eight* spaces. That's quite ridiculous if you have code that has deep indentation.  Here's a rather spiffy solution for this problem, using ViM that I *strongly* suggest you place in your .vimrc.

    :set softtabstop=2
    :set shiftwidth=2
    :set noexpandtab

The ":set softtabstop=2" or ":set sts=2" tells ViM that when you press the tab key, it should insert 2 spaces. To any editing or viewing tools (including the printer), the tabs your insert are replaced with two space characters. However, while editing, ViM will treat both spaces as if they were one single tab character, allowing you to delete them in one stroke.  ":set shiftwidth=2" or ":set sw=2" informs ViM that whenever it performs any automatic indentation, such as the "&gt;&gt;" operation (see below), it should use only 2 spaces. Finally ":set noexpandtab" (which may not be required as it is the default) tells ViM that tabs should not be expanded into spaces while editing. If ":set expandtab" were used, ViM would not treat your tab-presses as single characters, but would expand them into spaces. All of these commands prevent you from adding the tab character if you need to (i.e. in a Makefile). If you ever need to enter an actual tab character, you need to specifically tell ViM this. While in Insert mode, press Ctrl-v and then press Tab to enter a tab character.

*Syntax highlighting* - Let's get a hands-on demonstration with this example. Please open one of the .c files you have been working on.  Now, in ViM type

    :syntax on

Isn't that pretty? ViM looks at the file extention to try to guess which type of syntax highlighting it should use, so if you open an html document, its highlighting will be different than a c header. You can also explicitly set the syntax highlighting system by using ":set syntax=java" (or some other file format). See ":help 'syntax'" for more information.

*Numbered Lines* - It's often useful to have quick access to line numbers, especially when debugging. For this feature, there is an option,

    :set number

which will number every line. Note that the numberings require characters on the left, and your terminal will not resize itself.  Luckily, if you've set wm to 4 or 5, you shouldn't have any wrapped lines. If this becomes a problem, you may be interested in the 'numberwidth' option (see help pages). How could we turn this option off?

*Automatic Indentation* - Though I don't use these parameters, you might find ":set smartindent" and ":set cindent" to be useful operations. The first tells ViM to indent after any lines that end with '{' or after certain keywords (such as for, while, etc.). It also matches the indent for a closing brace with its corresponding open brace. 'cindent' takes this formatting a step further, but is a bit more specific to c and c-like languages, especially dealing with their particular formating conventions and keywords.  As you likely have realized from your earlier experience, Unix facilities tend to favor several small, efficient programs rather than one large program. As such, ViM uses the standard gnu tools such as gcc, make, gdb, etc. To run these tools from within ViM, you can use the command-bang syntax (I don't know the *real* name of this sequence, but "command-bang" is a nice pneumonic). Try the command

    :!ls

Next, try the command-bang ls with some flags, such as "-l". Using command-bang tells ViM to execute the command in a new shell, which allows us to have access to the entire operating system from within ViM.  For example, we could run firefox with

    :!firefox &

As you will likely be using ViM to code, you will probably want to call your program and your compiler. For example, it's common to use the following

    :!gcc progName.c -g -Wall -o progName

Which compiles the program at *progName.c* and outputs the resulting
program to *progName*. You can then execute your program with

    :!./progName

And, if you wanted to be really slick *and you watch for compile errors*, you could even try

    :!gcc progName.c -g -Wall -o progName; ./progName

which performs all of these operations in a single step. As ViM provides a history, we can just type ":!" and up-arrow until we reach the command. It may be useful also to note that within execute mode, the '%' symbol represents the current file. Hence we could write the compile instruction as

    :!gcc % -g -Wall -o progName

*Warning*: You will accidentally overwrite your .c file if you use "-o *progName.c*". Though you should be as careful as possible, ViM saves a "swap" file as you are working (of the form ".*fileName*.swp" so that if ViM closes unexpected, you can recover the changes you made. This swap file method also alerts you if the file you are working on has been overwritten, and allows you to return to the version of the file that you've been working on, which you can then save. I strongly suggest you don't rely solely on this mechanism, however, as the swap files are not intended for this use, and disappear after you end a ViM session.

Now we move on to in-program commands that are quite useful while editing. We begin with quick indentation, which you should remember from the Emacs lab. In the open c file, place your cursor anywhere on a line that is within a code block (i.e. within braces). Type

    >>

Notice that the indent is equal to two spaces (or however much the shiftwidth
option is set to). We can revert by using the reverse ("&lt;&lt;"). This is
all quite nice, but often enough we'll need to indent *many* lines as functions tend to be multi-line entities. How do you think we could indent 5 lines using "&lt;&lt;"? How about 5000 (which will likely indent the rest of the file)? As shifting is a movement operation, we can perform it several times exactly how we did with other commands, i.e.

    x>>

where *x* is the number of lines to indent.

Next, we note a very useful movement command, the match-paren command.  Move to the opening bracket for a code block within your file. Please press

    %

What just happened? It may not be immediately obvious if you are using syntax highlighting (because syntax highlighting also highlights the matching parenthesis), but try moving the cursor up or down to see where you are. Move back to the closing paren and press '%' again. How could we combine this with delete or copy?

Though '%' is pretty useful for moving through multi-functioned files, I find it most useful in conjunction with code-folding, a feature that condenses ("folds") multiple lines of a text document into one so that you can stop worrying about their inner details. Move to the opening bracket for a function and type

    zf%

Let's parse this command. The 'z' alerts ViM that it will be working with one of a series of fold-related (mostly) commands. See ":help z" for more information. The 'f' tells ViM that it should create a fold that includes all text passed over with the next movement command.  Using '%' as a movement command folds the entire function and it moves the cursor to the opening brace's corresponding closing brace. Move your cursor to the fold, which is indicated by a "+--" at the beginning of the line and special highlighting. Now we open the fold with

    zo

i.e. "fold-open". What do you think the corresponding "close" command would be? Yep, "zc" will close the fold. Try this command anywhere within the function to see how ViM responds. These folds will continue to exist only for your editing session, so if you split a file, you may use a different set of folds for each editing session. Folding is a very complex (though useful) feature. Please read ":help folding" for more specifics.

 Mode | Command | Outcome
------|---------|---------
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

- [&lt; Exercise 8: The .vimrc File](../exercise-8-vimrc-file)
- [A list of Some Other Useful Features &gt;](../list-some-other-useful-features)
