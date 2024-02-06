<script setup lang="ts">
import {ref,computed} from "vue";
import {Plus, UploadFilled} from '@element-plus/icons-vue'
import request from "@/utils/request";
import * as dayjs from 'dayjs'
import {ElMessage, ElNotification} from "element-plus";

const tags = ref(['考前点睛冲刺','历年真题讲解','一关攻克一考点','查漏补缺重点强化','热点及时掌握'])

function formatterTime(row){
    return dayjs(row.createTime).format('YYYY.MM.DD HH:mm')
}
function formatterRate(row){
    if (row.courseRateCount == 0){
        return '暂无学生评价'
    }else {
        return row.teacherRate
    }
}

/**
 * 编辑
 */
let editDialogVisible = ref(false)
const tableScope = ref({})
function edit(scope){
    tableScope.value = JSON.parse(JSON.stringify(scope.row))
    tableScope.value.index = scope.$index
    editDialogVisible.value = true
}
function submitEdit(){
    request.post(
      'http://localhost:8009/course/updateCourseInfo',
      tableScope.value,
    ).then(res => {
        if (res.code == '200'){
            courseList.value[tableScope.value.index] = JSON.parse(JSON.stringify(tableScope.value))
            editDialogVisible.value = false
            ElNotification({
                message: '修改成功！',
                type: 'success',
                offset: 50,
                duration: 1200,
            })
        }else {
            ElMessage({
                message: '修改失败！',
                type: "error",
                showClose: true,
            })
        }
    })
}

/**
 * 视频上传
 */
const options = {
	target: 'http://localhost:8009/files/videoUpload',
	testChunks: false
}
const statusText = {
	success: '上传成功！',
	error: '上传失败，请重试！',
	uploading: '努力上传中，请等待！',
	paused: '暂停中',
	waiting: 'waiting'
}
const dialogUploadVisible = ref(false)
const uploadVideo = ref({})
function upload(scope) {
    uploadVideo.value.coursePageAmount = scope.row.coursePageAmount
    uploadVideo.value.courseId = scope.row.courseId
    dialogUploadVisible.value = true
}
function onFileSuccess(rootFile, file, response) {
    let res = JSON.parse(response);
    console.log(res)
    uploadVideo.value.videoUrl = res.data
}
function submitUpload(){
    request.post(
        '/video/saveCourseVideo',
        uploadVideo.value,
    ).then(res => {
        if (res.code == '200'){
            dialogUploadVisible.value = false
            ElNotification({
                message: '课程视频上传成功！',
                type: 'success',
                offset: 50,
                duration: 1200,
            })
        }else {
            ElMessage({
                message: '视频上传失败！',
                type: "error",
                showClose: true,
            })
        }
    })
}
/**
 * 分页+无限滚动
 */
const courseList = ref([])
const pageMsg = ref({
    currentPage:0,
    pageSize:10,
    total:null,
})
let disabled = computed(() => {
    return courseList.value.length == pageMsg.value.total;
})
const load = () => {
    pageMsg.value.currentPage++
    getUserListScroll()
}
function getUserListScroll(){
    request.get(
      "/course/getCourseList",
      {
          params:pageMsg.value
      }
    ).then(res => {
        if (res.code === '200'){
            courseList.value = courseList.value.concat(res.data.records)
            pageMsg.value.total = res.data.total
        }
    })
}
</script>

