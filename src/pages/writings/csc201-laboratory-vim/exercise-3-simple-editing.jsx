import { Link } from 'gatsby';
import React from 'react';

import Layout from '../../../layouts';
import './csc201-laboratory-vim.css';

export default function SimpleEditing() {
  return (
    <Layout title="Exercise 3: Simple Editing">
      <p>
        We begin with the &ldquo;delete&rdquo; command. As with most commands,
        this takes a movement parameter. Please maneuver your cursor to the
        word &ldquo;a&rdquo; on the second line of our example text. We delete
        this word by typing
      </p>
      <pre><code>dw</code></pre>
      <p>
        That is, delete word. Next, please navigate to the word
        &ldquo;fun&rdquo; and delete it using only &lsquo;w&rsquo; and
        &ldquo;dw&rdquo;. Now, delete the word &ldquo;paper&rdquo; using only
        two commands, one to move to the word and a second to delete it. Are
        you getting the hang of moving by words?
      </p>
      <p>
        Next, return the cursor to the first letter of the first
        &ldquo;do&rdquo; word in the line. Though we won&rsquo;t take this
        route, how could we fix this typo using a scaler version of
        &ldquo;cw&rdquo;? Instead, we will perform a similar operation and
        delete all four words with the command
      </p>
      <pre><code>4dw</code></pre>
      <p>
        <em>&lt;Aside&gt;</em> 4dw literally means (delete word) four times;
        and equivalent statement would be d4w delete (4 words). In ViM, there
        are several different methods of performing the same operation; you
        will learn which method feels right for you.<em>&lt;/Aside&gt;</em>
        Wait! We have made a mistake! What can we do? Of course, ViM has a
        solution, the Undo command (&lsquo;u&rsquo;). Please revert the text
        to include two &ldquo;do not&rdquo;s with the Undo command.
      </p>
      <p>
        This line still is not correct, however, so let&rsquo;s fix it by
        deleting the two words &ldquo;do not&rdquo;. How could we do that with
        one command? This version looks a little better, but I&rsquo;m not
        sure. Try undo-ing again. Actually, the version with only one
        &ldquo;do not&rdquo; looks correct, so let&rsquo;s redo our undo with
        the Redo command (Ctrl-r). Whew. Much better.
      </p>
      <p>
        Let&rsquo;s move our cursor to the beginning of the
        &ldquo;sOMEBODY&rdquo; line. Type the &lsquo;End&rsquo; key, followed
        by the &lsquo;Home&rsquo; key to return to the start of the line
        we&rsquo;ve been working on. &lsquo;End&rsquo; and &lsquo;Home&rsquo;
        were not standard when Vi (a predecessor to ViM) was created, so an
        alternative (and much more widely used) version of the end-of-line
        command is the &lsquo;$&rsquo; key, while the start-of-line command is
        &lsquo;0&rsquo;. Try it now. As &lsquo;$&rsquo; is a motion, we can
        combine it with the delete and change commands. Try deleting
        everything after the first period.
      </p>
      <p>
        Our next objective is to learn some single character commands. We
        begin with deletion of one character with a single stroke (d-&lt;right
        arrow&gt; has too many key strokes, after all). Move your cursor to
        the second d in &ldquo;jumpedd&rdquo; on the first line. Type
      </p>
      <pre><code>x</code></pre>
      <p>
        This should delete the single character. Fix &ldquo;ovverr&rdquo;
        through the same method. The &lsquo;x&rsquo; command is also a form of
        movement, so we can use it to delete several character at a time if
        needed. For example, try to delete two ms from &ldquo;mmmoon&rdquo;
        with the
      </p>
      <pre><code>2x</code></pre>
      <p>
        command. Try to get rid of the os as well. How can we undo this
        mistake?
      </p>
      <p>
        We can also modify the case for a given character with the
        &lsquo;~&rsquo; (tilda) command. Move your cursor to
        &ldquo;sOMEBODY&rdquo; and press
      </p>
      <pre><code>~</code></pre>
      <p>
        Notice that tilda not only inverts the case, but also moves the cursor
        forward, hence we can keep pressing tilda until &ldquo;sOMEBODY&rdquo;
        is fixed. Please move the cursor to &ldquo;THIS LINE&rdquo; using only
        word movement. How could we fix the case of &ldquo;THIS LINE&rdquo;
        using only one command (two key strokes)? <em>&lt;Hint&gt;</em> Both
        &lsquo;x&rsquo; and &lsquo;~&rsquo; operate immediately on exactly one
        character. Think of the 2x example and test what the &lsquo;~&rsquo;
        command does to a space<em>&lt;/Hint&gt;</em>
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
        </tbody>
      </table>
      <ul>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-2-moving-around/">
            &lt; Exercise 2: Moving Around
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-4-revisiting-insert-mode/">
            Exercise 4: Revisiting Insert Mode &gt;
          </Link>
        </li>
      </ul>
    </Layout>
  );
}

