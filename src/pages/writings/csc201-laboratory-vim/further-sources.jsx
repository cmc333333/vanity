import Link from 'gatsby-link';
import React from 'react';

import setPageTitle from '../../../util/set-page-title';

export default function FurtherSources() {
  return (
    <div>
      { setPageTitle('Further Sources') }
      <p>
        Many of the examples were borrowed and modified from the examples
        given in vimtutor, a program that is installed with vim that provides
        a (somewhat outdated) tutorial on how to use ViM. For more
        information, run vimtutor from the terminal.
      </p>
      <p>
        Of course, a wonderful place to read more information about ViM is
        ViM&rsquo;s <a href="http://www.vim.org">website</a>, which includes
        links to the online{' '}
        <a href="http://www.vim.org/docs.php">documentation</a> (including
        help files), information on how to join the{' '}
        <a href="http://www.vim.org/maillist.php">mailing lists</a> (and as
        questions, and a wide variety of{' '}
        <a href="http://www.vim.org/scripts/index.php">ViM Scripts</a>).
      </p>
      <p>
        Bram Moolenaar (creator of ViM) gave a Google TechTalk titled{' '}
        <a href="http://www.youtube.com/watch?v=p6K4iIMlouI">
          7 Habits for Effective Text Editing
        </a>, which is really quite awesome. It describes an array of useful
        features within ViM and discusses a bit of the editor&rsquo;s
        philosophy.
      </p>
      <p>
        Two of the most useful ViM resources are right on this campus!
        I&rsquo;d like to thank Dr. Rebelsky and Dr. Davis for their help on
        this project and mention that they are huge resources of ViM
        knowledge. If you want to know how to do something and you
        aren&rsquo;t sure how to search for the proper solution, odds are one
        of these fine folks will be able to point you in the right direction.
      </p>
      <ul>
        <li>
          <Link to="/writings/csc201-laboratory-vim/list-some-other-useful-features/">
            &lt; A List of Some Other Useful Features
          </Link>
        </li>
        <li>
          <Link to="/writings/csc201-laboratory-vim/table-discussed-commands/">
            Table of Discussed Commands &gt;
          </Link>
        </li>
      </ul>
    </div>
  );
}
