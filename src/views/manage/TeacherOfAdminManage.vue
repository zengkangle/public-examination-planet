<script setup lang="ts">
import {computed, ref} from "vue";
import {ElMessage, ElNotification, UploadProps} from "element-plus";
import request from "@/utils/request";
import {Plus} from "@element-plus/icons-vue";

const tags = ref(['言语优质讲师','面试主讲','公考申论主讲','数资大神','授课逻辑缜密','思路清晰'])
function formatterGender(row){
    if (row.userGender == 1){
        return '男'
    }else {
        return '女'
    }
}
function formatterShow(row){
    if (row.isShow == 1){
        return '展示'
    }else {
        return '不展示'
    }
}
function formatterRate(row){
    if (row.teacherRateCount == 0){
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
      'http://localhost:8009/user/updateUserInfo',
      tableScope.value,
    ).then(res => {
        if (res.code == '200'){
            userList.value[tableScope.value.index] = JSON.parse(JSON.stringify(tableScope.value))
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
 * 图片上传
 * @param response
 * @param uploadFile
 */
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    tableScope.value.userAvatarUrl = response.data
}
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    if (rawFile.type !== 'image/jpeg') {
        ElMessage.error('Avatar picture must be JPG format!')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('Avatar picture size can not exceed 2MB!')
        return false
    }
    return true
}
/**
 * 分页+无限滚动
 */
const teacherList = ref([])
const pageMsg = ref({
    currentPage:0,
    pageSize:10,
    total:null,
})
let disabled = computed(() => {
    return teacherList.value.length == pageMsg.value.total;
})
const load = () => {
    pageMsg.value.currentPage++
    getTeacherListScroll()
}
function getTeacherListScroll(){
    request.get(
      "/teacher/getTeacherList",
      {
          params:pageMsg.value
      }
    ).then(res => {
        if (res.code === '200'){
            teacherList.value = teacherList.value.concat(res.data.records)
            pageMsg.value.total = res.data.total
        }
    })
}




</script>

<template>
    <div class="content" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <div class="title">教师管理</div>
        <el-divider class="divider"/>
        <el-table :data="teacherList" style="width: 100%">
            <el-table-column prop="teacherImgUrl" label="教师封面" width="180">
                <template #default="scope">
                    <el-avatar shape="square" :size="50" :src="scope.row.teacherImgUrl" />
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="用户名称" width="180"/>
            <el-table-column prop="userGender" label="性别" :formatter="formatterGender"/>
            <el-table-column prop="tags" label="教师标签"/>
            <el-table-column prop="teacherOutline" label="教师概述"/>
            <el-table-column prop="teacherDescribe" label="教师详细描述"/>
            <el-table-column prop="teacherRate" label="教师评分" :formatter="formatterRate"/>
            <el-table-column prop="isShow" label="是否在师资中展示" :formatter="formatterShow"/>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="edit(scope)">编辑</el-button>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="editDialogVisible" title="编辑"  class="edit-dialog" width="600px" top="2.1vh">
            <el-form
              ref="form"
              :model="tableScope"
              label-width="auto"
              label-position="right"
              size="large"
            >
                <el-form-item label="教师封面">
                    <el-upload
                      class="avatar-uploader"
                      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="tableScope.teacherImgUrl" :src="tableScope.teacherImgUrl" class="avatar" />
                        <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                    </el-upload>
                </el-form-item>
                <el-form-item label="用户名称">
                    <el-input v-model="tableScope.userName" />
                </el-form-item>
                <el-form-item label="性别">
                    <el-radio-group v-model="tableScope.userGender">
                        <el-radio border :label="1">男</el-radio>
                        <el-radio border :label="0">女</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="教师标签">
                    <el-checkbox-group v-model="tableScope.teacherTags" size="large" :max="2">
                        <el-checkbox v-for="tag in tags" :key="tag" :label="tag" border />
                    </el-checkbox-group>
                </el-form-item>
                <el-form-item label="教师概述">
                    <el-input v-model="tableScope.teacherOutline" />
                </el-form-item>
                <el-form-item label="教师详细介绍">
                    <el-input v-model="tableScope.teacherDescribe" type="textarea"/>
                </el-form-item>
                <el-form-item label="是否在师资中展示">
                    <el-radio-group v-model="tableScope.userGender">
                        <el-radio border :label="1">展示</el-radio>
                        <el-radio border :label="0">不展示</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitEdit" style="margin: 0 auto;">保存修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>
    </div>
</template>

<style scoped>
.title {
    font-size: 28px;
}
.avatar-uploader .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>

<style>
.avatar-uploader .el-upload {
    border: 1px dashed var(--el-border-color);
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
    transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
    border-color: var(--el-color-primary);
}

.el-icon.avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    text-align: center;
}
</style>