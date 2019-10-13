import { Link } from 'gatsby';
import React from 'react';

import Layout from '../../../layouts';
import setPageTitle from '../../../util/set-page-title';
import './csc201-laboratory-vim.css';

export default function ProgrammingVim() {
  return (
    <Layout>
      { setPageTitle('Exercise 9: Programming with ViM') }
      <p>
        Though ViM was designed to be a multifunctional text editor, it is
        probably most useful as a coding tool. As such, it implements several
        useful features, such as auto-indent, code folding, and code
        highlighting. Many of these are options that somewhat alter the way
        ViM is acting; they may be placed in your .vimrc if you want them to
        always be set, or can be set in any particular editing session.
        Let&rsquo;s look first at the options and then at the key commands.
      </p>
      <p>
        <em>Nice indentation</em> - The default indentation for most text
        editors (including ViM) is a tab character. While that is very simple,
        it has the tremendous problem that when it is printed, a tab is
        expanded into <em>eight</em> spaces. That&rsquo;s quite ridiculous if
        you have code that has deep indentation.  Here&rsquo;s a rather spiffy
        solution for this problem, using ViM that I <em>strongly</em> suggest
        you place in your .vimrc.
      </p>
      <pre>
        <code>
          :set softtabstop=2<br />
          :set shiftwidth=2<br />
          :set noexpandtab
        </code>
      </pre>
      <p>
        The &ldquo;:set softtabstop=2&rdquo; or &ldquo;:set sts=2&rdquo; tells
        ViM that when you press the tab key, it should insert 2 spaces. To any
        editing or viewing tools (including the printer), the tabs your insert
        are replaced with two space characters. However, while editing, ViM
        will treat both spaces as if they were one single tab character,
        allowing you to delete them in one stroke.  &ldquo;:set
        shiftwidth=2&rdquo; or &ldquo;:set sw=2&rdquo; informs ViM that
        whenever it performs any automatic indentation, such as the
        &ldquo;&gt;&gt;&rdquo; operation (see below), it should use only 2
        spaces. Finally &ldquo;:set noexpandtab&rdquo; (which may not be
        required as it is the default) tells ViM that tabs should not be
        expanded into spaces while editing. If &ldquo;:set expandtab&rdquo;
        were used, ViM would not treat your tab-presses as single characters,
        but would expand them into spaces. All of these commands prevent you
        from adding the tab character if you need to (i.e. in a Makefile). If
        you ever need to enter an actual tab character, you need to
        specifically tell ViM this. While in Insert mode, press Ctrl-v and
        then press Tab to enter a tab character.
      </p>
      <p>
        <em>Syntax highlighting</em> - Let&rsquo;s get a hands-on
        demonstration with this example. Please open one of the .c files you
        have been working on.  Now, in ViM type
      </p>
      <pre><code>:syntax on</code></pre>
      <p>
        Isn&rsquo;t that pretty? ViM looks at the file extention to try to
        guess which type of syntax highlighting it should use, so if you open
        an html document, its highlighting will be different than a c header.
        You can also explicitly set the syntax highlighting system by using
        &ldquo;:set syntax=java&rdquo; (or some other file format). See
        &ldquo;:help &lsquo;syntax&rsquo;&rdquo; for more information.
      </p>
      <p>
        <em>Numbered Lines</em> - It&rsquo;s often useful to have quick access
        to line numbers, especially when debugging. For this feature, there is
        an option,
      </p>
      <pre><code>:set number</code></pre>
      <p>
        which will number every line. Note that the numberings require
        characters on the left, and your terminal will not resize itself.
        Luckily, if you&rsquo;ve set wm to 4 or 5, you shouldn&rsquo;t have
        any wrapped lines. If this becomes a problem, you may be interested in
        the &lsquo;numberwidth&rsquo; option (see help pages). How could we
        turn this option off?
      </p>
      <p>
        <em>Automatic Indentation</em> - Though I don&rsquo;t use these
        parameters, you might find &ldquo;:set smartindent&rdquo; and
        &ldquo;:set cindent&rdquo; to be useful operations. The first tells
        ViM to indent after any lines that end with &lsquo;{'{'}&rsquo; or
        after certain keywords (such as for, while, etc.). It also matches the
        indent for a closing brace with its corresponding open brace.
        &lsquo;cindent&rsquo; takes this formatting a step further, but is a
        bit more specific to c and c-like languages, especially dealing with
        their particular formating conventions and keywords. As you likely
        have realized from your earlier experience, Unix facilities tend to
        favor several small, efficient programs rather than one large program.
        As such, ViM uses the standard gnu tools such as gcc, make, gdb, etc.
        To run these tools from within ViM, you can use the command-bang
        syntax (I don&rsquo;t know the <em>real</em> name of this sequence,
        but &ldquo;command-bang&rdquo; is a nice pneumonic). Try the command
      </p>
      <pre><code>:!ls</code></pre>
      <p>
        Next, try the command-bang ls with some flags, such as
        &ldquo;-l&rdquo;. Using command-bang tells ViM to execute the command
        in a new shell, which allows us to have access to the entire operating
        system from within ViM.  For example, we could run firefox with
      </p>
      <pre><code>:!firefox &amp;</code></pre>
      <p>
        As you will likely be using ViM to code, you will probably want to
        call your program and your compiler. For example, it&rsquo;s common to
        use the following
      </p>
      <pre><code>:!gcc progName.c -g -Wall -o progName</code></pre>
      <p>
        Which compiles the program at <em>progName.c</em> and outputs the
        resulting program to <em>progName</em>. You can then execute your
        program with
      </p>
      <pre><code>:!./progName</code></pre>
      <p>
        And, if you wanted to be really slick{' '}
        <em>and you watch for compile errors</em>, you could even try
      </p>
      <pre><code>:!gcc progName.c -g -Wall -o progName; ./progName</code></pre>
      <p>
        which performs all of these operations in a single step. As ViM
        provides a history, we can just type &ldquo;:!&rdquo; and up-arrow
        until we reach the command. It may be useful also to note that within
        execute mode, the &lsquo;%&rsquo; symbol represents the current file.
        Hence we could write the compile instruction as
      </p>
      <pre><code>:!gcc % -g -Wall -o progName</code></pre>
      <p>
        <em>Warning</em>: You will accidentally overwrite your .c file if you
        use &ldquo;-o <em>progName.c</em>&rdquo;. Though you should be as
        careful as possible, ViM saves a &ldquo;swap&rdquo; file as you are
        working (of the form &ldquo;.<em>fileName</em>.swp&rdquo; so that if
        ViM closes unexpected, you can recover the changes you made. This swap
        file method also alerts you if the file you are working on has been
        overwritten, and allows you to return to the version of the file that
        you&rsquo;ve been working on, which you can then save. I strongly
        suggest you don&rsquo;t rely solely on this mechanism, however, as the
        swap files are not intended for this use, and disappear after you end
        a ViM session.
      </p>
      <p>
        Now we move on to in-program commands that are quite useful while
        editing. We begin with quick indentation, which you should remember
        from the Emacs lab. In the open c file, place your cursor anywhere on
        a line that is within a code block (i.e. within braces). Type
      </p>
      <pre><code>&gt;&gt;</code></pre>
      <p>
        Notice that the indent is equal to two spaces (or however much the
        shiftwidth option is set to). We can revert by using the reverse
        (&ldquo;&lt;&lt;&rdquo;). This is all quite nice, but often enough
        we&rsquo;ll need to indent <em>many</em> lines as functions tend to be
        multi-line entities. How do you think we could indent 5 lines using
        &ldquo;&lt;&lt;&rdquo;? How about 5000 (which will likely indent the
        rest of the file)? As shifting is a movement operation, we can perform
        it several times exactly how we did with other commands, i.e.
      </p>
      <pre><code>x&gt;&gt;</code></pre>
      <p>where <em>x</em> is the number of lines to indent.</p>
      <p>
        Next, we note a very useful movement command, the match-paren command.
        Move to the opening bracket for a code block within your file. Please
        press
      </p>
      <pre><code>%</code></pre>
      <p>
        What just happened? It may not be immediately obvious if you are using
        syntax highlighting (because syntax highlighting also highlights the
        matching parenthesis), but try moving the cursor up or down to see
        where you are. Move back to the closing paren and press
        &lsquo;%&rsquo; again. How could we combine this with delete or copy?
      </p>
      <p>
        Though &lsquo;%&rsquo; is pretty useful for moving through
        multi-functioned files, I find it most useful in conjunction with
        code-folding, a feature that condenses (&ldquo;folds&rdquo;) multiple
        lines of a text document into one so that you can stop worrying about
        their inner details. Move to the opening bracket for a function and
        type
      </p>
      <pre><code>zf%</code></pre>
      <p>
        Let&rsquo;s parse this command. The &lsquo;z&rsquo; alerts ViM that it
        will be working with one of a series of fold-related (mostly)
        commands. See &ldquo;:help z&rdquo; for more information. The
        &lsquo;f&rsquo; tells ViM that it should create a fold that includes
        all text passed over with the next movement command.  Using
        &lsquo;%&rsquo; as a movement command folds the entire function and it
        moves the cursor to the opening brace&rsquo;s corresponding closing
        brace. Move your cursor to the fold, which is indicated by a
        &ldquo;+--&rdquo; at the beginning of the line and special
        highlighting. Now we open the fold with
      </p>
      <pre><code>zo</code></pre>
      <p>
        i.e. &ldquo;fold-open&rdquo;. What do you think the corresponding
        &ldquo;close&rdquo; command would be? Yep, &ldquo;zc&rdquo; will close
        the fold. Try this command anywhere within the function to see how ViM
        responds. These folds will continue to exist only for your editing
        session, so if you split a file, you may use a different set of folds
        for each editing session. Folding is a very complex (though useful)
        feature. Please read &ldquo;:help folding&rdquo; for more specifics.
      </p>
      <table>
        <thead>
          <tr><th>Mode</th><th>Command</th><th>Outcome</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Execute</td>
            <td>:set sts=[Value]</td>
            <td>
              Tabs will be treated as Value spaces<br />
              <em>Ex. :set sts=4</em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set sw=[Value]</td>
            <td>
              Shifts (&ldquo;&gt;&gt;&rdquo;) will be treated as<br />
              Value spaces<br />
              <em>Ex. :set sw=4</em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set expandtab</td>
            <td>
              Expands each tab press into as &lsquo;sts&rsquo; spaces<br />
              <em>Ex. :set noexpandtab</em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:syntax [on/off]</td>
            <td>
              Turns syntax highlighting on or off<br />
              <em>Ex. :syntax on</em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set syntax=[Value]</td>
            <td>
              Tells ViM which syntax to highlight<br />
              <em>Ex. :set syntax=php</em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set number</td>
            <td>Turns line numbering on</td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set smartindent</td>
            <td>
              Tells ViM to use &ldquo;smart indenting&rdquo; which<br />
              includes indenting after certain characters<br />
              (like &lsquo;{'{'}&rsquo;). See help page for more
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set cindent</td>
            <td>
              Tells ViM to use &ldquo;c indenting&rdquo; which includes<br />
              the indentation in &lsquo;smartindent&rsquo; as well as<br />
              after certain c keywords and structures. See<br />
              the help page for more
            </td>
          </tr>
          <tr>
            <td>Cmd-Bang</td>
            <td>:![Command]</td>
            <td>
              Execute the external Command<br />
              <em>Ex. :!ls -a lists all files in the current directory</em>
            </td>
          </tr>
          <tr>
            <td>Cmd-Bang</td>
            <td>:!gcc <em>progName.c</em> -g -Wall</td>
            <td>
              Uses the external gcc to compile <em>progName.c</em><br />
              <em>Ex. :!gcc calc1.c -g -Wall</em>
            </td>
          </tr>
          <tr>
            <td>Cmd-Bang</td>
            <td>:!./<em>progName</em></td>
            <td>
              Runs the file, <em>progName</em>, which is in the<br />
              current directory<br />
              <em>Ex. :!./a.out runs the output of gcc</em>
            </td>
          </tr>
          <tr>
            <td>Cmd-Bang</td>
            <td>%</td>
            <td>
              Used as a placeholder for the current file&rsquo;s name<br />
              <em>Ex. :!echo % prints the file name</em>
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td><em>x</em>&gt;&gt;</td>
            <td>
              Shift the next <em>x</em> lines &lsquo;sw&rsquo; characters right
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td><em>x</em>&lt;&lt;</td>
            <td>
              Shift the next <em>x</em> lines &lsquo;sw&rsquo; characters left
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>%</td>
            <td>Move to the matching paren/brace</td>
          </tr>
          <tr>
            <td>Command</td>
            <td>zf[Movement]</td>
            <td>
              Make a new fold of the next Movement lines<br />
              <em>Ex. zf{'}'} creates a fold of the next paragraph</em>
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>zc</td>
            <td>Closes the fold that the cursor is in</td>
          </tr>
          <tr>
            <td>Command</td>
            <td>zo</td>
            <td>Opens the fold that the cursor is on</td>
          </tr>
          <tr>
            <td>Insert</td>
            <td>&lt;Ctrl-v&gt;[Key]</td>
            <td>
              Insert the leteral Key character<br />
              <em>Ex. &lt;Ctrl-v&gt;&lt;Tab&gt; inserts a tab character</em>
            </td>
          </tr>
        </tbody>
      </table>
      <ul>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-8-vimrc-file/">
            &lt; Exercise 8: The .vimrc File
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/list-some-other-useful-features/">
            A list of Some Other Useful Features &gt;
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
