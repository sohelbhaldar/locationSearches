import { part } from '../Interfaces/part'
export interface Location {
    LocationId: number,
    LocationNo: string,
    LocationName: string,
    ParentLocationId: number,
    ParentLocationName: string,
    Path: string,
    Building: boolean,
    InventoryStorage: boolean,
    SiteName: string,
    SiteNo: string,
    Parts: part[]
}