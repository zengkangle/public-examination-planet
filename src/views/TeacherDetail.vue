<script setup lang="ts">
import {ref} from "vue";
import StudentRate from "@/components/StudentRate.vue";

let rateValue = ref(4.6)
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
                <img src="../assets/teacher1.png" alt="" class="teacher-image" />
            </div>
            <div class="teacher-detail-box">
                <div class="teacher-name">雷军</div>
                <div class="teacher-info-box">
                    <div class="teacher-info">公考星球言语理解与表达、面试优质讲师111111</div>
                    <el-rate
                            v-model="rateValue"
                            disabled
                            show-score
                            text-color="#ff9900"
                            score-template="{value}"
                            size="large"
                            class="rate"
                    />
                    <div class="rate-title">已有787979人评分</div>
                </div>
                <el-divider class="divider2"/>
                <div class="teacher-describe">公考星球言语理解与表达、面试优质讲师。10年公考授课经验，评分人数超过150万。专业功底扎实，教学经验丰富，教学方法针对性强，能让学员在短时间内熟练掌握解题技巧；善于引导和启发学员，亦庄亦谐、寓教于乐，深受学员好评。</div>
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
.teacher-image{
	width: 400px;
	object-fit: fill;
	border-radius: 8px;
}
.teacher-detail-box{
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
	left: 250px;
	top: 2px;
}
.rate-title{
	color: #666666;
	font-size: 20px;
	position: relative;
	left: 270px;
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
}
.student-rate{
  margin-top: 20px;
}
</style>