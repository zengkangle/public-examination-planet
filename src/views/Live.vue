<script setup lang="ts">
import {computed, ref} from "vue";
import "//at.alicdn.com/t/c/font_3294066_grwa6cqx5at.js"
import LiveCard from "@/components/LiveCard.vue";
import {useRouter} from "vue-router";
import request from "@/utils/request";
import {storeToRefs} from "pinia";
import {useUserStore} from "@/store/user";

const router = useRouter()
const userStore = useUserStore()
const {userLevel} = storeToRefs(userStore)

/**
 * vip提示
 */
let vipDialogVisible = ref(false)
function toLiveRoom(live){
    if (userLevel.value != 'normal'){
        request.get(
          '/live/getLiveResource',
          {
              params:{liveId:live.liveId}
          }
        ).then(res => {
            if (res.code === '200'){
                router.push({
                    path:'/base/liveRoom',
                    query:{
                        liveId:live.liveId,
                        liveTitle:live.liveTitle,
                        userName:live.userName,
                        userAvatarUrl:live.userAvatarUrl,
                        resource:res.data,
                    }
                })
            }
        })
    }else {
        if (live.liveType == '公开试听课'){
            request.get(
              '/live/getLiveResource',
              {
                  params:{liveId:live.liveId}
              }
            ).then(res => {
                if (res.code === '200'){
                    router.push({
                        path:'/base/liveRoom',
                        query:{
                            liveId:live.liveId,
                            liveTitle:live.liveTitle,
                            userName:live.userName,
                            userAvatarUrl:live.userAvatarUrl,
                            resource:res.data,
                        }
                    })
                }
            })
        }else{
            vipDialogVisible.value = true
        }
    }
}

/**
 * 轮播图
 */
let imgList = ref([
    {
	      id: '1',
	      url: 'https://s.eoffcn.com//omcms/202309/74750f405ff107469c1c2213cb4d30c3_1695030967000_960.jpg'
    },
    {
        id: '2',
        url: 'https://s.eoffcn.com//omcms/202303/cdd00e601c62d991fd8365a63158af7c_1679651507000_7483.png'
    }
])

/**
 * 分页+无限滚动
 */
const liveList = ref([])
const pageMsg = ref({
    currentPage:0,
    pageSize:10,
    total:null,
})
let disabled = computed(() => {
    return liveList.value.length == pageMsg.value.total;
})
const load = () => {
    pageMsg.value.currentPage++
    getLiveListScroll()
}
function getLiveListScroll(){
    request.get(
      "/live/getLiveList",
      {
          params:pageMsg.value
      }
    ).then(res => {
        if (res.code === '200'){
            liveList.value = liveList.value.concat(res.data.records)
            pageMsg.value.total = res.data.total
        }
    })
}
</script>

<template>
    <div class="main" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
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
            <LiveCard @click="toLiveRoom(live)" v-for="live in liveList" :key="live.liveId" :live="live"/>
            <div v-if="liveList.length === 0" style="width: 100%;text-align: center;font-size: 30px;margin-top: 60px">暂无教师直播喔~</div>
        </div>

    </div>
    <el-dialog
      v-model="vipDialogVisible"
      title="提示"
      width="500"
    >
        <span>亲爱的星球用户，这是vip付费内容，请前往个人中心升级为vip后观看</span>
        <template #footer>
            <div class="dialog-footer">
                <el-button type="primary" @click="vipDialogVisible = false">确定</el-button>
            </div>
        </template>
    </el-dialog>
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