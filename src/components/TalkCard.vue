<script setup lang="ts">
import '//at.alicdn.com/t/c/font_3294066_5m9urj9rq4a.js'
import {ref, onMounted, onBeforeMount, watch, computed} from "vue";
import EmojiPicker from "vue3-emoji-picker";
import CommentCard from "@/components/CommentCard.vue";
import request from "@/utils/request"
import * as dayjs from 'dayjs'
import {ElMessage, ElNotification} from "element-plus";
import {useUserStore} from "@/store/user"
import {storeToRefs} from "pinia";
import emitter from "@/utils/emitter";


const {weibo} = defineProps(['weibo'])

const userStore = useUserStore()
const {userId, userAvatarUrl, userName} = storeToRefs(userStore)


onBeforeMount(() => {
    getImageList()
    getUserMsg()
})

const userMsg = ref(0)
function getUserMsg(){
    request.get(
        '/user/getUserMsg',
      {
        params: {userId:weibo.userId,}
      }
    ).then(res => {
        if (res.code === '200'){
            userMsg.value = res.data
        }else {
            ElMessage({
                message:'微博用户信息获取失败',
                type:"error",
            })
        }
    })
}
const imageList = ref([])
function getImageList(){
    request.get(
      '/weibo/selectImageList',
      {
          params: {weiboId:weibo.weiboId,}
      }
    ).then(res => {
        if (res.code === '200'){
            imageList.value = res.data
        }else {
            ElMessage({
                message:'微博用户信息获取失败',
                type:"error",
            })
        }
    })
}


/**
 * 表情
 */
let emoji = ref()
let emojiIcon = ref()
let emojiTitle = ref()
onMounted(() => {
    document.addEventListener("click",function (event){
        if (event.target !== emoji.value && event.target !== emojiIcon.value && event.target !== emojiTitle.value){
            emojiSwitch.value = false;
        }
    })
})

let emojiSwitch = ref(false)
let commentInput = ref()
function onSelectEmoji(emoji) {
    let input:HTMLInputElement = commentInput.value.textarea
    let startPos = input.selectionStart
    let endPos = input.selectionEnd
    let resultText = input.value.substring(0, startPos) + emoji.i + input.value.substring(endPos)
    input.value = resultText
    input.focus()
    input.selectionStart = startPos + emoji.i.length
    input.selectionEnd = startPos + emoji.i.length
    commentMsg.value.weiboCommentContent = resultText;
}

/**
 * 发布评论
 */
const commentMsg = ref({
    userId:userId.value,
    weiboId:weibo.weiboId,
    weiboCommentContent:'',
})


function postComment(){
    request.post(
        '/weibo/postComment',
        commentMsg.value
    ).then(res =>{
        if (res.code === '200'){
        commentMsg.value.weiboCommentContent = ''
            ElNotification({
                message:'评论成功',
                type: 'success',
                offset: 50,
                duration: 1200,
            })
            getCommentList()
            weibo.weiboCommentAmount++
        }else {
            ElMessage({
                message:'评论失败',
                type:"error",
            })
        }
    })
}

/**
 * 获取评论列表
 */
let showCommentBox = ref(false)
const commentList = ref([])
function getCommentList(){
    request.get(
        '/weibo/showWeiboCommentList',
      {
        params:{weiboId:weibo.weiboId}
        }
    ).then(res => {
        if (res.code === '200'){
            commentList.value = res.data
        }
    })
}
watch(showCommentBox,(newValue) => {
    if (newValue){
        getCommentList()
    }
})

emitter.on('update-comment-list',() => {
    getCommentList()
    weibo.weiboCommentAmount++
})

// computed()
</script>

