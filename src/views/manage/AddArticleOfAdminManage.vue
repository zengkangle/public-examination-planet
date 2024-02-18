<script setup lang="ts">
import {ref} from "vue";
import request from "@/utils/request";
import {ElNotification} from "element-plus";

let form = ref(null)

const articleInfoForm = ref({
    articleType:'公考笔试',
})

function submitArticle(){
    request.post(
        '/article/saveArticle',
        articleInfoForm.value
    ).then(res => {
        if (res.code === '200'){
            form.value.resetFields()
            ElNotification({
                message: '添加成功！',
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
        <div class="title">文章添加</div>
        <el-divider class="divider"/>
        <el-form
          ref="form"
          :model="articleInfoForm"
          label-width="auto"
          label-position="right"
          size="large"
        >
            <el-form-item label="文章标题" prop="articleTitle">
                <el-input v-model="articleInfoForm.articleTitle"/>
            </el-form-item>
            <el-form-item label="文章种类" prop="articleType">
                <el-radio-group v-model="articleInfoForm.articleType">
                    <el-radio border label="公考笔试"/>
                    <el-radio border label="事业单位笔试"/>
                    <el-radio border label="常识零钱罐"/>
                    <el-radio border label="申论揭秘"/>
                    <el-radio border label="金词金句"/>
                    <el-radio border label="行测老师帮帮忙"/>
                </el-radio-group>
            </el-form-item>
            <el-form-item label="文章内容" prop="articleContent">
                <el-input type="textarea" v-model="articleInfoForm.articleContent" />
            </el-form-item>
            <el-form-item>
                <el-button type="primary" @click="submitArticle">添加文章</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<style scoped>
.title {
    font-size: 28px;
}
</style>