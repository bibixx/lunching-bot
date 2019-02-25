import botkit from 'botkit';
import logger from 'src/utils/logger';

import {
  SLACK_CLIENT_ID,
  SLACK_CLIENT_SECRET,
  SLACK_CLIENT_SIGNING_SECRET,
  SLACK_BOT_TOKEN,
} from 'src/constants';

const botController = botkit.slackbot({
  clientId: SLACK_CLIENT_ID,
  clientSecret: SLACK_CLIENT_SECRET,
  clientSigningSecret: SLACK_CLIENT_SIGNING_SECRET,
  scopes: ['bot'],
  debug: false,
});

const slackBot = botController.spawn({
  token: SLACK_BOT_TOKEN,
});

slackBot.startRTM((err) => {
  logger.info('Bot connected to RTM');

  if (err) {
    logger.error(err);
  }
});

export default botController;
