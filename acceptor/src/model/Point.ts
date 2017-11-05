export default class Point {
    parameterId: number
    x: number
    y: number

    constructor(item: any) {
        this.parameterId = item.id
        this.x = item.x
        this.y = item.y
    }
}
