<script setup lang="ts">
import {ref} from "vue";
import "//at.alicdn.com/t/c/font_3294066_grwa6cqx5at.js"
import LiveCard from "@/components/LiveCard.vue";
import {useRouter} from "vue-router";

const router = useRouter()
function toLiveRoom(){
    router.push('/base/liveRoom')
}
let imgList = ref([{
	id: '1',
	url: 'https://s.eoffcn.com//omcms/202309/74750f405ff107469c1c2213cb4d30c3_1695030967000_960.jpg'
}, {id: '2', url: 'https://s.eoffcn.com//omcms/202303/cdd00e601c62d991fd8365a63158af7c_1679651507000_7483.png'}])

</script>

<template>
    <div class="main">
        <el-carousel height="300px" class="swiper">
            <el-carousel-item v-for="img in imgList" :key="img.id">
                <el-image :src="img.url" alt=""></el-image>
            </el-carousel-item>
        </el-carousel>
        <div class="header">
            <svg class="icon icon-zhibo" aria-hidden="true">
                <use xlink:href="#icon-zhibo-copy"></use>
            </svg>
            <div class="header-title">名师直播</div>
        </div>
        <div class="live-card-list">
            <LiveCard @click="toLiveRoom"/>
            <LiveCard/>
            <LiveCard/>
            <LiveCard/>
        </div>
    </div>
</template>

<style scoped>
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}

.main {
    width: 1200px;
    padding-top: 80px;
    margin: 0 auto;
}
.header{
    display: flex;
    align-items: center;
    font-size: 30px;
    font-weight: 600;
    margin-top: 20px;
}
.header-title{
    margin-left: 6px;
}
.live-card-list{
    display: flex;
    flex-wrap: wrap;
}
</style>