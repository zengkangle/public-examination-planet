<script setup lang="ts">

const {teacherRate} = defineProps(['userName','userAvatarUrl','teacherDescribe','teacherRateCount','teacherRate'])
let teacherRateShow = parseFloat(teacherRate)

</script>

<template>
	<div class="card-box">
		<div class="teacher">
        <el-avatar :size="55" :src="userAvatarUrl"/>
        <div class="teacher-right">
          <div class="name">{{ userName }}</div>
          <el-rate v-model="teacherRateShow" size="large" allow-half disabled class="rate" v-if="teacherRateCount != 0"/>
          <div v-if="teacherRateCount === 0" style="font-size: 14px; margin-top: 10px;">暂无学生评价</div>
        </div>
		</div>
		<div class="teacher-introduce-detail">{{ teacherDescribe }}</div>
	</div>
</template>

<style scoped>
.card-box{
	width: 480px;
	padding: 24px;
	background-color: #F2F4F7;
	margin: 0 12px;
	border-radius: 6px;
	transition: 0.2s linear;
	cursor: pointer;
}
.card-box:hover{
    box-shadow: 3px 3px 15px rgba(0,0,0,.3);
    position: relative;
    top: -3px;
}
.teacher{
	display: flex;
}
.teacher-right{
	margin-left: 25px;
}
.name{
	font-size: 16px;
	font-weight: 700;
	position: relative;
	top: 4px;
}
.rate{
	margin-left: -3px;
}
.teacher-introduce-detail{
	margin-top: 15px;
	font-size: 14px;
	color: rgb(60, 70, 79);
}
</style>