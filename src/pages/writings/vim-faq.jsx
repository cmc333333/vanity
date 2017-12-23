import Link from 'gatsby-link';
import React from 'react';

import setPageTitle from '../../util/set-page-title';

export default function VimFaq() {
  return (
    <div>
      { setPageTitle('Vim FAQ') }
      <p>
        This is a bit of an addendum to my original{' '}
        <Link to="/writings/csc201-laboratory-vim/">introduction</Link> to Vim
        and a glimpse into some of its more advanced features. This also
        serves as a reference for anyone interested in a lightning talk I gave
        at the July 2010 <a href="http://cdmug.org/">CDMUG</a>. I tried to
        spend that entire presentation wowing the crowd rather than teaching
        them how the Vimpossible can be accomplished.
      </p>
      <ul>
        <li>
          <a href="#how-do-you-move-around-so-fast">
            How do you move around so fast?
          </a>
        </li>
        <li>
          <a href="#can-i-open-multiple-files-at-once">
            Can I open multiple files at once?
          </a>
        </li>
        <li>
          <a href="#what-about-syntax-highlighting-and-indentation">
            What about syntax highlighting and indentation?
          </a>
        </li>
        <li>
          <a href="#how-do-i-get-and-use-code-folding">
            How do I get and use code folding?
          </a>
        </li>
        <li>
          <a href="#how-do-i-enableuse-code-completion">
            How do I enable/use code completion?
          </a>
        </li>
        <li>
          <a href="#and-how-do-i-jump-to-the-function-code-definition">
            And how do I jump to the function code definition?
          </a>
        </li>
        <li>
          <a href="#how-can-i-check-for-syntax-errors-within-my-code">
            How can I check for syntax errors within my code?
          </a>
        </li>
        <li>
          <a href="#my-module-and-inc-files-dont-appear-as-php">
            My .module and .inc files don&rsquo;t appear as PHP?
          </a>
        </li>
        <li>
          <a href="#how-do-i-use-external-commands-as-input-or-filters">
            How do I use external commands as input or filters?
          </a>
        </li>
        <li>
          <a href="#what-do-i-need-to-run-a-shell-within-vim">
            What do I need to run a shell within vim?
          </a>
        </li>
        <li>
          <a href="#is-there-some-sort-of-file-browser">
            Is there some sort of file browser?
          </a>
        </li>
      </ul>
      <h2 id="how-do-you-move-around-so-fast">
        How do you move around so fast?
      </h2>
      <p>
        Movement commands are the key to working efficiently, so much so that
        most of the operations within Vim take movement parameters to know
        which text to operate over. First and foremost, use the{' '}
        <code>h</code>,<code>j</code>,<code>k</code>, and <code>l</code> (or
        arrow keys) to move a single space in each direction. The{' '}
        <code>w</code> key allows you to move forward a &ldquo;word&rdquo;
        and <code>b</code> moves backwards one word. You can even use{' '}
        <code>(</code> and <code>)</code> to move forwards/backwards a
        sentence and <code>{'{'}</code> and <code>{'}'}</code> to move by
        paragraph. These may be useful if you plan to write a lot, but
        developers will be more interested by <code>%</code>, which moves to
        the &ldquo;matching&rdquo; character/sequence.  This would move to the
        matching closing brace, for example, or (with the{' '}
        <a href="http://www.vim.org/scripts/script.php?script_id=39">
          matchit plugin
        </a>) the matching HTML tag. <code>*</code> searches for the word
        under the cursor, moving to the next match. <code>n</code> moves
        forward to the next match for the last search term while{' '}
        <code>N</code> searches backwards.
      </p>
      <p>
        Each of these movement commands can be tied with a number (<em>x</em>)
        to mean &ldquo;move distance <em>x</em> times.&rdquo; You may want to
        move three words forward, for example, or find the fourth instance of
        your search text. This becomes very useful for operations such as{' '}
        <code>d</code> (delete) or <code>c</code> (change), which accept
        movement parameters. This allows you to quickly delete the next
        sentence or change the preceding two words.  Two of the most commonly
        needed parameters (to delete/change a whole line or to delete/change
        all of the line following the current position) can be performed with
        either <code>cc</code>/<code>dd</code> to affect the whole line or{' '}
        <code>C</code>/<code>D</code> to affect everything following the
        current position.  <code>$</code> or <code>End</code> will take you to
        the end of the line so that <code>C</code> is equivalent to{' '}
        <code>c$</code>; <code>^</code>, <code>0</code>, or{' '}
        <code>Home</code> will take you to the beginning.
      </p>
      <p>
        You can also jump around your document via line numbers and other
        markers. Simply type <code>40G</code> to jump to the 40ths line.{' '}
        <code>gg</code> will take you to the first line (as will{' '}
        <code>1G</code> and <code>0G</code>) and <code>G</code> will take you
        to the final line in the document. You can mark a particular line so
        that you return to it later by using the <code>m</code> key.  Each
        mark has a single-character name such as &ldquo;f&rdquo; so that you
        can mark the line which contains a particular <em>f</em>unction{' '}
        via <code>mf</code>. Later, you can recall (move the cursor to) that
        function via <code>&rsquo;f</code>. Does that answer your question? :)
      </p>
      <h2 id="can-i-open-multiple-files-at-once">
        Can I open multiple files at once?
      </h2>
      <p>
        There are many different ways to edit or view multiple files with Vim.
        The simplest is to simply pass each file as a parameter when opening
        vim: <code>$ vim file1.php file2.php</code> or{' '}
        <code>$ vim file*.php</code>. You will now see the first file, but can
        switch to the next with <code>:n</code> or <code>:next</code>;
        switching back to the first is as simple as <code>:prev</code>.
        Combining this with the write command (i.e. saving), you can quickly
        modify a sequence of files via <code>:wn</code> commands.
      </p>
      <p>
        You can also open two files in the same window by using{' '}
        <code>:split</code>, which will open the current file in a second
        viewport above the current. You can move between the two views of the
        same file by using the mouse (be sure to <code>:set mouse=a</code> in
        your .vimrc) or by pressing <code>&lt;C-w&gt;&lt;C-w&gt;</code>{' '}
        (control + &lsquo;w&rsquo; twice).{' '}
        <code>:split somefile.txt</code> will create a new viewport viewing
        somefile.txt and <code>:new</code> will split into an empty file. You
        can add a &lsquo;v&rsquo; in-front of the commands
        (<code>:vsplit</code> and <code>:vnew</code>) to create a vertical
        split instead. You can even create splits within splits and then
        adjust the divisions with the mouse, creating a completely custom
        division of your work space.  Though I have yet to find a good use for
        this, you can impress your friends by rotating the windows around by
        using <code>&lt;C-w&gt;r</code>.
      </p>
      <p>
        One of the newest features to Vim is tabs, which allow you to have
        multiple groupings of windows open. This would be as if firefox
        allowed you to open multiple pages within a single window{' '}
        <em>as well</em> as opening multiple tabs. To create a new tab,
        use <code>:tabnew</code>, which optionally accepts a filename to open
        in the tab. You may then switch between tabs using the mouse,{' '}
        <code>:tabn</code> or <code>gt</code> to move to the next tab and{' '}
        <code>:tabp</code> or <code>gT</code> to move to the previous. Combine
        with terminal emulation, tabs really allow you to perform all of your
        coding and system operations from a single shell running vim.
      </p>
      <h2 id="what-about-syntax-highlighting-and-indentation">
        What about syntax highlighting and indentation?
      </h2>
      <p>
        There are several commands that you can place in your{' '}
        <Link to="/writings/csc201-laboratory-vim/exercise-8-vimrc-file/">
          .vimrc
        </Link> that will assist you as you develop software. The first,{' '}
        <code>:syntax on</code> tells vim to highlight the syntax of whatever
        filetype you are working with. If you are working with a file whose
        type is not properly recognized, you can force a particular syntax by
        using a command similar to <code>:set syntax=php</code>. Though there
        are lots of ways to add or alter the color schemes, I tend to find
        that the default syntax highlighting is just fine until I use a
        terminal with a dark background. Using <code>:set bg=dark</code> fixes
        this, and <code>:set bg=light</code> will return it. To add additional
        PHP-specific highlighting, you can add{' '}
        <code>let php_sql_query=1</code> to highlight SQL within strings
        and <code>let php_htmlInStrings=1</code> to highlight HTML within
        strings to your .vimrc. You&rsquo;ll probably also find the{' '}
        <code>:set number</code> option to be friendly, as it adds line
        numbers to the current buffer.
      </p>
      <p>
        Indentation is controlled by a few commands, including{' '}
        <code>:set autoindent</code> which will indent your cursor for
        function definitions, for loops, etc. and automatically outdent
        (that&rsquo;s not a word) it when you reach the end of the block.{' '}
        <code>:set expandtab</code> makes the tab key insert a certain number
        of spaces rather than the tab character. This is a must if you ever
        plan to share your code as tabs will invariably appear at different
        lengths for different users. Two related options,{' '}
        <code>:set sts=2</code> (or <code>:set softtabstop=2</code>) and{' '}
        <code>:set sw=2</code> (or <code>:set shiftwidth=2</code>) declare how
        many spaces are in a tab/indentation. With both of these set to two,
        whenever I press the tab key or jump into a function, my cursor will
        be indented two spaces from where it was. The shiftwidth option is
        also used to determine how far to in-/outdent when using the{' '}
        <code>&gt;&gt;</code> or <code>&lt;&lt;</code> commands.
      </p>
      <h2 id="my-module-and-inc-files-dont-appear-as-php">
        My .module and .inc files don&rsquo;t appear as PHP?
      </h2>
      <p>
        Vim uses a very simple file-extension=&gt;filetype scheme to figure
        out how to highlight syntax, perform auto-completion, etc. Drupal (and
        some other PHP applications) prefer to include their PHP as .module
        and .inc files. This is easy enough to fix by adding and{' '}
        <code>autocmd</code> which will explicitly set the filetype whenever
        you load one of these files. Explicitly, you should add
      </p>
      <pre>
        <code>
          autocmd BufRead,BufNewFile *.module set filetype=php<br />
          autocmd BufRead,BufNewFile *.install set filetype=php<br />
          autocmd BufRead,BufNewFile *.inc set filetype=php
        </code>
      </pre>
      <p>
        to your .vimrc so that it associates .module, .install, and .inc files
        as PHP files.
      </p>
      <h2 id="how-do-i-use-external-commands-as-input-or-filters">
        How do I get and use code folding?
      </h2>
      <p>
        Vim has several configurations regarding code folding. If you are
        going to stick with PHP, the simplest folding mechanism is to add{' '}
        <code>let php_folding=1</code>, which folds class and function
        definitions such that
      </p>
      <pre>
        <code>
          function example($param)<br />
          {'{'}<br />
          {'    //  some functionality here'}<br />
          {'}'}
        </code>
      </pre>
      <p>
        will be turned into a single, expandable line{' '}
        <code>function example($param)</code>. Getting a bit more
        sophisticated, Vim offers several options for a fold method
        (<code>:set foldmethod=option</code>). You can set this to{' '}
        <code>indent</code> to fold for lines with equal indentation, which
        would be optimal for a language like Python. You could set it to{' '}
        <code>syntax</code> which folds based on the file-type for languages
        that support this (I do not believe vim&rsquo;s PHP support does). I
        use <code>:set foldmethod=marker</code> to indicate that I want folds
        to be based on a particular marker (sequence of characters). I then
        use <code>:set foldmarker={'{'},{'}'}</code>, which tells vim to
        create folds between every set of matching curly braces (which handles
        for loops, closures, etc. as well as class/function definitions).
        Finally, I use <code>:set foldlevel=1</code>, which makes it so that
        whenever I open a new php file, the outermost fold is open. This is
        great if you use a lot of PHP classes, because you&rsquo;ll want to
        see the class&rsquo; methods but not their implementation. If you are
        just using Drupal (which avoids class definitions), you will probably
        want to leave this to its default (0).
      </p>
      <p>
        Navigating folds is a snap. Use <code>zo</code> or the right arrow key
        to the fold which the cursor is on. Using <code>zO</code> will open
        not only the fold, but recursively open all folds within it.{' '}
        <code>zc</code> closes the current fold (from anywhere within it)
        while <code>zC</code> recursively closes to the highest level.{' '}
        <code>zR</code> opens all folds within the file. To manually create a
        fold, simple use <code>zf</code> + a movement. For example, you could
        create a fold of the next five lines with <code>zf5j</code> or the
        next paragraph with <code>zfap</code>. Note that when using a marker,
        vim will actually insert this marker into you code (thought it will
        attempt to comment the marker if possible), so be careful.
      </p>
      <h2 id="how-do-i-enableuse-code-completion">
        How do I enable/use code completion?
      </h2>
      <p>
        When in insert (or replace) mode, you can activate
        &ldquo;omnicompletion,&rdquo; which will do it&rsquo;s best to resolve
        the function, variable, etc. that you have started to type. For
        coders, you will generally use{' '}
        <code>&lt;C-x&gt;&lt;C-o&gt;</code> (that is, hold control and press
        x, then hold control and press o). This is easy to remember, just
        think about Vim giving you hugs and kisses (which it
        doesn&rsquo;t <em>generally</em> do. Omnicompletion will look through
        the dictionary of functions, variables, etc. and attempt to find the
        best for this situation, offering several as alternatives which can be
        selected via the arrow keys followed by <code>Enter</code> on the
        proper selection.  When flipping through the various function endings,
        you&rsquo;ll notice that a new scratch window opens, showing
        each&rsquo;s signature. This window will stay open so that you may
        complete your call.
      </p>
      <p>
        Before any of this can be useful, however, you must give Vim a proper
        dictionary of keywords, functions, etc. Vim provides a list of
        PHP-related terms which should be included when editing PHP files. To
        do this, include{' '}
        <code>au FileType php set omnifunc=phpcomplete#CompletePHP</code> in
        your .vimrc. This says that whenever the filetype gets set to php
        (usually when opening the file), include the standard library of PHP
        functions, keywords, etc.  Omnicompletion will also pay attention to
        methods, variables, etc.  found in the current file, and you can
        include your own library by include its tags (
        <a href="#and-how-do-i-jump-to-the-function-code-definition">
          learn more
        </a>). With tags, the current file, and the php library at your finger
        tips, you&rsquo;ll find that you won&rsquo;t need to Google &ldquo;php
        string methods&rdquo; or &ldquo;drupal hooks&rdquo; ever again.
      </p>
      <h2 id="and-how-do-i-jump-to-the-function-code-definition">
        And how do I jump to the function code definition?
      </h2>
      <p>
        Vim allows you to jump to the definitions of functions, classes, etc.
        so long as it is <em>aware</em> of their existence. Vim becomes aware
        of these definitions if they are coded in a standard format which is
        produced by the ctags (exuberant ctags) utility. Basically, this
        program will spit out a bunch of function, class, constant etc.
        definitions into a single file, which Vim can then load to figure out
        where to go when you want to learn more. For drupal/php work,
        I&rsquo;ve written a script which will generate a tags file for the
        current code branch by running{' '}
        <code>
          $ ctags --langmap=php:.php.module.inc --languages=php -R .
        </code> which says, &ldquo;include any file ending with .php, .module,
        or .inc as a php file,&rdquo; &ldquo;create tags for php only,&rdquo;
        and &ldquo;look at all of the files recursively within this
        directory.&rdquo; Running this command (it will take a moment)
        generates a file named &ldquo;tags,&rdquo; which Vim will check for.
        Instead of requiring this file be in the current directory and named
        &ldquo;tags,&rdquo; Vim allows you to define the tag file via the{' '}
        <code>:set tags=/path/to/file</code>.
      </p>
      <p>
        Once the tag files are loaded, you will have the included methods,
        constants, etc. available for{' '}
        <a href="#how-do-i-enableuse-code-completion">
          omnicompletion
        </a>, but you will also be able to jump the a function definition. To
        do this, move the cursor on top of the string in question and then
        run <code>&lt;C-w&gt;]</code>. This will cause the window to split,
        opening the file that defined the function (etc.) and jumping to the
        exact line of the definition. You may also type{' '}
        <code>&lt;C-]&gt;</code>, which will open the definition in the same
        viewport. This is particularly useful when debugging, as you can more
        or less follow the line of execution. You can then jump back (pop out
        of the definition) with the <code>&lt;C-t&gt;</code> command. Simple
        enough, right?
      </p>
      <p>
        The{' '}
        <a href="http://www.vim.org/scripts/script.php?script_id=273">
          Taglist
        </a> plugin uses a lot of the same mechanisms (using ctags as its
        backend), but figures the file classes, functions, etc. specifically
        for the files you are actively editing or have edited during this
        session. To turn this on, run <code>:TlistToggle</code>, which will
        open a vertical split with the taglist viewer on the left side. As you
        edit files, they will be added to the browser in that window, allowing
        you to quickly see the classes, etc. that you&rsquo;ve come across.
        This plugin has a very large number of options, notably{' '}
        <code>TList_Process_File_Always</code>, which tells the plugin to
        gather tag information even when it is not visible. To set this,
        add <code>let Tlist_Process_File_Always = 1</code> to your .vimrc. As
        with many of the other plugins, you will probably want to add a hotkey
        to display this list by adding something like{' '}
        <code>noremap &lt;F6&gt; :TlistToggle&lt;CR&gt;</code>. The tag list
        has plenty of additional options (including the ability to recursively
        add directories and the ability to save/restore existing tag lists),
        so see the help documentation for more.
      </p>
      <h2 id="how-can-i-check-for-syntax-errors-within-my-code">
        How can I check for syntax errors within my code?
      </h2>
      <p>
        Checking for syntax errors, or &ldquo;linting,&rdquo; prevents
        developers from wasting time testing a program/script that cannot
        work, and while clunky IDEs have included support for this for many
        languages, Vim has taken a more general approach. The basic idea is
        that you define the command line program which will lint over your
        source file using the <code>makeprg</code> option. For example, if
        using PHP, <code>:set makeprg=php\ -l\ %</code> will run the
        standard <code>php -l</code> command. This command will be ran
        whenever you run <code>:make</code>, which I strongly suggest
        mapping to some other key combination (e.g.{' '}
        <code>noremap &lt;F3&gt; :make&lt;CR&gt;</code> in your .vimrc). The
        output of this external program is then parsed for any errors using
        the <code>errorformat</code> option, which allows Vim to figure out
        which error, file, line number, column, etc. caused the error. If you
        set this up correctly, running <code>:make</code> will jump to the
        specific line which is causing a problem. For{' '}
        <code>php -l</code>. the error format should be something like{' '}
        <code>:set errorformat=%m\ in\ %f\ on\ line\ %l</code>. It&rsquo;d be
        a good idea to set these based on the filetype with the{' '}
        <code>au %FileType</code> command in your .vimrc;{' '}
        <code>au FileType php set makeprg=php\ -l\ %%</code> would cover PHP.
      </p>
      <h2 id="how-do-i-use-external-commands-as-inputs-or-filters">
        How do I use external commands as input or filters?
      </h2>
      <p>
        There are three basic ways to run external programs from within Vim
        (four, if you count an{' '}
        <a href="#what-do-i-need-to-run-a-shell-within-vim">
          embedded shell
        </a>). The first is to run an external program and review the output.
        You may want to quickly see which subversion branch the current file
        is on, for example, so you run <code>:!svn info</code>. As you can
        see, the syntax is pretty straight forward, just type a colon, an
        exclamation point (&ldquo;bang&rdquo;) and then the name of the
        command as you would from the command line. As such, great way to
        quickly check what is eating up your server would be to run{' '}
        <code>:!top</code>. As we&rsquo;ll see in just a moment, this form
        more or less drops you into a single, external command.
      </p>
      <p>
        Now, what if you want to take the output of an external command and do
        something useful with it, i.e. use it&rsquo;s output as input to your
        text editor?  Simple add an &lsquo;r&rsquo; before the bang and that
        program&rsquo;s output will be placed into the current buffer. For
        example, if I&rsquo;d like to find all source files that use a
        particular function, I can use{' '}
        <code>:r!grep &ldquo;;myfunc&rdquo;; -R .</code>; this becomes
        exceedingly useful when combined with the{' '}
        <code>&lt;C-w&gt;f</code> command, which will treat the string
        currently under the cursor as a file and try to open it.  I use this
        all the time to grab a big list of files which contain a given method
        call that I&rsquo;d like to refactor. I take that list of files, weed
        out any that don&rsquo;t apply (svn copies, similar function names,
        etc.) and then <code>?&lt;C-w&gt;f</code> each line to edit the
        corresponding function call.
      </p>
      <p>
        You can also use an external program as a filter for the text within
        your current buffer. This means that you will send selected text to
        some program and Vim will replace the text with the program&rsquo;s
        output.  To do this, select the text in visual mode and type{' '}
        <code>!command-name</code>. Say you need to quickly modify a chunk of
        code to wrap at 80 characters; highlight the code, then{' '}
        <code>!fmt</code> and everything will be snazzy. What if you have a
        CSV file which you&rsquo;d like to sort without importing it into Open
        Office? Open it in Vim, highlight all (<code>ggVG</code>) and then{' '}
        <code>!sort</code>. In both cases, you send the text in the filter to
        the external programs for processing.
      </p>
      <h2 id="what-do-i-need-to-run-a-shell-within-vim">
        What do I need to run a shell within vim?
      </h2>
      <p>
        There are several plugins that allow you to run a shell within vim,
        but I&rsquo;ve found{' '}
        <a href="http://www.vim.org/scripts/script.php?script_id=2771">
          Conque Shell
        </a> to be the best. You will need Vim compiled with Python (which is
        probably the case unless you compiled it yourself). The idea behind
        running a Conque Shell is that you split your window (or re-use an
        existing viewport) to run a particular shell, whether that be bash (an
        obvious choice), mysql/psql, an interpreter, or any other command-line
        program. To open an instance of top, simply type{' '}
        <code>:ConqueTerm top</code>. If you started to type that and then
        tried tab-completion, good call! To make it even faster, we can create
        a simple key binding. I use F5, so my .vimrc includes{' '}
        <code>noremap &lt;F5&gt; :ConqueTermSplit bash&lt;CR&gt;</code>. While
        in the shell, insert/append mode will type to the shell&rsquo;s
        program. You can, however, press <code>ESC</code> to enter command
        mode and move around the shell&rsquo;s output as if it were a text
        document. Cool stuff!
      </p>
      <h2 id="#is-there-some-sort-of-file-browser">
        Is there some sort of file browser?
      </h2>
      <p>
        As with the{' '}
        <a href="#what-do-i-need-to-run-a-shell-within-vim">
          embedded shell
        </a>, there are multiple file browser plugins for Vim, but the most
        popular is{' '}
        <a href="http://www.vim.org/scripts/script.php?script_id=1658">
          NERD tree
        </a>. This plugin will create a vertical split when the{' '}
        <code>:NERDTree</code> command is invoked, displaying a list of files
        and folders in the current directory. If you double-click (or
        press <code>Enter</code>) on one of these files, it will open in the
        most recently accesses viewport. Doing the same on a folder will
        expand that folder so that you may select its subdirectories or files.
        The interface is remarkably intuitive (especially for Vim) to the
        point where point-and-click will accomplish 99% of what you need.
        There is a lot of advanced functionality, including the ability to add
        bookmarks and a plethora of key-bindings (<code>F</code> toggles
        showing hidden files, <code>A</code> toggles a maximized window,
        etc.), but I will leave you to look at the help pages to discover them
        all. As with the embedded shell, you will probably want to tie this to
        a specific hotkey, adding something like{' '}
        <code>noremap &lt;F4&gt; :NERDTree&lt;CR&gt;</code> to your .vimrc.
      </p>
    </div>
  );
}
