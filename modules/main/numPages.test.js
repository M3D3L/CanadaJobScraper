import jest from 'jest-mock';
import { describe, expect, it } from '@jest/globals';
import { numPages } from './numPages';

describe('numPages', () => {
  let page;
  beforeEach(() => {
    page = {
      click: jest.fn(),
      waitForSelector: jest.fn(),
      waitForTimeout: jest.fn(),
      $: jest.fn(() => ({
        evaluate: jest.fn(),
      })),
    };
  });

  it('loads the correct number of pages', async () => {
    await numPages(page, 5, 1000);

    expect(page.click).toHaveBeenCalledWith('#searchButton');
    expect(page.waitForSelector).toHaveBeenCalledWith('#moreresultbutton');
    expect(page.$).toHaveBeenCalledWith('#moreresultbutton');
    expect(page.$.mock.results[0].value.evaluate).toHaveBeenCalled();
  });
});