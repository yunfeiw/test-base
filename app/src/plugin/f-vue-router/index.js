import Vue from 'vue';
class VueRouter {
    constructor(options) {
        this.$options = options;

        this.current = '/';//默认值
        // 初始化
        Vue.util.defineReactive(this, 'current', window.location.hash.split('#')[1] || '/')
        // 监听url
        window.addEventListener('hashchange', () => {
            this.current = window.location.hash.split('#')[1];
        })
    }
}
VueRouter.install = function (Vue) {
    // 保存routes配置项
    // 由于VueRouter,先于Vue实例的执行，所以，我们需要延迟执行
    // Vue.mixin
    Vue.mixin({
        beforeCreate() {
            // 由于是全局混入，但router配置只有根有，所有判断下
            if (this.$options.router) {
                Vue.prototype.$router = this.$options.router;
            }
        }
    })
    // 注册组件
    Vue.component('router-link', {
        props: {
            to: {
                type: String,
                required: true
            }
        },
        render(h) {
            return h('a', {
                attrs: {
                    href: `#${this.to}`
                }
            }, this.$slots.default)
        },
    })
    Vue.component('router-view', {
        render(h) {
            // 获取当前组件
            const { current, $options: { routes } } = this.$router;
            console.log('监听到了')
            const { component } = routes.find(e => e.path == current);

            return h(component)

        },
    })
}
export default VueRouter