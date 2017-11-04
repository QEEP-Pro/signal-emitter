import Law from './Law'


export default class Parameter {
    id?: number
    name: string
    period: number
    min: number
    max: number
    unit?: string
    noise: boolean
    mean: number
    dispersion: number
    law: Law

    constructor(item: any) {
        this.id = parseInt(item.id, 10)
        this.name = item.name
        this.period = parseInt(item.period, 10)
        this.min = parseFloat(item.min)
        this.max = parseFloat(item.max)
        this.unit = item.unit
        this.noise = item.noise
        this.mean = parseFloat(item.mean)
        this.dispersion = parseFloat(item.dispersion)
        this.law = new Law(item.law)
    }
}
