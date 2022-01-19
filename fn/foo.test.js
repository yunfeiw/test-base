const { foo } = require('./foo');
const { bar } = require('./bar');

//mock bar函数
jest.mock('./bar.js', () => {
    return {
        bar: jest.fn()
    }
})

test('foo 函数执行', () => {
    // 执行
    foo();
    // 验证
    expect(bar).toBeCalled()

})