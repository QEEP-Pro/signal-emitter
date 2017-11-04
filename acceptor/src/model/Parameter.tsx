export default class Parameter {
    id: number
    name: string
    active: boolean

    constructor(item: any) {
        this.id = item.id
        this.name = item.name
        this.active = false
    }
}