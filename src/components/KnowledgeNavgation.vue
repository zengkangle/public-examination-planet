<script setup lang="ts">
import request from "@/utils/request"
import {computed, onBeforeMount, ref} from "vue";

const {topic} = defineProps(['topic','imgUrl'])

const articleList = ref([{}])
function getArticleListOfType(){
	request.get(
		'/article/getArticleListOfType',
		{
			params:{articleType:topic}
		}
	).then(res => {
		if (res.code === '200'){
			articleList.value = res.data
		}
	})
}
onBeforeMount(() => {
	getArticleListOfType()
})
</script>

<template>
	<div class="nav">
			<div class="title-area">
					<div class="title">{{ topic }}</div>
          <i class="iconfont arrow">&#xe606;</i>
			</div>
			<div class="blue-line"></div>
			<div class="line"></div>
			<div class="show-area">
        <img :src="imgUrl" alt="" class="img"/>
        <routerLink :to="{path:'/base/knowledge',query:{articleId: articleList[0].articleId}}" class="show-text">{{ articleList[0].articleTitle  }}</routerLink>
      </div>
      <router-link :to="{path:'/base/knowledge',query:{articleId:article.articleId}}" class="subtitle" v-for="article in articleList.slice(1,articleList.length)">{{ article.articleTitle }}</router-link>
	</div>
</template>

<style scoped>
@font-face {
    font-family: 'iconfont';  /* Project id 3294066 */
    src: url('//at.alicdn.com/t/c/font_3294066_auydig0c9c9.woff2?t=1705598253961') format('woff2'),
    url('//at.alicdn.com/t/c/font_3294066_auydig0c9c9.woff?t=1705598253961') format('woff'),
    url('//at.alicdn.com/t/c/font_3294066_auydig0c9c9.ttf?t=1705598253961') format('truetype');
}
.iconfont{
    font-family:"iconfont" !important;
    font-size:16px;font-style:normal;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
}
.nav{
	width: 470px;
	height: 475px;
}
.title-area{
	display: flex;
	align-items: center;
}
.title{
	color: #4C7CFE;
	font-size: 27px;
	font-weight: 500;
	margin-right: 340px;
	flex-shrink: 0;
}
.arrow{
    color: #A8ACB0;
    font-size: 17px;
}
.line{
	height: 1px;
	border-top: 1px dashed #BABDC0;
}
.blue-line{
	height: 4px;
	width: 80px;
	background-color: #4C7CFE;
	position: relative;
	top: 2px;
}
.show-area{
	margin-top: 30px;
	display: flex;
	margin-bottom: 35px;
}
.img{
	width: 218px;
	border-radius: 5px;
	margin-right: 20px;
}
.subtitle{
	display: block;
	font-size: 22px;
	margin-top: 17px;
	color: #4C4F4C;
}
.subtitle:hover{
	color: #4C7CFE;
}
.show-text{
	font-size: 25px;
	color: black;
	font-weight: 500;
}
.show-text:hover{
    color: #4C7CFE;
}
</style>