/**
 * Writing job creation function
 */
import * as kue from 'kue';


/**
 * Create a keu jobs from the objects inside jobs on the queue queue
 * @param {Array} jobs an array of objects representing the jobs
 * @param {kue.Queue} queue the queue object to operate on
 */
export function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) {
    throw new Error('Jobs is not an array');
  }
  jobs.forEach(jobObject => {
    const job = queue.create('push_notification_code_3', jobObject);

    job
      .save((error) => {
        if (!error) {
          console.log(`Notification job created: ${job.id}`);
        }
      });
    job
      .on('complete', () => {
        console.log(`Notification job ${job.id} completed`);
      })
      .on('failed', error => console.log(`Notification job ${job.id} failed: ${error}`))
      .on('progress', percentage => console.log(`Notification job ${job.id} ${percentage}% complete`));
  });
}
