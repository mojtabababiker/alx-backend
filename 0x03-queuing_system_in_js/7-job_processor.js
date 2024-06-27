/**
 * manage the job creator
 */
import * as kue from 'kue';

const blackListNumbers = ['4153518780', '4153518781'];
const queue = kue.createQueue();

function sendNotification(phoneNumber, message, job, done) {
  let progress = 0;
  job.progress(progress, 100);
  const intervalId = setInterval(() => {
    if (blackListNumbers.includes(phoneNumber)) {
      clearInterval(intervalId);
      done(new Error(`Phone number ${phoneNumber} is blacklisted`));
      return;
    }
    progress += 50;
    job.progress(progress, 100);

    if (progress === 50) {
      console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
    }
    if (progress === 100) {
      clearInterval(intervalId);
      done();
    }
  }, 500)
}

queue.process('push_notification_code_2', 2, (job, done) => {
  sendNotification(job.data.phoneNumber, job.data.message, job, done);
});
