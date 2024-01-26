<script setup lang="ts">
import {ref} from 'vue'
import {useRouter} from "vue-router";
import {
	Document,
	Menu as IconMenu,
	Location,
	Setting,
} from '@element-plus/icons-vue'

const router = useRouter()

const isCollapse = ref(true)
const handleOpen = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
	console.log(key, keyPath)
}

function toViewCourseOfTeacher() {
	router.push('/base/manageOfTeacher/viewCourseOfTeacher')
}

</script>

<template>
    <div class="nav">
        <el-menu
                default-active="2"
                class="el-menu-vertical"
                @open="handleOpen"
                @close="handleClose"
        >
            <el-menu-item index="1">
                <el-icon>
                    <icon-menu/>
                </el-icon>
                <span>用户信息</span>
            </el-menu-item>
            <el-sub-menu index="2">
                <template #title>
                    <el-icon>
                        <location/>
                    </el-icon>
                    <span>课程管理</span>
                </template>
                <el-menu-item index="2-1" @click="toViewCourseOfTeacher">我的课程</el-menu-item>
                <el-menu-item index="2-2">创建课程</el-menu-item>
            </el-sub-menu>
            <el-menu-item index="3">
                <el-icon>
                    <icon-menu/>
                </el-icon>
                <span>消息通知</span>
            </el-menu-item>
            <el-menu-item index="4">
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
    height: 80vh;
    margin-right: 25px;
}

.el-menu-vertical {
    height: 100%;
}

</style>