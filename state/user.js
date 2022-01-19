class User {
    constructor() {
        this.name = 'yunfei'
    }
    getName() {
        return this.name
    }
    setName(v) {
        this.name = v
    }
}

module.exports = { User }