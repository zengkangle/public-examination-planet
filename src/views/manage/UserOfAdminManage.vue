<script setup lang="ts">
import {ref} from "vue";
import * as dayjs from 'dayjs'
import ReplyCard from "@/components/ReplyCard.vue";
import {Plus} from "@element-plus/icons-vue";
import {ElMessage, UploadProps} from "element-plus";
import request from "@/utils/request";

function formatterGender(row){
    if (row.userGender == 1){
        return '男'
    }else {
        return '女'
    }
}
function formatterLevel(row){
    switch (row.userLevel){
        case 'normal':
            return '普通用户'
        case 'vip':
            return 'VIP用户'
        case 'teacher':
            return '教师'
        case 'admin':
            return '管理员'
    }
}
function formatterTime(row){
    return dayjs(row.userCreateTime).format('YYYY.MM.DD HH:mm')
}

function onSubmit() {
    console.log('submit!')
}


const handleAvatarSuccess: UploadProps['onSuccess'] = (response, uploadFile) => {
    // userInfoForm.value.userAvatarUrl = URL.createObjectURL(uploadFile.raw!)
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

let editDialogVisible = ref(false)
let tableScope = ref({})
function edit(row){
    tableScope.value = row
    editDialogVisible.value = true
}

let resetDialogVisible = ref(false)
const resetPassword = ref({
    password:'',
    checkPassword:''
})

const validateCheckPassword = (rule, value, callback) => {

    if (value === '') {
        callback(new Error('请再次输入密码'));
    } else if (value !== resetPassword.value.password) {
        callback(new Error('两次输入密码不一致!'));
    } else {
        callback();
    }
}

let rules = ref({
    checkPassword: [
        { validator: validateCheckPassword, required: true, trigger: "blur"},
    ],
    password: [
        {required: true, message: "请输入密码", trigger: "blur"}
    ],

})


/**
 * 分页+无限滚动
 */
const userList = ref([])
const pageMsg = ref({
    currentPage:1,
    pageSize:5,
})
const weiboList = ref([])
const load = () => {
    getUserListScroll()
}
function getUserListScroll(){
    request.get(
      "/user/getUserList",
      {
          params:pageMsg.value
      }
    ).then(res => {
        if (res.code === '200'){
            userList.value = userList.value.concat(res.data.records)
            pageMsg.value.currentPage++
        }
    })
}

</script>

<template>
    <div class="content" v-infinite-scroll="load">
        <div class="title">用户管理</div>
        <el-divider class="divider"/>

        <el-table :data="userList" style="width: 100%">
            <el-table-column prop="userAvatarUrl" label="头像" width="180">
                <template #default="scope">
                    <el-avatar shape="square" :size="50" :src="scope.row.userAvatarUrl" />
                </template>
            </el-table-column>
            <el-table-column prop="userName" label="用户名称" width="180"/>
            <el-table-column prop="userGender" label="性别" :formatter="formatterGender"/>
            <el-table-column prop="userPhone" label="手机号"/>
            <el-table-column prop="userEmail" label="邮箱"/>
            <el-table-column prop="userLevel" label="用户等级" :formatter="formatterLevel"/>
            <el-table-column prop="userCreateTime" label="创建时间" :formatter="formatterTime"/>
            <el-table-column label="操作" width="400">
                <template #default="scope">
                    <el-button type="primary" @click="edit(scope.row)">编辑</el-button>
                    <el-popconfirm title="你确定要将此用户修改为教师吗?" confirm-button-text="确定" cancel-button-text="取消">
                        <template #reference>
                            <el-button type="warning" :disabled="scope.row.userLevel == 'teacher'">添加教师</el-button>
                        </template>
                    </el-popconfirm>
                    <el-button type="warning" @click="resetDialogVisible = true">重置密码</el-button>
                    <el-popconfirm title="你确定要注销改用户吗?" confirm-button-text="确定" cancel-button-text="取消">
                        <template #reference>
                            <el-button type="danger">注销</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>

        <el-dialog v-model="editDialogVisible" title="编辑"  class="edit-dialog" width="540px">
            <el-form
              ref="form"
              :model="tableScope"
              label-width="auto"
              label-position="right"
              size="large"
            >
                <el-form-item label="用户头像">
                    <el-upload
                      class="avatar-uploader"
                      action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
                      :show-file-list="false"
                      :on-success="handleAvatarSuccess"
                      :before-upload="beforeAvatarUpload"
                    >
                        <img v-if="tableScope.userAvatarUrl" :src="tableScope.userAvatarUrl" class="avatar" />
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
                <el-form-item label="手机号">
                    <el-input v-model="tableScope.userPhone" />
                </el-form-item>
                <el-form-item label="邮箱">
                    <el-input v-model="tableScope.userEmail" />
                </el-form-item>
                <el-form-item label="用户等级" v-if="tableScope.userLevel == 'normal' || tableScope.userLevel == 'admin'">
                    <el-select
                      v-model="tableScope.userLevel"
                      class="m-2"
                      placeholder="Select"
                    >
                        <el-option label="普通用户" value="normal"/>
                        <el-option label="管理员" value="admin"/>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" style="margin: 0 auto;">保存修改</el-button>
                </el-form-item>
            </el-form>
        </el-dialog>

        <el-dialog v-model="resetDialogVisible" title="重置密码"  class="reset-dialog" width="540px">
            <el-form
              ref="form"
              :model="resetPassword"
              label-width="auto"
              label-position="right"
              size="large"
              :rules="rules"
            >
                <el-form-item label="密码" prop="password">
                    <el-input
                      type="password"
                      v-model="resetPassword.password"
                      autocomplete="off"
                      clearable
                    ></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkPassword" for="checkPassword">
                    <el-input
                      type="password"
                      v-model="resetPassword.checkPassword"
                      autocomplete="off"
                      clearable
                    ></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" style="margin: 0 auto;">保存修改</el-button>
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