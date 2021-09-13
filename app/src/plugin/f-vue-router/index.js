import Vue from 'vue';
import View from './view';
class VueRouter {
    constructor(options) {
        this.$options = options;

        this.current = window.location.hash.split('#')[1] || '/';//默认值
        // 初始化
        // Vue.util.defineReactive(this, 'current', window.location.hash.split('#')[1] || '/')

        // matched 数组，存储对应层级
        Vue.util.defineReactive(this, 'matched', [])
        // 匹配执行
        this.match();
        // 监听url
        window.addEventListener('hashchange', () => {
            this.current = window.location.hash.split('#')[1];
            this.matched = [];
            this.match();
        })
    }

    // 匹配方法
    match(routes) {
        routes = routes || this.$options.routes;

        for (let route of routes) {
            if (route.path === '/' && this.current === '/') {
                this.matched.push(route)
                return
            }
            if (route.path !== '/' && this.current.indexOf(route.path) != -1) {
                // 当前routes.path在url中
                this.matched.push(route)
                // 递归children
                if (route.children && route.children.length) {
                    this.match(route.children)
                }
                return
            }
        }
        // 此时matched中存在的是url对应的组件数组
        // 此时router-view就可以通过这个数组来进行渲染
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
    Vue.component('router-view', View)
}
export default VueRouter