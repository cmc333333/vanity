#!/usr/bin/env node
const fs = require('fs');

const Trakt = require('trakt.tv');

const client = new Trakt({
  client_id: process.env.TRAKT_CLIENT,
  client_secret: process.env.TRAKT_SECRET,
});

client
  .get_codes()
  .then((pollInfo) => {
    console.log(`Please visit ${pollInfo.verification_url}`);
    console.log(`And enter "${pollInfo.user_code}" when prompted`);

    const checkSignIn = () => {
      client.poll_access(pollInfo)
        .then(() => {
          fs.appendFileSync(
            '.env',
            `\nTRAKT_SESSION=${JSON.stringify(client.export_token())}\n`,
          );
        })
        .catch(() => {
          setTimeout(checkSignIn, pollInfo.interval);
        });
    };

    checkSignIn();
  });
