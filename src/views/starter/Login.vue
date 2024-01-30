<script setup lang="ts">
import {ref} from "vue";
import {ElNotification, ElMessage} from "element-plus";
import {useUserStore} from "@/store/user"
import request from "@/utils/request.js"
import useGetUserToStore from "@/hooks/useGetUserToStore";
import {
	User,
	Lock,
} from '@element-plus/icons-vue'
import {useRouter} from "vue-router";

const {getUserMsg} = useGetUserToStore()

let userStore = useUserStore()

let router = useRouter()

let user = ref({userPhone: '', userPassword: ''})

function login() {
	if (user.value.userPhone === "" || user.value.userPassword === "") {
		ElMessage({
			showClose: true,
			message: '请输入账号或密码',
			type: 'error'
		});
	} else {
		request.post(
			"/user/login",
			user.value
		).then(res => {
			if (res.code === '200') {
				ElNotification({
					message: '登录成功',
					type: 'success',
					offset: 50,
					duration: 1200,
				})
				sessionStorage.setItem("user", JSON.stringify(res.data))//存储用户信息到浏览器
        getUserMsg()
				router.push("/")
			} else
				ElMessage({
					message: res.msg,
					type: "error",
					showClose: true,
				})
		}).catch();

	}
}

</script>

<template>
    <div class="text">没有账号？
        <router-link to="/starter/register" class="text2">去注册</router-link>
    </div>
    <div class="label">账号：</div>
    <el-input
            :prefix-icon="User"
            class="login-input"
            v-model="user.userPhone"
            clearable
            placeholder="请输入内容"
            @keydown.enter.native="login"
    ></el-input>
    <div class="label">密码：</div>
    <el-input
            :prefix-icon="Lock"
            class="login-input"
            v-model="user.userPassword"
            show-password
            placeholder="请输入内容"
            @keyup.enter.native="login"
    ></el-input>
    <div class="login_buttons">
        <el-button class="login-button" @click="login" type="primary">登录</el-button>
    </div>
</template>

<style scoped>
.text {
    margin-top: 15px;
    font-size: 14px;
    color: #9b9b9b;
    margin-bottom: 20px;
}

.text2 {
    font-size: 17px;
}

.login-input {
    width: 70%;
    margin-bottom: 30px;
}

.label {
    margin-bottom: 10px;
}

.login-button {
    position: relative;
    left: 35px;
    top: 50px;
    width: 200px;
    height: 50px;
}
</style>