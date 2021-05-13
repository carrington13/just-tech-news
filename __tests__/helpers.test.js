const {format_date, format_plural, format_url} = require('../utils/helpers');
//const jest = require('jest');

test('format_date() returns a date string', () => {
    const date = new Date('2021-05-13 16:12:03');

    expect(format_date(date)).toBe('5/13/2021')
})

test('format_plural() correctly pluralizes words', () => {
    const word = 'Tiger';
    const amount = 2

    expect(format_plural(word, amount)).toBe('Tigers');
})

test('format_url() returns a simplified url string', () => {
    const url1 = format_url('http://test.com/page/1');
    const url2 = format_url('https://www.coolstuff.com/abcdefg/');
    const url3 = format_url('https://www.google.com?q=hello');
  
    expect(url1).toBe('test.com');
    expect(url2).toBe('coolstuff.com');
    expect(url3).toBe('google.com');
  });