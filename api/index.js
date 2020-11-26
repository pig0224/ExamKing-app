import request from './request'

// 获取全部系别
export const GetAllDept = () => {
	return request.Get('dept/dept-all')
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

// 获取全部错题数
export const GetWrongAnswerCount = () => {
	return request.Get('index/wrong-answer-count')
}

// 获取今日错题数
export const GetWrongAnswerTodayCount = () => {
	return request.Get('index/wrong-answer-today-count')
}

// 获取最新一条成绩
export const GetExamScoreOne = () => {
	return request.Get('index/exam-score')
}

// 搜索考试
export const SearchExamList = ( query ) => {
	return request.Get('index/search-exam', query)
}

// 查询最新考试列表
export const GetExamNewList = (query) =>{
	return request.Get('index/exam-new-list', query)
}

// 获取今日错题集列表
export const GetWrongTodayList = (query) => {
	return request.Get('wrong/wrong-today-list', query)
}

// 获取全部错题集列表
export const GetWrongList = (query) => {
	return request.Get('wrong/wrong-list', query)
}

// 获取错题本单选题列表
export const GetWrongSingles = (query) => {
	return request.Get('wrong/wrong-singles', query)
}
// 获取错题本多选题列表
export const GetWrongSelects = (query) => {
	return request.Get('wrong/wrong-selects', query)
}
// 获取错题本是非题列表
export const GetWrongJudges = (query) => {
	return request.Get('wrong/wrong-judges', query)
}

// 获取解题思路
export const GetQuestionIdeas = ({
	id,
	questiontype
}) => {
	return request.Get(`exam/question-ideas/${id}/${questiontype}`)
}

// 获取考试信息
export const GetExamInfo = (id) =>{
	return request.Get(`exam/exam-result/${id}`)
}

// 获取正在考试列表
export const GetExamOnlineList = (query) => {
	return request.Get('exam/exam-online-list', query)
}

// 获取未考试列表
export const GetExamWaitList = (query) => {
	return request.Get('exam/exam-wait-list', query)
}

// 获取已考试列表
export const GetExamFinshList = (query) => {
	return request.Get('exam/exam-finsh-list', query)
}

// 获取考试多选题
export const GetExamSelect = (examid, id) => {
	return request.Get(`exam/select/${examid}/${id}`)
}

// 获取考试单选题
export const GetExamSingle = (examid, id) => {
	return request.Get(`exam/single/${examid}/${id}`)
}

// 获取考试是非题
export const GetExamJudge = (examid, id) => {
	return request.Get(`exam/judge/${examid}/${id}`)
}

// 答题
export const ExamAnswer = (data) => {
	return request.Post('exam/exam-answer', data)
}

// 交卷
export const ExamPaper = (id) =>{
	return request.Post(`exam/exam-paper/${id}`)
}

// 查询考试成绩
export const GetExamScore = (examid) => {
	return request.Get(`score/exam-score/${examid}`)
}

// 查询成绩列表
export const GetExamScoreList = (query) => {
	return request.Get('score/exam-score-list', query)
}