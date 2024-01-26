<script setup lang="ts">
import {useRouter} from "vue-router";
import {ref} from "vue/dist/vue";

// defineProps(['flag'])
const props = defineProps({
	flag:{
		type: String,
		default: 'buy'
	}
})
const router = useRouter()
function go(){
	if (props.flag!='my'){
			router.push('/base/buyCourseDetail')
	}else{
		router.push('/base/playCourseVideo')
	}
}

</script>

<template>
<div class="card-box" @click="go">
		<div class="title">笔试系统班图书大礼包：2025国考/2024广东省考</div>
		<div class="subtitle">重难点夯实 刷题冲刺至考前</div>
		<div class="tags">
        <el-tag class="tag">广东本地师资讲解</el-tag>
        <el-tag class="tag">广东本地师资讲解</el-tag>
		</div>
		<div class="mid">
			<div class="teacher">
          <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
          <div class="name">雷军</div>
      </div>
      <div class="money" v-if="flag!='my'">
          <i class="iconfont money-icon">&#xe66b;</i>
          <div>999</div>
      </div>
		</div>
    <el-divider  class="divider"/>
    <div class="order-num">3103人购买</div>
</div>
</template>

<style scoped>
@font-face {
    font-family: 'iconfont';  /* Project id 3294066 */
    src: url('//at.alicdn.com/t/c/font_3294066_2aajdn15n8p.woff2?t=1705564403428') format('woff2'),
    url('//at.alicdn.com/t/c/font_3294066_2aajdn15n8p.woff?t=1705564403428') format('woff'),
    url('//at.alicdn.com/t/c/font_3294066_2aajdn15n8p.ttf?t=1705564403428') format('truetype');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.card-box{
	width: 365px;
	height: 280px;
	background-color: #fff;
	padding: 15px;
	border-radius: 6px;
	transition: 0.2s linear;
	cursor: pointer;
}
.card-box:hover{
	box-shadow: 3px 3px 15px rgba(0,0,0,.3);
	margin-top: -3px;
}
.title{
	font-size: 18px;
	font-weight: bolder;
}
.subtitle{
	color: #A8ABAF;
	margin-top: 10px;
	font-size: 14px;
}
.tags{
	margin-top: 10px;
	display: flex;
}
.tag{
	margin-right: 20px;
}
.mid{
	margin-top: 20px;
	display: flex;
}
.name{
	color: #8B9095;
	font-size: 12px;
	text-align: center;
	margin-top: 4px;
}
.money{
	display: flex;
	position: relative;
	left: 270px;
	top: 50px;
	color: #F46E0B;
}
.order-num{
	color: #BABDC0;
	font-size: 14px;
	position: relative;
	left: 290px;
	top: 15px;
}
</style>