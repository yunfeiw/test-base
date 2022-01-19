<template>
  <input :value="value" @input="oninput" v-bind="$attrs" />
</template>

<script>
export default {
  inheritAttrs: false,
  props: {
    value: {
      type: String,
      default: "",
    },
  },
  methods: {
    oninput(e) {
      this.$emit("input", e.target.value);
    },
  },
};
</script>

<style>
</style>