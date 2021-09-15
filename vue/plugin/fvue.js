import Compile from './compile.js'
import { Dep } from "./watcher.js";


/**
 * @description: 框架构建函数
 */

class Fvue {
    constructor(options) {
        this.$options = options;
        this.$data = options.data;

        // 数据劫持
        observe(this.$data)
        // 代理
        proxy(this)

        //编译
        new Compile(options.el, this)
    }
}

/**
 * @description: 代理，data中的数据属性代理到vue实例上
 */
function proxy(vm) {
    Object.keys(vm.$data).forEach(key => {
        Object.defineProperty(vm, key, {
            get() {
                return vm.$data[key]
            },
            set(v) {
                vm.$data[key] = v
            }
        })
    })
}

/**
 * @description：数据劫持
 */
function observe(obj) {
    if (typeof obj !== 'object' || obj == null) {
        return
    }
    // 判断是否为数组
    if (Array.isArray(obj)) {
        // 修改他的原型
        obj.__proto__ = arrayPrototype()
        // 数组内部元素 响应化处理
        obj.forEach(e => {
            observe(e)
        })
    }else{
        new Observer(obj);
    }

}
/**
 * @description：
 */
class Observer {
    constructor(value) {
        this.value = value;
        this.walk(value);
    }

    walk(obj) {
        Object.keys(obj).forEach((key) => {
            defineReactive(obj, key, obj[key])
        })
    }
}

/**
 * @description:数据响应 -- 对象
 */

function defineReactive(obj, key, val) {
    // 递归绑定
    observe(val)

    // 创建 Dep

    const dep = new Dep();
    // 劫持
    Object.defineProperty(obj, key, {
        get() {
            console.log('获取');
            // 依赖收集
            // console.log(Dep.target)
            Dep.target && dep.addDep(Dep.target)

            return val;
        },
        set(newVal) {
            console.log('设置');
            // 防止输入值为 对象
            observe(val);
            val = newVal;

            // 通知更新
            dep.notify()
        }
    })
}
/**
 * @description: 数据响应 -- 数组
 * 替换数组原型中的方法
 */
function arrayPrototype() {
    // 备份数组方法
    const originalProto = Array.prototype;
    const arrayPrototype = Object.create(originalProto);
    ['push', 'pop', 'shift', 'unshift'].forEach(method => {
        arrayPrototype[method] = function () {
            // 1. 原始操作
            originalProto[method].apply(this, arguments)
            // 2. 覆盖操作 -- 通知更新
            console.log('更新数组了',method)
        }
    })

    return arrayPrototype
}

export default Fvue