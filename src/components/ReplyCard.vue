<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import ReplyDialog from "@/components/ReplyDialog.vue";
import * as dayjs from 'dayjs'
import request from "@/utils/request";
import SubReply from "@/components/SubReply.vue";
import emitter from "@/utils/emitter";


const {comment} = defineProps(['comment'])
const load = () => {
}
let replyDialogVisible = ref(false)

const replyList = ref({})
function getReplyList(){
  request.get(
    '/weibo/getReplyList',
    {
      params:{weiboCommentId:comment.weiboCommentId}
    }
  ).then(res => {
    if (res.code === '200'){
      replyList.value = res.data
    }
  })
}

onBeforeMount(() => {
  getReplyList()
})

emitter.on('update-reply-list',() => {
  getReplyList()
})

</script>

<template>
  <el-scrollbar always max-height="300px">
    <div class="reply-card-box">
      <div style="width: 40px">
        <el-avatar :src="comment.userAvatarUrl" :size="40"/>
      </div>
      <div class="reply-card-container">
        <div class="reply-card-content">
          <span class="reply-card-content-name">{{ comment.userName }}</span>
          <svg class="icon reply-vip-icon" aria-hidden="true" v-if="comment.userLevel === 'vip'"><use xlink:href="#icon-vip"></use></svg>
          <span>：{{comment.weiboCommentContent}}</span>
        </div>
        <div class="reply-card-footer">
          <div class="reply-time">{{ dayjs(comment.weiboCommentTime).format('YYYY.MM.DD HH:mm') }}</div>
          <i class="iconfont reply-icon" @click="replyDialogVisible = true">&#xe646;</i>
        </div>
        <div class="sub-reply-area">
          <div class="sub-reply-divider"></div>
          <div class="sub-reply-list" v-infinite-scroll="load">
            <SubReply v-for="reply in replyList" :key="reply.weiboCommentReplyId" :reply="reply"/>
          </div>
        </div>
      </div>
    </div>
  </el-scrollbar>
  <el-dialog v-model="replyDialogVisible" :title="'回复@'+comment.userName" align-center class="reply-dialog" width="540px" style="--el-dialog-padding-primary:20px">
    <ReplyDialog :isReply="true" :weiboCommentId="comment.weiboCommentId" @close-dialog="replyDialogVisible = false"/>
  </el-dialog>
</template>

<style scoped>
@font-face {
    font-family: 'iconfont';  /* Project id 3294066 */
    src: url('//at.alicdn.com/t/c/font_3294066_xyrcw6r4r.woff2?t=1706513450834') format('woff2'),
    url('//at.alicdn.com/t/c/font_3294066_xyrcw6r4r.woff?t=1706513450834') format('woff'),
    url('//at.alicdn.com/t/c/font_3294066_xyrcw6r4r.ttf?t=1706513450834') format('truetype');
}

.iconfont {
    font-family: "iconfont" !important;
    font-size: 16px;
    font-style: normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    overflow: hidden;
}
.reply-card-box{
	display: flex;
	padding-right: 10px;
}
.reply-card-container{
	padding-left: 5px;
}
.reply-card-content{
  display: flex;
  align-items: center;
}
.reply-card-content-name{
	color: #4C7CFE;
	cursor: pointer;
}
.reply-vip-icon{
	font-size: 35px;
}
.reply-card-footer{
	display: flex;
	flex-wrap: wrap;
}
.reply-card-footer{
  margin-top: 4px;
}
.reply-icon{
  position: relative;
  top: -5px;
  left: 310px;
  padding: 5px;
  border-radius: 50%;
  cursor: pointer;
}
.reply-icon:hover{
  color: #559EFF;
  background-color: #cbe1ff;
}
.sub-reply-area{
  display: flex;
}
.sub-reply-divider{
  width: 3px;
  background-color: #F2F2F2;
}
.sub-reply-list{
  margin-left: 6px;
}
</style>