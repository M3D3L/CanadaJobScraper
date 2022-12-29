import {describe, expect, it } from '@jest/globals'
import { spaceship } from './spaceship';

describe('spaceship', () => {
  it('should log the correct message for each iteration', () => {
    const jobArray = ['job1', 'job2', 'job3', 'job4', 'job5'] ;
    for (let i = 1; i <= jobArray; i++) {
      spaceship(jobArray, i);
    }

    // Expect the console.log function to have been called with the correct arguments
    expect(console.log('Loading job 1 of 5🚀'));
    expect(console.log('Loading job 2 of 5🔥🚀'));
    expect(console.log('Loading job 3 of 5🔥🔥🚀'));
    expect(console.log('Loading job 4 of 5🔥🔥🔥🚀'));
    expect(console.log('Loading job 5 of 5🔥🔥🔥🔥🚀🌕'));
  });
});
