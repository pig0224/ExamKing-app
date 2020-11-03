import request from './request'

// 获取全部系别
export const GetAllDept = () => {
	return request.Get('dept/dept-all')
}

// 获取全部班级
export const GetAllClasses = () => {
	return request.Get('classes/classes-all')
}

// 根据系别Id获取班级
export const GetClassesByDept = ({
	detpid
}) => {
	return request.Get('classes/classes-by-dept', {
		detpid
	})
}

// 学生登录
export const Login = ({
	studentNo,
	password
}) => {
	return request.Post('student/login', {
		studentNo,
		password
	})
}

//学生注册
export const Register = ({
	stuName,
	deptId,
	classesId,
	sex,
	stuNo,
	password,
	telphone,
	idCard
}) => {
	return request.Post('student/register', {
		stuName,
		deptId,
		classesId,
		sex,
		stuNo,
		password,
		telphone,
		idCard
	})
}

// 找回密码
export const ForgetPass = ({
	stuNo,
	idCard,
	newPass
}) => {
	return request.Post('student/forget-pass', {
		stuNo,
		idCard,
		newPass
	})
}

// 获取学生信息
export const GetStudentInfo = () => {
	return request.Get('student/info')
}

// 修改学生信息
export const EditStudentInfo = ({
	stuName,
	sex,
	telphone,
	password,
	idCard
}) => {
	return request.Put('student/edit-info', {
		stuName,
		sex,
		telphone,
		password,
		idCard
	})
}
