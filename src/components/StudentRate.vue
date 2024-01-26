<script setup lang="ts">


import {ref} from "vue";

let rateValue = ref(4.4)
</script>

<template>
	<el-divider/>
	<div class="student-rate-box">
    <el-avatar :size="70" src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"/>
		<div class="right">
				<div class="name">雷军</div>
				<div class="right-middle">
          <div class="time">2024.01.22 13:30</div>
            <el-rate
                    v-model="rateValue"
                    disabled
                    text-color="#ff9900"
                    size="large"
                    class="rate"
            />
        </div>
				<div class="student-rate">讲的容易理解，浅显易懂</div>
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