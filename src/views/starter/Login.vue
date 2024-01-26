<script setup lang="ts">
import {ref} from "vue";
import {
    User,
    Lock,
} from '@element-plus/icons-vue'
let user = ref({phone:23,password:'2'})
function login(){
}

</script>

<template>
    <div class="text">没有账号？ <router-link to="/starter/register" class="text2">去注册</router-link> </div>
    <div class="label">账号：</div>
    <el-input
      :prefix-icon="User"
      class="login-input"
      v-model="user.phone"
      clearable
      placeholder="请输入内容"
      @keydown.enter.native="login"
    ></el-input>
    <div class="label">密码：</div>
    <el-input
      :prefix-icon="Lock"
      class="login-input"
      v-model="user.password"
      show-password
      placeholder="请输入内容"
      @keyup.enter.native="login"
    ></el-input>
    <div class="login_buttons">
        <el-button class="login-button" @click="login" type="primary">登录</el-button>
    </div>
</template>

<style scoped>
.text{
		margin-top: 15px;
    font-size: 14px;
    color: #9b9b9b;
    margin-bottom: 20px;
}
.text2{
	font-size: 17px;
}
.login-input{
    width: 70%;
    margin-bottom: 30px;
}
.label{
    margin-bottom: 10px;
}
.login-button{
    position: relative;
    left: 35px;
    top: 50px;
    width: 200px;
    height: 50px;
}
</style>