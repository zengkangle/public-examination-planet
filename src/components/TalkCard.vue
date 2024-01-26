<script setup lang="ts">
import '//at.alicdn.com/t/c/font_3294066_5m9urj9rq4a.js'
import {ref, onMounted} from "vue";
import EmojiPicker from "vue3-emoji-picker";
import CommentCard from "@/components/CommentCard.vue";
let text = ref()

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
    let input = document.getElementById('comment-input-id')
    console.log(input)
    let startPos = input.selectionStart
    let endPos = input.selectionEnd
    let resultText = input.value.substring(0, startPos) + emoji.i + input.value.substring(endPos)
    input.value = resultText
    input.focus()
    input.selectionStart = startPos + emoji.n.length
    input.selectionEnd = startPos + emoji.n.length
}

let showCommentBox = ref(false)
</script>

<template>
    <div class="card-box">
        <div class="card-header">
            <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="55"/>
            <div class="card-header-info">
                <div class="user">
                    <div class="name">雷军</div>
                    <svg class="icon vip-icon" aria-hidden="true">
                        <use xlink:href="#icon-vip"></use>
                    </svg>
                </div>
                <div class="post-time">2024.01.22 13:30</div>
            </div>
        </div>
        <div class="card-content">
            <div class="card-content-text">
                “人只有在感觉到安稳和偏爱时，性格才会越来越好，情绪稳定，不由自主的开心和自信。无论心情多糟糕，一定要记得和爱的人好好说话。”
            </div>
            <div class="image-list">
                <el-image
                  style="width: 130px; height: 130px; border-radius: 8px; margin-right: 6px;"
                  src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']"
                  :initial-index="4"
                  fit="cover"
                />
                <el-image
                  style="width: 130px; height: 130px; border-radius: 8px; margin-right: 6px;"
                  src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']"
                  :initial-index="4"
                  fit="cover"
                />
                <el-image
                  style="width: 130px; height: 130px; border-radius: 8px; margin-right: 6px;"
                  src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']"
                  :initial-index="4"
                  fit="cover"
                />
                <el-image
                  style="width: 130px; height: 130px; border-radius: 8px; margin-right: 4px;"
                  src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']"
                  :initial-index="4"
                  fit="cover"
                />
                <el-image
                  style="width: 130px; height: 130px; border-radius: 8px; margin-right: 4px;"
                  src="https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg"
                  :zoom-rate="1.2"
                  :max-scale="7"
                  :min-scale="0.2"
                  :preview-src-list="['https://fuss10.elemecdn.com/a/3f/3302e58f9a181d2509f3dc0fa68b0jpeg.jpeg']"
                  :initial-index="4"
                  fit="cover"
                />
            </div>
        </div>
        <div class="card-footer">
            <div class="comment-button" @click="showCommentBox = !showCommentBox">
                <i class="iconfont comment-icon">&#xe646;</i>
                <div class="comment-button-title">评论</div>
            </div>
        </div>
        <div class="comment-box" v-if="showCommentBox">
            <div class="divider"></div>
            <div class="comment-box-header">
                <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="40"/>
                <div class="comment-box-header-send">
                    <el-input
                      v-model="text"
                      maxlength="304"
                      placeholder="发布你的评论"
                      type="textarea"
                      class="comment-input"
                      id="comment-input-id"
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
                        <el-button type="primary" class="send-comment" round>评论</el-button>
                    </div>
                </div>
            </div>
            <div class="divider2"></div>
            <div class="comment-box-container">
                <comment-card/>
                <comment-card/>
                <comment-card/>
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