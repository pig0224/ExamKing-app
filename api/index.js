import request from './request'

// 学生登录
export const Login = ({
  StudentNo, Password
}) => {
  return request.post('member/login', {
    StudentNo, Password
  })
}

//学生注册
export const Register = ({
  StuName, DeptId, ClassesId, Sex, StuNo, Password, Telphone, IdCard
}) => {
  return request.post('member/register', {
    StuName, DeptId, ClassesId, Sex, StuNo, Password, Telphone, IdCard
  })
}

// 获取学生信息
export const getStudentInfo = () => {
  return request.get('member/info')
}