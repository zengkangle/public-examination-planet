<script setup lang="ts">
import * as dayjs from "dayjs";
import {computed, ref} from "vue";
import request from "@/utils/request";
import {UploadFilled} from "@element-plus/icons-vue";
import {ElMessage, ElNotification} from "element-plus";
import {useUserStore} from "@/store/user";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const {teacherId} = storeToRefs(userStore)

function formatterTime(row){
    return dayjs(row.createTime).format('YYYY.MM.DD HH:mm')
}
/**
 * 分页+无限滚动
 */
const videoList = ref([])
const pageMsg = ref({
    currentPage:0,
    pageSize:10,
    total:null,
    teacherId:teacherId.value
})
let disabled = computed(() => {
    return videoList.value.length == pageMsg.value.total;
})
const load = () => {
    pageMsg.value.currentPage++
    getUserListScroll()
}
function getUserListScroll(){
    request.get(
      "/video/getCheckVideoList",
      {
          params:pageMsg.value
      }
    ).then(res => {
        if (res.code === '200'){
            videoList.value = videoList.value.concat(res.data.records)
            pageMsg.value.total = res.data.total
        }
    })
}

/**
 * 重新上传
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
const dialogReUploadVisible = ref(false)
const reUploadVideo = ref({})
function reUpload(scope) {
    reUploadVideo.value.coursePage = scope.row.coursePage
    reUploadVideo.value.courseId = scope.row.courseId
    dialogReUploadVisible.value = true
}
function onFileSuccess(rootFile, file, response) {
    let res = JSON.parse(response);
    reUploadVideo.value.videoUrl = res.data
}
function submitReUpload(){
    request.post(
      '/video/saveCourseVideo',
      reUploadVideo.value,
    ).then(res => {
        if (res.code == '200'){
            dialogReUploadVisible.value = false
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
</script>

<template>
    <div class="content">
        <div class="title">审核查询</div>
        <el-divider class="divider"/>
        <el-table :data="videoList" style="width: 100%" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
            <el-table-column prop="videoTitle" label="视频标题">
                <template #default="scope">
                    <el-text line-clamp="2" >{{ scope.row.videoTitle }}</el-text>
                </template>
            </el-table-column>
            <el-table-column prop="courseTitle" label="所属课程">
                <template #default="scope">
                    <el-text line-clamp="2" >{{ scope.row.courseTitle }}</el-text>
                </template>
            </el-table-column>
            <el-table-column prop="coursePage" label="所属课程节数"/>
            <el-table-column prop="videoStatus" label="视频状态">
                <template #default="scope">
                    <el-tag v-if="scope.row.videoStatus === '通过'" type="success">通过</el-tag>
                    <el-tag v-else-if="scope.row.videoStatus === '不通过'" type="danger">不通过</el-tag>
                    <el-tag v-else type="warning">审核中</el-tag>
                </template>
            </el-table-column>
            <el-table-column prop="createTime" label="创建时间" :formatter="formatterTime"/>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" size="small" @click="reUpload(scope)" :disabled="scope.row.videoStatus != '不通过'">重新上传</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogReUploadVisible" title="视频上传">
            <el-form :model="reUploadVideo" label-width="110px">
                <el-form-item label="视频标题" prop="videoTitle">
                    <el-input v-model="reUploadVideo.videoTitle" autocomplete="off"/>
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
                <el-button type="primary" @click="submitReUpload">确定上传</el-button>
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