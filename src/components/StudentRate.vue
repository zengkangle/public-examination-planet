<script setup lang="ts">

defineProps(['comment'])
</script>

<template>
	<el-divider/>
	<div class="student-rate-box">
    <el-avatar :size="70" :src="comment.userAvatarUrl"/>
		<div class="right">
				<div class="name">{{ comment.userName }}</div>
				<div class="right-middle">
          <div class="time">2024.01.22 13:30</div>
            <el-rate
                    v-model="comment.commentRate"
                    disabled
                    text-color="#ff9900"
                    size="large"
                    class="rate"
            />
        </div>
				<div class="student-rate">{{ comment.commentContent }}</div>
		</div>
  </div>
</template>

<style scoped>
.student-rate-box{
	display: flex;
	padding: 20px 0;
}
.right{
	margin-left: 30px;
}
.name{
	font-size: 20px;
	font-weight: 600;
}
.right-middle{
	display: flex;
	align-items:  center;
}
.time{
	color: #8A9095;
}
.rate{
	position: relative;
	top: -2px;
	left: 25px;
}
.student-rate{
	color: #3C464F;
}
</style>