<template>
    <div class="card-box">
        <div class="card-header">
            <el-avatar :src="userMsg.userAvatarUrl" :size="55"/>
            <div class="card-header-info">
                <div class="user">
                    <div class="name">{{ userMsg.userName }}</div>
                    <svg class="icon vip-icon" aria-hidden="true">
                        <use xlink:href="#icon-vip" v-show="userMsg.userLevel==='vip'"></use>
                    </svg>
                </div>
                <div class="post-time">{{ dayjs(weibo.weiboPostTime).format('YYYY.MM.DD HH:mm')}}</div>
            </div>
        </div>
        <div class="card-content">
            <div class="card-content-text">{{weibo.weiboContent}}</div>
            <div class="image-list">
                <el-image
                  style="width: 130px; height: 130px; border-radius: 8px; margin-right: 6px;"
                  v-for="(img ,index) in imageList"
                  :key="index"
                  :src="img"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="imageList"
                  :initial-index="imageList.indexOf(img)"
                  fit="cover"
                />
            </div>
        </div>
        <div class="card-footer">
            <div class="comment-button" @click="showCommentBox = !showCommentBox">
                <i class="iconfont comment-icon">&#xe646;</i>
                <div class="comment-button-title">{{weibo.weiboCommentAmount}}</div>
            </div>
        </div>
        <div class="comment-box" v-if="showCommentBox">
            <div class="divider"></div>
            <div class="comment-box-header">
                <el-avatar :src="userAvatarUrl!" :size="40"/>
                <div class="comment-box-header-send">
                    <el-input
                      v-model="commentMsg.weiboCommentContent"
                      maxlength="304"
                      placeholder="发布你的评论"
                      type="textarea"
                      class="comment-input"
                      ref="commentInput"
                      input-style="background-color: #F0F1F4; border-radius: 10px;"
                      :autosize="{minRows: 1, maxRows: 6 }"
                    />
                    <div class="comment-box-header-send-bottom">
                        <div class="emoji-box" @click="emojiSwitch = !emojiSwitch" ref="emoji">
                            <i class="iconfont emoji-icon" ref="emojiIcon">&#xe681;</i>
                            <div class="emoji-title" ref="emojiTitle">表情</div>
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
                        <el-button type="primary" class="send-comment" round @click="postComment">评论</el-button>
                    </div>
                </div>
            </div>
            <div class="divider2"></div>
            <div class="comment-box-container">
                <el-scrollbar  max-height="300px" style="width: 620px">
                    <comment-card v-for="comment in commentList" :key="comment.weiboCommentId" :comment="comment"/>
                </el-scrollbar>
            </div>
        </div>
    </div>
</template>

<style scoped>
@font-face {
    font-family: 'iconfont';  /* Project id 3294066 */
    src: url('//at.alicdn.com/t/c/font_3294066_yo0zrrytqf.woff2?t=1706250577483') format('woff2'),
    url('//at.alicdn.com/t/c/font_3294066_yo0zrrytqf.woff?t=1706250577483') format('woff'),
    url('//at.alicdn.com/t/c/font_3294066_yo0zrrytqf.ttf?t=1706250577483') format('truetype');
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
.card-box {
    background-color: #fff;
    width: 604px;
    padding: 18px;
    margin-top: 10px;
}
.card-header {
    display: flex;
}
.card-header-info{
    padding-left: 6px;
}
.user{
    display: flex;
    align-items: center;
}
.name{
    font-weight: 600;
}
.vip-icon{
    font-size: 40px;
}
.post-time{
    color: #939393;
}
.card-content{
    width: 542px;
    padding: 3px 0 0 62px;
}
.image-list{
    padding: 10px 0;
}
.comment-button{
    display: flex;
    align-items: center;
    color: #838383;
    cursor: pointer;
}
.comment-button:hover .comment-icon{
    color: #559EFF;
    background-color: #cbe1ff;
}
.comment-button:hover .comment-button-title{
    color: #559EFF;
}
.comment-icon{
    font-size: 20px;
    padding: 5px;
    border-radius: 50%;
}
.card-footer{
    position: relative;
    top: 10px;
    left: 535px;
}
.comment-box-header{
    display: flex;
    margin-top: 10px;
}
.comment-box-header-send{
    margin-top: 8px;
    padding-left: 6px;
    flex-grow: 1;
}
.comment-box-header-send-bottom{
    display: flex;
    margin-top: 10px;
    position: relative;
}
.emoji-box{
    display: flex;
    align-items: center;
    color: #838383;
    cursor: pointer;
}
.emoji-box:hover .emoji-icon{
    color: #559EFF;
    background-color: #cbe1ff;
}
.emoji-box:hover .emoji-title{
    color: #559EFF;
}
.emoji-icon{
    font-size: 20px;
    padding: 5px;
    border-radius: 50%;
}
.emoji-picker{
    position: absolute;
    top: 30px;
    z-index: 1;
}
.send-comment{
    width: 80px;
    margin-left: 410px;
}
.divider{
    height: 1px;
    background-color: #F9F9F9;
    margin-top: 20px;
}
.divider2{
    height: 1px;
    background-color: #F9F9F9;
    margin-top: 15px;
}
.comment-box-container{
    padding-top: 5px;
}
</style>