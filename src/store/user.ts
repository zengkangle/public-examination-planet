import {defineStore} from "pinia";

export const useUserStore = defineStore('user',{
	//真正存储数据的地方
	state(){
		return {
			userId:null,
			userName:null,
			userGender:null,
			userPhone:null,
			userAvatarUrl:null,
			userEmail:null,
			userLevel:null,
			teacherId:null,
			userCreateTime:null,
			token:null,
		}
	}
})