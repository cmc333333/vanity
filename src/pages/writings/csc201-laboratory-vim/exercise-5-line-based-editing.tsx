import { Link } from "gatsby";
import * as React from "react";

import Layout, { writingsSidebar } from "../../../layouts";
import "./csc201-laboratory-vim.css";

const LineBasedEditing: React.FC = () => (
  <Layout sidebar={writingsSidebar} title="Exercise 5: Line-Based Editing">
    <p>
      This is all fine and dandy, but, even in notepad we can select, copy,
      delete, etc. multiple lines at once; how can we perform these operations
      in ViM? We&rsquo;ll discuss selecting several lines at a time later, but
      we now discuss how to delete a line. Please move your cursor to the fourth
      line and type
    </p>
    <pre>
      <code>dd</code>
    </pre>
    <p>
      Just like that the line is gone. Notice the similarity between
      &ldquo;dw&rdquo; and &ldquo;dd&rdquo;; in general, if a command required a
      movement (such as &lsquo;d&rsquo;, &lsquo;c&rsquo;, and soon
      &lsquo;y&rsquo;), we can perform the operation on an entire line by
      repeating that command. After moving to the first line, please delete all
      three lines in one command. See the table below if you forget how.
    </p>
    <p>
      Ah! All our precious work is gone! We could retype it...
      <br />
      ...
      <br />
      ...
      <br />
      ...
      <br />
      or, I could tell you that &ldquo;delete&rdquo; operations
      (&lsquo;d&rsquo;) are actually more equivalent to &ldquo;cut&rdquo;
      operations than their name would appear. To &ldquo;paste&rdquo; what we
      just cut, try
    </p>
    <pre>
      <code>p</code>
    </pre>
    <p>
      Perhaps unexpectedly, the lines previously deleted are placed on the
      second line rather than the first. Try alternative version of paste,
      &lsquo;P&rsquo;. How are these commands different? If you are unsure, try
      deleting one line and pasting it near the middle of the document first
      with &lsquo;p&rsquo; and then &lsquo;P&rsquo;.
    </p>
    <p>
      A command that is related to &ldquo;delete&rdquo; is &ldquo;yank&rdquo;
      the equivalent of &ldquo;copy&rdquo;. Yank (&lsquo;y&rsquo;) operates
      identically to &lsquo;d&rsquo;, except the words, lines, etc. that you
      copy are not deleted. Try rearranging the three lines with combinations of
    </p>
    <pre>
      <code>yy</code>
    </pre>
    <p>
      and &lsquo;p&rsquo;. It might be useful to note that the paste, yank, and
      delete operations work with any movement (we can paste words, letters
      (after deleting with &lsquo;x&rsquo;, for example), lines, etc.). Please
      delete any duplicate lines and rearrange the words within one of the lines
      using only delete, yank, and paste.
    </p>
    <p>
      It&rsquo;s important that we stop here to note that the buffer that ViM
      copies and pastes from is <em>not</em> the operating system&rsquo;s
      buffer. Hence, you cannot copy text from this webdocument and paste it
      into ViM with the &lsquo;p&rsquo; command (this is a bit misleading, as it{" "}
      <em>is</em> possible since ViM has several dozen buffers, including one
      that has access to the system buffer, but for simplicity, let&rsquo;s
      assume it does not). If we need to copy information from another program,
      a simple solution is to enter insert mode and use the terminal&rsquo;s
      paste operation (or middle-click).
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
          <td>
            <em>x</em>dd
          </td>
          <td>
            Delete <em>x</em> lines and place them in the buffer
            <br />
            Similar to &ldquo;cut&rdquo;
            <br />
            <em>Ex. 5dd deletes the next 5 lines</em>
          </td>
        </tr>
        <tr>
          <td>Command</td>
          <td>
            <em>x</em>cc
          </td>
          <td>
            Delete <em>x</em> lines and enter Insert mode
            <br />
            <em>
              Ex. 2cc deletes the next 2 lines and enters
              <br />
              Insert mode
            </em>
          </td>
        </tr>
        <tr>
          <td>Command</td>
          <td>p</td>
          <td>
            Place whatever is in the buffer (&ldquo;clipboard&rdquo;)
            <br />
            after the cursor. If the buffer contains a line or
            <br />
            more, place the contents of the buffer on the line
            <br />
            following the current line.
          </td>
        </tr>
        <tr>
          <td>Command</td>
          <td>P</td>
          <td>
            Place whatever is in the buffer (&ldquo;clipboard&rdquo;)
            <br />
            before the cursor. If the buffer contains a line or
            <br />
            more, place the contents of the buffer on the line
            <br />
            above the current line.
          </td>
        </tr>
        <tr>
          <td>Command</td>
          <td>y[movement]</td>
          <td>
            Yank movement (add it to the buffer)
            <br />
            Similar to &ldquo;copy&rdquo;
            <br />
            <em>Ex. y4w yanks 4 words</em>
          </td>
        </tr>
        <tr>
          <td>Command</td>
          <td>
            <em>x</em>yy
          </td>
          <td>
            Yanks <em>x</em> (places them in the buffer)
            <br />
            Similar to &ldquo;copy&rdquo;
            <br />
            <em>Ex. 5yy yanks the next 5 lines</em>
          </td>
        </tr>
      </tbody>
    </table>
    <ul>
      <li>
        <Link to="/writings/csc201-laboratory-vim/exercise-4-revisiting-insert-mode/">
          &lt; Exercise 4: Revisiting Insert Mode
        </Link>
      </li>
      <li>
        <Link to="/writings/csc201-laboratory-vim/exercise-6-execute-mode-files/">
          Exercise 6: Execute Mode and Files &gt;
        </Link>
      </li>
    </ul>
  </Layout>
);
export default LineBasedEditing;
