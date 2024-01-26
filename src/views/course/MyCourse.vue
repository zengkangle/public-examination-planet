<script setup lang="ts">

</script>

<template>
    <div class="nav1">
        <router-link to="/base/course/myCourse/writtenTestOfMine" class="nav-text" active-class="nav-text-active">公考笔试</router-link>
        <router-link to="/base/course/myCourse/interviewOfMine" class="nav-text" active-class="nav-text-active">公考面试</router-link>
        <router-link to="/base/course/myCourse/publicInstitutionOfMine" class="nav-text" active-class="nav-text-active">事业单位</router-link>
        <div class="nav-text">教师</div>
        <div class="nav-text">军队文职</div>
        <div class="nav-text">三扶一支</div>
        <div class="nav-text">公安招警</div>
        <div class="nav-text">银行金融</div>
        <div class="nav-text">社区工作者</div>
        <div class="nav-text">医疗</div>
        <div class="nav-text">财会</div>
        <div class="nav-text">研究生考试</div>
    </div>
    <div class="nav2">
        <div class="nav-text">法考</div>
        <div class="nav-text">导游资格证</div>
        <div class="nav-text">建工</div>
        <div class="nav-text">公开课</div>
        <div class="nav-text english">Office</div>
        <div class="nav-text">英语</div>
        <div class="nav-text">专升本</div>
    </div>
    <div class="map">
        <i class="iconfont location-icon">&#xe7a6;</i>
        <div class="location-title">广东</div>
    </div>
    <el-divider  class="divider"/>
    <router-view></router-view>
</template>

<style scoped>
@font-face {
    font-family: 'iconfont';  /* Project id 3294066 */
    src: url('//at.alicdn.com/t/c/font_3294066_hniawamc05s.woff2?t=1705561993723') format('woff2'),
    url('//at.alicdn.com/t/c/font_3294066_hniawamc05s.woff?t=1705561993723') format('woff'),
    url('//at.alicdn.com/t/c/font_3294066_hniawamc05s.ttf?t=1705561993723') format('truetype');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.nav1{
    display: flex;
}
.nav2{
    display: flex;
}
.nav-text{
    font-size: 14px;
    color: #889095;
    margin-right: 40px;
    margin-top: 15px;
    padding: 5px 10px;
}
.nav-text-active{
    background-color: #1E2A46;
    color: #fff;
    border-radius: 3px;
}
.english{
    position: relative;
    top: 3px;
}
.map{
    display: flex;
    margin-top: 20px;
}
.location-icon{
    color: #DFE2EA;
    font-size: 20px;
}
.location-title{
    color: #656E93;
    font-size: 14px;
    margin-left: 5px;
}
.divider{
    position: relative;
    top: -18px;
}
</style>