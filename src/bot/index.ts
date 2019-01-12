import botkit from 'botkit';

import {
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_CLIENT_SIGNING_SECRET,
  SLACK_BOT_TOKEN,
  SLACK_O_AUTH_TOKEN,
} from 'src/constants';

export const controller = botkit.slackbot({
  clientId: SLACK_CLIENT_ID,
  clientSecret: SLACK_CLIENT_SECRET,
  clientSigningSecret: SLACK_CLIENT_SIGNING_SECRET,
  scopes: ['bot'],
});

const slackBot = controller.spawn({
  token: SLACK_BOT_TOKEN,
});

slackBot.startRTM((err) => {
  if (err) {
    console.log(err);
  }
});
