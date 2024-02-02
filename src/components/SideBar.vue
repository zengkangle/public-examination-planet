<script setup lang="ts">
import {onBeforeMount, ref} from 'vue'
import {onBeforeRouteUpdate, useRouter} from "vue-router";
import {
  Fold,
  Expand,
	Document,
	User,
	ShoppingCart,
	VideoPlay,
	Search,
	VideoCamera,
	Setting,
	View,
	DocumentAdd,
} from '@element-plus/icons-vue'
import {useUserStore} from "@/store/user";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const {userLevel} = storeToRefs(userStore)


const router = useRouter()
let defaultActive = ref("")
function location(){
    defaultActive.value = router.currentRoute.value.fullPath
}
onBeforeMount(() => {
    location()
})
onBeforeRouteUpdate((to) => {
    defaultActive.value = to.fullPath
})

let isCollapse = ref(false)


</script>

<template>
    <div class="nav">
        <el-menu
                :default-active="defaultActive"
                :router="true"
                class="el-menu-vertical"
                :collapse="isCollapse"
        >
            <div @click="isCollapse = !isCollapse" class="fold-item">
                <el-icon class="fold-icon"><Fold /></el-icon>
            </div>
            <el-menu-item index="/base/manage/userInformationOfManage">
                <el-icon><User /></el-icon>
                <span>个人信息</span>
            </el-menu-item>
            <el-menu-item index="/base/manage/myOrderOfManage">
                <el-icon><ShoppingCart /></el-icon>
                <span>我的订单</span>
            </el-menu-item>
            <el-sub-menu v-if="userLevel == 'teacher'" index="/base/manage/myCourseOfManage">
                <template #title>
                    <el-icon><VideoPlay /></el-icon>
                    <span>课程管理</span>
                </template>
                <el-menu-item index="/base/manage/myCourseOfManage">我的课程</el-menu-item>
                <el-menu-item index="/base/manage/createCourseOfManage">创建课程</el-menu-item>
            </el-sub-menu>
            <el-sub-menu v-if="userLevel == 'admin'" index="/base/manage/userOfAdminManage">
                <template #title>
                    <el-icon><Setting /></el-icon>
                    <span>管理中心</span>
                </template>
                <el-menu-item index="/base/manage/userOfAdminManage">用户管理</el-menu-item>
                <el-menu-item index="/base/manage/teacherOfAdminManage">教师管理</el-menu-item>
                <el-menu-item index="/base/manage/courseOfAdminManage">课程管理</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="/base/manage/checkOfAdminManage" v-if="userLevel == 'admin'">
                <el-icon><View /></el-icon>
                <span>审核中心</span>
            </el-menu-item>
            <el-menu-item index="/base/manage/addArticleOfAdminManage" v-if="userLevel == 'admin'">
                <el-icon><DocumentAdd /></el-icon>
                <span>文章添加</span>
            </el-menu-item>
            <el-menu-item index="/base/manage/searchCheckOfManage" v-if="userLevel == 'teacher'">
                <el-icon><Search /></el-icon>
                <span>审核查询</span>
            </el-menu-item>
            <el-menu-item index="/base/manage/myLiveOfManage" v-if="userLevel == 'teacher'">
                <el-icon><VideoCamera /></el-icon>
                <span>我的直播</span>
            </el-menu-item>
            <el-menu-item index="/base/manage/" disabled>
                <el-icon>
                    <document/>
                </el-icon>
                <span>数据分析</span>
            </el-menu-item>
        </el-menu>

    </div>
</template>

<style scoped>
.nav {
    height: 93.4vh;
}

.el-menu-vertical {
    --el-menu-text-color: #fff;
    --el-menu-active-color: #65aefd;
    --el-menu-bg-color: #384b70;
    --el-menu-hover-bg-color: #2D3C5AFF;
    height: 100%;
    --el-menu-item-font-size: 16px;
    font-weight: bold;
}
.fold-item{
    height: 56px;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding: 0 20px;
    cursor: pointer;
    color: #fff;
}
.fold-item:hover{
    background-color: #2D3C5AFF;
}
.fold-icon{
    font-size: 18px;
    width: 24px;
}
</style>