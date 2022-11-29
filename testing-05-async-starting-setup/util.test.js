// jest.mock('./http')
const { printTitle, loadTitle } = require('./util');
test('should print an uppercase text', () => {
  printTitle().then((title) => {
    expect(title).toBe('DELECTUS AUT AUTEM');
  });
});

test('should print an uppercase text1', () => {
  loadTitle().then((title) => {
    expect(title).toBe('DELECTUS AUT AUTEM');
  });
});
