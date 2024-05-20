<script setup lang="ts">
import {ref} from "vue";
import "@/assets/icon/iconfont.js"
import KnowledgeNavgation from "@/components/KnowledgeNavgation.vue";

let imgList = ref([{id:'1',url:'http://localhost:8009/files/imageDownload/7e07c2eba64f46ce967e5ca0beb90f58.png'},{id:'2',url:'http://localhost:8009/files/imageDownload/0c142bf387cd4c12a9fa7920f8814ffe.png'}])
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
      <KnowledgeNavgation class="knowledge-nav" :topic="'公考笔试'" :imgUrl="'http://localhost:8009/files/imageDownload/5c63e6d83b944b9d8bda93615c7316ab.jpg'"/>
      <KnowledgeNavgation class="knowledge-nav" :topic="'事业单位笔试'" :imgUrl="'http://localhost:8009/files/imageDownload/b4b0a2e8591043979564306559552366.png'"/>
      <KnowledgeNavgation class="knowledge-nav" :topic="'常识零钱罐'" :imgUrl="'http://localhost:8009/files/imageDownload/6c74eef998a9454ba014abecd7721714.jpeg'"/>
      <KnowledgeNavgation class="knowledge-nav" :topic="'申论揭秘'" :imgUrl="'http://localhost:8009/files/imageDownload/b2f627c74ea64de9a6aca6697b35e885.png'"/>
      <KnowledgeNavgation class="knowledge-nav" :topic="'金词金句'" :imgUrl="'http://localhost:8009/files/imageDownload/b5012225ae2643d98b3b9b7573f97e39.png'"/>
      <KnowledgeNavgation class="knowledge-nav" :topic="'行测老师帮帮忙'" :imgUrl="'http://localhost:8009/files/imageDownload/251983116ddd4a4295ff15b752fff784.png'"/>
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