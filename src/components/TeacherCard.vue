<script setup lang="ts">
const {teacher} = defineProps(['teacher'])
</script>

<template>
    <div class="teacher-list">
        <div class="card">
            <div class="photo"><img :src="teacher.teacherImgUrl" alt=""></div>
            <h1>{{teacher.userName}}</h1>
            <h2>{{ teacher.teacherOutline }}</h2>
            <div class="desc">
                <el-text line-clamp="3" style="color: #fff">{{ teacher.teacherDescribe }}</el-text>
            </div>
            <router-link
                :to="{
                    path:'/base/teacherDetail',
                    query:{
                        teacherId:teacher.teacherId,
                        userName:teacher.userName,
                    }
                 }">了解更多</router-link>
        </div>
    </div>
</template>

<style scoped>
.card{
    position: relative;
    width: 300px;
    height: 450px;
    margin: 20px;
    background-color: #758a99;
    border-radius: 20px;
    overflow: hidden;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: #fff;
    box-shadow: 0 0 30px rgba(0,0,0,0.5);
    flex-shrink: 0;
}
.card .photo img{
    width: 100%;
    height: 100%;
    object-fit: cover;
}
.card .photo{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    transition: 0.5s;
}
.card:hover .photo{
    top: 30px;
    width: 120px;
    height: 120px;
    border-radius: 50%;
    box-shadow: 0 0 20px rgba(0,0,0,0.8);
}
.card .photo::before{
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom,transparent 50%,#222);
}
.card h1{
    position: absolute;
    top: 370px;
    transition: 0.5s;
}
.card:hover h1{
    top: 170px;
}
.card h2{
    margin-top: 220px;
    width: 80%;
    border-bottom: 1px solid rgba(255,255,255,0.3);
    font-size: 20px;
    text-align: center;
    margin-bottom: 10px;
    padding-bottom: 20px;
}

.desc{
    line-height: 30px;
    height: 100px;
    width: 250px;
    word-wrap: break-word;
}
.card a{
    font-size: 14px;
    color: rgba(255,255,255,0.8);
    border: 1px solid rgba(255,255,255,0.5);
    padding: 8px 32px;
    border-radius: 8px;
}
.card a:hover{
    color: #fff;
    background-color: rgba(255,255,255,0.2);

}
</style>