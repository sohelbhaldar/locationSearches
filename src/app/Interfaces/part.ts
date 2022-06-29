export interface part {

    PartId: number,
    Name: string,
    PartNo: string,
    SiteName: string,
    PrimaryLocationId: number,
    PrimaryLocationNo: string,
    PrimaryLocationName: string,
    PrimaryLocationQuantityOnHand: number,
    PrimaryLocationQuantityAvailable: number,
    PrimaryLocationQuantityReserved: number,
    UnitCost: number,
    QuantityOnHand: number,
    Note: string,
    Description: string,
    QuantityReserved: number,
    ParLevel: number,
    ReorderMethod: number,
    ReorderLevel: number,
    ReorderQuantity: number,
    MinLevel: number,
    MaxLevel: number,
    PartLocationId: number,
    SelectedPartLocationId: number,
    SelectedPartLocationName: string,
    SelectedPartLocationQuantityOnHand: number,
    SelectedPartLocationQuantityReserved: number,
    SelectedPartLocationConcat: string,
    SiteId: number,
    SiteNo: string,
    CategoryNo: null,
    UnitId: number,
    UnitName: string,
    AlternatePartNo: null,
    IsActive: true,
    QuantityOnOrder: number,
    QuantityOnBackOrder: number,
    QuantityAvailable: number,
    TotalCost: number,
    RegionNo: any,
    RegionName: any,
    PrimaryLocationSiteName: string,
    MediumIds: null,
    IsAutoGenarate: boolean,
    Storage: string,
    StorageValue1: null,
    StorageValue2: null,
    StorageValue3: null,
    StorageValue4: null,
    StorageValue5: null,
    StoragePath: string,
    PartStorageDomain: any,
}