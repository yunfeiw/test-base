export default {
    render(h) {

        // 标记当前组件是路由 （$vnode）
        this.$vnode.data.routerView = true;
        // 处理深度问题

        let deep = 0;
        let parent = this.$parent

        while(parent){
            // 判断当前是否是routerView
            const vnodeData = parent.$vnode && parent.$vnode.data;
            if(vnodeData){
                if(vnodeData.routerView){
                    // 当前组价存在父级
                    deep++;
                }
            }

            parent = parent.$parent;
        }
        console.log(deep)
        console.log(this.$router)
        // // 获取当前组件
        // const { current, $options: { routes } } = this.$router;
        // console.log('监听到了')
        // const { component } = routes.find(e => e.path == current);
        // return h(component)
        const component = this.$router.matched[deep] && this.$router.matched[deep].component
        if(!component){
            return
        }
        return h(component)
    }
}