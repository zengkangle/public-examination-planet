<script setup lang="ts">
import {onBeforeRouteUpdate, useRouter} from "vue-router";
import {onBeforeMount, ref} from "vue";
import {
	ArrowDown,
	Plus,
} from '@element-plus/icons-vue'

const router = useRouter()
let initSpace = ref()
function findInit(getStr?) {
	let str
	getStr ? str = getStr : str = router.currentRoute._rawValue.fullPath.split('/')[2]
	switch (str) {
		case 'home':
			initSpace.value = 'init1'
			break
		case 'course':
			initSpace.value = 'init2'
			break
		case 'live':
			initSpace.value = 'init3'
			break
		case 'talk':
			initSpace.value = 'init4'
			break
		case 'teacher':
			initSpace.value = 'init5'
			break
	}
}

onBeforeMount(() => {
	findInit()
})
onBeforeRouteUpdate((to) => {
	findInit(to.fullPath.split('/')[2])
})

function toManageCourse(){
    router.push('/base/manageOfTeacher')
}



</script>

<template>
    <div class="header-warp">
        <div class="header">
            <div>
                <img src="../assets/star-logo.png" alt="" height="55px"/>
                <img src="../assets/title.png" alt="" height="35px" class="title">
            </div>
            <div class="nav">
                <ul>
                    <li>
                        <router-link to="/base/home">首页</router-link>
                    </li>
                    <li>
                        <router-link to="/base/course/buyCourse/writtenTestOfBuy">课程</router-link>
                    </li>
                    <li>
                        <router-link to="/base/live">直播</router-link>
                    </li>
                    <li>
                        <router-link to="/base/talk">论坛</router-link>
                    </li>
                    <li>
                        <router-link to="/base/teacher">师资</router-link>
                    </li>
                    <div class="underline" :class="initSpace"></div>
                </ul>
            </div>
            <div class="avatar">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                           :size="45"></el-avatar>
            </div>
            <div class="login">
                <div v-if=false>
                    <div class="welcome">
                        亲爱的公考人，欢迎
                        <router-link to="/starter/login">登录</router-link>
                    </div>
                </div>
                <div v-if=true>
                    <el-dropdown class="el-drop">
                        <span class="el-dropdown-link">HealMe<el-icon class="el-icon--right"><arrow-down /></el-icon></span>
                        <template #dropdown>
                            <el-dropdown-menu>
                                <el-dropdown-item>Action 1</el-dropdown-item>
                                <el-dropdown-item @click="toManageCourse">课程管理</el-dropdown-item>
                                <el-dropdown-item>Action 3</el-dropdown-item>
                                <el-dropdown-item disabled>Action 4</el-dropdown-item>
                                <el-dropdown-item divided>Action 5</el-dropdown-item>
                            </el-dropdown-menu>
                        </template>
                    </el-dropdown>

                </div>

            </div>


        </div>
    </div>
</template>

<style scoped>
.header-warp {
    width: 100vw;
    position: fixed;
    background-color: #1E2A46;
    z-index: 999;
}

.header {
    height: 60px;
    width: 1600px;
    margin: 0 auto;
    display: flex;
}

.title {
    position: relative;
    top: -7px;
}

.underline {
    width: 100px;
    height: 5px;
    background-color: #ffff;
    border-radius: 4px;
    position: absolute;
//left: 50px; bottom: 1px; transition: all ease, 0.4s;
}

.init1 {
    left: 50px;
}

.init2 {
    left: 200px;
}

.init3 {
    left: 350px;
}

.init4 {
    left: 500px;
}

.init5 {
    left: 650px;
}

.nav {
    width: 800px;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 60px;
    text-align: center;
    position: relative;
    margin-right: 370px;
}

.nav>ul {
    display: flex;
}

.nav ul li a {
    display: block;
    width: 150px;
    color: #ffff;
    font-weight: bolder;
}

ul li:nth-child(1):hover ~ .underline {
    left: 50px;
}

ul li:nth-child(2):hover ~ .underline {
    left: 200px;
}

ul li:nth-child(3):hover ~ .underline {
    left: 350px;
}

ul li:nth-child(4):hover ~ .underline {
    left: 500px;
}

ul li:nth-child(5):hover ~ .underline {
    left: 650px;
}

.avatar {
    position: relative;
    top: 6px;
}

.login {
    line-height: 60px;
    margin-left: 10px;
    color: white;
}

.welcome > a {
    color: #93E1D8;
}

.el-dropdown-link {
    cursor: pointer;
    color: #ffff;
    display: flex;
    align-items: center;
}

.el-drop {
    line-height: 60px;
    border: 0px;
}
.example-showcase .el-dropdown-link {
    cursor: pointer;
    color: var(--el-color-primary);
    display: flex;
    align-items: center;
}
:deep(:focus-visible) {

    outline: none;

}
</style>