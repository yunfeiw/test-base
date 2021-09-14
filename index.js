let str = '{{hh}}'

let reg = /\{\{(.*)\}\}/

reg.test(str)

console.log(RegExp.$1)


