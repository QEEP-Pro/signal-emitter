import Law from './Law'


export default interface Parameter {
    id: number
    name: string
    period: number
    min: number
    max: number
    unit?: string
    noise: boolean
    law: Law
}