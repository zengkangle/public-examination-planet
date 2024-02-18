<script setup lang="ts">
import request from "@/utils/request";

import {onBeforeMount, ref} from "vue";

const {articleId} = defineProps(['articleId'])
const articleInfo = ref({})
function getArticleInfo(){
	request.get(
		'/article/getArticleInfo',
		{
			params:{articleId:articleId}
		}
	).then(res => {
		if (res.code === '200'){
			articleInfo.value = res.data
		}
	})
}
onBeforeMount(() => {
	getArticleInfo()
})
</script>

<template>
	<div class="main">
      <div class="knowledge-box">
          <div class="title">{{ articleInfo.articleTitle }}</div>
          <div>{{ articleInfo.articleContent }}</div>
      </div>
  </div>
</template>

<style scoped>
.main{
    width: 962px;
    margin: 0 auto;
    padding-top: 80px;
}
.knowledge-box{
	width: 962px;
	background-color: #fff;
	padding: 10px 24px 16px;
	border-radius: 6px;
}
.title{
	font-size: 30px;
	font-weight: bolder;
}
</style>