let Vue
class Store {
    constructor(options) {
        this.options = options;


        // moutations
        this._mutations = options.mutations
        // actions
        this._actions = options.actions;
        // getters
        this._getters = options.getters;
        const computed = {}
        this.getters = {};// 暴漏 外部获取

        let _this = this;
        Object.keys(this._getters).forEach(key => {
            let fn = this._getters[key]
            // computed中的this指向的当前调用组件而不是当前的Store,所以保存下
            computed[key] = () => {
                return fn(_this.state)
            }
            // getters是只读属性
            Object.defineProperty(this.getters, key, {
                get: () => this._vm[key] //默认 key值 会被代理（computed）
            })
        })

        this._vm = new Vue({
            data: {
                $$state: options.state
            },
            computed
        });

        // 作用域
        this.commit = this.commit.bind(this)
        this.dispatch = this.dispatch.bind(this)
    }

    get state() {
        return this._vm._data.$$state
    }
    set state(v) {
        console.log('抱歉，请通过 commit或dispatch 更改值', v)
    }

    commit(type, payload) {
        const entry = this._mutations[type];
        if (!entry) {
            console.error('unkown mutation type')
        }
        entry(this.state, payload)
    }
    dispatch(type, payload) {
        const entry = this._actions[type];
        if (!entry) {
            console.error('unkown action type')
        }
        entry(this, payload)
    }
}

function install(_Vue) {
    Vue = _Vue;
    Vue.mixin({
        beforeCreate() {
            // 根组件挂载
            if (this.$options.store) {
                Vue.prototype.$store = this.$options.store
            }
        },
    })
}

export default { Store, install }