import emailService from '../src/stuff/notifications';

const testEmail = 'salixm@mail.ru';
const testTemplate = 'verify-email';
const testSubject = 'Код подтверждения';

describe('send email to subject', function() {
  it('Must send new email to subject', async function() {
    const result = await emailService.sendEmail(testEmail, testTemplate, testSubject, {verifyCode: 1233});
    console.log(result);
  });
});