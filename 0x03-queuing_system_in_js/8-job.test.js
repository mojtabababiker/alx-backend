/**
 * Test the 8-jobs createPushNotificationsJobs function
 */
import { expect } from "chai";
import * as kue from 'kue';
import { createPushNotificationsJobs } from './8-job';
import Sinon from "sinon";

const queue = kue.createQueue();

describe('Test the createPushNotificationsJobs function', function () {

  before(() => {
    queue.testMode.enter();
  });

  after(() => {
    queue.testMode.exit();
    Sinon.restore();
  });

  beforeEach(() => {
    queue.testMode.clear();
    Sinon.restore();
  });

  it('Should throw error when jobs is not an array', (done) => {
    expect(() => createPushNotificationsJobs('Not an array', queue))
      .to.throw(Error, 'Jobs is not an array')
    done();
  });

  it('Should create a job for each object in jobs array', (done) => {
    const jobs = [
      {
        phoneNumber: '4153518780',
        message: 'This is the code 1234 to verify your account'
      },
      {
        phoneNumber: '4153518781',
        message: 'This is the code 1235 to verify your account'
      },
      {
        phoneNumber: '4153518782',
        message: 'This is the code 1236 to verify your account'
      }
    ];
    createPushNotificationsJobs(jobs, queue);
    expect(queue.testMode.jobs.length).to.equal(jobs.length);
    // test the created job data and type
    queue.testMode.jobs.forEach(job => {
      expect(jobs).to.includes(job.data);
      expect(job.type).to.equal('push_notification_code_3');
    });

    done();
  });

  it('Should print Notification job created: JOB_ID when a job is created',
    function () {
      const mockedLog = Sinon.stub(console, 'log');
      const jobs = [
        {
          phoneNumber: '4153518780',
          message: 'This is the code 1234 to verify your account'
        },
      ];
      createPushNotificationsJobs(jobs, queue);
      expect(mockedLog.calledOnceWith('Notification job created: 1'));
    }
  );

  it('Should print Notification job JOB_ID completed when a job is complete',
    function () {
      const mockedLog = Sinon.stub(console, 'log');
      const jobs = [
        {
          phoneNumber: '4153518780',
          message: 'This is the code 1234 to verify your account'
        },
      ];
      createPushNotificationsJobs(jobs, queue);
      // emit complete event on the job
      queue.testMode.jobs.forEach(job => {
        const listened = job.emit('complete');
        expect(listened).to.be.true;
        expect(mockedLog.calledWith(`Notification job ${job.id} completed`))
          .to.be.true;
      });
    }
  );

  it('Should print Notification job JOB_ID failed: ERROR when a job is failed',
    function () {
      const mockedLog = Sinon.stub(console, 'log');
      const jobs = [
        {
          phoneNumber: '4153518780',
          message: 'This is the code 1234 to verify your account'
        },
      ];
      createPushNotificationsJobs(jobs, queue);
      // emit complete event on the job
      queue.testMode.jobs.forEach(job => {
        const listened = job.emit('failed', 'Error message');
        expect(listened).to.be.true;
        expect(mockedLog.calledWith(`Notification job ${job.id} failed: Error message`))
          .to.be.true;
      });
    }
  );

  it('Should print Notification job JOB_ID PERCENT% complete when a job is progressing',
    function () {
      const mockedLog = Sinon.stub(console, 'log');
      const jobs = [
        {
          phoneNumber: '4153518780',
          message: 'This is the code 1234 to verify your account'
        },
      ];
      createPushNotificationsJobs(jobs, queue);
      // emit complete event on the job
      queue.testMode.jobs.forEach(job => {
        const listened = job.emit('progress', 50);
        expect(listened).to.be.true;
        expect(mockedLog.calledWith(`Notification job ${job.id} 50% complete`))
          .to.be.true;
      });
    }
  );
});
