import {useUserStore} from "@/store/user"

export default function (){
	function getUserMsg (){
		let userStore = useUserStore()
			const sessionUser = JSON.parse(sessionStorage.getItem('user')||"{}")
			userStore.$patch({
				userId: sessionUser.userId,
				userName: sessionUser.userName,
				userGender: sessionUser.userGender,
				userPhone: sessionUser.userPhone,
				userAvatarUrl: sessionUser.userAvatarUrl,
				userEmail: sessionUser.userEmail,
				userLevel: sessionUser.userLevel,
				userCreateTime: sessionUser.userCreateTime,
				teacherId: sessionUser.teacherId,
				token: sessionUser.token,
			})

	}
	return {getUserMsg}
}

