<template>
  <div>
    <label v-if="label">{{ label }}</label>
    <slot> </slot>
    <div v-if="err">{{ err }}</div>
  </div>
</template>

<script>
import Schema from "async-validator";
export default {
  inject: ["form"],
  props: {
    label: {
      type: String,
    },

    prop: {
      type: String,
    },
  },
  data() {
    return {
      err: "",
    };
  },
  mounted() {
    // 监听校验事件
    this.$on("validate", () => {
      this.validate();
    });
  },
  methods: {
    validate() {
      // 获取对应FormItem校验规则
      const rules = this.form.rules[this.prop];
      // 获取校验值
      const value = this.form.model[this.prop];
      // 校验描述对象
      const descriptor = { [this.prop]: rules };
      // 创建校验器
      const schema = new Schema(descriptor);
      // 返回Promise，没有触发catch就说明验证通过
      return schema.validate({ [this.prop]: value }, (errors) => {
        if (errors) {
          // 将错误信息显示
          this.err = errors[0].message;
        } else {
          // 校验通过
          this.err = "";
        }
      });
    },
  },
};
</script>

<style>
</style>