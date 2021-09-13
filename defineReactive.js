function defineReactive(obj, key, val) {
    // 递归绑定
    observe(val)
    // 劫持
    Object.defineProperty(obj, key, {
        get() {
            console.log('获取');
            return val;
        },
        set(newVal) {
            console.log('设置');
            val = newVal;
        }
    })
}

// 复杂数据类型 对象嵌套
function observe(obj) {
    // 临界值
    if (typeof obj !== 'object' || obj == null) {
        return obj
    }
    Object.keys(obj).forEach((key) => defineReactive(obj, key, obj[key]))
}
// add属性的监听劫持
function set(obj, key, val) {
    // 只是重新做了一次监听
    defineReactive(obj, key, val)
}
const obj = {
    name: 'yunfei',
    age: 18,
    info: {
        txt: '111'
    }
}
observe(obj)

set(obj, 'eat', '喜欢')

console.log(obj.eat)