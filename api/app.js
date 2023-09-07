var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cors = require("cors");

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var testAPIRouter = require("./routes/testAPI");
var registerAccountRouter = require("./routes/registerAccount");
var getCredentialsRouter = require("./routes/getCredentials");
var securityQuestionGetRouter = require("./routes/securityQuestionGet");
var changePasswordRouter = require("./routes/changePassword");
var validateSecurityAnswerRouter = require("./routes/validateSecurityAnswer");
var getCoursesRouter = require("./routes/getCourses")
var getStudentRouter = require("./routes/getStudents");
var getProfessorRouter = require("./routes/getProfessors");
var updateEnrollmentRouter = require("./routes/updateEnrollment");
var getModulesRouter = require("./routes/professor/getModules");
var addModuleRouter = require("./routes/professor/addModule");
var removeModuleRouter = require("./routes/professor/removeModule");
var editModuleRouter = require("./routes/professor/editModule");
var getCourseGradeRouter = require("./routes/getCourseGrades");
var getCourseAssignmentRouter = require("./routes/getCourseAssignments");

const { appendFile } = require('fs');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use('/home/*', express.static(path.join(__dirname, '/public')));
app.use('/static', express.static(path.join(__dirname, '/public/static')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);
app.use('/registerAccount', registerAccountRouter);
app.use('/getCredentials', getCredentialsRouter);
app.use('/securityQuestionGet', securityQuestionGetRouter);
app.use('/changePassword', changePasswordRouter);
app.use('/validateSecurityAnswer', validateSecurityAnswerRouter);
app.use('/getStudents', getStudentRouter);
app.use('/getProfessors', getProfessorRouter);
app.use('/getCourses', getCoursesRouter);
app.use('/updateEnrollment', updateEnrollmentRouter);
app.use('/getModules', getModulesRouter);
app.use('/addModule', addModuleRouter);
app.use('/removeModule', removeModuleRouter);
app.use('/editModule', editModuleRouter);
app.use('/getCourseGrades',getCourseGradeRouter)
app.use('/getCourseAssignments',getCourseAssignmentRouter)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

module.exports = app;
