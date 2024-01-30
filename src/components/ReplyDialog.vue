<script setup lang="ts">

import EmojiPicker from "vue3-emoji-picker";
import {ref, onMounted} from "vue";
import {useUserStore} from "@/store/user"
import {storeToRefs} from "pinia";
import request from "@/utils/request";
import {ElNotification} from "element-plus";
import emitter from "@/utils/emitter";

/**
 * 发送回复
 */
const {weiboCommentId ,weiboCommentReplyTargetId,isReply} = defineProps(['weiboCommentId','weiboCommentReplyTargetId','isReply'])
const emits = defineEmits(['close-dialog'])
const userStore = useUserStore()
const {userId} = storeToRefs(userStore)

const replyMsg = ref({
    weiboCommentId:weiboCommentId,
    weiboCommentReplyContent: '',
    userId:userId.value,
    weiboCommentReplyTargetId:weiboCommentReplyTargetId,
})

function postReply(){
    request.post(
        '/weibo/postReply',
        replyMsg.value,
    ).then(res => {
        if (res.code === '200'){
            emits("close-dialog")
            emitter.emit('update-comment-list')
            emitter.emit('update-recent-reply-user-name')
            if (isReply){
                emitter.emit('update-reply-list')
            }
            replyMsg.value.weiboCommentReplyContent = ''
            ElNotification({
                message: '回复成功',
                type: 'success',
                offset: 50,
                duration: 1200,
            })
        }
    })
}

/**
 * 表情
 */

let emojiIcon = ref()
let emojiSwitch = ref(false)

onMounted(() => {
    document.addEventListener("click",function (event){
        if (event.target !== emojiIcon.value){
            emojiSwitch.value = false;
        }
    })
})
let inputDialog = ref()
function onSelectEmoji(emoji) {
    let input:HTMLInputElement = inputDialog.value.textarea
    let startPos = input.selectionStart
    let endPos = input.selectionEnd
    let resultText = input.value.substring(0, startPos) + emoji.i + input.value.substring(endPos)
    input.value = resultText
    input.focus()
    input.selectionStart = startPos + emoji.i.length
    input.selectionEnd = startPos + emoji.i.length
    replyMsg.value.weiboCommentReplyContent = resultText
}
</script>

<template>
    <el-input
            v-model="replyMsg.weiboCommentReplyContent"
            maxlength="300"
            placeholder="发布你的回复"
            :autofocus="true"
            show-word-limit
            type="textarea"
            ref="inputDialog"
            :autosize="{minRows: 3, maxRows: 6 }"
    />
    <div class="reply-dialog-footer">
        <i class="iconfont emoji-icon" ref="emojiIcon" @click="emojiSwitch = !emojiSwitch">&#xe681;</i>
        <el-button type="primary" class="reply-button" round @click="postReply">回复</el-button>
    </div>
    <EmojiPicker
            :native="true"
            v-show="emojiSwitch"
            class="emoji-picker"
            :hide-search="true"
            @select="onSelectEmoji"
            :hide-group-icons="true"
            :display-recent="true"
            :static-texts="{ displayrecent:'1'}"
            :disable-skin-tones="true"
            :group-names="{ smileys_people: '全部表情' }"
            :disabled-groups="['animals_nature',
                                           'food_drink',
                                           'activities',
                                           'travel_places',
                                           'objects',
                                           'symbols',
                                           'flags']"
    />
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
.reply-dialog-footer{
    margin-top: 10px;
}
.emoji-icon{
    color: #838383;
    cursor: pointer;
    padding: 5px;
    border-radius: 50%;
}
.emoji-icon:hover{
    color: #559EFF;
    background-color: #cbe1ff;
}
.reply-button{
    position: relative;
    left: 400px;
    width: 73px;
}
.emoji-picker{
    position: absolute;
}
</style>