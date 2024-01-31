<script setup lang="ts">

import {WPlayer} from "vue-wplayer";
import flvjs from 'flv.js'
import {ref, nextTick, onMounted} from "vue";
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'

const ws = new WebSocket('ws://localhost:8009/chat')
ws.onopen = function (){
    console.log('链接成功！')
}
ws.onmessage = function (MessageEvent){
    console.log(MessageEvent)
    console.log(JSON.parse(MessageEvent.data))
}

const options = {
	resource: "http://192.168.159.132:8080/live/liveroom_94916.flv",
	type: "custom",
	customType: function (player: HTMLVideoElement, url: string) {
		const flv = flvjs.createPlayer({
			type: 'flv',
			url: url,
		});
		flv.attachMediaElement(player);
		flv.load();
	},
}

let text = ref()
const count = ref(1) // 计数器
const scrollbarRef = ref() // 滚动条实例

/**
 * 控制滚动条滚动到容器的底部
 */
async function setScrollToBottom() {
	// nextTick 以等待 DOM 更新完成
	await nextTick()
	const max = 31 * count.value
	scrollbarRef.value.setScrollTop(max)
}


const liveChatMsg =ref({
    content:'前端发了消息哇！'
})
async function send() {
    ws.send(JSON.stringify(liveChatMsg.value))
	count.value++
	await setScrollToBottom()
}

let emoji = ref()

onMounted(() => {
	document.addEventListener("click",function (event){
	  if (event.target !== emoji.value){
	      emojiSwitch.value = false;
	  }
	})
})

let emojiSwitch = ref(false)
let liveInput = ref()
function onSelectEmoji(emoji) {
    let input:HTMLInputElement = liveInput.value.textarea
    let startPos = input.selectionStart
    let endPos = input.selectionEnd
    let resultText = input.value.substring(0, startPos) + emoji.i + input.value.substring(endPos)
    input.value = resultText
    input.focus()
    input.selectionStart = startPos + emoji.i.length
    input.selectionEnd = startPos + emoji.i.length

}




</script>

<template>
    <div class="live-room">
        <div class="container">
            <div class="container-header">
                <el-avatar size="large" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
                <div class="container-header-info">
                    <div class="name">雷军</div>
                    <div class="title">职测理论-资料1</div>
                </div>
            </div>
            <div class="player-container">
                <w-player class="player" :options="options" :danmaku-key="0"></w-player>
            </div>
            <div class="container-footer"></div>
        </div>
        <div class="chat-area">
            <div class="chat-area-header">直播间人数：6</div>
            <div>
                <el-scrollbar ref="scrollbarRef" max-height="548px" always>
                    <div class="chat-container">
                        <div class="dialog" ref="innerRef" v-for="item in count">
                            <div class="user-dialog">
                                <div class="user-dialog-name">雷军：</div>
                                <div class="user-dialog-content">😀捏埃个寄啊!!!66</div>
                            </div>
                            <div class="system-dialog" v-if="false">
                                <div class="system-dialog-name">雷军加入了直播间~</div>
                            </div>
                        </div>
                    </div>
                </el-scrollbar>
            </div>
            <div class="chat-area-footer">
                <el-tooltip
                  class="box-item"
                  effect="dark"
                  content="表情"
                  placement="right-end"
                >
                    <div @click="emojiSwitch = !emojiSwitch" ref="emoji" class="emoji-switch">😅</div>
                </el-tooltip>

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
                <el-input
                        v-model="text"
                        maxlength="20"
                        placeholder="这里输入聊天内容"
                        show-word-limit
                        type="textarea"
                        ref="liveInput"
                />
                <el-button type="primary" class="send-button" @click="send">发送</el-button>
            </div>
        </div>
    </div>
</template>

<style scoped>
.live-room {
    padding-top: 50px;
    padding-left: 250px;
    display: flex;
    background-image: url("../assets/bg.png");
    height: 95vh;
}

.container {
    width: 1054px;
    margin-top: 30px;
}

.container-header {
    background-color: #545E81;
    border-radius: 8px 8px 0 0;
    display: flex;
    padding: 15px 10px;
}

.container-header-info {
    margin-left: 15px;
}

.name {
    color: #fff;
}

.title {
    color: #fff;
    font-size: 20px;
    margin-top: 10px;
}

.player-container {
    height: 0;
    width: 100%;
    padding-bottom: 56.25%;
    position: relative;
}

.player {
    width: 100%;
    height: 100%;
    position: absolute;
    background-color: black;
}

.container-footer {
    height: 50px;
    background-color: #545E81;
    border-radius: 0 0 8px 8px;
}

.chat-area {
    padding-top: 30px;
    margin-left: 30px;
}

.chat-area-header {
    background-color: #545E81;
    padding: 10px 10px;
    border-radius: 8px 8px 0 0;
    color: #fff;
}

.chat-container {
    background-color: #fff;
    height: 548px;
    width: 350px;
}

.dialog {
    background-color: #fff;
}

.user-dialog {
    display: flex;
    padding: 5px;
}

.user-dialog-name {
    color: #4794FF;
}

.system-dialog {
    padding: 5px;
}

.system-dialog-name {
    color: #999999;
}

.chat-area-footer {
    background-color: #545E81;
    border-radius: 0 0 8px 8px;
    padding: 10px;
    position: relative;
}
.emoji-switch{
    width: 15px;
    margin-bottom: 5px;
    cursor: pointer;
}
.emoji-picker{
    position: absolute;
    top: -330px;
}
.send-button {
    width: 100px;
    margin-top: 10px;
    position: relative;
    left: 230px;
}
</style>