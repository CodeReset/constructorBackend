import smsService from '../src/stuff/notifications';

const testNumber = '+77770173052';
const testText = 'Ваш код подтверждения - 1234';

describe('send sms to subject', function() {
  it('Must send sms message to number', async function() {
    const result = await smsService.sendSmsToPhoneNumber(testNumber, testText);
    console.log(result);
  });
});