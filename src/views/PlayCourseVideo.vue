<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import {Notebook,User} from "@element-plus/icons-vue";
import request from "@/utils/request";
import {WPlayer} from "vue-wplayer";
import {useRouter} from "vue-router";
import {useUserStore} from "@/store/user";
import {storeToRefs} from "pinia";
import {ElMessage, ElNotification} from "element-plus";
import * as dayjs from 'dayjs'
import * as duration from 'dayjs/plugin/duration'


/**
 * 初始化信息
 */
const {courseId,courseTitle,courseOutline,teacherId,userName,userAvatarUrl,videoId,videoUrl} = defineProps(['courseId','courseTitle','courseOutline','teacherId','userName','userAvatarUrl','videoId','videoUrl'])
const userStore = useUserStore()
const {userId} = storeToRefs(userStore)
function formatterPage(row){
	return 'P'+row.coursePage
}
function formatterTime(row){
	dayjs.extend(duration)
	return dayjs.duration(row.time,'seconds').format('mm:ss')
}
function formatterCreateTime(row){
	return dayjs(row.createtime).format('YYYY-MM-DD HH:mm')
}
onBeforeMount(() => {
	options.resource = videoUrl
})

/**
 *获取弹幕列表
 */
let num = ref(0)
const barrageList = ref([])
function getBarrageList(){
	request.get(
		'/barrage/getBarrageList',
		{
			params:{videoId:videoId}
		}
	).then(res => {
		if (res.code == '200'){
			barrageList.value = res.data
			options.danmaku.data = barrageList.value
			num.value++
		}
	})
}
onBeforeMount(() => {
	getBarrageList()
})

/**
 * 播放器配置
 */
 const options = {
	resource: "",
	theme: "#40AEED",
	danmaku:{
		open: true,
		placeholder: '在这里输入弹幕喔~',
		data: [],
		send: newsScrolling,
	}
}

/**
 * 发送弹幕
 * @param value
 */
const sendBarrage = ref({})
function newsScrolling(value){
	sendBarrage.value = JSON.parse(JSON.stringify(value))
	sendBarrage.value.videoId = videoId
	sendBarrage.value.userId = userId
	request.post(
		'/barrage/saveBarrage',
		sendBarrage.value
	).then(res => {
		if (res.code == '200'){
			getBarrageList()
			ElNotification({
				message: '发送弹幕成功！',
				type: 'success',
				offset: 50,
				duration: 1200,
			})
		}else {
			ElMessage({
				message: '发送弹幕失败！',
				type: "error",
				showClose: true,
			})
		}
	})
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

/**
 * 视频选集
 *
 */
const router = useRouter()
const handleCurrentChange = (row) => {
	router.push({
		path:'/base/playCourseVideo',
		query:{
			courseId:courseId,
			courseTitle:courseTitle,
			courseOutline:courseOutline,
			teacherId:teacherId,
			userName:userName,
			userAvatarUrl:userAvatarUrl,
			videoId:row.videoId ,
			videoUrl:row.videoUrl,
		}
	})
}
const tableRowClassName = (scope) => {
	if (scope.row.videoUrl == options.resource){
		return 'success-row'
	}
	return ''
}

/**
 * 课程评价
 */
let courseCommentDialogVisible = ref(false)
const courseCommentForm = ref({
  commentContent: '',
  commentRate:0.0,
  commentType:'course',
  userId: userId.value,
  courseId:courseId
})
function submitCourseComment(){
  request.post(
    '/comment/saveComment',
    courseCommentForm.value
  ).then(res => {
    if (res.code == '200'){
      courseCommentDialogVisible.value = false
      ElNotification({
        message: '评价成功！',
        type: 'success',
        offset: 50,
        duration: 1200,
      })
    }else{
      ElMessage({
        message: '评价失败！',
        type: "error",
        showClose: true,
      })
    }
  })
}

/**
 * 教师评价
 */
let teacherCommentDialogVisible = ref(false)
const teacherCommentForm = ref({
  commentContent: '',
  commentRate:0.0,
  commentType:'teacher',
  userId: userId.value,
  teacherId:teacherId
})
function submitTeacherComment(){
  request.post(
    '/comment/saveComment',
    teacherCommentForm.value
  ).then(res => {
    if (res.code == '200'){
      teacherCommentDialogVisible.value = false
      ElNotification({
        message: '评价成功！',
        type: 'success',
        offset: 50,
        duration: 1200,
      })
    }else{
      ElMessage({
        message: '评价失败！',
        type: "error",
        showClose: true,
      })
    }
  })
}
</script>

<template>
	<div class="main">
		<div class="left">
				<div class="title">{{ courseTitle }}</div>
				<div class="subtitle">{{ courseOutline }}</div>
        <div class="container">
            <div class="player-container">
                <w-player class="player" :options="options" :danmaku-key="num"></w-player>
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
            <el-button type="primary" :icon="Notebook" @click="courseCommentDialogVisible = true">课程评价</el-button>
            <el-button type="primary" :icon="User" @click="teacherCommentDialogVisible = true">教师评价</el-button>
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
                        :data="barrageList"
                        height="522px"
                        style="width: 370px;"
                >
                    <el-table-column property="time" label="时间" :formatter="formatterTime" width="60" />
                    <el-table-column property="text" label="弹幕内容" />
                    <el-table-column property="createtime" label="发送时间" :formatter="formatterCreateTime" width="134" />
                </el-table>
            </el-tab-pane>
        </el-tabs>
		</div>
      <el-dialog v-model="courseCommentDialogVisible" title="课程评价" align-center class="reply-dialog" width="540px" style="--el-dialog-padding-primary:20px">
          <el-form
                  :model="courseCommentForm"
                  label-width="auto"
                  label-position="right"
                  size="large"
          >
              <el-form-item label="评分">
                  <el-rate
                          v-model="courseCommentForm.commentRate"
                          show-score
                          allow-half
                          text-color="#ff9900"
                          score-template="{value}"
                  />
              </el-form-item>
              <el-form-item label="评价内容">
                  <el-input v-model="courseCommentForm.commentContent" />
              </el-form-item>
                <el-form-item class="dialog-submit">
                  <el-button type="primary" @click="submitCourseComment">评价</el-button>
                </el-form-item>
          </el-form>
      </el-dialog>
      <el-dialog v-model="teacherCommentDialogVisible" title="教师评价" align-center class="reply-dialog" width="540px" style="--el-dialog-padding-primary:20px">
        <el-form
          :model="teacherCommentForm"
          label-width="auto"
          label-position="right"
          size="large"
        >
          <el-form-item label="评分">
            <el-rate
              v-model="teacherCommentForm.commentRate"
              show-score
              allow-half
              text-color="#ff9900"
              score-template="{value}"
            />
          </el-form-item>
          <el-form-item label="评价内容">
            <el-input v-model="teacherCommentForm.commentContent" />
          </el-form-item>
          <el-form-item class="dialog-submit">
            <el-button type="primary" @click="submitTeacherComment">评价</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
.dialog-submit{
  position: relative;
  left: 430px;
  top: 30px;
}
</style>

<style>
.el-table .success-row {
    --el-table-tr-bg-color: var(--el-color-success-light-9);
    --el-table-text-color: #4C7CFE;
    color: #4C7CFE;
}
.el-table td.el-table__cell{
	cursor: pointer;
}
</style>