import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Site } from '../Interfaces/Site';
import { SITES } from '../Mocks/siteLocationPartSearches'
import { SharedService } from '../shared/shared.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { storagePath } from '../Interfaces/storagePath';
import { storage } from '../Mocks/storage-mock';

@Component({
  selector: 'app-inventory-main',
  templateUrl: './inventory-main.component.html',
  styleUrls: ['./inventory-main.component.css']
})
export class InventoryMainComponent implements OnInit {

  parts: any[100];
  locations: any[100];
  nonStockParts: any;
  displayLowPartDetails = false;
  site = 0;
  partLocations: Site[] = SITES;
  Site: any;
  SiteSelected: boolean = false;
  storagePath: any;
  store: storagePath = {
    building: "",
    store: "",
    aisle: "",
    shelf: "",
    bin: "",
  };
  // Modal
  partName = "";
  partId: number;
  QuantityAvailable = 0;
  siteFilter: any;
  partFilter: any;
  locationFilter: any;
  filterSuccess: boolean;
  constructor(private shared: SharedService, private modalService: NgbModal, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  open(content: any, partName: string, StoragePath: string) {
    this.modalService.open(content);
    this.partName = partName;
    this.storagePath = StoragePath.split('-->');
    if (this.storagePath.lengh < 6) {
      this.store.building = StoragePath[0];
      this.store.store = StoragePath[1];
      this.store.aisle = StoragePath[2];
      this.store.shelf = StoragePath[3];
      this.store.bin = StoragePath[4];
    }
    console.log(StoragePath.split('-->'));
  }

  ngOnInit(): void {
    this.shared.messageData$.subscribe(
      data => {
        this.SiteSelected = true;
        this.site = data;
        this.Site = this.partLocations.filter(m => m.SiteId == this.site);
      }
    );

    this.shared.partNameIdData$.subscribe(
      data => {
        this.partId = parseInt(data);

        const result = this.Site.filter((m: any) => {
          this.locationFilter = m.Locations.filter((m: any) => {
            this.partFilter = m.Parts.filter((m: any) => {
              if (m.PartId == this.partId) {
                this.filterSuccess = true;
                return true;
              }
              else {
                if (this.filterSuccess == true) { return true }
                else return true;
              }
            })
          })
        });
        console.log(this.filterSuccess);
        console.log(result);
        console.log("LocationArray: " + this.locationFilter);
        console.log("partArray: " + this.partFilter);
      }
    );

    this.parts = [
      { partName: "P12121", partNum: 1234, partQty: 14 },
      { partName: "P2322342", partNum: 1235, partQty: 124 },
      { partName: "Pw837374", partNum: 1236, partQty: 1 },
      { partName: "P993403", partNum: 1237, partQty: 14 },
      { partName: "P_!@$%wewew", partNum: 1238, partQty: 134 },
      { partName: "P83943984", partNum: 1239, partQty: 12 }
    ];
    this.locations = [
      "Location 1", "Location 2", "Location 3", "Location 4", "Location 5", "Location 6"
    ];
    this.nonStockParts = [
      { partName: "P12121", partNum: 1234, partQty: 14 },
      { partName: "P2322342", partNum: 1235, partQty: 124 },
      { partName: "Pw837374", partNum: 1236, partQty: 1 },
      { partName: "P993403", partNum: 1237, partQty: 14 },
      { partName: "P_!@$%wewew", partNum: 1238, partQty: 134 },
      { partName: "P12121", partNum: 1234, partQty: 14 },
      { partName: "P2322342", partNum: 1235, partQty: 124 },
      { partName: "Pw837374", partNum: 1236, partQty: 1 },
      { partName: "P993403", partNum: 1237, partQty: 14 },
      { partName: "P_!@$%wewew", partNum: 1238, partQty: 134 },
    ]
  }

  mouseOverPart(event: any) {
    console.log(event.target.id);

  }

  mouseOutPart(event: any) {
    console.log(event.target.id);

  }

}
