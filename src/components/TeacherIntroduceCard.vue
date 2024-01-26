<script setup lang="ts">
import {ref} from "vue";

let starValue = ref(4.5)
</script>

<template>
	<div class="card-box">
		<div class="teacher">
        <el-avatar :size="55" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
        <div class="teacher-right">
          <div class="name">雷军</div>
          <el-rate v-model="starValue" size="large" allow-half disabled class="rate"/>
        </div>
		</div>
		<div class="teacher-introduce-detail">
        公考星球公共基础知识科目优质讲师。985名校研究生毕业，4年公考培训经历，专业基础知识扎实。授课思路清晰,考点突出,讲解详细严谨,能帮助学员迅速理清知识脉络,学员好评度高。
		</div>
	</div>
</template>

<style scoped>
.card-box{
	width: 480px;
	padding: 24px;
	background-color: #F2F4F7;
	margin: 0 12px;
	border-radius: 6px;
	transition: 0.2s linear;
	cursor: pointer;
}
.card-box:hover{
    box-shadow: 3px 3px 15px rgba(0,0,0,.3);
    position: relative;
    top: -3px;
}
.teacher{
	display: flex;
}
.teacher-right{
	margin-left: 25px;
}
.name{
	font-size: 16px;
	font-weight: 700;
	position: relative;
	top: 4px;
}
.rate{
	margin-left: -3px;
}
.teacher-introduce-detail{
	margin-top: 15px;
	font-size: 14px;
	color: rgb(60, 70, 79);
}
</style>