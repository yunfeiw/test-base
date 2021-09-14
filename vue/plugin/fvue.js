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
    new Observer(obj);
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
 * @description:数据响应
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
            console.log(Dep.target)
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

export default Fvue