export interface GetAllExpertOccupied {
    getAll(export_id: string): Promise<Array<{date: string,type: string,message: string}>>
}