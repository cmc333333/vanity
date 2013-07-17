---
title: "Exercise 7: Searching and Substituting"
extra_css:
  - /assets/css/csc201-laboratory-vim.css
---
Searching and substitution are essential to any application that works with large quantities of editable text. Of course, ViM provides facilities for these operations and even extends the standard assortment with an understanding of regular expressions. This certainly is not the time to discuss this important term, but I can't pass <em>too</em> many opportunities to glorify ViM. But back to searching. Please open a new file with the following contents

    Peter Piper picked a peck of peckled pippers.
    Did Peter Piper pick a peck of peckled pippers?
    If Peter Piper picked a peck of peckled pippers,
    where's the peck of peckled pippers Peter Piper picked?

Remember that to copy text from another source and paste it into ViM we copy the text, enter insert mode, and then use the terminal to paste.  Please move the cursor to the upper left-hand corner of the document. We will now search for "pick" using the forwards search command:

    /pick

ViM's cursor has moved to the first instance of "pick", which is in the first line as "picked". We'd like to look at the next match, so type

    n

Now ViM has moved us to the next match, which happens to be in the second line. Try to use the next-match command ('n') a few more times, noting what happens when there are no more entries in the document. An alternative to the next-match command is the previous-match command, ('N'). Similarly an alternative to forwards search ('/') is the backwards search, '?'. Do 'n' and 'N' operate how you expect them to when backwards searching? In certain cases, it may be exceedingly useful to search for the word that is currently under the cursor. For example, if we wanted to search for all instances of "of" we could move to the "of" in the first line and type

    *

Next, try searching for "pIcK". Why do you think ViM responds the way it does? Personally, I prefer my searches to be case insensitive. To tell ViM to ignore case when searching, use the following command, which will be explained further in the next exercise:

    :set ignorecase

Try searching for "pIcK" again. If you prefer searching with case sensitivity, we can go back to the default setting by typing

    :set noignorecase

Ignorecase is a boolean option. We will discuss options in more detail in the next section.

ViM also has a built-in search-and-replace command, but the syntax is rather clanky. Read ":help :s" for more information, but the gist of this command are noted in the table at the end of this section. To fix all of the "peckled"s to "pickled"s, then, we would type
    
    :%s/peckled/pickled/g

Even I find these commands very hard to remember, but luckily there is a (in my opinion) a simpler way. Use the '/' command to search for "pipper". Once you hit your first match, use the change-word command to convert the "pipper" into a "pepper". Now next-match to the next "pipper" and press

    .

While in command mode, the '.' character is used to repeat the last editing command ("delete 20 lines", "paste twice", etc.), and as the last command change-worded the word to "pepper", '.' will do the same. Use this group of commands to fix the rest of the document, and if you are interested in ViM's methods of repeating tasks, please refer to :help repeating.

 Mode | Command | Outcome
------|---------|---------
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

- [&lt; Exercise 6: Execute Mode and Files](../exercise-6-execute-mode-files)
- [Exercise 8: The .vimrc File &gt;](../exercise-8-vimrc-file)
