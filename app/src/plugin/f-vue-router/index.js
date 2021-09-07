class VueRouter {
    constructor() {

    }
}
VueRouter.install = function (Vue) {
    console.log((Vue))

    // 注册组件
    Vue.component('router-link', {
        render(h) {
            return h('a', '哈哈哈')
        },
    })
    Vue.component('router-view', {
        render(h) {
            return h('div', 'gan')
        },
    })
}
export default VueRouter