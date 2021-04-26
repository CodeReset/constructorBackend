import agendaService from '../src/stuff/agenda';

const testData = { to: '+77770173052', msg: 'Hello from agenda' };
const testSchedule = 'send sms';
agendaService.start();

describe('send sms to subject by agenda', function () {
  it('Must send new sms to subject in 2 minutes', async function () {
    const result = await agendaService.createCommonJob(2, testSchedule, testData);
    await sleep(130000);
    console.log(result);
  });
});

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
