<script setup lang="ts">
import {WPlayer} from "vue-wplayer";
import flvjs from 'flv.js'
import {ref, nextTick, onMounted, onBeforeUnmount, onBeforeMount} from "vue";
import EmojiPicker from 'vue3-emoji-picker'
import 'vue3-emoji-picker/css'
import {useUserStore} from "@/store/user";
import {storeToRefs} from "pinia";
import {ElNotification} from "element-plus";
import request from "@/utils/request";



const {liveId,userName,resource} = defineProps(['liveId','liveTitle','userName','userAvatarUrl','resource'])
const userStore = useUserStore()
const {userId,userName:uName} = storeToRefs(userStore)

/**
 * websocket聊天室
 */
const ws = new WebSocket('ws://localhost:8009/chat/'+liveId+'/'+userId.value+'/'+uName.value)
const chatMsg = ref([])
let onlineAmount = ref(0)
ws.onopen = function (){
    console.log('链接成功！')
}
ws.onmessage = async function (MessageEvent){
    console.log(JSON.parse(MessageEvent.data))
    if (JSON.parse(MessageEvent.data).messageType === 'close'){
        onlineAmount.value = JSON.parse(MessageEvent.data).onlineAmount
    }else {
        if (JSON.parse(MessageEvent.data).messageType === 'system'){
            onlineAmount.value = JSON.parse(MessageEvent.data).onlineAmount
        }
        chatMsg.value.push(JSON.parse(MessageEvent.data))
        count.value++
        await setScrollToBottom()
    }
}
onBeforeUnmount(() => {
    ws.close()
})

/**
 * 发送聊天内容
 */
const sendMsg = ref({
    liveId:liveId,
    userName:uName.value,
    msgContent:'',
})
function send() {
    ws.send(JSON.stringify(sendMsg.value))
    ElNotification({
        message: '发送成功！',
        type: 'success',
        offset: 50,
        duration: 1200,
    })
    sendMsg.value.msgContent = ''
}

/**
 * 直播视频配置
 */
const options = {
	resource: resource,
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

/**
 * 控制滚动条滚动到容器的底部
 */
const count = ref(1) // 计数器
const scrollbarRef = ref() // 滚动条实例
async function setScrollToBottom() {
    // nextTick 以等待 DOM 更新完成
	await nextTick()
	const max = 31 * count.value
	scrollbarRef.value.setScrollTop(max)
}

/**
 * emoji表情
 */
let emojiSwitch = ref(false)
let emoji = ref()
let liveInput = ref()
onMounted(() => {
    document.addEventListener("click",function (event){
        if (event.target !== emoji.value){
            emojiSwitch.value = false;
        }
    })
})
function onSelectEmoji(emoji) {
    let input:HTMLInputElement = liveInput.value.textarea
    let startPos = input.selectionStart
    let endPos = input.selectionEnd
    let resultText = input.value.substring(0, startPos) + emoji.i + input.value.substring(endPos)
    input.value = resultText
    input.focus()
    input.selectionStart = startPos + emoji.i.length
    input.selectionEnd = startPos + emoji.i.length
    sendMsg.value.msgContent =resultText
}




</script>

<template>
    <div class="live-room">
        <div class="container">
            <div class="container-header">
                <el-avatar size="large" :src="userAvatarUrl"/>
                <div class="container-header-info">
                    <div class="name">{{ userName }}</div>
                    <div class="title">{{ liveTitle }}</div>
                </div>
            </div>
            <div class="player-container">
                <w-player class="player" :options="options" :danmaku-key="0"></w-player>
            </div>
            <div class="container-footer"></div>
        </div>
        <div class="chat-area">
            <div class="chat-area-header">直播间人数：{{onlineAmount}}</div>
            <div>
                <el-scrollbar ref="scrollbarRef" max-height="548px" always>
                    <div class="chat-container">
                        <div class="dialog" ref="innerRef" v-for="chat in chatMsg">
                            <div class="user-dialog" v-if="chat.messageType === 'user' ">
                                <span class="user-dialog-name">{{ chat.userName }}：</span>
                                <span class="user-dialog-content">{{ chat.messageContent }}</span>
                            </div>
                            <div class="system-dialog" v-if="chat.messageType === 'system' ">
                                <div class="system-dialog-name">{{ chat.userName }}加入了直播间~</div>
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
                        v-model="sendMsg.msgContent"
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
    background-image: url("../assets/bg5.jpg");
    background-size: 100% 100%;
    background-repeat: no-repeat;
    height: 94.5vh;
}

.container {
    width: 1054px;
    margin-top: 30px;
}

.container-header {
    width: 1034px;
    background-color: #545E81;
    border-radius: 8px 8px 0 0;
    display: flex;
    padding: 15px 10px;
    background-image: url("../assets/bg4.jpg");
    background-size: 100%;
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
    width: 100%;
    padding-bottom: 56.25%;
    position: relative;
}

.player {
    width: 1054px;
    height: 593px;
    position: absolute;
    background-color: black;
}

.container-footer {
    height: 50px;
    background-color: #545E81;
    border-radius: 0 0 8px 8px;
    background-image: url("../assets/bg4.jpg");
    background-size: 100%;
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
    background-image: url("../assets/bg4.jpg");
    background-size: 100%;
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
    padding: 5px;
    word-break: break-all;
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
    background-image: url("../assets/bg4.jpg");
    background-size: 100%;
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