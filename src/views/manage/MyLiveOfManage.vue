<script setup lang="ts">
import {onBeforeMount, ref} from "vue";
import request from "@/utils/request";
import {ElNotification} from "element-plus";
import {useUserStore} from "@/store/user";
import {storeToRefs} from "pinia";

const userStore = useUserStore()
const {teacherId} = storeToRefs(userStore)
const tags = ref(['省考','事业单位综合岗','国考','名师解疑','考前冲刺','刷题'])
const liveInfoForm = ref({})
function getLiveInfoForm(){
    request.get(
        '/live/getMyLive',
      {
        params:{teacherId:teacherId.value}
      }
    ).then(res => {
        if (res.code == '200'){
            liveInfoForm.value = res.data
        }
    })
}
onBeforeMount(() => {
    getLiveInfoForm()
})
function copy(context) {
    navigator.clipboard.writeText(context)
      .then(() => {
          ElNotification({
              message: '复制成功！',
              type: 'success',
              offset: 50,
              duration: 1200,
          })
      })
}

function openLive(){
    request.post(
        '/live/openLive',
        liveInfoForm.value
    ).then(res => {
        if (res.code === '200'){
            liveInfoForm.value.liveStatus = '开播中'
            ElNotification({
                message: '开播成功！',
                type: 'success',
                offset: 50,
                duration: 1200,
            })
        }
    })
}

function closeLive(){
    request.get(
        '/live/closeLive',
      {
        params:{liveId:liveInfoForm.value.liveId}
      }
    ).then(res => {
        if (res.code === '200'){
            liveInfoForm.value.liveStatus = '未开播'
            ElNotification({
                message: '下播成功！',
                type: 'success',
                offset: 50,
                duration: 1200,
            })
        }
    })
}
</script>

<template>
    <div class="content">
        <div class="title">我的直播</div>
        <el-divider class="divider"/>
        <el-form
          ref="form"
          :model="liveInfoForm"
          label-width="auto"
          label-position="right"
          size="large"
        >
            <el-form-item label="直播标题">
                <el-input v-model="liveInfoForm.liveTitle" :disabled="liveInfoForm.liveStatus == '开播中'"/>
            </el-form-item>
            <el-form-item label="直播类型">
                <el-radio-group v-model="liveInfoForm.liveType" :disabled="liveInfoForm.liveStatus == '开播中'">
                    <el-radio border label="vip"/>
                    <el-radio border label="公开试听课"/>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="直播标签">
                <el-checkbox-group v-model="liveInfoForm.tags" size="large" :max="2" :disabled="liveInfoForm.liveStatus == '开播中'">
                    <el-checkbox v-for="tag in tags" :key="tag" :label="tag" border />
                </el-checkbox-group>
            </el-form-item>
            <el-form-item label="服务器地址" v-if="liveInfoForm.liveStatus === '开播中'">
                <div class="live-code">
                    <el-input
                      v-model="liveInfoForm.serverAddress"
                      :disabled="true">
                    </el-input>
                    <el-link :underline="false" class="copy" @click="copy(liveInfoForm.serverAddress)">复制</el-link>
                </div>
            </el-form-item>
            <el-form-item label="直播推流码" v-if="liveInfoForm.liveStatus === '开播中'">
                <div class="live-code">
                    <el-input
                      v-model="liveInfoForm.liveCode"
                      :disabled="true">
                    </el-input>
                    <el-link :underline="false" class="copy" @click="copy(liveInfoForm.liveCode)">复制</el-link>
                </div>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="openLive" v-if="liveInfoForm.liveStatus === '未开播'">开启直播</el-button>
                <el-button type="danger" @click="closeLive" v-if="liveInfoForm.liveStatus === '开播中'">关闭直播</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.title {
    font-size: 28px;
}
.live-code{
    display: flex;
}
.copy{
    flex-shrink: 0;
    margin-left: 20px;
}
</style>