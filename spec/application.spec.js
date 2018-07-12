import Application from './../src/application';

describe('Application', () => {
  describe('run', () => {
    it('should call console.log', () => {
      spyOn(console, 'log');
      Application.run('./spec/data/test.4.txt');
    });
  });
});