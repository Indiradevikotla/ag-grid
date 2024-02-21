import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ICellRendererAngularComp } from 'ag-grid-angular';
import { GridApi, GridOptions, ICellRendererParams } from 'ag-grid-community';
import { SharedService } from '../shared.service';
declare var $: any;
@Component({
  selector: 'app-action-buttons',
  templateUrl: './action-buttons.component.html',
  styleUrls: ['./action-buttons.component.css']
})
export class ActionButtonsComponent implements OnInit, ICellRendererAngularComp {
  public gridOptions: GridOptions;
  ColumnDefs: any;
  gridApi: GridApi;
  public getRowNodeId: any;
  selectedRow: any;
  isEdit: boolean = false;
  actionSelected: any;
  public data;
  showDropDown: boolean;

  constructor(private d: SharedService) {
    this.getRowNodeId = (params: any) => {
      return params.id;
    };
  }

  ngOnInit(): void { }


  // gets called once before the renderer is used
  agInit(params: ICellRendererParams): void {
    this.data = params
    console.log("dddddddddddddddddd" + JSON.stringify(params.node.data))
  }

  refresh(params: ICellRendererParams) {
    return true;
  }

  buttonClicked() {
    // this.showDropDown = true;
    document.getElementById('dropdown').classList.toggle('show')
    
  }

  AddDynamicUser() {
    this.data.api.applyTransaction({add: []})
  }

  reciveRegValues(eventData) {
    console.log("jjjjj" + JSON.stringify(eventData));
    this.d.updateData(eventData);
  }


  openAddModal() {
    this.isEdit = false;
    this.actionSelected = "add";
    $('#exampleModal').modal('show');
    // this.showDropDown = false;
    // document.getElementById('dropdown').classList.toggle('hidden')

  }

  openEditModal() {
    this.isEdit = true;
    this.actionSelected = "edit";
    this.selectedRow = this.data.api.getSelectedRows()[0];
    $('#exampleModal').modal('show');
    // this.showDropDown = false;
  }

  
  openDeleteModal() {
    this.actionSelected = "delete";
    this.d.updateData({ selected: "delete", data: this.data.api.getSelectedRows()[0] });
    // this.showDropDown = false;
  };

}
