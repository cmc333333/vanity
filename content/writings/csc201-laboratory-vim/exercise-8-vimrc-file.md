---
title: "Exercise 8: The .vimrc File"
extra_css:
  - /assets/css/csc201-laboratory-vim.css
---
As you learned with your introduction to Emacs, many Unix programs read from a configuration file at startup. ViM's startip file is stored in the home directory as ".vimrc". Let's open that file to edit it.

    :e! ~/.vimrc

The syntax of the .vimrc file is identical to what you would enter in execute mode, save that we can skip the colon if we want to. For example, let's open the .vimrc file every time we run vim. To be perfectly explicit, I stress that we must press the insert key:

    i:e ~/.vimrc OR
    ie ~/.vimrc

Now quit ViM and open it again with no parameters. ViM will give you an odd message from the command line (this command is not quite what the .vimrc is for); you can continue the program by pressing [Enter]. Notice that opening ViM with no parameters jumps to the .vimrc file. Close ViM. What happens when we open ViM with another text file (such as the typo'd file we started with) as a parameter?

Let's fix our .vimrc file to something a bit more useful. Before we list any of the following useful options, it's important to note that you can search the help manuals for a particular option with the ":help '*option*'" syntax, where *option* is the name of the option we'd like more information on. Please select any of the options below to enter into your .vimrc, placing each entry on a separate line. Boolean options can be set and unset while running ViM with the following syntax

    :set option
    :set nooption

Arguments that require parameters can be set with

    :set option=[Value]

*ignorecase* - "set ignorecase" alerts ViM that all searches should be case insensitive. Note that, if you do not want to ignore case while searching you do *not* need to put "set noignorecase" as the default behaviour of ViM is to be case sensitive.

*mouse* - "set mouse=a" tells ViM that you want to make use of the mouse in all modes. ViM can use the mouse in a terminal if you are running Linux, BSD, or Windows. Unfortunately, the Mac terminal does not support the mouse very well, so to use the mouse on a Mac, you will need to use gViM. As we've alluded before, the mouse can be used to select large chunks of contiguous information (see visual mode below) and can be used to switch between editing sessions. When working with split sessions, you can also adjust the size of each session by dragging the appropriate divider.

*wrap margin* - "set wrapmargin=*x*" or "set wm=*x*" where *x* is a small number (I use 4) tells ViM to automatically wrap your text while typing. If this parameter is not set, your text will likely appear to span several lines, but not include actual newline characters (therefore in any other editor or printing, the characters will be botched). A very simple test for a multi-line-in-ViM entry is whether, when arrowing through the document, the cursor appears to skip over lines. The numeric parameter tells ViM how many characters from the end of the window it should start wrapping words.

*background* - "set background=dark" or "set background=light" informs ViM that the terminal it is being run in has a dark or light background. This is useful for syntax and other types of highlighting, as it makes the highlighting much easier to read.

*backspace* - "set backspace=2" is an odd but useful command that alerts ViM that the user should be able to backspace through auto-indentation (see the next section), through newline characters, and past the beginning of an insert-mode session. This command makes ViM feel a bit more comfortable as it will feel more like a standard editor.

*whichwrap* - "set whichwrap=b,s,&lt;,&gt;,[,]" or "set ww=b,s,&lt;,&gt;,[,]" informs ViM that it should wrap movements that involve the left and right arrow keys. Like the *backspace* option, this is set largely to make ViM a bit more friendly. For more information, look at ":help 'ww'".

*autoindent* - "set autoindent" will be very useful when programming, but arises in all sort of editing situations. More or less, this setting makes ViM copy the indentation of the current line when opening a new line, either explicitly ('o') or by word-wrapping or pressing "[Enter]" while in Insert mode. ViM *should* have this by default, but I think it's important to mention anyway.

 Mode | Command | Outcome
------|---------|---------
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

- [&lt; Exercise 7: Searching and Substituting](../exercise-7-searching-substituting)
- [Exercise 9: Programming with ViM &gt;](../exercise-9-programming-vim)
