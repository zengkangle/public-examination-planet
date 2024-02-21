<script setup lang="ts">
import {useRouter} from "vue-router";
import {useUserStore} from "@/store/user";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const {userId} = storeToRefs(userStore)

const router = useRouter()
function redirectToBuy(){
	router.push('/base/course/buyCourse/writtenTestOfBuy')
}
function redirectToMine(){
	router.push('/base/course/myCourse/writtenTestOfMine')
}
</script>

<template>
	<div class="content">
		<div class="nav">
				<router-link to="/base/course/buyCourse" class="nav-title" active-class="nav-title-active" @click="redirectToBuy">购买课程</router-link>
				<router-link v-if="userId != null" to="/base/course/myCourse" class="nav-title" active-class="nav-title-active" @click="redirectToMine">我的课程</router-link>
		</div>
		<router-view></router-view>
	</div>
</template>

<style scoped>
.content{
    margin: 0 auto;
    width: 1350px;
    padding-top: 100px;
}
.nav{
	display: flex;
}
.nav-title{
    font-size: 20px;
    color: #ACB1B6;
    margin-right: 25px;
}
.nav-title-active{
	font-size: 26px;
	font-weight: bolder;
	color: black;
	position: relative;
	top: -7px;
}
</style>