const add = require('./add.js')
test('1+1=2', function () {
    const a = 1;
    const b = 1;

    const c = add(a, b);

    expect(c).toBe(2)
})