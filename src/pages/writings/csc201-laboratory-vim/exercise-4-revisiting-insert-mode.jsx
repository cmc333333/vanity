import { Link } from 'gatsby';
import React from 'react';

import Layout from '../../../layouts';
import setPageTitle from '../../../util/set-page-title';
import './csc201-laboratory-vim.css';

export default function RevisitingInsertMode() {
  return (
    <Layout>
      { setPageTitle('Exercise 4: Revisiting Insert Mode') }
      <p>
        Now that we&rsquo;ve covered some more command mechanics, I&rsquo;d
        like to mention a few more means of editing text. The &lsquo;i&rsquo;
        command is only the most basic method of entering insert mode; as
        we&rsquo;ve already seen, using the &lsquo;c&rsquo;hange command to
        replace whole words is much more efficient when editing rather than
        producing documents. A related command is the replace command, which
        comes in two formats. Move your cursor to the word &ldquo;Fyre&rdquo;
        on the fourth line. We could fix this misspelling by trying cw to
        change the word, but a more efficient method requires that we place
        the cursor over the y and type
      </p>
      <pre><code>ri</code></pre>
      <p>
        We should parse this command into two strokes, &lsquo;r&rsquo;, which
        enters temporary replace mode and &lsquo;i&rsquo;, the letter that will
        replace the character at the cursor position. It&rsquo;s important to
        note that there is no immediate feedback when initially pressing
        &lsquo;r&rsquo;; this is because the &lsquo;r&rsquo; command is
        specifically designed to be used for one-character changes. A more
        substantive mode is the &ldquo;Replace&rdquo; mode (the &lsquo;R&rsquo;
        command), which overwrites the character at the current cursor position.
        If you are familiar with MS-Word, this will resemble turning off
        insertion editing when pressing the Insert key. Let&rsquo;s test this
        mode:
      </p>
      <pre><code>R</code></pre>
      <p>
        Notice the &ldquo;-- REPLACE --&rdquo; notification. You can still
        maneuver around as you can in Insert or Command modes, so please move to
        the first character in the word &ldquo;Joy&rdquo; and type
        &ldquo;Ice&rdquo;. Simple, eh? Press escape to exit Replace mode. We can
        move around more quickly in command mode, so let&rsquo;s move to the
        word &ldquo;Spike&rdquo; in one key stroke. How can we do that again?
        Now, enter Replace mose to edit the word &ldquo;Spike&rdquo; and replace
        it with &ldquo;Toast&rdquo;. Now try to replace the word
        &ldquo;Ice&rdquo; with &ldquo;Huge&rdquo;. Do the results surprise you?
        We can also enter Replace mode from within Insert mode by pressing the
        &ldquo;Insert&rdquo; key. For example, enter insert mode
        (&lsquo;i&rsquo;) and then press the &ldquo;Insert&rdquo; key, noticing
        that the &ldquo;-- INSERT --&rdquo; has become &ldquo;-- REPLACE
        --&rdquo; in the lower left corner.
      </p>
      <p>
        We now quickly discuss two other methods of inserting text which you
        will find useful while editing code. Neither is especially complex, but
        both save quite a bit of time after a long coding session. Let&rsquo;s
        begin by moving to the word &ldquo;The&rdquo; on the first line. Try the
        command,
      </p>
      <pre><code>A</code></pre>
      <p>
        You will see that we&rsquo;ve entered insert mode and placed the cursor
        at the end of the line. The command we entered stands for Append, which
        is extremely useful for syntactical mistakes. For example, let&rsquo;s
        add a period at the end of the line. Next, try to add some more words at
        the end of the fourth line. Notice that this command can be called
        anywhere on the line you wish to edit.
      </p>
      <p>
        Next we learn the &ldquo;open&rdquo; command, which is a bit misleading
        as it allows us to &ldquo;open&rdquo; a line rather than a file. After
        placing the cursor anywhere on the third line, type the command
      </p>
      <pre><code>o</code></pre>
      <p>
        As you can see, we create a new line below the line the cursor was
        originally on and enter insert mode. A related command, &lsquo;O&rsquo;
        performs the same operation by opening a line above the cursor&rsquo;s
        line. As you become more familiar with ViM, you will come to understand
        the relations between lower-case commands and their upper-case siblings.
        For now let&rsquo;s just exit insert mode and undo any lines we opened.
        Do you remember the command to undo?
      </p>
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
        </tbody>
      </table>
      <ul>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-3-simple-editing/">
            &lt; Exercise 3: Simple Editing
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-5-line-based-editing/">
            Exercise 5: Line-Based Editing &gt;
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
