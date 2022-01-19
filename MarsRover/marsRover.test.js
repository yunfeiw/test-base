const { MarsRover } = require('./MarsRover')
const { Position } = require('./Position')
const { Direction } = require('./Direction')

describe("MarsRover", () => {
    it("should return position and direction", () => {
        // 火车实例  位置 方向
        const marsRover = new MarsRover(new Position(0, 0), Direction.N)

        // 校验 返回当前火车状态
        expect(marsRover.getState()).toEqual({
            position: {
                x: 0,
                y: 0,
            },
            direction: Direction.N
        })
    })
})

// 转向 左
describe('turnLeft', () => {

    // 左转
    it('Nort output -> West', () => {

        // 火车实例  位置 方向
        const marsRover = new MarsRover(new Position(0, 0), Direction.N)

        // 动作 左转
        marsRover.turnLeft();

        // 校验 返回当前火车状态
        expect(marsRover.getState()).toEqual({
            position: {
                x: 0,
                y: 0,
            },
            direction: Direction.W
        })
    });

    it('W output -> S', () => {

        // 火车实例  位置 方向
        const marsRover = new MarsRover(new Position(0, 0), Direction.W)

        // 动作 左转
        marsRover.turnLeft();

        // 校验 返回当前火车状态
        expect(marsRover.getState()).toEqual({
            position: {
                x: 0,
                y: 0,
            },
            direction: Direction.S
        })
    });

    it('S output -> E', () => {

        // 火车实例  位置 方向
        const marsRover = new MarsRover(new Position(0, 0), Direction.S)

        // 动作 左转
        marsRover.turnLeft();

        // 校验 返回当前火车状态
        expect(marsRover.getState()).toEqual({
            position: {
                x: 0,
                y: 0,
            },
            direction: Direction.E
        })
    });

    it('E output -> N', () => {

        // 火车实例  位置 方向
        const marsRover = new MarsRover(new Position(0, 0), Direction.E)

        // 动作 左转
        marsRover.turnLeft();

        // 校验 返回当前火车状态
        expect(marsRover.getState()).toEqual({
            position: {
                x: 0,
                y: 0,
            },
            direction: Direction.N
        })
    });
})

// 转向 右
describe('turnRight', () => {

    it('N -> E', () => {

        // 火车实例  位置 方向
        const marsRover = new MarsRover(new Position(0, 0), Direction.N)

        // 动作 右转
        marsRover.turnRight();

        // 校验 返回当前火车状态
        expect(marsRover.getState()).toEqual({
            position: {
                x: 0,
                y: 0,
            },
            direction: Direction.E
        })
    });


    it('E -> S', () => {

        // 火车实例  位置 方向
        const marsRover = new MarsRover(new Position(0, 0), Direction.E)

        // 动作 右转
        marsRover.turnRight();

        // 校验 返回当前火车状态
        expect(marsRover.getState()).toEqual({
            position: {
                x: 0,
                y: 0,
            },
            direction: Direction.S
        })
    });

    it('S -> W', () => {

        // 火车实例  位置 方向
        const marsRover = new MarsRover(new Position(0, 0), Direction.S)

        // 动作 右转
        marsRover.turnRight();

        // 校验 返回当前火车状态
        expect(marsRover.getState()).toEqual({
            position: {
                x: 0,
                y: 0,
            },
            direction: Direction.W
        })
    });
    it('W -> N', () => {

        // 火车实例  位置 方向
        const marsRover = new MarsRover(new Position(0, 0), Direction.W)

        // 动作 右转
        marsRover.turnRight();

        // 校验 返回当前火车状态
        expect(marsRover.getState()).toEqual({
            position: {
                x: 0,
                y: 0,
            },
            direction: Direction.N
        })
    });
})
