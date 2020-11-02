import request from './request'

// 学生登录
export const Login = ({
  StudentNo, Password
}) => {
  return request.Post('api/v1/student/login', {
    StudentNo, Password
  })
}

//学生注册
export const Register = ({
  StuName, DeptId, ClassesId, Sex, StuNo, Password, Telphone, IdCard
}) => {
  return request.Post('member/register', {
    StuName, DeptId, ClassesId, Sex, StuNo, Password, Telphone, IdCard
  })
}

// 获取学生信息
export const getStudentInfo = () => {
  return request.Get('member/info')
}

// 修改学生信息
export const editStudentInfo=({
	stuName,sex,telphone,password,idCard
})=>{
	return request.Put('/api/v1/student/edit-info', {
		stuName,sex,telphone,password,idCard
	})
}