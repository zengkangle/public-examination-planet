<script setup lang="ts">
import {computed, ref} from "vue";
import request from "@/utils/request";
import * as dayjs from "dayjs";
import {ElMessage, ElNotification} from "element-plus";

/**
 * 初始化数据
 * @param row
 */
function formatterTime(row){
    return dayjs(row.createTime).format('YYYY.MM.DD HH:mm')
}
function formatterTime2(row){
    if (row.orderStatus == '已支付'){
        return dayjs(row.payTime).format('YYYY.MM.DD HH:mm')
    }else{
        return null
    }
}

/**
 * 操作
 */
 function pay(scope){
    window.open("http://localhost:8009/alipay/pay?orderId="+scope.row.orderId)
 }
function cancel(scope){
    request.get(
        '/order/cancelOrder',
      {
        params:{orderId:scope.row.orderId}
      }
    ).then(res => {
        if (res.code == '200'){
            scope.row.orderStatus = '已取消'
            ElNotification({
                message: '取消成功！',
                type: 'success',
                offset: 50,
                duration: 1200,
            })
        }else{
            ElMessage({
                message: '取消失败！',
                type: "error",
                showClose: true,
            })
        }
    })
}

/**
 * 分页+无限滚动
 */
const orderList = ref([])
const pageMsg = ref({
    currentPage:0,
    pageSize:10,
    total:null,
})
let disabled = computed(() => {
    return orderList.value.length == pageMsg.value.total;
})
const load = () => {
    pageMsg.value.currentPage++
    getOrderListScroll()
}
function getOrderListScroll(){
    request.get(
      "/order/getOrdersList",
      {
          params:pageMsg.value
      }
    ).then(res => {
        if (res.code === '200'){
            orderList.value = orderList.value.concat(res.data.records)
            pageMsg.value.total = res.data.total
        }
    })
}
</script>

<template>
    <div class="content" v-infinite-scroll="load" :infinite-scroll-disabled="disabled">
        <div class="title">我的订单</div>
        <el-divider class="divider"/>
        <el-table :data="orderList" style="width: 100%">
            <el-table-column prop="orderCode" label="订单编号"/>
            <el-table-column prop="orderName" label="商品名称"/>
            <el-table-column prop="orderPrice" label="支付价格"/>
            <el-table-column prop="createTime" label="创建时间" :formatter="formatterTime"/>
            <el-table-column prop="alipayCode" label="支付宝交易凭证号"/>
            <el-table-column prop="payTime" label="支付时间" :formatter="formatterTime2"/>
            <el-table-column prop="orderStatus" label="订单状态"/>
            <el-table-column label="操作">
                <template #default="scope">
                    <el-button type="primary" @click="pay(scope)" :disabled="scope.row.orderStatus != '待支付'">支付</el-button>
                    <el-button type="danger" @click="cancel(scope)" :disabled="scope.row.orderStatus != '待支付'">取消</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>

<style scoped>
.title {
    font-size: 28px;
}
</style>