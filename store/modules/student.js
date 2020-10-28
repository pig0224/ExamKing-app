import {
  Login,
  getStudentInfo
} from '../../api'

const state = {
  StuName: "", // 姓名
  DeptId: "", // 系别Id
  ClassesId: "", // 班级Id
  Sex: "", // 性别
  StuNo: "", // 学号
  Telphone: "", // 联系电话号码
  IdCard: "", // 身份证号码
  Classes: "",// 班级信息
  Dept: "", // 系别信息
  Token: "", // accessToken
}

const mutations = {
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
  setDept(state, Dept) {
    state.Dept = Dept
  },
  setToken(state, Token) {
    state.Token = Token
  }
}

const actions = {
  // 学生登录
  async Login({
    dispatch, state, commit
  }, {
    StudentNo, Password
  }) {
    return await Login({ StudentNo, Password }).then(({ data }) => {
      if (data.Successed == true) {
        // 缓存accessToken
        uni.setStorage({
          key: 'token',
          data: data.AccessToken,
          success: function () {
            commit('setToken', data.data.AccessToken)
            // 获取学生信息
            dispatch('getStudentInfo')
            return Promise.resolve(data.data)
          }
        });
      } else {
        return Promise.reject(data.data)
      }
    })
  },
  // // 学生注册
  // async Resgister({
  //   dispatch, state, commit
  // }, {
  //   stuName, deptId, classesId, sex, stuNo, password, telphone, idCard
  // }) {
  //   return await Register({
  //     dispatch, state, commit
  //   }, {
  //     stuName, deptId, classesId, sex, stuNo, password, telphone, idCard
  //   }).then(({ data }) => {
  //     if (data.Successed == true) {
  //       return Promise.resolve(data.data)
  //     } else {
  //       return Promise.reject(data.data)
  //     }
  //   })
  // },
  // 获取学生信息
  async getStudentInfo({
    dispatch, state, commit
  }) {
    return await getStudentInfo().then(({ data }) => {
      if (data.Successed == true) {
        // 本地化用户信息
        commit('StuName', data.data.StuName)
        commit('DeptId', data.data.DeptId)
        commit('ClassesId', data.data.ClassesId)
        commit('Sex', data.data.Sex)
        commit('StuNo', data.data.StuNo)
        commit('Telphone', data.data.Telphone)
        commit('IdCard', data.data.IdCard)
        commit('Classes', data.data.Classes)
        commit('Dept', data.data.Dept)
        return Promise.reject(data.data)
      } else {
        dispatch('Logout')
        return Promise.reject(data.data)
      }
    })
  },
  // 退出登录
  async Logout({ dispatch, state, commit }) {
    // 退出登录接口代码，未完成...

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
