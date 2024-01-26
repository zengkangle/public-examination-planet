<script setup lang="ts">
import {ref} from "vue";
import "@/assets/icon/iconfont.js"
import KnowledgeNavgation from "@/components/KnowledgeNavgation.vue";
let imgList = ref([{id:'1',url:'https://nodestatic.fbstatic.cn/pan/downloads/b7c1e78d7559c7851ea9e2e7949373b6.png'},{id:'2',url:'https://nodestatic.fbstatic.cn/pan/downloads/25a8da9f5d6c189063b4e6934c32f121.png'}])
</script>
<template>
  <div class="main">
    <div class="head">
      <el-carousel height="216px" class="swiper">
        <el-carousel-item v-for="img in imgList" :key="img.id">
          <el-image :src="img.url" alt=""></el-image>
        </el-carousel-item>
      </el-carousel>
      <img src="../assets/11.jpeg" alt="" class="img-right" />
    </div>
    <div class="test-title">
      <svg class="icon icon-text" aria-hidden="true">
        <use xlink:href="#icon-wendang"></use>
      </svg>
      <div>备考资料</div>
    </div>
    <el-divider></el-divider>
    <div class="knowledge-area">
      <KnowledgeNavgation class="knowledge-nav"/>
      <KnowledgeNavgation class="knowledge-nav"/>
      <KnowledgeNavgation class="knowledge-nav"/>
      <KnowledgeNavgation class="knowledge-nav"/>
    </div>
  </div>
</template>

<style scoped>
.icon {
  width: 1em; height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.main{
  margin: 0 auto;
  width: 1600px;
  padding-top: 100px;
}
.swiper{
  width: 85%;
  border-radius: 5px;
  margin-right: 60px;
}
.head{
  display: flex;
}
.img-right{
  height: 216px;
}
.test-title{
  display: flex;
  font-size: 30px;
  align-items: center;
  margin-top: 35px;
}
.icon-text{
  margin-right: 10px;
}
.knowledge-area{
  margin-top: 40px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}
.knowledge-nav{
  margin-bottom: 60px;
}
</style>