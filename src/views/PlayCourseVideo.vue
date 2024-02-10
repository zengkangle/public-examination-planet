<script setup lang="ts">
import {onBeforeMount, ref, watch} from "vue";
import {Notebook, User} from "@element-plus/icons-vue";
import request from "@/utils/request";
import {WPlayer} from "vue-wplayer";
import {onBeforeRouteUpdate, useRouter} from "vue-router";

const {courseId,courseTitle,courseOutline,userName,userAvatarUrl,videoUrl} = defineProps(['courseId','courseTitle','courseOutline','userName','userAvatarUrl','videoUrl'])

function formatterPage(row){
	return 'P'+row.coursePage
}

onBeforeMount(() => {
	options.value.resource = videoUrl
})

const currentRow = ref()
const options = ref({
	resource: "http://localhost:8009/files/playVideo/a886263d5e6242ee9bfa0106ec4af47b.mp4",
	theme: "#40AEED",
	danmaku:{
		open: true,
		placeholder: '在这里输入弹幕喔~',
		data: [],
		send: newsScrolling,
	}
})
function newsScrolling(value){
	console.log('@@@',value)
}
/**
 * 获取视频列表
 */
const videoList = ref([])
function getVideoList(){
	request.get(
		'/video/getCourseVideoList',
		{
			params:{courseId:courseId}
		}
	).then(res => {
		if (res.code == '200'){
			videoList.value = res.data
		}
	})
}
onBeforeMount(() => {
	getVideoList()
})

const router = useRouter()
const handleCurrentChange = (val) => {
	router.push({
		path:'/base/playCourseVideo',
		query:{
			courseId:courseId,
			courseTitle:courseTitle,
			courseOutline:courseOutline,
			userName:userName,
			userAvatarUrl:userAvatarUrl,
			videoUrl:val.videoUrl,
		}
	})
}

const tableRowClassName = (scope) => {
	if (scope.row.videoUrl == options.value.resource){
		return 'success-row'
	}
	return ''
}
</script>

<template>
	<div class="main">
		<div class="left">
				<div class="title">{{ courseTitle }}</div>
				<div class="subtitle">{{ courseOutline }}</div>
        <div class="container">
            <div class="player-container">
                <w-player class="player" :options="options" :danmaku-key="0"></w-player>
            </div>
        </div>
		</div>
		<div class="right">
		<div class="right-header">
        <div class="teacher">
            <el-avatar size="large" :src="userAvatarUrl"/>
            <div class="name">{{ userName }}</div>
        </div>
        <div class="rate">
            <el-button type="primary" :icon="Notebook" >课程评价</el-button>
            <el-button type="primary" :icon="User" >教师评价</el-button>
        </div>
    </div>
        <el-tabs type="border-card" class="tabs">
            <el-tab-pane label="视频选集">
                <el-table
                        ref="singleTableRef"
                        :data="videoList"
                        height="522px"
                        style="width: 370px"
                        @current-change="handleCurrentChange"
                        :row-class-name="tableRowClassName"
                >
                    <el-table-column prop="videoIndex" :formatter="formatterPage" width="50" />
                    <el-table-column prop="videoTitle"  />
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="弹幕列表">
                <el-table
                        ref="singleTableRef"
                        :data="videoList"
                        highlight-current-row
                        height="400px"
                        style="width: 370px"
                        :row-class-name="tableRowClassName"
                        @current-change="handleCurrentChange"
                >
                    <el-table-column property="videoIndex" label="时间" width="60" />
                    <el-table-column property="videoName" label="弹幕内容" width="300" />
                </el-table>
            </el-tab-pane>
        </el-tabs>
		</div>
	</div>
</template>

<style scoped>
.main{
	width: 1500px;
	padding: 80px 25px 0 25px;
	margin-left: 200px;
	background-color: #fff;
	display: flex;
}

.title{
	font-size: 22px;
	font-weight: 500;
}
.subtitle{
	margin-top: 10px;
	color: #9599A0;
}
.container {
    width: 1054px;
    margin-top: 30px;
}
.player-container {
    height: 0;
    width: 100%;
    padding-bottom: 56.25%;
    position: relative;
}
.player {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: black;
}
.right{
	margin-left: 35px;
	padding-bottom: 100px;
}
.right-header{
	display: flex;
}
.teacher{
	text-align: center;
}
.rate{
	margin-left: 50px;
	margin-top: 30px;
}
.tabs{
	margin-top: 8px;
}
</style>

<style>
.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
    --el-table-text-color: #4C7CFE;
    color: #4C7CFE;
}
</style>