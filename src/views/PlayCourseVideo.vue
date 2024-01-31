<script setup lang="ts">
import { WPlayer } from 'vue-wplayer';
import {ref} from "vue";
import {Notebook, User} from "@element-plus/icons-vue";

const options = {
	resource: "http://localhost:8009/files/playVideo/a886263d5e6242ee9bfa0106ec4af47b.mp4",
	theme: "#40AEED",
	danmaku:{
		open: true,
		placeholder: '在这里输入弹幕喔~',
		data: [],
		send: newsScrolling,
	}
}
function newsScrolling(value){
	console.log('@@@',value)
}

const currentRow = ref()

const courseList = ref([
	{
		videoIndex: 'p1',
		videoName:'廉才浩 - 【判断】大纲解读&备考指导'
	},
	{
		videoIndex: 'p2',
		videoName:'廉才浩 - 【判断】大纲解读&备考指导'
	},
	{
		videoIndex: 'p3',
		videoName:'廉才浩 - 【判断】大纲解读&备考指导'
	},
])
const handleCurrentChange = (val) => {
	currentRow.value = val
}
</script>

<template>
	<div class="main">
		<div class="left">
				<div class="title">笔试系统班图书大礼包：2025国考/2024广东省考</div>
				<div class="subtitle">重难点夯实 刷题冲刺至考前</div>
        <div class="container">
            <div class="player-container">
                <w-player class="player" :options="options" :danmaku-key="0"></w-player>
            </div>
        </div>
		</div>
		<div class="right">
		<div class="right-header">
        <div class="teacher">
            <el-avatar size="large" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
            <div class="name">雷军</div>
        </div>
        <div class="rate">
            <el-button type="primary" :icon="Notebook" >课程评价</el-button>
            <el-button type="primary" :icon="User" >教师评价</el-button>
        </div>
    </div>
        <el-tabs type="border-card" class="tabs">
            <el-tab-pane label="视频选集">
                <el-table
                        ref="singleTableRef"
                        :data="courseList"
                        highlight-current-row
                        height="522px"
                        style="width: 370px"
                        @current-change="handleCurrentChange"
                >
                    <el-table-column property="videoIndex" width="40" />
                    <el-table-column property="videoName"  />
                </el-table>
            </el-tab-pane>
            <el-tab-pane label="弹幕列表">
                <el-table
                        ref="singleTableRef"
                        :data="courseList"
                        highlight-current-row
                        height="400px"
                        style="width: 370px"
                        @current-change="handleCurrentChange"
                >
                    <el-table-column property="videoIndex" label="时间" width="60" />
                    <el-table-column property="videoName" label="弹幕内容" width="300" />
                </el-table>
            </el-tab-pane>
        </el-tabs>
		</div>
	</div>
</template>

<style scoped>
.main{
	width: 1500px;
	padding: 80px 25px 0 25px;
	margin-left: 200px;
	background-color: #fff;
	display: flex;
}
.title{
	font-size: 22px;
	font-weight: 500;
}
.subtitle{
	margin-top: 10px;
	color: #9599A0;
}
.container {
    width: 1054px;
    margin-top: 30px;
}
.player-container {
    height: 0;
    width: 100%;
    padding-bottom: 56.25%;
    position: relative;
}
.player {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: black;
}
.right{
	margin-left: 35px;
	padding-bottom: 100px;
}
.right-header{
	display: flex;
}
.teacher{
	text-align: center;
}
.rate{
	margin-left: 50px;
	margin-top: 30px;
}
.tabs{
	margin-top: 8px;
}
</style>