import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl } from '@angular/forms'
import { SITE } from '../Mocks/site-mock'
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-inventory-header',
  templateUrl: './inventory-header.component.html',
  styleUrls: ['./inventory-header.component.css']
})
export class InventoryHeaderComponent implements OnInit {
  value = 'Clear me';

  sites = SITE;
  siteValue!: FormGroup;
  siteCode?: string = ""

  constructor(private shared: SharedService, private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.siteValue = this.formBuilder.group({
      site: ['Choose Site Name']
    })
  }

  changeSite(e: any) {
    this.shared.setSiteValues(e.target.value);
  }

}
