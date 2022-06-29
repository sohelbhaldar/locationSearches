import { Location } from "./locations"
export interface Site {
    SiteId: number,
    SiteName: string,
    SiteNo: string,
    Locations: Location[]
}