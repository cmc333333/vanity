import { Link } from "gatsby";
import * as React from "react";

import Layout, { writingsSidebar } from "../../../layouts";

const UsefulFeatures: React.FC = () => (
  <Layout
    sidebar={writingsSidebar}
    title="A List of Some Other Useful Features"
  >
    <p>
      The following is a list of spiffy features and a short explaination.
      Please look at{" "}
      <Link to="/writings/csc201-laboratory-vim/further-sources/">
        Further Sources
      </Link>{" "}
      for more information.
    </p>
    <ul>
      <li>
        <em>&lt;Ctrl&gt;-g</em> - Pressing these keys while in command mode
        gives additional information about the file we are working on, including
        the file name, modification status, and the number of lines.
      </li>
      <li>
        <em>&lt;Shift&gt;-g</em> - While in command mode, this movement places
        the cursor at the end of the file. As this is a movement command, it
        allows you to combine it with any command that uses motion. For example,
        we could delete the rest of a document with
        &ldquo;d&lt;Shift&gt;-g&rdquo;.
      </li>
      <li>
        <em>Spell Checking</em> - ViM has a built in spell checker. You can turn
        it on by using &ldquo;:set spell&rdquo;. Unfortunately, spell
        highlighting does not work too well with other types of highlighting, so
        you may need to turn on syntax highlighting. Words that are misspelled
        are highlighted in red. If you move the cursor to the word and type
        &ldquo;z=&rdquo; in command mode, you will get an interface for
        correcting the misspelled word. See &ldquo;:help spell&rdquo; for more
        information about spelling, particularly a large set of additional
        commands.
      </li>
      <li>
        <em>Using marks</em> - ViM allows you to make &ldquo;marks&rdquo; in
        your text files, where a &ldquo;mark&rdquo; is a particular point within
        a file that you&rsquo;d like to return to often. To mark a line of a
        file with the &lsquo;a&rsquo; mark, move the cursor to that line and
        type &ldquo;ma&rdquo;. You may only use marks a-z. To return to the a
        mark within a text file, type &ldquo;&lsquo;a&rdquo;. Marks are
        persistent between sessions (by default), so you can close ViM and then
        reopen the file and have access to the same marks.
      </li>
      <li>
        <em>Visual Mode</em> - In command mode, pressing &lsquo;v&rsquo; causes
        you to enter Visual Mode. This mode allows you to access large blocks of
        text using the arrow keys. You can then yank, delete, or change the
        block with the same commands that are used in command mode. If you have
        set up your mouse, clicking and highlighting enters Visual Mode.
      </li>
      <li>
        <em>The Paste option</em> - If you have autoindent set and you are
        copying data from a source that uses its own indentation, it can be
        extremely frustrating to paste in ViM because the autoindent indents the
        lines automatically, but so too does the source. One solution to this is
        the &lsquo;paste&rsquo; option. If you use &ldquo;:set paste&rdquo;
        before pasting a chunk of text, ViM will ignore special indentation
        procedures. Typing &ldquo;:set nopaste&rdquo; afterwards returns
        auto-indentation.
      </li>
      <li>
        <em>Working with Ranges</em> - Most of our commands that take movement
        parameters (such as delete, yank, etc.) also provide the option of
        accepting ranges of information. For example, the &lsquo;,&rsquo;
        character represents &ldquo;here&rdquo; so that &ldquo;y,20&rdquo; yanks
        all the text from where the cursor is through line twenty. Similarly,
        the &lsquo;$&rsquo; character represents the end of file so that
        &ldquo;y,$&rsquo; yanks everything from here until the end of the file
        (like &ldquo;y&lt;Shift&gt;-g&rdquo;)
      </li>
      <li>
        <em>Using External Filters</em> - ViM provides the option of sending
        chunks of your text file to an external filter and replacing it with the
        result of said filter. If you have a program that replaces all
        &lsquo;a&rsquo;s with &lsquo;e&rsquo;s, then you could send the next
        paragraph of information to that program with &ldquo;!{"}"}
        <em>progName</em>&rdquo;. Parsing this command, we see that
        &lsquo;!&rsquo; tells ViM it will be working with an external filter,
        &lsquo;{"}"}&rsquo; informs ViM to send the next paragraph, and{" "}
        <em>progName</em> is the name of the program that will be used to filter
        information. Good examples of this command include &ldquo;!{"}"}
        fmt&rdquo; which automatically wraps words at 75 characters and fills
        the paragraphs as fully as it can, &ldquo;!{"}"}sort&rdquo; which sorts
        the data, and &ldquo;!{"}"}wc&rdquo;, which gives a word count (you may
        want to undo after running &ldquo;!{"}"}wc&rdquo;.
      </li>
      <li>
        <em>Opening Multiple Files from the Command Line</em> - As with most
        Unix software, ViM can be given several files as parameters and knows
        how to handle each. Perhaps unexpectedly, ViM will not open each file in
        a new ViM windows. Instead, ViM will open each file in succession. You
        may switch to the next file via the &ldquo;:next&rdquo; or
        &ldquo;:n&rdquo; command. For example, we could start ViM with
        &ldquo;vim *&rdquo;, which will open each file in the current directory
        in ViM and then &ldquo;:n&rdquo; through them until we &ldquo;:q&rdquo;
        the last one.
      </li>
    </ul>
    <ul>
      <li>
        <Link to="/writings/csc201-laboratory-vim/exercise-9-programming-vim/">
          &lt; Exercise 9: Programming with ViM
        </Link>
      </li>
      <li>
        <Link to="/writings/csc201-laboratory-vim/further-sources/">
          Further Sources &gt;
        </Link>
      </li>
    </ul>
  </Layout>
);
export default UsefulFeatures;
