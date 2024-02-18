<script setup lang="ts">
import {ref, onMounted, toRef, onBeforeMount, onBeforeUnmount, onUnmounted, computed} from "vue";
import type { UploadProps, UploadUserFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import TalkCard from "@/components/WeiboCard.vue";
import {storeToRefs} from "pinia"
import {useUserStore} from "@/store/user"
import {ElMessage, ElNotification} from "element-plus";
import request from "@/utils/request";
import WeiboCard from "@/components/WeiboCard.vue";

/**
 * 获取用户id信息
 */
const userStore = useUserStore()
const {userId} = storeToRefs(userStore)

/**
 * 发布微博
 */
let fileList = ref([])
let postWeibo = ref({
  userId:null,
  text:'',
  imageUploadList:[],
})

function post(){
  postWeibo.value.userId = userId.value
  if (fileList.value.length!=0){
    for (let valueElement of fileList.value) {
      postWeibo.value.imageUploadList.push(valueElement.response.data)
    }
  }
  request.post(
    "/weibo/postWeibo",
    postWeibo.value
  ).then(res => {
    if (res.code === '200') {
      ElNotification({
        message: '发布成功！',
        type: 'success',
        offset: 50,
        duration: 1200,
      })
      pageMsg.value.currentPage = 0
      fileList.value = []
      postWeibo.value.imageUploadList = []
      postWeibo.value.text = ''
      weiboList.value = []
      getWeiboListScroll()
    } else{
      ElMessage({
        message: res.msg,
        type: "error",
        showClose: true,
      })
    }
  })
}

/**
 * 照片列表上传
 */
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

function doUpload(){
  document.getElementById('uploadId').click()
}

/**
 * 表情
 */
let emoji = ref()
let emojiIcon = ref()
let emojiTitle = ref()
let emojiSwitch = ref(false)

onMounted(() => {
  document.addEventListener("click",function (event){
    if (event.target !== emoji.value && event.target !== emojiIcon.value && event.target !== emojiTitle.value){
      emojiSwitch.value = false;
    }
  })
})
let postInput = ref()
function onSelectEmoji(emoji) {
  let input:HTMLInputElement = postInput.value.textarea
  let startPos = input.selectionStart
  let endPos = input.selectionEnd
  let resultText = input.value.substring(0, startPos) + emoji.i + input.value.substring(endPos)
  input.value = resultText
  input.focus()
  input.selectionStart = startPos + emoji.i.length
  input.selectionEnd = startPos + emoji.i.length
  postWeibo.value.text = resultText
}

/**
 * 分页+无限滚动
 */
const pageMsg = ref({
  currentPage:0,
  pageSize:5,
  total:null,
 })
const weiboList = ref([])
let disabled = computed(() => {
  return weiboList.value.length == pageMsg.value.total;
})
const load = () => {
  pageMsg.value.currentPage++
  getWeiboListScroll()
 }
function getWeiboListScroll(){
  request.get(
    "/weibo/showWeiboList",
    {
      params:pageMsg.value
    }
  ).then(res => {
    if (res.code === '200'){
      weiboList.value = weiboList.value.concat(res.data.records)
      pageMsg.value.total = res.data.total
      console.log(weiboList.value)
    }
  })
}

</script>

<template>
	<div class="main">
			<div class="post-box">
          <div class="post-header">
              <el-input
                      v-model="postWeibo.text"
                      maxlength="304"
                      placeholder="有什么公考心得分享给大家？"
                      show-word-limit
                      type="textarea"
                      class="post-input"
                      ref="postInput"
                      input-style="background-color: #F0F1F4; border-radius: 10px;"
                      :autosize="{minRows: 3, maxRows: 6 }"
              />
            <el-upload
              v-model:file-list="fileList"
              action="http://localhost:8009/files/imageUpload"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              class="upload"
              v-show="fileList.length!=0"
            >
              <el-icon id="uploadId"><Plus /></el-icon>
            </el-upload>
            <el-dialog v-model="dialogVisible">
              <img w-full :src="dialogImageUrl" alt="Preview Image" />
            </el-dialog>
          </div>
          <div class="post-footer">
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
            <div class="image-box" @click="doUpload" type="file" >
                  <i class="iconfont image-icon">&#xe616;</i>
                  <div class="image-title">图片</div>
              </div>
              <el-button class="post-button" @click="post" type="primary" round>发布</el-button>
          </div>
      </div>
      <div class="talk-list" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <WeiboCard v-for="weibo in weiboList"  :weibo="weibo"/>
      </div>
	</div>
</template>

<style scoped>
@font-face {
    font-family: 'iconfont';  /* Project id 3294066 */
    src: url('//at.alicdn.com/t/c/font_3294066_nic24w9559.woff2?t=1706183414624') format('woff2'),
    url('//at.alicdn.com/t/c/font_3294066_nic24w9559.woff?t=1706183414624') format('woff'),
    url('//at.alicdn.com/t/c/font_3294066_nic24w9559.ttf?t=1706183414624') format('truetype');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.main{
  background: url("../assets/bg.gif") repeat;
	padding-top: 70px;
	display: flex;
	flex-direction: column;
	align-items: center;
}
.post-box{
	background-color: #fff;
	width: 604px;
	padding: 18px;
}
.post-input{
  --el-fill-color-blank: #F0F1F4;
}
.upload{
  margin-top: 10px;
}
.post-footer{
  display: flex;
  position: relative;
  top: 10px;
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
  top: 35px;
  z-index: 1;
}
.image-box{
  margin-left: 18px;
  display: flex;
  align-items: center;
  color: #838383;
  cursor: pointer;
}
.image-box:hover .image-icon{
  color: #559EFF;
  background-color: #cbe1ff;
}
.image-box:hover .image-title{
  color: #559EFF;
}
.image-icon{
  font-size: 21px;
  padding: 5px;
  border-radius: 50%;
}
.post-button{
  position: relative;
  width: 80px;
  left: 380px;
}
.talk-list{
  margin-top: 10px;
}
</style>