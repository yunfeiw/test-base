import { Watcher } from "./watcher.js";

/**
 * @description:编译
 * @param: root 根元素
 * @param: vm 当前实例
 * 
 */
class Compile {
    constructor(root, vm) {
        this.$vm = vm;
        let dom = document.querySelector(root);
        this.compile(dom)
    }

    compile(el) {
        // 获取元素子节点
        let childNodes = el.childNodes;

        childNodes.forEach(node => {
            // 判断节点类型
            if (this.isElement(node)) {
                // 元素
                console.log('元素', node.nodeName)

                // 元素：指令、属性绑定、事件

                const attrs = node.attributes;
                Array.from(attrs).forEach(attr => {
                    // 判断动态属性
                    // 1. 指令 v-xxx = ooo
                    const attrName = attr.name;
                    const exp = attr.value;
                    if (this.isDir(attrName)) {
                        // 截取指令  text html
                        const dir = attrName.substring(2);
                        // 执行该指令的函数
                        this[dir] && this[dir](node, exp);
                    }
                })

                // 元素节点，递归
                if (node.childNodes.length) {
                    this.compile(node)
                }
            } else if (this.isInter(node)) {
                // 文本
                console.log("文本", node.textContent);
                // 处理插值绑定
                this.compileText(node);
            }
        })
    }
    // 动态、解析函数入口
    update(node, exp, dir) {
        // 1. 初始化
        const fn = this[dir + 'Updater']
        fn && fn(node, this.$vm[exp])
        // 2. 创建 watcher
        new Watcher(this.$vm, exp, function (v) {
            fn && fn(node, v)
        })
    }

    // 解析 v-text
    text(node, exp) {
        this.update(node, exp, 'text')
        // node.textContent = this.$vm[exp];
    }
    textUpdater(node, val) {
        node.textContent = val;
    }


    // 解析 v-html
    html(node, exp) {
        this.update(node, exp, 'html')
        // node.innerHTML = this.$vm[exp]
    }

    htmlUpdater(node, val) {
        node.innerHTML = val
    }

    // 解析 {{xxx}}
    compileText(node) {
        this.update(node, RegExp.$1, 'compileText')
        // 替换 表达式
        // node.textContent = node.textContent.replace(/\{\{(.*)\}\}/, this.$vm[RegExp.$1])
    }

    compileTextUpdater(node, val) {
        node.textContent = node.textContent.replace(/\{\{(.*)\}\}/, val)
    }


    // 元素判断
    isElement(node) {
        return node.nodeType === 1
    }
    // 文本判断
    isInter(node) {
        // 文本节点较为特殊  表达式 {{}} return 
        return node.nodeType === 3 && /\{\{(.*)\}\}/.test(node.textContent)
    }

    // 指令判断 v- 
    isDir(attrName) {
        return attrName.startsWith('v-');
    }

}

export default Compile