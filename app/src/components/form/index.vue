<template>
  <div>
    <slot></slot>
  </div>
</template>

<script>
export default {
  name: "yf-form",
  props: {
    model: {
      type: Object,
    },
    rules: {
      type: Object,
    },
  },
  provide() {
    return {
      form: this,
    };
  },
  methods: {
    validate(cb) {
      // 调⽤所有含有prop属性的⼦组件的validate⽅法并得到Promise数组
      const tasks = this.$children
        .filter((item) => item.prop)
        .map((item) => item.validate());
      // 所有任务必须全部成功才算校验通过，任⼀失败则校验失败
      Promise.all(tasks)
        .then(() => cb(true))
        .catch(() => cb(false));
    },
  },
};
</script>

<style>
</style>