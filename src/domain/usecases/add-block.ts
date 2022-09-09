export interface AddBlockDto {
    start: string
    end: string
    note: string
}
export interface AddBlock {
    add(data: AddBlockDto): Promise<number>
}