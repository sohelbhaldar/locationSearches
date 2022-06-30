import { Component, OnInit } from '@angular/core';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Site } from '../Interfaces/Site';
import { SITES } from '../Mocks/siteLocationPartSearches'
import { SharedService } from '../shared/shared.service';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { FlexLayoutModule } from '@angular/flex-layout';
import { storagePath } from '../Interfaces/storagePath';
import { storage } from '../Mocks/storage-mock';
import { CdkDragDrop, transferArrayItem, moveItemInArray } from '@angular/cdk/drag-drop';
import { part } from '../Interfaces/part';
import { NgToastService } from 'ng-angular-popup';

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
  myparts: part[] = [];
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

  constructor(private toast: NgToastService, private shared: SharedService, private modalService: NgbModal, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }


  open(content: any, partName: string, StoragePath: string) {
    this.modalService.open(content);
    this.partName = partName;
    console.log("StoragePath: " + StoragePath);
    this.storagePath = StoragePath.split('-->');
    if (this.storagePath.length < 6) {
      this.store.building = this.storagePath[0];
      this.store.store = this.storagePath[1];
      this.store.aisle = this.storagePath[2];
      this.store.shelf = this.storagePath[3];
      this.store.bin = this.storagePath[4];
    }
  }

  drop(event: CdkDragDrop<part[]>, content: any) {
    this.modalService.open(content).result.then((result) => {
      console.log("result: " + result);
    }, (reason) => {
      console.log("reason: " + reason);
      if (reason === "Yes") {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        this.toast.success({ detail: "SUCCESS", summary: 'Item Transfered Successfully', duration: 2000 });
      }
      else {
        this.toast.error({ detail: "Failed", summary: 'Item Transfer Failed', duration: 2000 });
      }
    });
    console.log(event)
  }

  ngOnInit(): void {
    this.shared.messageData$.subscribe(
      data => {
        this.SiteSelected = true;
        this.site = data;
        this.Site = this.partLocations.filter(m => m.SiteId == this.site);
        console.log(this.Site);
      }
    );

    this.shared.partNameIdData$.subscribe(
      data => {
        this.partId = parseInt(data);

        // const result = this.Site.filter((m: any) => {
        //   this.locationFilter = m.Locations.filter((m: any) => {
        //     this.partFilter = m.Parts.filter((m: any) => {
        //       if (m.PartId == this.partId) {
        //         this.filterSuccess = true;
        //         return true;
        //       }
        //       else {
        //         if (this.filterSuccess == true) { return true }
        //         else return true;
        //       }
        //     })
        //   })
        // });
        console.log(this.filterSuccess);
        //console.log(result);
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
}
