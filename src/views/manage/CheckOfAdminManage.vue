<script setup lang="ts">
import {computed, ref} from "vue";
import request from "@/utils/request";
import * as dayjs from "dayjs";
import {UploadFilled} from "@element-plus/icons-vue";
import {WPlayer} from "vue-wplayer";
import {ElMessage, ElNotification} from "element-plus";

function formatterTime(row){
    return dayjs(row.createTime).format('YYYY.MM.DD HH:mm')
}

/**
 * 视频查看
 */
let dialogViewVisible = ref(false)
function view(scope){
    options.resource = scope.row.videoUrl
    dialogViewVisible.value = true
}
const options = {
    resource: "",
    theme: "#40AEED",
}
/**
 * 操作
 */
const tableScope = ref({})

function checkVideo(scope,val){
    request.post(
        '/video/updateVideoStatus',
        tableScope.value
    ).then(res => {
        if (res.code == '200'){
            scope.row.videoStatus = val
            ElNotification({
                message: '操作成功！',
                type: 'success',
                offset: 50,
                duration: 1200,
            })
        }else {
            ElMessage({
                message: '操作失败！',
                type: "error",
                showClose: true,
            })
        }
    })
}
function pass(scope){
    tableScope.value.videoId = scope.row.videoId
    tableScope.value.videoStatus = '通过'
    checkVideo(scope,'通过')
}
function unPass(scope){
    tableScope.value.videoId = scope.row.videoId
    tableScope.value.videoStatus = '不通过'
    checkVideo(scope,'不通过')
}

/**
 * 分页+无限滚动
 */
const videoList = ref([])
const pageMsg = ref({
    currentPage:0,
    pageSize:10,
    total:null,
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

</script>

<template>
    <div class="content" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <div class="title">审核中心</div>
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
                    <el-button type="primary" size="small" @click="view(scope)" >查看</el-button>
                    <el-popconfirm v-if="scope.row.videoStatus == '审核中'" title="确定要将此视频审核通过吗?" confirm-button-text="确定" cancel-button-text="取消" @confirm="pass(scope)">
                        <template #reference>
                            <el-button type="success" size="small">通过</el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm v-if="scope.row.videoStatus == '审核中'" title="确定要将此视频审核不通过吗?" confirm-button-text="确定" cancel-button-text="取消" @confirm="unPass(scope)">
                        <template #reference>
                            <el-button type="danger" size="small">不通过</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="dialogViewVisible" title="审核视频" :destroy-on-close="true">
            <div class="player-container">
                <w-player class="player" :options="options" :danmakuKey="2"></w-player>
            </div>
        </el-dialog>
    </div>
</template>

<style scoped>
.title {
    font-size: 28px;
}
.player-container{
    height: 600px;
}
.player{
    height: 100%;
    width: 100%;
}
</style>