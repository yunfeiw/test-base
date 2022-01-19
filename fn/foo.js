const { bar } = require('./bar.js')

function foo() {
    bar();
}

module.exports = { foo }