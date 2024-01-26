<script setup lang="ts">

</script>

<template>
	<div class="comment-card-box">
      <el-avatar src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png" :size="40"/>
      <div class="comment-card-container">
        <div class="comment-card-content">
		          <span class="comment-card-content-name">雷军</span>
		          <svg class="icon comment-vip-icon" aria-hidden="true"><use xlink:href="#icon-vip"></use></svg>
		          <span>：永远热情，永远快乐，你要的生活，只能自己给自己！早安！真的假的</span>
        </div>
        <div class="time">2024.01.22 13:30</div>
      </div>
	</div>
</template>

<style scoped>
.icon {
  width: 1em;
  height: 1em;
  vertical-align: -0.15em;
  fill: currentColor;
  overflow: hidden;
}
.comment-card-box{
  display: flex;
  padding-bottom: 5px;
  font-size: 14px;
}
.comment-card-container{
    position: relative;
    top: -9px;
    left: 4px;
}
.comment-vip-icon{
  font-size: 35px;
  position: relative;
  top: 7px;
}
.comment-card-content-name{
	color: #4C7CFE;
}
.time{
	color: #939393;
}
</style>