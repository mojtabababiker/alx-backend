/**
 * Creating Kue job distribution system
 */
import * as kue from 'kue';

const jobObject = {
  phoneNumber: '12345',
  message: 'heloos',
}

const push_notification_code = kue.createQueue({});  // creating our job queue
const job = push_notification_code.create('push_notification_code', jobObject);

// add event listeners on the job
job
  .save((error) => {
    if (!error) console.log(`Notification job created: ${job.id}`);
  })
  .on('complete', () => console.log('Notification job completed'))
  .on('failed', () => console.log('Notification job failed'));
