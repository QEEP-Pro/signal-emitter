export default class Parameter {
    id: number
    name: string
    active: boolean
    unit?: string

    constructor(item: any) {
        this.id = item.id
        this.name = item.name
        this.active = false
        this.unit = item.unit
    }
}