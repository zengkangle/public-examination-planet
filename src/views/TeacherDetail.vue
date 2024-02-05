<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import StudentRate from "@/components/StudentRate.vue";
import request from "@/utils/request";

const {teacherId,userName} = defineProps(['teacherId','userName'])
const teacherInfo = ref({})
function getTeacherInfo(){
  request.get(
    '/teacher/getTeacherById',
    {
      params:{teacherId:teacherId}
    },
  ).then(res => {
    if (res.code == '200'){
      teacherInfo.value = res.data
    }
  })
}
onBeforeMount(() => {
  getTeacherInfo()
})
</script>

<template>
	<div class="main">
		<div class="teacher-introduce-box">
        <div class="title-box">
            <el-divider direction="vertical" class="divider"></el-divider>
            <div class="title">师资介绍</div>
        </div>
        <div class="body-box">
            <div class="photo">
                <img :src="teacherInfo.teacherImgUrl" alt="" class="teacher-image" />
            </div>
            <div class="teacher-detail-box">
                <div class="teacher-name">{{ userName }}</div>
                <div class="teacher-info-box">
                    <div class="teacher-info">{{ teacherInfo.teacherOutline }}</div>
                  <div class="rate-box">
                    <el-rate
                      v-model="teacherInfo.teacherRate"
                      disabled
                      show-score
                      text-color="#ff9900"
                      score-template="{value}"
                      size="large"
                      class="rate"
                      v-if="teacherInfo.teacherRateCount != 0"
                    />
                    <div class="rate-title">已有{{teacherInfo.teacherRateCount}}人评分</div>
                  </div>
                </div>
                <el-divider class="divider2"/>
                <div class="teacher-describe">{{teacherInfo.teacherDescribe}}</div>
            </div>
        </div>
        <div class="student-rate">
          <div class="title-box">
            <el-divider direction="vertical" class="divider"></el-divider>
            <div class="title">学生评价</div>
          </div>
          <StudentRate/>
          <StudentRate/>
          <StudentRate/>
        </div>
    </div>
	</div>
</template>

<style scoped>
.main{
	width: 1500px;
	padding-top: 100px;
	margin: 0 auto;
}
.teacher-introduce-box{
		width: 100%;
    background-color: #fff;
		margin-left: 0;
		padding: 25px;
}
.title-box{
	display: flex;
	align-items: center;
}
.divider{
	width: 6px;
	height: 30px;
	background-color: #559EFF;
}
.title{
	color: #404040;
	font-size: 30px;
}
.body-box{
	display: flex;
	margin-top: 30px;
}
.photo{
  width: 350px;
  height: 500px;
  flex-shrink: 0;
}
.teacher-image{
  width: 100%;
  height: 100%;
	object-fit: cover;
	border-radius: 8px;
}
.teacher-detail-box{
  flex-grow: 1;
  margin-left: 80px;
}
.teacher-name{
	color: #404040;
	font-size: 34px;
}
.teacher-info-box{
	margin-top: 17px;
	display: flex;
	align-items: center;
}
.teacher-info{
	color: #888888;
	font-size: 20px;
}
.rate{
	position: relative;
	top: 2px;
}
.rate-title{
  color: #666666;
  font-size: 20px;
  margin-left: 15px;
}
.rate-box{
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: end;
}
.divider2{
	margin-top: 10px;
}
.teacher-describe{
	color: #888;
	background-color: #F6F6F6;
	padding: 24px 31px;
	border-radius: 25px 0 25px 0;
	font-size: 20px;
	word-wrap: break-word;
}
.student-rate{
  margin-top: 20px;
}
</style>