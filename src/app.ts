import { controller } from 'src/bot';
import hearsRegister from 'src/messages/hearsRegister';

controller.hears(['register'], ['direct_message'], hearsRegister);
