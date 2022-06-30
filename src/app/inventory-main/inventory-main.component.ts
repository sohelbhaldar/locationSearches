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
import { storageLocationMax } from '../Interfaces/storageLocationMax';

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
    locationName: "",
    building: "",
    store: "",
    aisle: 0,
    shelf: 0,
    bin: 0,
  };
  aisle: number;
  shelf: number;
  bin: number;

  storeLocationValues: any = {
    locationName: "",
    building: 0,
    store: 0,
    aisle: 0,
    shelf: 0,
    bin: 0,
  };

  locationsContainer: any = [];
  maxlocationName = 0;
  maxbuilding = 0;
  maxstorerooms = 0;
  maxaisle = 0;
  maxshelf = 0;
  maxbin = 0;

  locationMaxStorage: any;
  // Modal
  partName = "";
  partId: number;
  QuantityAvailable = 0;
  siteFilter: any;
  partFilter: any;
  locationFilter: any;
  filterSuccess: boolean;
  location = 0;
  part = 0;
  dictionaryStorage: any;

  constructor(private toast: NgToastService, private shared: SharedService, private modalService: NgbModal, config: NgbModalConfig) {
    config.backdrop = 'static';
    config.keyboard = false;
  }

  counter(i: number) {
    return new Array(i);
  }

  open(content: any, partName: string, StoragePath: string, location: any) {
    this.modalService.open(content);
    this.partName = partName;
    console.log("StoragePath: " + StoragePath);
    const locationData = this.locationsContainer.filter((m: any) => m.locationName == location.LocationName);
    this.maxaisle = locationData[0].aisle;
    this.maxbin = locationData[0].bin;
    this.maxshelf = locationData[0].shelf;
    this.maxstorerooms = locationData[0].store;

    console.log(locationData);
    this.storagePath = StoragePath.split('-->');
    if (this.storagePath.length < 6) {
      this.store.locationName = location.LocationName;
      this.store.building = this.storagePath[0];
      this.store.store = this.storagePath[1];
      //this.store.aisle = this.storagePath[2];
      //this.store.shelf = this.storagePath[3];
      //this.store.bin = this.storagePath[4];

      this.aisle = parseInt(this.storagePath[2].split(':')[1]);
      this.shelf = parseInt(this.storagePath[3].split(':')[1]);
      this.bin = parseInt(this.storagePath[4].split(':')[1]);
      console.log("Aisle : " + this.aisle);
    }
  }

  drop(event: CdkDragDrop<part[]>, content: any) {
    this.modalService.open(content).result.then((result) => {
      console.log("result: " + result);
    }, (reason) => {
      console.log("reason: " + reason, event);
      if (reason === "Yes") {
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
        const pickedItem = event.container.data.filter((m: any) => m.PartId === event.previousContainer.data[event.previousIndex].PartId)
        console.log(pickedItem);
        if (event.currentIndex == 0) {
          event.currentIndex = 1;
        }
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
  }

  ngOnInit(): void {
    this.shared.messageData$.subscribe(
      data => {
        this.SiteSelected = true;
        this.site = data;
        this.Site = this.partLocations.filter(m => m.SiteId == this.site);
        this.Site[0].Locations.forEach((element: any) => {
          var storeLocationValues = {
            locationName: "",
            building: 0,
            store: 0,
            aisle: 0,
            shelf: 0,
            bin: 0,
          };
          storeLocationValues.locationName = element.LocationName;

          element.Parts.forEach((element2: any) => {
            this.storagePath = element2.StoragePath.split('-->'); //building: 02 --> store: 05 -->  aisle: 10 --> shelf: 03 --> bin: 03

            var building = parseInt(this.storagePath[0].split(':')[1]);
            var storeValue = parseInt(this.storagePath[1].split(':')[1]);
            var aisle = parseInt(this.storagePath[2].split(':')[1]);
            var shelf = parseInt(this.storagePath[3].split(':')[1]);
            var bin = parseInt(this.storagePath[4].split(':')[1]);


            if (building > this.maxbuilding) {
              storeLocationValues.building = building;
              this.maxbuilding = building;
            }

            if (storeValue > storeLocationValues.store) {
              storeLocationValues.store = storeValue;
            }

            if (aisle > storeLocationValues.aisle) {
              storeLocationValues.aisle = aisle;
            }

            if (shelf > storeLocationValues.shelf) {
              storeLocationValues.shelf = shelf;
            }

            if (bin > storeLocationValues.bin) {
              storeLocationValues.bin = bin;
            }
          });
          this.locationsContainer.push(storeLocationValues);

        });
        console.log(this.Site);
        console.log(this.locationsContainer);
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
        console.log("filter change" + this.Site);
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

    this.Site[0].Locations.forEach((element: any) => {
      var storeLocationValues = {
        locationName: "",
        building: 0,
        store: 0,
        aisle: 0,
        shelf: 0,
        bin: 0,
      };
      storeLocationValues.locationName = element.LocationName;

      element.Parts.forEach((element2: any) => {
        this.storagePath = element2.StoragePath.split('-->'); //building: 02 --> store: 05 -->  aisle: 10 --> shelf: 03 --> bin: 03

        var building = parseInt(this.storagePath[0].split(':')[1]);
        var storeValue = parseInt(this.storagePath[1].split(':')[1]);
        var aisle = parseInt(this.storagePath[2].split(':')[1]);
        var shelf = parseInt(this.storagePath[0].split(':')[1]);
        var bin = parseInt(this.storagePath[0].split(':')[1]);


        if (building > storeLocationValues.building) {
          storeLocationValues.building = building;
        }

        if (storeValue > storeLocationValues.store) {
          storeLocationValues.store = storeValue;
        }

        if (aisle > storeLocationValues.aisle) {
          storeLocationValues.aisle = aisle;
        }

        if (shelf > storeLocationValues.shelf) {
          storeLocationValues.shelf = shelf;
        }

        if (bin > storeLocationValues.bin) {
          storeLocationValues.bin = bin;
        }
      });
      this.locationsContainer.push(storeLocationValues);
      console.log("Container : " + this.locationsContainer[0]);
    });
  }
}
