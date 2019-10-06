const TestDriver = require('../utils/test-driver');

describe('Launch Google', () => {
  let testDriver;

  beforeAll(async () => {
    testDriver = await TestDriver.create();
  });

  afterAll(() => {
    testDriver.quit();
  });

  it('should navigate to Google', async () => {
    await testDriver
      .navigate()
      .to('https://google.com');
  });
});
