import Home from '../../view/home';
class VueRouter {
    constructor(optins) {
        this.current = '/';//默认值
        window.addEventListener('hashchange', function () {
            console.log('url变换了', optins)
            this.current = window.location.hash.split('#')[1];
        })
    }
}
VueRouter.install = function (Vue) {
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
            return h(Home)
        },
    })
}
export default VueRouter