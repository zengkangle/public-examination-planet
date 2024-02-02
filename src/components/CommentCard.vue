<script setup lang="ts">
import {ref, onBeforeMount, watch} from "vue";
import ReplyCard from "@/components/ReplyCard.vue";
import ReplyDialog from "@/components/ReplyDialog.vue";
import * as dayjs from 'dayjs'
import request from "@/utils/request";
import emitter from "@/utils/emitter";

const {comment} = defineProps(['comment'])
let replyDialogVisible = ref(false)
let replyListDialogVisible = ref(false)

const userMsg = ref({})
function getUserMsg(){
	request.get(
		'/user/getUserMsg',
		{
			params: {userId:comment.userId,}
		}
	).then(res => {
		if (res.code === '200'){
			userMsg.value = res.data
		}
	})
}
onBeforeMount(() => {
	getUserMsg()
})


let recentReplyUserName = ref("")
function getRecentReplyUserName(){
	request.get(
		'/weibo/getRecentReplyUserName',
		{
			params:{weiboCommentId:comment.weiboCommentId}
		}
	).then(res => {
		if (res.code === '200'){
			recentReplyUserName.value = res.data
		}
	})
}
onBeforeMount(() => {
	if (comment.weiboCommentReplyAmount != 0){
		getRecentReplyUserName()
	}
})
emitter.on('update-recent-reply-user-name',() => {
	if (comment.weiboCommentReplyAmount != 0){
		getRecentReplyUserName()
	}
})
</script>

<template>
	<div class="comment-card-box">
      <el-avatar :src="userMsg.userAvatarUrl" :size="40"/>
      <div class="comment-card-container">
        <div class="comment-card-content">
		          <span class="comment-card-content-name">{{ userMsg.userName }}</span>
		          <svg class="icon comment-vip-icon" aria-hidden="true" v-if="userMsg.userLevel === 'vip'"><use xlink:href="#icon-vip"></use></svg>
		          <span>：{{comment.weiboCommentContent}}</span>
        </div>
        <div class="comment-card-footer">
          <div class="time">{{ dayjs(comment.weiboCommentTime).format('YYYY.MM.DD HH:mm') }}</div>
            <i class="iconfont reply-icon" @click="replyDialogVisible = true">&#xe646;</i>
        </div>
        <div class="show-reply" v-if="comment.weiboCommentReplyAmount != 0">
		        <div class="vertical-divider"></div>
		        <div class="first-reply-name" @click="replyListDialogVisible = true">{{ recentReplyUserName }}</div>
		        <div class="wait">等人</div>
		        <div class=reply-amount @click="replyListDialogVisible = true">共{{comment.weiboCommentReplyAmount}}条回复</div>
            <i class="iconfont arrow-icon" @click="replyListDialogVisible = true">&#xe608;</i>
        </div>
      </div>
	</div>

	<el-dialog v-model="replyDialogVisible" :title="'回复@'+userMsg.userName" align-center class="reply-dialog" width="540px" style="--el-dialog-padding-primary:20px">
		<ReplyDialog :weiboCommentId="comment.weiboCommentId" @close-dialog="replyDialogVisible = false"/>
	</el-dialog>

	<el-dialog v-model="replyListDialogVisible" :title="comment.weiboCommentReplyAmount+'条回复'" align-center class="reply-dialog" width="540px" style="--el-dialog-padding-primary:20px">
		<ReplyCard :comment="comment" :userMsg="userMsg"/>
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
.comment-card-box{
  display: flex;
  padding-bottom: 5px;
  font-size: 14px;
}
.comment-card-container{
	margin-left: 5px;
}
.comment-card-content{
	display: flex;
	align-items: center;
}
.comment-vip-icon{
  font-size: 35px;

}
.comment-card-content-name{
	color: #4C7CFE;
}
.time{
	color: #939393;
}
.comment-card-footer{
	display: flex;
	align-items: center;
}
.reply-icon{
	position: relative;
	left: 380px;
	color: #939393;
	padding: 5px;
	border-radius: 50%;
	cursor: pointer;
}
.reply-icon:hover{
    color: #559EFF;
    background-color: #cbe1ff;
}
.show-reply{
	display: flex;
	align-items: center;
	margin-top: 2px;
}
.vertical-divider{
	height: 18px;
	width: 2px;
	background-color: #F1F1F1;
}
.first-reply-name{
	color: #4C7CFE;
	margin-left: 4px;
	cursor: pointer;
}
.wait{
	margin-left: 4px;
}
.reply-amount{
	color: #4C7CFE;
	margin-left: 4px;
	cursor: pointer;
}
.arrow-icon{
	color: #4C7CFE;
	cursor: pointer;
}


</style>