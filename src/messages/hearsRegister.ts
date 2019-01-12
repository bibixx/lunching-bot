import { SlackBot, SlackMessage } from 'botkit';
import { SLACK_O_AUTH_TOKEN } from 'src/constants';
import logger from 'src/utils/logger';

import maskPassword from 'src/utils/maskPassword';

export default (bot: SlackBot, message: SlackMessage) => {
  bot.startConversation(message, (err, convo) => {
    convo.addQuestion('What is your email?', () => {
      convo.gotoThread('what_password');
    }, { key: 'email' }, 'default');

    convo.addQuestion('What is your password?', (response) => {
      const email = convo.extractResponse('email');
      const password = convo.extractResponse('password');

      bot.api.chat.update({
        token: SLACK_O_AUTH_TOKEN,
        channel: response.channel,
        ts: response.ts,
        text: maskPassword(password),
      }, (err) => {
        if (err) {
          logger.error(err);
        }
      });

      convo.say(`Cool, you said: ${email}|${password}`);
      convo.next();
    }, { key: 'password' }, 'what_password');
  });
};
