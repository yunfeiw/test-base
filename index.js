// function f1(arg) {
//     console.log("f1", arg);
//     return arg;
// }
// function f2(arg) {
//     console.log("f2", arg);
//     return arg;
// }
// function f3(arg) {
//     console.log("f3", arg);
//     return arg;
// }
// function compose(...funcs) {
//     if (funcs.length === 0) {
//         return arg => arg;
//     }
//     if (funcs.length === 1) {
//         return funcs[0];
//     }
//     return funcs.reduce((a, b) => (...args) => a(b(...args)));
// }
// let res = compose(f1, f2, f3)("omg"); //f1(f2(f3("omg")));
// console.log("res", res); //sy-log

var arr = [
    next => action => {
        console.log(next)
    },

    next => action => {
        console.log(next)
    },

    next => action => {
        console.log(next)
    },
]

function fnc() {
    return arr.reduce(function (a, b) {
        console.log(a, b)
    })
}
fnc()('gan')