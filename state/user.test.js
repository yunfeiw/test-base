const { User } = require('./user.js')

test('user 更名', () => {
    // 调用
    const user = new User();

    // 更改
    user.setName('wang');

    // 校验
    expect(user.getName()).toBe('wang');
})