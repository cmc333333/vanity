import { Link } from 'gatsby';
import React from 'react';

import Layout, { writingsSidebar } from '../../../layouts';
import './csc201-laboratory-vim.css';

export default function ExecuteModeFiles() {
  return (
    <Layout sidebar={writingsSidebar} title="Exercise 7: Searching and Substituting">
      <p>
        Searching and substitution are essential to any application that works
        with large quantities of editable text. Of course, ViM provides
        facilities for these operations and even extends the standard
        assortment with an understanding of regular expressions. This
        certainly is not the time to discuss this important term, but I
        can&rsquo;t pass <em>too</em> many opportunities to glorify ViM. But
        back to searching. Please open a new file with the following contents
      </p>
      <pre>
        <code>
          Peter Piper picked a peck of peckled pippers.<br />
          Did Peter Piper pick a peck of peckled pippers?<br />
          If Peter Piper picked a peck of peckled pippers,<br />
          where&rsquo;s the peck of peckled pippers Peter Piper picked?
        </code>
      </pre>
      <p>
        Remember that to copy text from another source and paste it into ViM
        we copy the text, enter insert mode, and then use the terminal to
        paste. Please move the cursor to the upper left-hand corner of the
        document. We will now search for &ldquo;pick&rdquo; using the forwards
        search command:
      </p>
      <pre><code>/pick</code></pre>
      <p>
        ViM&rsquo;s cursor has moved to the first instance of
        &ldquo;pick&rdquo;, which is in the first line as
        &ldquo;picked&rdquo;. We&rsquo;d like to look at the next match, so
        type
      </p>
      <pre><code>n</code></pre>
      <p>
        Now ViM has moved us to the next match, which happens to be in the
        second line. Try to use the next-match command (&lsquo;n&rsquo;) a few
        more times, noting what happens when there are no more entries in the
        document. An alternative to the next-match command is the
        previous-match command, (&lsquo;N&rsquo;). Similarly an alternative to
        forwards search (&lsquo;/&rsquo;) is the backwards search,
        &lsquo;?&rsquo;. Do &lsquo;n&rsquo; and &lsquo;N&rsquo; operate how
        you expect them to when backwards searching? In certain cases, it may
        be exceedingly useful to search for the word that is currently under
        the cursor. For example, if we wanted to search for all instances of
        &ldquo;of&rdquo; we could move to the &ldquo;of&rdquo; in the first
        line and type
      </p>
      <pre><code>*</code></pre>
      <p>
        Next, try searching for &ldquo;pIcK&rdquo;. Why do you think ViM
        responds the way it does? Personally, I prefer my searches to be case
        insensitive. To tell ViM to ignore case when searching, use the
        following command, which will be explained further in the next
        exercise:
      </p>
      <pre><code>:set ignorecase</code></pre>
      <p>
        Try searching for &ldquo;pIcK&rdquo; again. If you prefer searching
        with case sensitivity, we can go back to the default setting by typing
      </p>
      <pre><code>:set noignorecase</code></pre>
      <p>
        Ignorecase is a boolean option. We will discuss options in more detail
        in the next section.
      </p>
      <p>
        ViM also has a built-in search-and-replace command, but the syntax is
        rather clanky. Read &ldquo;:help :s&rdquo; for more information, but
        the gist of this command are noted in the table at the end of this
        section. To fix all of the &ldquo;peckled&rdquo;s to
        &ldquo;pickled&rdquo;s, then, we would type
      </p>
      <pre><code>:%s/peckled/pickled/g</code></pre>
      <p>
        Even I find these commands very hard to remember, but luckily there is
        a (in my opinion) a simpler way. Use the &lsquo;/&rsquo; command to
        search for &ldquo;pipper&rdquo;. Once you hit your first match, use
        the change-word command to convert the &ldquo;pipper&rdquo; into a
        &ldquo;pepper&rdquo;. Now next-match to the next &ldquo;pipper&rdquo;
        and press
      </p>
      <pre><code>.</code></pre>
      <p>
        While in command mode, the &lsquo;.&rsquo; character is used to repeat
        the last editing command (&ldquo;delete 20 lines&rdquo;, &ldquo;paste
        twice&rdquo;, etc.), and as the last command change-worded the word to
        &ldquo;pepper&rdquo;, &lsquo;.&rsquo; will do the same. Use this group
        of commands to fix the rest of the document, and if you are interested
        in ViM&rsquo;s methods of repeating tasks, please refer to :help
        repeating.
      </p>
      <table>
        <thead>
          <tr><th>Mode</th><th>Command</th><th>Outcome</th></tr>
        </thead>
        <tbody>
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
        </tbody>
      </table>
      <ul>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-6-execute-mode-files/">
            &lt; Exercise 6: Execute Mode and Files
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-8-vimrc-file/">
            Exercise 8: The .vimrc File &gt;
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
