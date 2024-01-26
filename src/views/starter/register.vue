<script setup lang="ts">
import {ref} from "vue";
import {ElNotification} from "element-plus";
import request from "@/utils/request.js"

const registerUser = ref({username:'',phone:'',password:'',checkPass:''})
let rules = ref({
    checkPass: [
        {required: true, message: "请再次输入密码", trigger: "blur"},
    ],
    username: [
        {required: true, message: "请输入昵称", trigger: "blur"}
    ],
    password: [
        {required: true, message: "请输入密码", trigger: "blur"}
    ],
    phone: [
        {required: true, message: "请输入手机号", trigger: "blur"}
    ],
})
function submitForm(){
    if (registerUser.value.username === "" || registerUser.value.checkPass === "" || registerUser.value.password === "" || registerUser.value.phone === "") {
        console.log('err')
        ElNotification({
            message: '您还有选项未输入，请检查！',
            type: 'error'
        });
    } else {
        request.post(
          "/user/register",
          this.registerUser
        ).then(res => {
            if (res.code === '200') {
                this.$message.success("注册成功")
                this.$router.push("/Canyon_Gaming_Starter/login")
            } else
                this.$message.error(res.msg)
        }).catch();
    }}
function resetForm(){
    registerUser.value.username = ""
    registerUser.value.checkPass = ""
    registerUser.value.password = ""
    registerUser.value.phone = ""}
</script>

<template>
    <div class="text">已有账号 <router-link to="/starter/login" class="text2">去登录</router-link> </div>
    <el-form
      :model="registerUser"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
        <el-form-item label="昵称" prop="username" for="username">
            <el-input id="username" v-model="registerUser.username" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="phone" for="phone">
            <el-input id="phone" v-model="registerUser.phone" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="registerUser.password"
              autocomplete="off"
              clearable
            ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass" for="checkPass">
            <el-input
              type="password"
              v-model="registerUser.checkPass"
              autocomplete="off"
              clearable
            ></el-input>
        </el-form-item>
        <el-form-item class="register-bottom">
            <el-button type="primary" @click="submitForm()">提交</el-button>
            <el-button @click="resetForm()">重置</el-button>
        </el-form-item>
    </el-form>
</template>

<style scoped>
.text{
    margin-top: 15px;
    font-size: 14px;
    color: #9b9b9b;
}
.text2{
    font-size: 17px;
}
.demo-ruleForm{
    width: 90%;
    position: relative;
    left: -20px;
    top: 30px;
}
.register-bottom{
    position: relative;
    top: 30px;
    left: 40px;
}
</style>