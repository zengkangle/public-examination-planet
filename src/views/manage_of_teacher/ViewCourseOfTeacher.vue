<script setup lang="ts">
import {ref, onMounted, nextTick} from "vue";
import { UploadFilled } from '@element-plus/icons-vue'
const tableData = [
	{
		title: '笔试系统班图书大礼包：2025国考/2024广东省考',
		subtitle: '重难点夯实 刷题冲刺至考前',
		price: 999,
		order: 141,
	},
	{
		title: '笔试系统班图书大礼包：2025国考/2024广东省考',
		subtitle: '重难点夯实 刷题冲刺至考前',
		price: 999,
		order: 141,
	},
	{
		title: '笔试系统班图书大礼包：2025国考/2024广东省考',
		subtitle: '重难点夯实 刷题冲刺至考前',
		price: 999,
		order: 141,
	},
	{
		title: '笔试系统班图书大礼包：2025国考/2024广东省考',
		subtitle: '重难点夯实 刷题冲刺至考前',
		price: 999,
		order: 141,
	},
]
const pageMsg = ref({currentPage: 1, pageSize: 10, total: 30})
const dialogFormVisible = ref(false)
const dialogUploadVisible = ref(false)
const form = ref({
	name: '',
	region: '',
	date1: '',
	date2: '',
	delivery: false,
	type: [],
	resource: '',
	desc: '',
})


const options = {
	target: 'http://localhost:8009/files/videoUpload',
	testChunks: false
}
const attrs = {
	accept: 'image/*'
}
const statusText = {
	success: '上传成功！',
	error: '上传失败，请重试！',
	uploading: '努力上传中，请等待！',
	paused: '暂停中',
	waiting: 'waiting'
}
function onFileSuccess(rootFile, file, response, chunk) {
    let res = JSON.parse(response);
    console.log(res)
}
function showEditDialog() {
	dialogFormVisible.value = true
}

function showUploadDialog() {
	dialogUploadVisible.value = true
}
</script>

<template>
    <div class="content">
        <div class="title">我的课程</div>
        <el-divider class="divider"/>
        <el-table :data="tableData" style="width: 100%">
            <el-table-column prop="title" label="课程名" width="180"/>
            <el-table-column prop="subtitle" label="子标题" width="180"/>
            <el-table-column prop="price" label="价格"/>
            <el-table-column prop="order" label="购买人数"/>
            <el-table-column prop="order" label="课程节数"/>
            <el-table-column label="标签"/>
            <el-table-column label="操作">
                <template #default>
                    <el-button link type="primary" size="small" @click="showEditDialog">编辑</el-button>
                    <el-button link type="primary" size="small" @click="showUploadDialog">上传视频</el-button>
                </template>
            </el-table-column>
        </el-table>
        <el-pagination
                :background="true"
                layout="prev, pager, next, jumper"
                v-model:current-page="pageMsg.currentPage"
                v-model:page-size="pageMsg.pageSize"
                :total="pageMsg.total"
                class="page"
        >
        </el-pagination>
        <el-dialog v-model="dialogFormVisible" title="编辑">
            <el-form :model="form">
                <el-form-item label="Promotion name" label-width="140px">
                    <el-input v-model="form.name" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="Zones" label-width="140px">
                    <el-select v-model="form.region" placeholder="Please select a zone">
                        <el-option label="Zone No.1" value="shanghai"/>
                        <el-option label="Zone No.2" value="beijing"/>
                    </el-select>
                </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                <el-button @click="dialogFormVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">Confirm</el-button>
                </span>
            </template>
        </el-dialog>
        <el-dialog v-model="dialogUploadVisible" title="视频上传">
            <el-form :model="form">
                <el-form-item label="视频标题" label-width="140px">
                    <el-input v-model="form.name" autocomplete="off"/>
                </el-form-item>
                <el-form-item label="请选择课程节数" label-width="140px">
                    <el-select v-model="form.region" placeholder="请选择课程节数">
                        <el-option label="第一节课" value="shanghai"/>
                        <el-option label="新增课时" value="beijing"/>
                    </el-select>
                </el-form-item>
                <el-form-item label="选择视频" label-width="140px">
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
                <el-button @click="dialogUploadVisible = false">Cancel</el-button>
                <el-button type="primary" @click="dialogUploadVisible = false">Confirm</el-button>
                </span>
            </template>
        </el-dialog>
    </div>
</template>

<style scoped>
.content {
    width: 100%;
}

.title {
    font-size: 28px;
    position: relative;
    top: 16px;
}

.page {
    position: relative;
    left: 400px;
    text-align: center;
    margin-top: 30px;
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