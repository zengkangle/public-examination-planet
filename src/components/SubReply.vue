<script setup lang="ts">
import ReplyDialog from "@/components/ReplyDialog.vue";
import {ref} from "vue";
import * as dayjs from 'dayjs'

const {reply} = defineProps(['reply'])

let replyDialogVisible = ref(false)

</script>

<template>
    <div class="sub-reply-box">
        <div class="sub-reply-card-content">
            <span class="sub-reply-card-content-name">{{ reply.userName }}</span>
            <svg class="icon sub-reply-vip-icon" aria-hidden="true" v-if="reply.userLevel === 'vip'"><use xlink:href="#icon-vip"></use></svg>
            <span v-if="reply.weiboCommentReplyTargetId === null">：{{reply.weiboCommentReplyContent}}</span>
            <span v-if="reply.weiboCommentReplyTargetId != null">：<span style="color: #4C7CFE;cursor: pointer;">@{{reply.targetUserName}}</span>{{reply.weiboCommentReplyContent}}</span>
        </div>
        <div class="sub-reply-card-footer">
            <div class="sub-reply-time">{{ dayjs(reply.weiboCommentReplyTime).format('YYYY.MM.DD HH:mm') }}</div>
            <i class="iconfont sub-reply-icon" @click="replyDialogVisible = true">&#xe646;</i>
        </div>
    </div>
    <el-dialog v-model="replyDialogVisible" :title="'回复@'+reply.userName" align-center class="reply-dialog" width="540px" style="--el-dialog-padding-primary:20px">
        <ReplyDialog :isReply="true" :weiboCommentId="reply.weiboCommentId" :weiboCommentReplyTargetId="reply.userId" @close-dialog="replyDialogVisible = false"/>
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
.sub-reply-card-content-name{
    color: #4C7CFE;
    cursor: pointer;
}
.sub-reply-vip-icon{
    font-size: 35px;
    position: relative;
    top: 6px;
}
.sub-reply-box{
    position: relative;
    top: -9px;
}
.sub-reply-card-footer{
    display: flex;
    margin-top: 4px;
}
.sub-reply-icon{
    position: relative;
    top: -5px;
    left: 303px;
    border-radius: 50%;
    padding: 5px;
    cursor: pointer;
}
.sub-reply-icon:hover{
    color: #559EFF;
    background-color: #cbe1ff;
}
</style>