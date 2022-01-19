const { Direction, turnLMaps, turnRMaps } = require("./Direction");

class MarsRover {
    constructor(position, direction) {
        this.direction = direction;
        this.position = position
    }
    getState() {
        const { direction, position: { x, y } } = this;
        return { position: { x, y }, direction }
    }

    // 左转
    turnLeft() {
        // 映射
        this.direction = turnLMaps(this.direction)
    }

    // 右转
    turnRight() {
        // 映射
        this.direction = turnRMaps(this.direction)
    }
}

module.exports = {
    MarsRover
}