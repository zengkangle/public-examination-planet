<script setup lang="ts">
import {ref} from "vue";
import {ElNotification, ElMessage} from "element-plus";
import request from "@/utils/request"
import {useRouter} from "vue-router";

const registerUser = ref({userName:'',userPhone:'',userPassword:'',checkPassword:''})
const validateCheckPassword = (rule, value, callback) => {
    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== registerUser.value.userPassword) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
}
let rules = ref({
    checkPassword: [
        {validator: validateCheckPassword,required: true, trigger: "blur"},
    ],
    userName: [
        {required: true, message: "请输入昵称", trigger: "blur"}
    ],
    userPassword: [
        {required: true, message: "请输入密码", trigger: "blur"}
    ],
    userPhone: [
        {required: true, message: "请输入手机号", trigger: "blur"}
    ],
})


let router = useRouter()
function submitForm(){
    if (registerUser.value.userName === "" || registerUser.value.checkPassword === "" || registerUser.value.userPassword === "" || registerUser.value.userPhone === "") {
        ElMessage({
            showClose: true,
            message: '您还有选项未输入，请检查！',
            type: 'error'
        });
    } else {
        request.post(
          "/user/register",
          registerUser.value
        ).then(res => {
            if (res.code === '200') {
                ElNotification({
                    message: res.data,
                    type: 'success'
                })
                router.push("/starter/login")
            } else
                ElMessage({
                    showClose: true,
                    message: res.msg,
                    type: 'error'
                })
        }).catch();
    }}
function resetForm(){
    registerUser.value.userName = ""
    registerUser.value.checkPassword = ""
    registerUser.value.userPassword = ""
    registerUser.value.userPhone = ""
}
</script>

<template>
    <div class="text">已有账号 <router-link to="/starter/login" class="text2">去登录</router-link> </div>
    <el-form
      :model="registerUser"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="rule-form"
    >
        <el-form-item label="昵称" prop="userName" for="userName">
            <el-input id="username" v-model="registerUser.userName" clearable></el-input>
        </el-form-item>
        <el-form-item label="手机号" prop="userPhone" for="userPhone">
            <el-input id="phone" v-model="registerUser.userPhone" clearable></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="userPassword">
            <el-input
              type="password"
              v-model="registerUser.userPassword"
              autocomplete="off"
              clearable
            ></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPassword" for="checkPassword">
            <el-input
              type="password"
              v-model="registerUser.checkPassword"
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
.rule-form{
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