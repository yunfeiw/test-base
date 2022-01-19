/**
 * @description 常量文件
 */
const Direction = {
    N: "N",
    W: "W",
    S: "S",
    E: "E",
}



const leftMap = {
    [Direction.N]: Direction.W,
    [Direction.W]: Direction.S,
    [Direction.S]: Direction.E,
    [Direction.E]: Direction.N,
}

function turnLMaps(direction) {
    return leftMap[direction]
}

const rightMap = {
    [Direction.N]: Direction.E,
    [Direction.E]: Direction.S,
    [Direction.S]: Direction.W,
    [Direction.W]: Direction.N,
}
function turnRMaps(direction) {
    return rightMap[direction]
}

module.exports = {
    Direction,
    turnLMaps,
    turnRMaps,
}