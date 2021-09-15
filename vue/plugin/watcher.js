/**
 * @description:更新方法
 */
class Watcher {
    constructor(vm, key, updater) {
        this.vm = vm
        this.key = key
        this.updater = updater

        // 想要 Dep收集到当前watcher要触发依赖

        Dep.target = this; //绑定当Dep的目标（watcher）
        this.vm[key];
        Dep.target = null; //销毁 防止 dep的重复添加

    }

    // dep 调用 更新
    update() {
        // 保存当前上下文， 更新的值
        // console.log(this)
        this.updater.call(this.vm, this.vm[this.key])
    }
}

/**
 * @description:通知watcher更新
 */
class Dep {
    constructor() {
        this.deps = []
    }
    addDep(dep) {
        this.deps.push(dep)
    }
    notify() {
        this.deps.forEach(dep => dep.update())
    }
}

export { Watcher, Dep }