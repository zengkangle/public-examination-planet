<script setup lang="ts">
import {useRouter} from "vue-router";

let router = useRouter()
function backHome(){
	router.push('/')
}
</script>

<template>
<div class="bg">

		<div class="starter-box">
        <i class="iconfont back" @click="backHome">&#xe653;</i>
			<div class="logo"><img src="../assets/login.jpg"/></div>
			<div class="content">
				<div class="mix-content">
            <div class="txt">登录到</div>
            <div class="txt">公考星球</div>
            <router-view></router-view>
        </div>
			</div>
		</div>
</div>
</template>

<style scoped>
@font-face {
    font-family: 'iconfont';  /* Project id 3294066 */
    src: url('//at.alicdn.com/t/c/font_3294066_y5cydz3p2e.woff2?t=1705520359964') format('woff2'),
    url('//at.alicdn.com/t/c/font_3294066_y5cydz3p2e.woff?t=1705520359964') format('woff'),
    url('//at.alicdn.com/t/c/font_3294066_y5cydz3p2e.ttf?t=1705520359964') format('truetype');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;}
.bg{
  display: flex;
  justify-content: center;
  align-items: center;
	background: linear-gradient(45deg,#93E1D8,#758a99);
	height: 100vh;
}
.starter-box{
 width: 1500px;
 height: 600px;
 overflow: hidden;
 display: flex;
 border-radius: 8px;
}
.logo img{
	width: 100%;
	object-fit: cover;
}
.content{
	height: 100%;
	width: 100%;
	background-color: #fff;
}
.mix-content{
	margin-top: 50px;
	margin-left: 50px;
	font-size: 30px;
	font-weight: bolder;
}
.back{
	color: #93E1D8;
	display: block;
	font-size: 60px;
	cursor: pointer;
	position: absolute;
	left: 1800px;
	top: 25px;
}
.back:hover{
	top: 8px;
}

</style>