<template>
    <div class="content" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <div class="title">我的课程</div>
        <el-divider class="divider"/>
        <el-table :data="courseList" style="width: 100%">
            <el-table-column prop="courseTitle" label="课程标题">
                <template #default="scope">
                    <el-text line-clamp="2" >{{ scope.row.courseTitle }}</el-text>
                </template>
            </el-table-column>
            <el-table-column prop="courseOutline" label="课程概述">
                <template #default="scope">
                    <el-text line-clamp="2" >{{ scope.row.courseOutline }}</el-text>
                </template>
            </el-table-column>
            <el-table-column prop="courseType" label="课程种类"/>
            <el-table-column prop="coursePrice" label="价格"/>
            <el-table-column prop="courseOrder" label="购买人数"/>
            <el-table-column prop="coursePageAmount" label="课程节数"/>
            <el-table-column prop="tags" label="标签">
                <template #default="scope">
                    <div class="tagList">
                        <el-tag v-for="tag in scope.row.tags" :key="tag" style="margin-right: 5px;margin-top: 5px">{{tag}}</el-tag>
                    </div>
                </template>
            </el-table-column>
            <el-table-column prop="courseStatus" label="课程状态"/>
            <el-table-column prop="courseRate" label="课程评分" :formatter="formatterRate"/>
            <el-table-column prop="createTime" label="创建时间" :formatter="formatterTime"/>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button link type="primary" size="small" @click="edit(scope)">编辑</el-button>
                    <el-button link type="primary" size="small" @click="upload(scope)">上传视频</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="editDialogVisible" title="编辑">
            <el-form
              ref="form"
              :model="tableScope"
              label-width="auto"
              label-position="right"
              size="large"
            >
                <el-form-item label="课程标题">
                    <el-input v-model="tableScope.courseTitle" />
                </el-form-item>
                <el-form-item label="课程概述">
                    <el-input v-model="tableScope.courseOutline" />
                </el-form-item>
                <el-form-item label="课程种类">
                    <el-radio-group v-model="tableScope.courseType">
                        <el-radio border label="公考笔试"/>
                        <el-radio border label="公考面试"/>
                        <el-radio border label="事业单位"/>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="价格">
                    <el-input-number v-model="tableScope.coursePrice" :precision="2" :step="10" />
                </el-form-item>
                <el-form-item label="课程标签">
                        <el-checkbox-group v-model="tableScope.tags" size="large" :max="2">
                            <el-checkbox v-for="tag in tags" :key="tag" :label="tag" border />
                        </el-checkbox-group>
                </el-form-item>
                <el-form-item label="课程状态">
                    <el-radio-group v-model="tableScope.courseStatus">
                        <el-radio border label="上架"/>
                        <el-radio border label="下架"/>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitEdit" style="margin: 0 auto;">保存修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog v-model="dialogUploadVisible" title="视频上传">
            <el-form :model="uploadVideo" label-width="110px">
                <el-form-item label="视频标题" prop="videoTitle">
                    <el-input v-model="uploadVideo.videoTitle" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="请选择课程节数" prop="coursePage">
                    <el-select v-model="uploadVideo.coursePage" placeholder="请选择课程节数">
                        <el-option label="新增课程视频" :value="uploadVideo.coursePageAmount+1"/>
                        <el-option :label="'第'+count+'节课'" v-for="count in uploadVideo.coursePageAmount" value="count"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择视频"  >
                    <uploader
                      :options="options"
                      :file-status-text="statusText"
                      class="uploader-example"
                      @file-success="onFileSuccess"
                    >
                        <uploader-unsupport></uploader-unsupport>
                        <uploader-drop class="uploader-drop">
                        <div class="upload-icon">
                            <el-icon class="el-icon--upload"><upload-filled /></el-icon>
                        </div>
                            <div class="uploader-text-area">
                                <div>将视频拖拽到此区域进行上传 或者</div>
                                <uploader-btn class="uploader-btn">点击上传</uploader-btn>
                            </div>
                        </uploader-drop>
                        <uploader-list></uploader-list>
                    </uploader>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                <el-button type="primary" @click="submitUpload">确定上传</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped>

.title {
    font-size: 28px;
}

.uploader-example {
    width: 880px;
    font-size: 12px;
}

.uploader-btn{
    border: 0;
    color: #4F92EA;
}
.uploader-btn:hover{
    background-color: #F5F5F5;
}
.uploader-example .uploader-list {
    max-height: 440px;
    overflow: auto;
    overflow-x: hidden;
    overflow-y: auto;
}
.uploader-text-area{
    display: flex;
    align-items: center;
    justify-content: center;
}
.uploader-drop{
    border-radius: 3px;
}
.uploader-drop:hover{
    border-color: #4C7CFE;
}
.upload-icon{
    font-size: 60px;
    display: flex;
    justify-content: center;
}
</style>