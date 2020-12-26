import { Link } from "gatsby";
import * as React from "react";

import Layout, { writingsSidebar } from "../../../layouts";
import "./csc201-laboratory-vim.css";

const InsertMode: React.FC = () => (
  <Layout sidebar={writingsSidebar} title="Exercise 1: Insert Mode">
    <p>
      Unlike Emacs, gedit, notepad, etc., ViM was designed with the idea of
      &ldquo;modes&rdquo; of editing. This means that the same strokes may
      result in different outcomes based on the mode that you are currently in.
      This may seem confusing, but it should make more sense soon. Let&lsquo;s
      get started.
    </p>
    <pre>
      <code>$ vim</code>
    </pre>
    <p>
      We start in &ldquo;command mode.&rdquo; This is the default mode for the
      text editor and the mode in which most of ViM&rsquo;s features are
      implemented. No matter what action we are performing, we can always press
      Escape to finish or cancel the current operation and return to command
      mode. This mode allows you to manipulate text very quickly, but does not
      provide for means to create new text. For that we should enter
      &ldquo;insert mode.&rdquo; To do so, press &lsquo;i&rsquo;:
    </p>
    <pre>
      <code>i</code>
    </pre>
    <p>
      First, notice that, in the lower left-hand corner, you should see
      &ldquo;-- INSERT --&rdquo;, which gives you an indication of your current
      mode. Insert mode is very similar to the default interface in Emacs or the
      only interfaces in Notepad, gedit, etc. Each stroke that you type will be
      written to the screen. Try writing the following (with typos):
    </p>
    <pre>
      <code>
        The ccow jumpedd ovverr thhe mmmoon[Return]
        <br />
        There are a some words fun that do not do not belong paper in this
        sentence.[Return]
        <br />
        sOMEBODY typed the end of THIS LINE twice. end of this line
        twice.[Return]
        <br />
        Spike Excellent Joy Fyre
      </code>
    </pre>
    <p>
      Now press escape to return to command mode. Notice first that the cursor
      appears to move back one character when entering command mode from insert
      mode. This is because when we are inserting, the cursor is placed at the
      position of the next character that will be written, while in command
      mode, we want to operate on the characters already written, so we cannot
      operate on a space where no character exists.
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
          <td>&lt;Escape&gt;</td>
          <td>Enter Command mode</td>
        </tr>
        <tr>
          <td>Command</td>
          <td>i</td>
          <td>Enter Insert mode</td>
        </tr>
      </tbody>
    </table>
    <ul>
      <li>
        <Link to="/writings/csc201-laboratory-vim/">
          &lt; CSC 201 Laboratory: ViM
        </Link>
      </li>
      <li>
        <Link to="/writings/csc201-laboratory-vim/exercise-2-moving-around/">
          Exercise 2: Moving around &gt;
        </Link>
      </li>
    </ul>
  </Layout>
);
export default InsertMode;
