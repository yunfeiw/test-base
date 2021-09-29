<template>
  <div>
    <f-form :model="model" :rules="rules" ref="loginForm">
      <f-form-item label="密码" prop="pw">
        <f-input v-model="model.pw" type="password"></f-input>
      </f-form-item>
    </f-form>

    输出{{ model.pw }}

    <button @click="submitForm">ss</button>
  </div>
</template>

<script>
import FForm from "./components/form";
import FFormItem from "./components/formItem";
import FInput from "./components/input/index.vue";
export default {
  name: "App",
  components: {
    FForm,
    FInput,
    FFormItem,
  },
  data() {
    return {
      model: {
        pw: "",
      },
      rules: {
        pw: [
          {
            required: true,
            msg: "必填啊",
          },
        ],
      },
    };
  },
  methods: {
    submitForm() {
      this.$refs["loginForm"].validate((valid) => {
        if (valid) {
          alert("请求登录!");
        } else {
          alert("校验失败！");
        }
      });
    },
  },
};
</script>
<style>
a {
  margin: 10px;
}
</style>

