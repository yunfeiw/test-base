let Vue
class Store {
    constructor(options) {
        this.options = options;
        this._vm = new Vue({
            data: {
                $$state: options.state
            }
        });

        // moutations
        this._mutations = options.mutations
        // actions
        this._actions = options.actions;

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