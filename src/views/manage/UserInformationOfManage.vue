<script setup lang="ts">
import {computed, onBeforeMount, ref} from "vue";
import {ElMessage} from 'element-plus'
import type { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {useUserStore} from "@/store/user";
import {storeToRefs} from "pinia";
import * as dayjs from 'dayjs'
import * as duration from 'dayjs/plugin/duration'
import request from "@/utils/request"; // 导入插件


const userStore = useUserStore()
const {userId,userName,userGender,userPhone,userAvatarUrl,userEmail,userLevel,userCreateTime,teacherId} = storeToRefs(userStore)
const userInfoForm = ref({
    userId:userId.value,
    userAvatarUrl: userAvatarUrl.value,
    userName: userName.value,
    userGender: userGender.value,
    userPhone: userPhone.value,
    userEmail: userEmail.value,
    userLevel: userLevel.value,
    userCreateTime: userCreateTime.value,
    teacherId: teacherId.value,
    teacherOutline:null,
    teacherDescribe:null,
    teacherRate:null,
    teacherImgUrl:null,
    tags: [],
})

function getTeacherInfo(){
    console.log(teacherId.value)
    request.get(
      "/teacher/getTeacherById",
      {
          params: {teacherId: teacherId.value}
      }
    ).then(res => {
        if (res.code === '200'){
            userInfoForm.value.teacherOutline = res.data.teacherOutline
            userInfoForm.value.teacherDescribe = res.data.teacherDescribe
            userInfoForm.value.teacherRate = res.data.teacherRate
            userInfoForm.value.teacherImgUrl = res.data.teacherImgUrl
        }
    })
}
function getTags(){
    request.get(
      "/tag/getTagsById",
      {
          params: {teacherId: teacherId.value}
      }
    ).then(res => {
        if (res.code === '200'){
            userInfoForm.value.tags = res.data.tags
        }
    })
}

onBeforeMount(() => {
    if (userLevel.value == 'teacher'){
        getTeacherInfo()
        getTags()
    }
})

let comeDays = computed(() => {
    dayjs.extend(duration)
    return dayjs.duration(dayjs().diff(dayjs(userInfoForm.value.userCreateTime))).days()
})


function onSubmit() {
    console.log('submit!')
}

/**
 * 头像上传
 * @param response
 * @param uploadFile
 */
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    userInfoForm.value.userAvatarUrl = response.data
}
const handleAvatarSuccess2: UploadProps['onSuccess'] = (response, uploadFile) => {
    userInfoForm.value.teacherImgUrl = response.data
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

const tags = ref(['言语优质讲师','面试主讲','公考申论主讲','数资大神','授课逻辑缜密','思路清晰'])

</script>

<template>
    <div class="content">
        <div class="title">个人信息</div>
        <el-divider class="divider"/>
        <el-form
          ref="form"
          :model="userInfoForm"
          label-width="auto"
          label-position="right"
          size="large"
        >
            <el-form-item label="用户头像">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:8009/files/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess"
                  :before-upload="beforeAvatarUpload"
                >
                    <img v-if="userInfoForm.userAvatarUrl" :src="userInfoForm.userAvatarUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="用户名称">
                <el-input v-model="userInfoForm.userName" />
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="userInfoForm.userGender">
                    <el-radio border :label="1">男</el-radio>
                    <el-radio border :label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="userInfoForm.userPhone" />
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="userInfoForm.userEmail" />
            </el-form-item>
            <el-form-item label="用户等级">
                <div style="display: flex;">
                    <div>普通用户</div>
                    <el-button style="margin-left: 10px;" v-if="userInfoForm.userLevel == 'normal'">升级为vip</el-button>
                </div>
            </el-form-item>
            <el-form-item label="教师概述" v-if="userLevel=='teacher'">
                <el-input v-model="userInfoForm.teacherOutline" />
            </el-form-item>
            <el-form-item label="教师详细介绍" v-if="userLevel=='teacher'">
                <el-input v-model="userInfoForm.teacherDescribe" />
            </el-form-item>
            <el-form-item label="教师封面" v-if="userLevel=='teacher'">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:8009/files/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload"
                >
                    <img v-if="userInfoForm.teacherImgUrl" :src="userInfoForm.teacherImgUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="学生评分" v-if="userLevel=='teacher'">
                <el-rate
                  v-if="userInfoForm.teacherRate != 0"
                  v-model="userInfoForm.teacherRate"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                />
                <div v-if="userInfoForm.teacherRate == 0">暂无评价</div>
            </el-form-item>
            <el-form-item label="教师标签" v-if="userLevel=='teacher'">
                <el-checkbox-group v-model="userInfoForm.tags" size="large" :max="2">
                    <el-checkbox v-for="tag in tags" :key="tag" :label="tag" border />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="加入星球天数">
                <div>{{comeDays}}天</div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="onSubmit">保存修改</el-button>
            </el-form-item>
        </el-form>
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