/**
 * process and leverage the notification system with keu
 */
import * as kue from 'kue';

const queue = kue.createQueue();

function sendNotification(phoneNumber, message) {
  console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}

queue.on('job enqueue', (id, type,) => {
  if (type === "push_notification_code") {
    kue.Job.get(
      id = id, type = "push_notification_code", (error, job) => {
        if (error) return;
        sendNotification(job.data.phoneNumber, job.data.message);
      }
    );
  }
});
