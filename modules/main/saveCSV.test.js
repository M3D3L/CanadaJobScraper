import jest from 'jest-mock';
import { expect } from '@jest/globals';
import fs from 'fs';
import { saveCSV } from './saveCSV';


test('saveCSV saves correct CSV file', async () => {
    const jobArray = [
      {
        jobTitle: 'Test Job 1',
        business: 'Test Business 1',
        salary: '$100,000',
        location: 'Test Location 1',
        jobUrl: 'testurl1.com',
        email: 'test1@email.com'
      },
      {
        jobTitle: 'Test Job 2',
        business: 'Test Business 2',
        salary: '$50,000',
        location: 'Test Location 2',
        jobUrl: 'testurl2.com',
        email: 'test2@email.com'
      }
    ];
  
    const writeFile = jest.fn();
    jest.spyOn(fs, 'writeFile').mockImplementation(writeFile);
  
    await saveCSV(jobArray, 1000);
  
    expect(writeFile).toHaveBeenCalledWith(
      'jobs.csv',
      'jobTitle, business, salary, location, jobUrl, email \nTest Job 1,Test Business 1,$100,000,Test Location 1,testurl1.com,test1@email.com\nTest Job 2,Test Business 2,$50,000,Test Location 2,testurl2.com,test2@email.com\n',
      expect.any(Function)
    );
  });
  