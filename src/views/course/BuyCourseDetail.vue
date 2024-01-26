<script setup lang="ts">

import TeacherIntroduceCard from "@/components/TeacherIntroduceCard.vue";
</script>

<template>
	<div class="main">
      <div class="header">
          <div class="left">
              <div class="title">笔试系统班图书大礼包：2025国考/2024广东省考</div>
              <div class="subtitle">重难点夯实 刷题冲刺至考前</div>
              <div class="tags">
                  <el-tag class="tag">广东本地师资讲解</el-tag>
                  <el-tag class="tag">广东本地师资讲解</el-tag>
              </div>
              <div class="teacher">
                  <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                  <div class="name">雷军</div>
              </div>
          </div>
          <el-divider direction="vertical" class="divider"></el-divider>
          <div class="right">
              <div class="money">
                  <i class="iconfont money-icon">&#xe66b;</i>
                  <div class="money-number">999</div>
              </div>
              <div class="order-num">3103人已购买</div>
              <div class="buy-button">立即购买</div>
          </div>
      </div>
      <div class="course-list">
          <div class="course-list-title">课程表</div>
          <div class="course-video">
              <div class="course-video-head">
                  <el-divider direction="vertical" class="divider2"></el-divider>
                  <div class="video-title">韩涛 - 2024广东省考公告解读&招录分析</div>
              </div>
              <el-divider class="divider3"></el-divider>
          </div>
          <div class="course-video">
              <div class="course-video-head">
                  <el-divider direction="vertical" class="divider2"></el-divider>
                  <div class="video-title">韩涛 - 2024广东省考公告解读&招录分析</div>
              </div>
              <el-divider class="divider3"></el-divider>
          </div>
          <div class="course-video">
              <div class="course-video-head">
                  <el-divider direction="vertical" class="divider2"></el-divider>
                  <div class="video-title">韩涛 - 2024广东省考公告解读&招录分析</div>
              </div>
              <el-divider class="divider3"></el-divider>
          </div>
          <div class="course-video">
              <div class="course-video-head">
                  <el-divider direction="vertical" class="divider2"></el-divider>
                  <div class="video-title">韩涛 - 2024广东省考公告解读&招录分析</div>
              </div>
              <el-divider class="divider3"></el-divider>
          </div>
          <div class="course-video">
              <div class="course-video-head">
                  <el-divider direction="vertical" class="divider2"></el-divider>
                  <div class="video-title">韩涛 - 2024广东省考公告解读&招录分析</div>
              </div>
              <el-divider class="divider3"></el-divider>
          </div>
          <el-divider class="divider4"></el-divider>
      </div>
      <div class="teacher-introduce">
        <div class="teacher-introduce-title">老师介绍</div>
        <TeacherIntroduceCard/>
      </div>
  </div>
</template>

<style scoped>
@font-face {
    font-family: 'iconfont';  /* Project id 3294066 */
    src: url('//at.alicdn.com/t/c/font_3294066_2aajdn15n8p.woff2?t=1705564403428') format('woff2'),
    url('//at.alicdn.com/t/c/font_3294066_2aajdn15n8p.woff?t=1705564403428') format('woff'),
    url('//at.alicdn.com/t/c/font_3294066_2aajdn15n8p.ttf?t=1705564403428') format('truetype');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.main{
	width: 1200px;
	padding-top: 90px;
	margin: 0 auto;
}
.header{
	width: 1128px;
	height: 220px;
	padding: 24px 36px;
	background-color: #fff;
	display: flex;
}
.left{
    width: 750px;
}
.title{
	font-size: 26px;
	font-weight: 600;
	margin-left: 10px;
	color: #3D464F;
}
.subtitle{
    color: #8B9095;
    margin-top: 10px;
}
.tags{
    margin-top: 15px;
}
.tag{
    margin-right: 10px;
}
.teacher{
    text-align: center;
    position: relative;
    left: -350px;
    top: 40px;
}
.name{
    color: #8B9095;
    font-size: 12px;
}
.divider{
    height: 100%;
}
.right{
    width: 368px;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
}
.money{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    left: -60px;
}
.money-icon{
    color: #F46700;
    font-weight: bolder;
    position: relative;
    top: 3px;
}
.money-number{
    font-size: 37px;
    font-weight: bolder;
    color: #F46700;
    margin-left: 5px;
}
.order-num{
    color: #8B9095;
    font-size: 15px;
    margin-top: 7px;
    position: relative;
    left: -52px;
}
.buy-button{
    width: 200px;
    height: 38px;
    border-radius: 2.666667rem 2.666667rem 2.666667rem 2.666667rem;
    background: linear-gradient(90deg,#F69400,#F47200);
    color: #fff;
    cursor: pointer;
    line-height: 38px;
    margin: 15px auto;
}
.course-list{
    background-color: #fff;
    margin-top: 10px;
    padding: 40px;
}
.course-list-title,.teacher-introduce-title{
    color: #3D464F;
    margin-bottom: 24px;
}
.course-video-head{
    display: flex;
}
.divider2{
    background-color: #202A46;
    width: 5px;
    height: 21px;
}
.divider3{
    background-color: #F2F2F5;
    height: 1px;
    border-top: 0;
}
.divider4{
    margin-top: 45px;
    width: 1169px;
    position: relative;
    left: -25px;
}
.teacher-introduce{
    background-color: #fff;
    margin-top: -60px;
    padding: 40px;
}
</style>