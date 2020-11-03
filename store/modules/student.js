import {
	Login,
	GetStudentInfo
} from '../../api'

import {
	getStorage,
	setStorage
} from '@/utils'

const state = {
	Id: "", //学生Id
	StuName: "", // 姓名
	DeptId: "", // 系别Id
	ClassesId: "", // 班级Id
	Sex: "", // 性别
	StuNo: "", // 学号
	Telphone: "", // 联系电话号码
	IdCard: "", // 身份证号码
	Classes: "", // 班级信息
	Token: "", // accessToken
}

const mutations = {
	setId(state, Id) {
		state.Id = Id
	},
	setStuName(state, StuName) {
		state.StuName = StuName
	},
	setDeptId(state, DeptId) {
		state.DeptId = DeptId
	},
	setClassesId(state, ClassesId) {
		state.ClassesId = ClassesId
	},
	setSex(state, Sex) {
		state.Sex = Sex
	},
	setStuNo(state, StuNo) {
		state.StuNo = StuNo
	},
	setTelphone(state, Telphone) {
		state.Telphone = Telphone
	},
	setIdCard(state, IdCard) {
		state.IdCard = IdCard
	},
	setClasses(state, Classes) {
		state.Classes = Classes
	},
	setToken(state, Token) {
		state.Token = Token
	}
}

const actions = {
	// 学生登录
	async Login({
		dispatch,
		state,
		commit
	}, {
		studentNo,
		password
	}) {
		return await Login({
			studentNo,
			password
		}).then(async ({
			data
		}) => {
			if (data.successed == true) {
				// 缓存accessToken
				await setStorage('token', data.data.accessToken)
				commit('setToken', data.data.accessToken)
				dispatch("getStudentInfo")
				return Promise.resolve(data)
			}
		})
	},
	// 获取学生信息
	async getStudentInfo({
		dispatch,
		state,
		commit
	}) {
		return await GetStudentInfo().then(({
			data
		}) => {
			if (data.successed == true) {
				// 本地化用户信息
				commit('setId', data.data.id)
				commit('setStuName', data.data.stuName)
				commit('setDeptId', data.data.deptId)
				commit('setClassesId', data.data.classesId)
				commit('setSex', data.data.sex)
				commit('setStuNo', data.data.stuNo)
				commit('setTelphone', data.data.telphone)
				commit('setIdCard', data.data.idCard)
				commit('setClasses', data.data.classes)
				return Promise.resolve(data)
			}else{
				dispatch('Logout')
			}
		})
	},
	// 退出登录
	async Logout({
		dispatch,
		state,
		commit
	}) {
		await setStorage('token','')
		// 本地化用户信息
		commit('setId', "")
		commit('setStuName', "")
		commit('setDeptId', "")
		commit('setClassesId', "")
		commit('setSex', "")
		commit('setStuNo', "")
		commit('setTelphone', "")
		commit('setIdCard', "")
		commit('setClasses', "")
		// reLaunch登录页面
		uni.reLaunch({
			url: '/pages/login/login'
		});
	}
}

const getters = {}

export default {
	namespaced: true,
	state,
	mutations,
	actions,
	getters
}
