import { Link } from 'gatsby';
import React from 'react';

import Layout from '../../../layouts';
import setPageTitle from '../../../util/set-page-title';

export default function Intro() {
  return (
    <Layout>
      { setPageTitle('CSC201 Laboratory: ViM') }
      <p>
        In this lab, we will be working with the versatile open-source editor,
        ViM. This program, which is available for all major operating systems
        is one of the most powerful editors around, and is specifically
        designed to make editing much faster and more efficient.
        Unfortunately, to achieve this status, ViM has a bit of a learning
        curve, especially up front. Once you can master the major concepts,
        however, it should be very easy to edit more productively, and to
        discover how to become even more proficient over time. To paraphrase
        the program&rsquo;s creator, Bram Moolenaar, ViM is designed so that
        any dull, repetitive task could be automated with the least amount of
        effort.
      </p>
      <ul>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-1-insert-mode/">
            Exercise 1: Insert Mode
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-2-moving-around/">
            Exercise 2: Moving around
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-3-simple-editing/">
            Exercise 3: Simple Editing
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-4-revisiting-insert-mode/">
            Exercise 4: Revisiting Insert Mode
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-5-line-based-editing/">
            Exercise 5: Line-Based Editing
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-6-execute-mode-files/">
            Exercise 6: Execute Mode and Files
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-7-searching-substituting/">
            Exercise 7: Searching and Substituting
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-8-vimrc-file/">
            Exercise 8: The .vimrc File
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/exercise-9-programming-vim/">
            Exercise 9: Programming with ViM
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/list-some-other-useful-features/">
            A List of Some Other Useful Features
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/further-sources/">
            Further Sources
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/table-discussed-commands/">
            Table of Discussed Commands
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/credits-license/">
            Credits and License
          </Link>
        </li>
      </ul>
    </Layout>
  );
}
