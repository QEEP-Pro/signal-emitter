export default class Law {
    id: number
    name: string
    title: string

    constructor(item: any) {
        this.id = parseInt(item.id, 10)
        this.name = item.name
        this.title = item.title
    }
}
