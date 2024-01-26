<script setup lang="ts">
import {ref,onMounted} from "vue";
import type { UploadProps, UploadUserFile } from 'element-plus'
import { Plus } from '@element-plus/icons-vue'
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import TalkCard from "@/components/TalkCard.vue";

let text = ref()
function post(){

}


const fileList = ref<UploadUserFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },

])
const dialogImageUrl = ref('')
const dialogVisible = ref(false)

const handleRemove: UploadProps['onRemove'] = (uploadFile, uploadFiles) => {
  console.log(uploadFile, uploadFiles)
}

const handlePictureCardPreview: UploadProps['onPreview'] = (uploadFile) => {
  dialogImageUrl.value = uploadFile.url!
  dialogVisible.value = true
}

function doUpload(){
  document.getElementById('uploadId').click()
}

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

function onSelectEmoji(emoji) {
  console.log(emoji)
  let input = document.getElementById('post-input-id')
  console.log(input)
  let startPos = input.selectionStart
  let endPos = input.selectionEnd
  let resultText = input.value.substring(0, startPos) + emoji.i + input.value.substring(endPos)
  input.value = resultText
  input.focus()
  input.selectionStart = startPos + emoji.n.length
  input.selectionEnd = startPos + emoji.n.length

}

</script>

<template>
	<div class="main">
			<div class="post-box">
          <div class="post-header">
              <el-input
                      v-model="text"
                      maxlength="304"
                      placeholder="有什么公考心得分享给大家？"
                      show-word-limit
                      type="textarea"
                      class="post-input"
                      id="post-input-id"
                      input-style="background-color: #F0F1F4; border-radius: 10px;"
                      :autosize="{minRows: 3, maxRows: 6 }"
              />
            <el-upload
              v-model:file-list="fileList"
              action="https://run.mocky.io/v3/9d059bf9-4660-45f2-925d-ce80ad6c4d15"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
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
      <div class="talk-list">
        <talk-card/>
        <talk-card/>
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