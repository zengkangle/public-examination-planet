<script setup lang="ts">
import {useRouter} from "vue-router";
import request from "@/utils/request";
import {ref} from "vue";

const {course,flag} = defineProps(['course','flag'])

const router = useRouter()

let videoUrl = ref('')
async function findFirstVideo(){
	await request.get(
		'/video/getFirstVideo',
		{
			params:{courseId:course.courseId}
		}
	).then(res => {
		if (res.code == '200'){
			videoUrl.value = res.data
			console.log(videoUrl)
		}
	})
}
async function go(){
	if (flag != 'my'){
			router.push({
				path:'/base/buyCourseDetail',
				query:{
					courseId:course.courseId,
					courseTitle:course.courseTitle,
					courseOutline:course.courseOutline,
					coursePrice:course.coursePrice,
					courseOrder:course.courseOrder,
					tags:course.tags,
					userName:course.userName,
					userAvatarUrl:course.userAvatarUrl,
					teacherDescribe:course.teacherDescribe,
					teacherRateCount:course.teacherRateCount,
					teacherRate:course.teacherRate
				}
			})
	}else{
		await findFirstVideo()
		router.push({
			path:'/base/playCourseVideo',
			query:{
				courseId:course.courseId,
				courseTitle:course.courseTitle,
				courseOutline:course.courseOutline,
				userName:course.userName,
				userAvatarUrl:course.userAvatarUrl,
				videoUrl:videoUrl.value,
			}
		})
	}
}

</script>

<template>
<div class="card-box" @click="go">
		<div class="title">{{ course.courseTitle }}</div>
		<div class="subtitle">{{ course.courseOutline }}</div>
		<div class="tags">
        <el-tag class="tag" v-for="tag in course.tags">{{ tag }}</el-tag>
		</div>
		<div class="mid">
			<div class="teacher">
          <el-avatar :src="course.userAvatarUrl"/>
          <div class="name">{{ course.userName }}</div>
      </div>
      <div class="money" v-if="flag != 'my'">
          <i class="iconfont money-icon">&#xe66b;</i>
          <div>{{ course.coursePrice }}</div>
      </div>
		</div>
    <el-divider  class="divider"/>
    <div class="order-num">{{ course.courseOrder }}人购买</div>
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