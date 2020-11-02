import request from './request'

// 学生登录
export const Login = ({
  studentNo, password
}) => {
  return request.Post('student/login', {
    studentNo, password
  })
}

//学生注册
export const Register = ({
  stuName, deptId, classesId, sex, stuNo, password, telphone, idCard
}) => {
  return request.Post('student/register', {
    stuName, deptId, classesId, sex, stuNo, password, telphone, idCard
  })
}

// 获取学生信息
export const getStudentInfo = () => {
  return request.Get('student/info')
}

// 修改学生信息
export const editStudentInfo=({
	stuName,sex,telphone,password,idCard
})=>{
	return request.Put('student/edit-info', {
		stuName,sex,telphone,password,idCard
	})
}