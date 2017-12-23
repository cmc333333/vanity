import Link from 'gatsby-link';
import React from 'react';

import setPageTitle from '../../util/set-page-title';

export default function Writings() {
  return (
    <div>
      { setPageTitle('Writings') }
      <div>
        <p>
          <Link to="/writings/csc201-laboratory-vim/">
            CSC201 Laboratory: ViM
          </Link>
        </p>
        <p>
          In this lab, we will be working with the versatile open-source
          editor, ViM. This program, which is available for all major
          operating systems is one of the most powerful editors around, and is
          specifically designed to make editing much faster and more
          efficient.  Unfortunately, to achieve this status, ViM has a bit of
          a learning curve, especially up front. Once you can master the major
          concepts, however, it should be very easy to edit more productively,
          and to discover how to become even more proficient over time.
        </p>

        <p><Link to="/writings/vim-faq/">Vim FAQ</Link></p>
        <p>
          This is a bit of an addendum to my original{' '}
          <Link to="/writings/csc201-laboratory-vim/">introduction</Link> to
          Vim and a glimpse into some of its more advanced features. This also
          serves as a reference for anyone interested in a lightning talk I
          gave at the July 2010{' '}
          <a
            href="http://cdmug.org/"
            rel="noreferrer noopener"
            target="_blank"
          >
            CDMUG
          </a>. I tried to spend that entire presentation wowing the crowd
          rather than teaching them how the Vimpossible can be accomplished.
        </p>

        <p>
          <Link to="/writings/programming-languages-web-developers/">
            Programming Languages for Web Developers
          </Link>
        </p>
        <p>
          I consider myself a programming languages connoisseur; I truly love
          to pick up new languages, take them for a spin, and pick apart their
          salient structures. Different languages offer different tools for
          problem solving, often suggesting more concise and elegant paradigms
          depending on the situation. Web developers (myself included) need to
          understand the trade offs used in different languages and systems to
          chose the cleanest, most efficient solution to the problems we face
          every day.
        </p>

        <p>
          <Link to="/writings/drupal-web-service/">Drupal as a Web Service</Link>
        </p>
        <p>
          I gave a{' '}
          <a
            href="http://2009.drupalcampchicago.org/sessions/drupal-web-service"
            rel="noreferrer noopener"
            target="_blank"
          >
            talk
          </a>
          {' at '}
          <a
            href="http://2009.drupalcampchicago.org/"
            rel="noreferrer noopener"
            target="_blank"
          >
            Drupal Camp Chicago 2009
          </a> discussing how to connect other applications to your Drupal
          site by turning it in to a web service. The talk had pretty good
          attendance, and I thought someone recorded it, but I cannot find
          that anywhere online. Instead, I&lsquo;m in the process of
          converting the talk into an web accessible format which will
          hopefully serve as an adequate reference.
        </p>

        <p>
          <Link to="/writings/what-does-php-53-mean-drupal/">
            What Does PHP 5.3 Mean for Drupal
          </Link>
        </p>
        <p>
          For Drupal Camp Chicago 2010, I presented on PHP 5.3 for Drupal
          developers. I focused on the new features of the new version,
          emphasizing how they could be used within a Drupal module. Overall,
          I think the topic was a bit too dry, but I think that the audience
          might have learned a thing or two. As soon as the video is online,
          I&lsquo;ll post that here, but for now, I&lsquo;ve embedded the
          google doc.
        </p>

        <p>
          <Link to="/writings/web-application-security-fundamentals/">
            Web Application Security Fundamentals
          </Link>
        </p>
        <p>
          Major websites are losing customer data left and right, and their
          brands are losing face because of it. Web application security is
          more important now than ever before, yet very few developers have a
          solid grasp of the fundamental concepts and theory behind modern
          security measures.
        </p>
        <p>
          This interactive presentation will cover many of the building blocks
          of modern security including encryption, database-level security,
          server security, session management, input sanitation, and password
          strength. More complex topics, such as OAuth, cross-site scripting,
          developer security, cloud hosting, etc. will also be touched on if
          requested. Ideally, each topic will be a relatively dense 5-minute
          overview hitting the core theory along with an example or two.
          Topics will be chosen by audience participation (bring your voices.)
        </p>
        <p>
          This talk will not be Drupal-specific and while examples will be
          chosen with Drupal in mind, the topics covered should apply to any
          web application. Details for the talk will be taken from my
          experience, Security Now, OWASP, and an assortment of
          security-focused presentations and papers. The talk will assume
          little to no prior security knowledge, though we won’t spend much
          time on anything you already know.
        </p>
        <p>What questions will your session answer?:</p>
        <ul>
          <li>
            What is the minimum security knowledge every web developer should
            know?
          </li>
          <li>Why can’t security be ignored?</li>
          <li>What are common attack vectors and vulnerabilities?</li>
          <li>What security measures should be avoided? (Hint: md5)</li>
          <li>Where can I get more sources of security goodness?</li>
        </ul>

        <p>
          <Link to="/writings/cryptography-and-security-coders/">
            Cryptography (and Security) for Coders
          </Link>
        </p>
        <p>
          This page was written to supplement my Cryptography (and Security)
          for Coders talk at the Chicago Code Camp &rsquo;12. It is a
          significant improvement on an earlier talk, which had less of a
          programming focus (and actually contained a few errors.)
        </p>
        <p>
          I should quickly but emphatically note that, even though we&lsquo;ll
          be discussing several crypto algorithms, which you should definitely
          use, you should never implement these algorithms. If you do,
          you&lsquo;re very likely to have a perfectly correct system that is
          susceptible to side-channel attacks (e.g. timing attacks, padding
          oracles, etc.) Instead, use open source libraries which have been
          publicly and thoroughly vetted.
        </p>
      </div>
    </div>
  );
}
