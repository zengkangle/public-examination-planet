<script setup lang="ts">
import {computed, ref} from "vue";
import request from "@/utils/request";
import * as dayjs from "dayjs";
import {ElMessage, ElNotification} from "element-plus";

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
 * 操作
 */
 const tableScope = ref({})
function updateCourse(){
    request.post(
      '/course/updateCourseStatus',
      tableScope.value,
    ).then(res => {
        if (res.code == '200'){
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
async function freeze(scope){
    tableScope.value.courseId = scope.row.courseId
    tableScope.value.courseStatus = '冻结'
    await updateCourse()
    scope.row.courseStatus = '冻结'
}
async function unfreeze(scope){
    tableScope.value.courseId = scope.row.courseId
    tableScope.value.courseStatus = '下架'
    await updateCourse()
    scope.row.courseStatus = '下架'
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
        <div class="title">课程管理</div>
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
            <el-table-column label="操作" width="150px">
                <template #default="scope">
                    <el-popconfirm title="你确定要将此课程解冻吗?" confirm-button-text="确定" cancel-button-text="取消" @confirm="unfreeze(scope)">
                        <template #reference>
                            <el-button type="primary" size="small" :disabled="scope.row.courseStatus != '冻结'">解冻</el-button>
                        </template>
                    </el-popconfirm>
                    <el-popconfirm title="你确定要将此课程冻结吗?" confirm-button-text="确定" cancel-button-text="取消" @confirm="freeze(scope)">
                        <template #reference>
                            <el-button type="danger" size="small" :disabled="scope.row.courseStatus == '冻结'">冻结</el-button>
                        </template>
                    </el-popconfirm>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style scoped>
.title {
    font-size: 28px;
}
</style>