<script setup lang="ts">
import {ref} from "vue";
import request from "@/utils/request";
import {useUserStore} from "@/store/user";
import {storeToRefs} from "pinia";
import {ElNotification} from "element-plus";


const form = ref(null)
const userStore = useUserStore()
const {teacherId} = storeToRefs(userStore)
const createCourseForm = ref({
    teacherId:teacherId.value,
    courseTitle:'',
    courseOutline:'',
    coursePrice:0,
    courseType:'',
    tags:[],
})
const tags = ref(['考前点睛冲刺','历年真题讲解','一关攻克一考点','查漏补缺重点强化','热点及时掌握'])
function submitCreat(){
    request.post(
        '/course/createCourse',
        createCourseForm.value
    ).then(res => {
        if (res.code == '200'){
            ElNotification({
                message: '创建成功！请到我的课程中查看~',
                type: 'success',
                offset: 50,
                duration: 1200,
            })
            form.value.resetFields()
        }
    })

}
</script>

<template>
    <div class="content">
        <div class="title">创建课程</div>
        <el-divider class="divider"/>
        <el-form
          ref="form"
          :model="createCourseForm"
          label-width="auto"
          label-position="right"
          size="large"
        >
            <el-form-item label="课程标题" prop="courseTitle">
                <el-input v-model="createCourseForm.courseTitle" />
            </el-form-item>
            <el-form-item label="课程概述" prop="courseOutline">
                <el-input v-model="createCourseForm.courseOutline" />
            </el-form-item>
            <el-form-item label="课程售价" prop="coursePrice">
                <el-input-number v-model="createCourseForm.coursePrice" :precision="2" :step="10" />
            </el-form-item>
            <el-form-item label="课程类型" prop="courseType">
                <el-radio-group v-model="createCourseForm.courseType">
                    <el-radio border label="公考笔试"/>
                    <el-radio border label="公考面试"/>
                    <el-radio border label="事业单位"/>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="课程标签" prop="tags">
                <el-checkbox-group v-model="createCourseForm.tags" size="large" :max="2">
                    <el-checkbox v-for="tag in tags" :key="tag" :label="tag" border />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitCreat">创建课程</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.title {
    font-size: 28px;
}
</style>