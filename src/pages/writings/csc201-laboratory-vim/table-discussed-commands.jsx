import { Link } from 'gatsby';
import React from 'react';

import Layout, { writingsSidebar } from '../../../layouts';
import './csc201-laboratory-vim.css';

export default function DiscussedCommands() {
  return (
    <Layout sidebar={writingsSidebar} title="Table of Discussed Commands">
      <table>
        <thead>
          <tr>
            <th>Mode</th>
            <th>Command</th>
            <th>Outcome</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Any</td>
            <td>&lt;Escape&gt;</td>
            <td>Enter Command mode</td>
          </tr>
          <tr>
            <td>Command</td>
            <td>i</td>
            <td>Enter Insert mode</td>
          </tr>
          <tr>
            <td>Any</td>
            <td>&lt;Arrow Keys&gt;</td>
            <td>
              Move the cursor in the direction pointed<br />
              by the arrow key
            </td>
          </tr>
          <tr>
            <td>Any</td>
            <td>&lt;Page Up/Down&gt;</td>
            <td>Move the cursor one page up or down</td>
          </tr>
          <tr>
            <td>Any</td>
            <td>&lt;Home/End&gt;</td>
            <td>Move the cursor to start or end of a line</td>
          </tr>
          <tr>
            <td>Command</td>
            <td>w</td>
            <td>Move forward one word</td>
          </tr>
          <tr>
            <td>Command</td>
            <td>b</td>
            <td>Move back one word</td>
          </tr>
          <tr>
            <td>Command</td>
            <td>)</td>
            <td>Move forward one sentence</td>
          </tr>
          <tr>
            <td>Command</td>
            <td>(</td>
            <td>Move back one sentence</td>
          </tr>
          <tr>
            <td>Command</td>
            <td>{'}'}</td>
            <td>Move forward one paragraph</td>
          </tr>
          <tr>
            <td>Command</td>
            <td>{'{'}</td>
            <td>Move back one paragraph</td>
          </tr>
          <tr>
            <td>Command</td>
            <td><em>x</em>[movement]</td>
            <td>
              Move movement <em>x</em> times<br />
              <em>Ex. 15{'}'} moves us 15 paragraphs forward</em>
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>c[movement]</td>
            <td>
              &ldquo;Change&rdquo; - Deletes everything within the next<br />
              movement away and enters insert mode<br />
              <em>
                Ex. c3w deletes the next 3 words and<br />
                enters insert mode
              </em>
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>d[movement]</td>
            <td>
              Delete movement and add them to the<br />
              buffer (described in section 5)<br />
              <em>Ex. d4) deletes 4 sentences</em>
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td><em>x</em>d[movement]</td>
            <td>Equivalent to d<em>x</em>movement</td>
          </tr>
          <tr>
            <td>Command</td>
            <td>u</td>
            <td>
              Undo previous changes<br />
              (i.e. move back through undo history)
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>&lt;Ctrl&gt;-r</td>
            <td>
              Redo previously undone changes<br />
              (i.e. move forward through undo history)
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>0</td>
            <td>Equivalent to &lt;Home&gt;</td>
          </tr>
          <tr>
            <td>Command</td>
            <td>$</td>
            <td>Equivalent to &lt;End&gt;</td>
          </tr>
          <tr>
            <td>Command</td>
            <td><em>x</em>x</td>
            <td>
              Delete <em>x</em> characters and add them to<br />
              the buffer (described in section 5)<br />
              <em>Ex. 5x deletes 5 characters</em>
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td><em>x</em>~</td>
            <td>
              Changes the case of the next <em>x</em> letters,<br />
              non-letters (whitespace, numbers, etc.)<br />
              <em>Ex. 15~ reverses the case of the next<br /> 15 letters</em>
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>r[key]</td>
            <td>Replace the character under the cursor with [key]</td>
          </tr>
          <tr>
            <td>Command</td>
            <td>R</td>
            <td>Enter Replace mode</td>
          </tr>
          <tr>
            <td>Command</td>
            <td>&lt;Insert&gt;</td>
            <td>Enter Insert mode</td>
          </tr>
          <tr>
            <td>Insert</td>
            <td>&lt;Insert&gt;</td>
            <td>Enter Replace mode</td>
          </tr>
          <tr>
            <td>Command</td>
            <td>A</td>
            <td>
              Append - Move cursor to end of current line and<br />
              enter Insert mode
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>o</td>
            <td>
              Open - Create a new line under the current line,<br />
              move the cursor to it, and enter Insert mode
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>O</td>
            <td>
              Open - Create a new line above the current line,<br />
              move the cursor to it, and enter Insert mode
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td><em>x</em>dd</td>
            <td>
              Delete <em>x</em> lines and place them in the buffer<br />
              Similar to &ldquo;cut&rdquo;<br />
              <em>Ex. 5dd deletes the next 5 lines</em>
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td><em>x</em>cc</td>
            <td>
              Delete <em>x</em> lines and enter Insert mode<br />
              <em>
                Ex. 2cc deletes the next 2 lines and enters<br />Insert mode
              </em>
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>p</td>
            <td>
              Place whatever is in the buffer (&ldquo;clipboard&rdquo;)<br />
              after the cursor. If the buffer contains a line or<br />
              more, place the contents of the buffer on the line<br />
              following the current line.
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>P</td>
            <td>
              Place whatever is in the buffer (&ldquo;clipboard&rdquo;)<br />
              before the cursor. If the buffer contains a line or<br />
              more, place the contents of the buffer on the line<br />
              above the current line.
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>y[movement]</td>
            <td>
              Yank movement (add it to the buffer)<br />
              Similar to &ldquo;copy&rdquo;<br />
              <em>Ex. y4w yanks 4 words</em>
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td><em>x</em>yy</td>
            <td>
              Yanks <em>x</em> (places them in the buffer)<br />
              Similar to &ldquo;copy&rdquo;<br />
              <em>Ex. 5yy yanks the next 5 lines</em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:<em>x</em></td>
            <td>Jump to line <em>x</em></td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:w [filename]</td>
            <td>
              Write (&ldquo;save&rdquo;) curent editing session to<br />
              filename. If no filename is specified,<br />
              write to the document associated with this<br />
              session (the last file written to, opened from, etc.)
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:q</td>
            <td>
              Quit the current editing session.<br />
              ViM will not quit if you have not saved.
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:wq [filename]</td>
            <td>
              Write (&ldquo;save&rdquo;) curent editing session to<br />
              filename and then quit. If no<br />
              filename is specified, write to the<br />
              document associated with this session (the<br />
              last file written to, opened from, etc.)
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:e [filename]</td>
            <td>
              Edit - Open filename using the current<br />
              editing window. This closes the current file.
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:[command]! [arguments]</td>
            <td>
              Force - Perform the command regardless<br />
              of any rammifications<br />
              <em>
                Ex. :q! Quits the session whether or not the<br />
                file has been saved.
              </em>
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:[command]a [arguments]</td>
            <td>All - Perform the command to all open<br /> windows</td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:split [filename]</td>
            <td>
              Opens a new editing session in a new &ldquo;window&rdquo;<br />
              to edit filename. If filename is<br />
              blank, open the current document.
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>&lt;Ctrl&gt;-w &lt;Ctrl&gt;-w</td>
            <td>Move cursor to next window (vertically)</td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:help [keystroke]</td>
            <td>
              Shows help for given keystroke in new<br />
              window. If no topic is given, show<br />
              generic help screen.
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:help :[command]</td>
            <td>
              Shows help for given command in new<br />
              window. If no topic is given, show<br />
              generic help screen.
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:help [topic]</td>
            <td>
              Shows help for given topic in new<br />
              window. If no topic is given, show<br />
              generic help screen.
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>/[searchTerm]</td>
            <td>
              Searches forward for regular expressions that<br />
              match searchTerm and places cursor on<br />
              the next match
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>?[searchTerm]</td>
            <td>
              Searches backward for regular expressions that<br />
              match searchTerm and places cursor on<br />
              the next match
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>*</td>
            <td>
              Searches forward for the word that is currently<br />
              under the cursor
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>n</td>
            <td>
              Place cursor on next match for the most recent<br />
              search
            </td>
          </tr>
          <tr>
            <td>Command</td>
            <td>N</td>
            <td>
              Place cursor on previous match for the most<br />
              recent search
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set ignorecase</td>
            <td>
              In all searches/regular expressions, be case<br />
              insensitive
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:set noignorecase</td>
            <td>
              In all searches/regular expressions, be case<br />
              sensitive (Default)
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:s/<em>oldWord</em>/<em>newWord</em>/g</td>
            <td>
              Replace all <em>oldWord</em>s with the <em>newWord</em><br />
              on this line
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:%s/<em>oldWord</em>/<em>newWord</em>/g</td>
            <td>
              Replace all <em>oldWord</em>s with the <em>newWord</em><br />
              in this file
            </td>
          </tr>
          <tr>
            <td>Execute</td>
            <td>:%s/<em>oldWord</em>/<em>newWord</em>/gc</td>
            <td>
              Replace all <em>oldWord</em>s with the <em>newWord</em><br />
              in this file, asking for confirmation on each entry
            </td>
          </tr>
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
          <Link to="/writings/csc201-laboratory-vim/further-sources/">
            &lt; Further Sources
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/credits-license/">
            Credits and License &gt;
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
