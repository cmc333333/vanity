import { Link } from "gatsby";
import * as React from "react";

import Layout, { writingsSidebar } from "../../../layouts";
import "./csc201-laboratory-vim.css";

const MovingAround: React.FC = () => (
  <Layout sidebar={writingsSidebar} title="Exercise 2: Moving Around">
    <p>
      In both insert and command mode, movement keys include those that one
      would generally expect. The arrow keys move the cursor on their associated
      direction, Home jumps to the beginning of the line the cursor is currently
      on, End, jumps to the end of the current line, Page Up and Down are aptly
      named, and so forth. In command mode, however, we have additional means of
      moving around our text; these are very important as almost all actions in
      ViM can be used with a particular movement. First, arrow your way to the
      upper-left corner of the document (we&rsquo;ll set up the mouse soon
      enough). Now press
    </p>
    <pre>
      <code>w</code>
    </pre>
    <p>
      Notice that your cursor jumped to the second word, &ldquo;ccow.&rdquo;
      This is because the &lsquo;w&rsquo; key moves you forward one word. This
      may seem pointless, but let us now combine it with insert mode. Type
    </p>
    <pre>
      <code>cw</code>
    </pre>
    <p>
      You have entered the &ldquo;change&rdquo; command and given it a
      direction. The &ldquo;change&rdquo; command deletes everything that was in
      the location you specified (here a &lsquo;word&rsquo;) and places you into
      insert mode. Type &ldquo;cow&rdquo; to modify this phrase, and then escape
      from insert mode. Please return your cursor to the beginning of the first
      line in command mode. It&rsquo;s nice to move forwards or backwards (with
      the &lsquo;b&rsquo; rather than &lsquo;w&rsquo; key) by a word at a time,
      but that&rsquo;s not very efficient. ViM solves this problem by allowing
      almost all movement keys the option of a given scaler that tells the
      program to execute that command x number of times. For example, try
    </p>
    <pre>
      <code>3w</code>
    </pre>
    <p>
      Your cursor should have moved to &ldquo;ovverr&rdquo;. This makes perfect
      sense as we jumped to &ldquo;cow&rdquo; (1w), &ldquo;jumpedd&rdquo; (2w),
      and finally &ldquo;ovverr&rdquo; (3w). In fact, we can combine the scaler
      notation with almost all commands. Try moving to the beginning of
      &ldquo;jumpedd&rdquo; with the command by typing 8 followed by the
      left-arrow key.
    </p>
    <p>
      Of course, we are not limited to movement only by characters, lines, and
      words. Move your cursor to somewhere in the middle of the second line and
      press
    </p>
    <pre>
      <code>)</code>
    </pre>
    <p>
      What do you think this command means? Try it again. Do the results
      surprise you? Continue pressing &lsquo;)&rsquo; until you reach the end of
      the document and then try &lsquo;(&rsquo; until you reach the top. Can you
      guess what the &lsquo;(&rsquo; and &lsquo;)&rsquo; commands mean? These
      move the cursor a &ldquo;sentence&rdquo; forwards or backwards, where a
      sentence is defined as ending with &lsquo;.&rsquo;, &lsquo;?&rsquo;, or
      &lsquo;!&rsquo; followed by an end-of-line, space, or tab. Though we
      don&rsquo;t have any paragraphs to work with the &lsquo;{"{"}&rsquo; and
      &lsquo;{"}"}&rsquo; commands work analogously for paragraphs, where a
      &ldquo;paragraph&rdquo; is defined as the text between empty lines (i.e.
      blank line, text, text, text, blank line). ViM was designed with these
      somewhat unnatural (for now) movement commands, so we will be seeing them
      in combination with many other commands below. How would we combine the
      &ldquo;change&rdquo; command with the paragraph motion? From the third
      line, how could we move to the end of the document using one command that
      involves &lsquo;)&rsquo;?
    </p>
    <p>
      <em>&lt;Hint&gt;</em> Two strokes, beginning with a number
      <em>&lt;\Hint&gt;</em>
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
          <td>Any</td>
          <td>&lt;Arrow Keys&gt;</td>
          <td>
            Move the cursor in the direction pointed
            <br />
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
          <td>{"}"}</td>
          <td>Move forward one paragraph</td>
        </tr>
        <tr>
          <td>Command</td>
          <td>{"{"}</td>
          <td>Move back one paragraph</td>
        </tr>
        <tr>
          <td>Command</td>
          <td>
            <em>x</em>[movement]
          </td>
          <td>
            Move movement <em>x</em> times
            <br />
            <em>Ex. 15{"}"} moves us 15 paragraphs forward</em>
          </td>
        </tr>
        <tr>
          <td>Command</td>
          <td>c[movement]</td>
          <td>
            &ldquo;Change&rdquo; - Deletes everything within the next
            <br />
            movement away and enters insert mode
            <br />
            <em>
              Ex. c3w deletes the next 3 words and
              <br />
              enters insert mode
            </em>
          </td>
        </tr>
      </tbody>
    </table>
    <ul>
      <li>
        <Link to="/writings/csc201-laboratory-vim/exercise-1-insert-mode/">
          &lt; Exercise 1: Insert Mode
        </Link>
      </li>
      <li>
        <Link to="/writings/csc201-laboratory-vim/exercise-3-simple-editing/">
          Exercise 3: Simple Editing &gt;
        </Link>
      </li>
    </ul>
  </Layout>
);
export default MovingAround;
