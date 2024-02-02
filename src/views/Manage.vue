<script setup lang="ts">
import SideBar from "@/components/SideBar.vue";
</script>

<template>
    <div class="main">
        <SideBar/>
        <el-scrollbar height="93.4vh" style="width: 100%">
            <router-view class="content"></router-view>
        </el-scrollbar>
    </div>
</template>

<style scoped>

.main {
    display: flex;
    padding-top: 60px;
}
.content{
    padding: 15px;
    width: 97%;
}
</style>