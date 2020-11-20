// 怎么知道我想要打包生产环境还开发环境？
// 需要知道输入的执行命令   通过指令来区分
// nodejs中有个全局对象 process 进程对象
// console.log( process )// {...}
// console.log( process.argv )// [...]
// console.log( process.argv[2] )// dev  build ...
// console.log(process)
//命令:gult bulid
// console.log(process.argv)  //是一个数组[..., ..., bulid]
//命令:gult dev
// console.log(process.argv)  //是一个数组[..., ..., dev]
//命令:gult dev
// console.log(process.argv[2])//dev
//命令:gult hh
// console.log(process.argv[2])//hh
  let mode = process.argv[2]  //用mode这个变量来保存用户输入的指令
//因为执行gult命令只能识别gulpfile,gulpfile-dev 这些gulp是不认识的,所以先执行gulpfile,
// 在gulpfile再执行这些语句,通过这种形式来让gult知道我们下的什么指令
switch(mode){
  case 'dev':
    require('./gulpfile-dev.js')//引入开发环境的配置
    break
  case 'build':
    require('./gulpfile-build.js')//执行生产环境的配置
    break
}
