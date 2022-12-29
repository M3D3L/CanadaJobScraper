import jest from 'jest-mock';
import { describe, expect, it } from '@jest/globals';
import { displayMessage } from './displayMessage';

describe('displayMessage', () => {
  let page;
  beforeEach(() => {
    page = {
      type: jest.fn(),
      waitForTimeout: jest.fn(),
    };
  });

  it('displays the correct message when both jobTitle and province are provided', async () => {
    console.log = jest.fn();
    const jobTitle = 'Software Developer';
    const province = 'Ontario';
    const timeout = 1000;

    await displayMessage(jobTitle, province, timeout, page);

    expect(console.log).toHaveBeenCalledWith(
      'Searching for Software Developer jobs in Ontario 🇨🇦🍁🦫🏒',
    );
  });

  it('displays the correct message when only jobTitle is provided', async () => {
    console.log = jest.fn();
    const jobTitle = 'Software Developer';
    const province = '';
    const timeout = 1000;

    await displayMessage(jobTitle, province, timeout, page);

    expect(console.log).toHaveBeenCalledWith(
      'Searching for Software Developer jobs in all of Canada 🇨🇦🍁🦫🏒',
    );
  });

  it('displays the correct message when only province is provided', async () => {
    console.log = jest.fn();
    const jobTitle = '';
    const province = 'Ontario';
    const timeout = 1000;

    await displayMessage(jobTitle, province, timeout, page);

    expect(console.log).toHaveBeenCalledWith(
      'Searching for all jobs in Ontario 🇨🇦🍁🦫🏒',
    );
  });

  it('displays the correct message when neither jobTitle nor province are provided', async () => {
    console.log = jest.fn();
    const jobTitle = '';
    const province = '';
    const timeout = 1000;

    await displayMessage(jobTitle, province, timeout, page);

    expect(console.log).toHaveBeenCalledWith(
      'Searching for all jobs in Canada 🇨🇦🍁🦫🏒',
    );
  });
});
