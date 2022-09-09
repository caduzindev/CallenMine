export interface GetAllExpertOccupiedDtoReturn {
    date: string
    type: string
    message: string
}
export interface GetAllExpertOccupied {
    getAll(export_id: string): Promise<GetAllExpertOccupiedDtoReturn[]>
}