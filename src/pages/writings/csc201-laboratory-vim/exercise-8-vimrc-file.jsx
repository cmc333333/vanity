import { Link } from 'gatsby';
import React from 'react';

import Layout, { writingsSidebar } from '../../../layouts';
import './csc201-laboratory-vim.css';

export default function VimrcFile() {
  return (
    <Layout sidebar={writingsSidebar} title="Exercise 8: The .vimrc File">
      <p>
        As you learned with your introduction to Emacs, many Unix programs
        read from a configuration file at startup. ViM&rsquo;s startip file is
        stored in the home directory as &ldquo;.vimrc&rdquo;. Let&rsquo;s open
        that file to edit it.
      </p>
      <pre><code>:e! ~/.vimrc</code></pre>
      <p>
        The syntax of the .vimrc file is identical to what you would enter in
        execute mode, save that we can skip the colon if we want to. For
        example, let&rsquo;s open the .vimrc file every time we run vim. To be
        perfectly explicit, I stress that we must press the insert key:
      </p>
      <pre><code>i:e ~/.vimrc OR<br />ie ~/.vimrc</code></pre>
      <p>
        Now quit ViM and open it again with no parameters. ViM will give you
        an odd message from the command line (this command is not quite what
        the .vimrc is for); you can continue the program by pressing [Enter].
        Notice that opening ViM with no parameters jumps to the .vimrc file.
        Close ViM.  What happens when we open ViM with another text file (such
        as the typo&rsquo;d file we started with) as a parameter?
      </p>
      <p>
        Let&rsquo;s fix our .vimrc file to something a bit more useful. Before
        we list any of the following useful options, it&rsquo;s important to
        note that you can search the help manuals for a particular option with
        the &ldquo;:help &lsquo;<em>option</em>&rsquo;&rdquo; syntax,
        where <em>option</em> is the name of the option we&rsquo;d like more
        information on. Please select any of the options below to enter into
        your .vimrc, placing each entry on a separate line. Boolean options
        can be set and unset while running ViM with the following syntax
      </p>
      <pre><code>:set option<br />:set nooption</code></pre>
      <p>Arguments that require parameters can be set with</p>
      <pre><code>:set option=[Value]</code></pre>
      <p>
        <em>ignorecase</em> - &ldquo;set ignorecase&rdquo; alerts ViM that all
        searches should be case insensitive. Note that, if you do not want to
        ignore case while searching you do <em>not</em> need to put &ldquo;set
        noignorecase&rdquo; as the default behaviour of ViM is to be case
        sensitive.
      </p>
      <p>
        <em>mouse</em> - &ldquo;set mouse=a&rdquo; tells ViM that you want to
        make use of the mouse in all modes. ViM can use the mouse in a
        terminal if you are running Linux, BSD, or Windows. Unfortunately, the
        Mac terminal does not support the mouse very well, so to use the mouse
        on a Mac, you will need to use gViM. As we&rsquo;ve alluded before,
        the mouse can be used to select large chunks of contiguous information
        (see visual mode below) and can be used to switch between editing
        sessions. When working with split sessions, you can also adjust the
        size of each session by dragging the appropriate divider.
      </p>
      <p>
        <em>wrap margin</em> - &ldquo;set wrapmargin=<em>x</em>&rdquo; or
        &ldquo;set wm=<em>x</em>&rdquo; where <em>x</em> is a small number (I
        use 4) tells ViM to automatically wrap your text while typing. If this
        parameter is not set, your text will likely appear to span several
        lines, but not include actual newline characters (therefore in any
        other editor or printing, the characters will be botched). A very
        simple test for a multi-line-in-ViM entry is whether, when arrowing
        through the document, the cursor appears to skip over lines. The
        numeric parameter tells ViM how many characters from the end of the
        window it should start wrapping words.
      </p>
      <p>
        <em>background</em> - &ldquo;set background=dark&rdquo; or &ldquo;set
        background=light&rdquo; informs ViM that the terminal it is being run
        in has a dark or light background. This is useful for syntax and other
        types of highlighting, as it makes the highlighting much easier to
        read.
      </p>
      <p>
        <em>backspace</em> - &ldquo;set backspace=2&rdquo; is an odd but
        useful command that alerts ViM that the user should be able to
        backspace through auto-indentation (see the next section), through
        newline characters, and past the beginning of an insert-mode session.
        This command makes ViM feel a bit more comfortable as it will feel
        more like a standard editor.
      </p>
      <p>
        <em>whichwrap</em> - &ldquo;set whichwrap=b,s,&lt;,&gt;,[,]&rdquo; or
        &ldquo;set ww=b,s,&lt;,&gt;,[,]&rdquo; informs ViM that it should wrap
        movements that involve the left and right arrow keys. Like the{' '}
        <em>backspace</em> option, this is set largely to make ViM a bit more
        friendly. For more information, look at &ldquo;:help
        &lsquo;ww&rsquo;&rdquo;.
      </p>
      <p>
        <em>autoindent</em> - &ldquo;set autoindent&rdquo; will be very useful
        when programming, but arises in all sort of editing situations. More
        or less, this setting makes ViM copy the indentation of the current
        line when opening a new line, either explicitly (&lsquo;o&rsquo;) or
        by word-wrapping or pressing &ldquo;[Enter]&rdquo; while in Insert
        mode. ViM <em>should</em> have this by default, but I think it&rsquo;s
        important to mention anyway.
      </p>
      <table>
        <thead>
          <tr><th>Mode</th><th>Command</th><th>Outcome</th></tr>
        </thead>
        <tbody>
          <tr>
            <td>Execute</td>
            <td>:set <em>option</em></td>
            <td>
              Set the boolean option, <em>option</em> to true<br />
              <em>Ex. :set ignorecase</em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set no<em>option</em></td>
            <td>
              Set the boolean option, <em>option</em> to false<br />
              <em>Ex. :set noignorecase</em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set <em>option</em>=[Value]</td>
            <td>
              Set the option, <em>option</em>, to [Value]<br />
              <em>Ex. :set wm=5</em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set ignorecase</td>
            <td>Ignores case while searching</td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set mouse=[Value]</td>
            <td>
              Allows the mouse to be an input in Value<br />
              is &ldquo;a&rdquo;, or nothing if Value is &ldquo;&rdquo;<br />
              <em>Ex. :set mouse=a</em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set wm=[Value]</td>
            <td>
              Set the word margin (the character position<br />
              from the right at which point ViM wraps<br />
              words) to Value<br />
              <em>Ex. :set wm=5</em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set bg=[Value]</td>
            <td>
              Tell ViM the terminal&rsquo;s background color<br />
              so that it may highlight appropriately<br />
              <em>Ex. :set bg=dark</em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set bs=[Value]</td>
            <td>
              Tell ViM how to deal with backspaces.<br />
              Value can be either a comma separated<br />
              list or a numeric value (see help pages)<br />
              <em>Ex. :set backspace=2</em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set ww=[Value]</td>
            <td>
              Informs ViM which characters wrap around a<br />
              newline. See the help pages for specifics<br />
              <em>Ex. :set ww=b,s,&lt;,&gt;,[,]</em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set autoindent</td>
            <td>
              If this option is set, whenever you press<br />
              [Enter] or open a new line, the indentation<br />
              of the previous line is used for the new line
            </td>
          </tr>
        </tbody>
      </table>
      <ul>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-7-searching-substituting/">
            &lt; Exercise 7: Searching and Substituting
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-9-programming-vim/">
            Exercise 9: Programming with ViM &gt;
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
