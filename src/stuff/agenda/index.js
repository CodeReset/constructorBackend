import Agenda from 'agenda';
import { MONGO_CONNECT_URL } from '../../../config/agenda';
import NotificationService from '../notifications';

class AgendaService {
  constructor() {
    this.client = new Agenda({ db: { address: MONGO_CONNECT_URL } });
    this.client.define('send sms', async (job) => {
      const { to, msg } = job.attrs.data;
      await NotificationService.sendSmsToPhoneNumber(to, msg);
    });
  }

  async createCommonJob(time, schedule, data) {
    await this.client.schedule(`in ${time} minutes`, schedule, data);
  }

  async start() {
    await this.client.start();
  }

  sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
}

export default new AgendaService();
