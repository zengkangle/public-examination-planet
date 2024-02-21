<script setup lang="ts">
import {computed, onBeforeMount, ref} from "vue";
import {ElMessage, ElNotification} from 'element-plus'
import type { UploadProps } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import {useUserStore} from "@/store/user";
import {storeToRefs} from "pinia";
import * as dayjs from 'dayjs'
import * as duration from 'dayjs/plugin/duration'
import request from "@/utils/request";
import useGetUserToStore from "@/hooks/useGetUserToStore"; // 导入插件


const userStore = useUserStore()
const {userId} = storeToRefs(userStore)
const plusUserInfoForm = ref({})

/**
 * 初始化个人信息
 */
const tags = ref(['言语优质讲师','面试主讲','公考申论主讲','数资大神','授课逻辑缜密','思路清晰'])
let comeDays = computed(() => {
    dayjs.extend(duration)
    return dayjs.duration(dayjs().diff(dayjs(plusUserInfoForm.value.userCreateTime))).days()
})
let userLevelFormatter = computed(() => {
    if (plusUserInfoForm.value.userLevel === 'normal'){
        return '普通用户'
    } else if (plusUserInfoForm.value.userLevel === 'vip'){
        return 'vip用户'
    } else if (plusUserInfoForm.value.userLevel === 'teacher'){
        return '教师'
    } else {
        return '管理员'
    }
})
function getPlusUserInfo(){
    request.get(
        '/user/getPlusUserMsg',
      {
        params:{userId: userId.value}
      }
    ).then(res => {
        if (res.code === '200'){
            plusUserInfoForm.value = res.data
        }
    })
}

onBeforeMount(() => {
    getPlusUserInfo()
})


/**
 * 提交用户修改
 */
function submitEdit() {
    request.post(
        '/user/updateUserInfoPlus',
      plusUserInfoForm.value,
    ).then(res => {
        if (res.code == '200'){
            ElNotification({
                message: '修改成功！',
                type: 'success',
                offset: 50,
                duration: 1200,
            })
            request.get(
              "/user/getUserMsg",
              {
                  params:{userId: userId.value}
              }
            ).then(res => {
                if (res.code === '200') {
                    res.data.token = JSON.parse(sessionStorage.getItem('user')).token
                    sessionStorage.removeItem("user")
                    sessionStorage.setItem("user", JSON.stringify(res.data))//存储用户信息到浏览器
                    const {getUserMsg} = useGetUserToStore()
                    getUserMsg()
                }
            }).then(() => {
                getPlusUserInfo()
            })
        }
    })
}

/**
 * 头像上传
 * @param response
 * @param uploadFile
 */
const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    plusUserInfoForm.value.userAvatarUrl = response.data
}
const handleAvatarSuccess2: UploadProps['onSuccess'] = (response, uploadFile) => {
    plusUserInfoForm.value.teacherImgUrl = response.data
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
 * 升级vip
 */
const order = ref({
    userId:userId.value,
    orderType:"vip",
    orderName:"公考星球VIP",
    orderPrice:99.0,
})
function buy(){
    request.post(
      '/order/createOrder',
      order.value
    ).then(res => {
        if (res.code == '200'){
            if (res.data.orderStatus == '已支付'){
                ElMessage({
                    message: '你已经是尊贵的VIP用户，无需购买，请重新登录！',
                    type:'warning',
                    showClose: true,
                })
            }else {
                window.open("http://localhost:8009/alipay/pay?orderId="+res.data.orderId);
            }
        }
    })
}
</script>

<template>
    <div class="content">
        <div class="title">个人信息</div>
        <el-divider class="divider"/>
        <el-form
          ref="form"
          :model="plusUserInfoForm"
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
                    <img v-if="plusUserInfoForm.userAvatarUrl" :src="plusUserInfoForm.userAvatarUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="用户名称">
                <el-input v-model="plusUserInfoForm.userName" />
            </el-form-item>
            <el-form-item label="性别">
                <el-radio-group v-model="plusUserInfoForm.userGender">
                    <el-radio border :label="1">男</el-radio>
                    <el-radio border :label="0">女</el-radio>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="手机号">
                <el-input v-model="plusUserInfoForm.userPhone" />
            </el-form-item>
            <el-form-item label="邮箱">
                <el-input v-model="plusUserInfoForm.userEmail" />
            </el-form-item>
            <el-form-item label="用户等级">
                <div style="display: flex;">
                    <div>{{ userLevelFormatter }}</div>
                    <el-button style="margin-left: 10px;" v-if="plusUserInfoForm.userLevel === 'normal'" @click="buy">升级为vip</el-button>
                </div>
            </el-form-item>
            <el-form-item label="教师概述" v-if="plusUserInfoForm.userLevel=='teacher'">
                <el-input v-model="plusUserInfoForm.teacherOutline" />
            </el-form-item>
            <el-form-item label="教师详细介绍" v-if="plusUserInfoForm.userLevel=='teacher'">
                <el-input v-model="plusUserInfoForm.teacherDescribe" />
            </el-form-item>
            <el-form-item label="教师封面" v-if="plusUserInfoForm.userLevel=='teacher'">
                <el-upload
                  class="avatar-uploader"
                  action="http://localhost:8009/files/imageUpload"
                  :show-file-list="false"
                  :on-success="handleAvatarSuccess2"
                  :before-upload="beforeAvatarUpload"
                >
                    <img v-if="plusUserInfoForm.teacherImgUrl" :src="plusUserInfoForm.teacherImgUrl" class="avatar" />
                    <el-icon v-else class="avatar-uploader-icon"><Plus /></el-icon>
                </el-upload>
            </el-form-item>
            <el-form-item label="学生评分" v-if="plusUserInfoForm.userLevel=='teacher'">
                <el-rate
                  v-if="plusUserInfoForm.teacherRate != 0"
                  v-model="plusUserInfoForm.teacherRate"
                  disabled
                  show-score
                  text-color="#ff9900"
                  score-template="{value}"
                />
                <div v-if="plusUserInfoForm.teacherRate == 0">暂无评价</div>
            </el-form-item>
            <el-form-item label="教师标签" v-if="plusUserInfoForm.userLevel=='teacher'">
                <el-checkbox-group v-model="plusUserInfoForm.tags" size="large" :max="2">
                    <el-checkbox v-for="tag in tags" :key="tag" :label="tag" border />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="加入星球天数">
                <div>{{comeDays}}天</div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitEdit">保存修改</el-button>
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