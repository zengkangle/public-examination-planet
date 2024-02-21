<script setup lang="ts">
defineProps(['live'])
</script>

<template>
	<div class="card-box">
			<div class="card-header">
					<div class="living-title">直播中</div>
					<div class="wave">
							<div class="wave-item1"></div>
              <div class="wave-item2"></div>
              <div class="wave-item3"></div>
					</div>
			</div>
			<div class="card-body">
					<div class="live-title">{{ live.liveTitle }}</div>
					<div class="tags">
						<el-tag class="tag" v-for="tag in live.tags">{{ tag }}</el-tag>
					</div>
			</div>
			<el-divider/>
			<div class="card-footer">
					<div class="teacher">
              <el-avatar :src="live.userAvatarUrl"/>
              <div class="name">{{ live.userName }}</div>
					</div>
					<div class="condition-vip" v-if="live.liveType === 'vip'">VIP</div>
          <div class="condition-free" v-if="live.liveType === '公开试听课'">试听课</div>
			</div>
	</div>
</template>

<style scoped>
.card-box{
	background-color: #fff;
	width: 310px;
	height: 200px;
	padding: 20px 25px;
	margin: 20px;
	border-radius: 5px;
	cursor: pointer;
}
.card-box:hover{
	box-shadow: 3px 3px 15px rgba(0,0,0,.3);
	margin-top: 17px;
}
.card-header{
	background-color: red;
	padding: 3px 4px;
	width: 68px;
	display: flex;
}
.living-title{
	color: #fff;
	font-size: 14px;
}
.wave{
	display: flex;
	//margin-left: 3px;
	align-items: flex-end;
	position: relative;
	top: -2px;
}
.wave > div{
	background-color: #fff;
	width: 2px;
	margin-left: 5px;
}
.wave-item1{
    animation: item1-movie 0.7s infinite;
}
.wave-item2{
    animation: item2-movie 0.7s infinite;
}
.wave-item3{
    animation: item3-movie 0.8s infinite;
}
@keyframes item1-movie{
		0%{
				height: 4px;
		}
    50%{
        height: 18px;
    }
    100%{
        height: 4px;
    }
}
@keyframes item2-movie{
    0%{
        height: 10px;
    }
    50%{
        height: 18px;
    }
    100%{
        height: 10px;
    }
}
@keyframes item3-movie{
    0%{
        height: 4px;
    }
    50%{
        height: 18px;
    }
    100%{
        height: 4px;
    }
}
.card-body{
	margin-top: 15px;
}
.live-title{
    font-size: 20px;
}
.tags{
	margin-top: 14px;
}
.tag{
  margin-right: 10px;
}
.card-footer{
	display: flex;
	position: relative;
}
.teacher{
	display: flex;
	align-items: center;
}
.name{
margin-left: 10px;
	color: #8C9095;
}
.condition-vip{
	color: red;
	font-weight: 600;
	position: absolute;
	left: 280px;
	top: 20px;
}
.condition-free{
    color: #4C7CFE;
    font-weight: 600;
    position: absolute;
    left: 260px;
    top: 20px;
}
</style>