import { Component, ElementRef, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import * as bootstrap from 'bootstrap';
import { ColDef, GridApi, GridOptions } from "ag-grid-community";
import { ActionButtonsComponent } from './action-buttons/action-buttons.component';
import { SharedService } from './shared.service';
// import { ToastrService } from 'ngx-toastr';
declare var $: any;

@Component({
    selector: "my-app",
    templateUrl: "./app.component.html",
    styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
    public gridOptions: GridOptions;
    ColumnDefs: any;
    AgLoad: boolean;
    gridApi: GridApi;
    public gridColumnApi: any
    public getRowNodeId: any;
    selectedRow: any;
    actionSelected: any;
    colDefs
    formData: any[];
    rowIndex;
    rowData: any[] = [
        {
            "firstName": "indira",
            "lastName": "devi",
            "userEmail": "indiradevikotla@gmail.com",
            "userPassword": "XXXXXXXXX",
            "age": 20,
            "skillsNeeded": "Angular"
        },
        {
            "firstName": "indira",
            "lastName": "devi1",
            "userEmail": "indiradevikotla@gmail.com",
            "userPassword": "XXXXXXXXX",
            "age": 45,
            "skillsNeeded": "Angular"
        },
        {
            "firstName": "indira",
            "lastName": "devi2",
            "userEmail": "indiradevikotla@gmail.com",
            "userPassword": "XXXXXXXXX",
            "age": 35,
            "skillsNeeded": "Angular"
        },
        {
            "firstName": "indira",
            "lastName": "devi3",
            "userEmail": "indiradevikotla@gmail.com",
            "userPassword": "XXXXXXXXX",
            "age": 15,
            "skillsNeeded": "Angular"
        }
    ];
    defaultColDef: ColDef = {
        filter: true, // Enable filtering on all columns
        editable: true, // Enable editing on all columns
        sortable: true,
        // singleClickEdit: true
    };


    paginationPageSize = 20;
    paginationPageSizeSelector: number[] | boolean = [20, 50];

    constructor(private d: SharedService) {
        this.colDefs = [
            { headerName: 'First Name', field: 'firstName' },
            { headerName: 'Last Name', field: 'lastName' },
            { headerName: 'Email Id', field: 'userEmail' },
            { headerName: 'Password', field: 'userPassword' },
            { headerName: 'Age', field: 'age',  cellStyle: params => {
                if (params.value > 20) {
                    return { backgroundColor: 'green' };
                }
                return { backgroundColor: 'orange' };
            }},
            { headerName: 'Skills', field: 'skillsNeeded' },
        ];
        this.getRowNodeId = (params: any) => {
            return params.id;
        };
        

    }

    ngOnInit() { }

    addUser() {
        this.actionSelected = "add";
        this.selectedRow = undefined;
        $('#exampleModal').modal('show');
    }

    editUser() {
        if (this.gridApi.getSelectedRows().length === 0) {
            return alert("Please select user.")
        }
        this.actionSelected = "edit";
        this.selectedRow = this.gridApi.getSelectedRows()[0];
        $('#exampleModal').modal('show');
    }

    deleteUser() {
        if (this.gridApi.getSelectedRows()[0] === undefined) {
            return alert("Please select user.")
        }
        this.gridApi.applyTransaction({ remove: [this.gridApi.getSelectedRows()[0]] })
        return alert("User deleted successfully.")
    }

    dynamicUser() {
        this.gridApi.applyTransaction({ add: [''] })
        alert("Dynamic row added please edit it inline")
    }

    registredFormData(event) {
        this.formData = event['data'];
        if (event['selected'] === 'edit') {
            for (let i = 0; i < this.rowData.length; i++) {
                if (i === this.rowIndex) {
                    this.rowData.splice(this.rowIndex, 1, this.formData);
                }
            }
            this.gridApi.setRowData(this.rowData);
            this.gridApi.deselectAll();
        } else {
            this.gridApi.applyTransaction({ add: [this.formData] });
            this.rowData.push(this.formData);
        }
    }

    onGridReady(params) {
        this.gridApi = params.api;
        this.gridColumnApi = params.columnApi;
        this.gridApi.sizeColumnsToFit();
        // this.d.listenData().subscribe(res => {
        //     if (res != undefined || res.length != 0) {
        //         if (res['selected'] === "add") {
        //             console.log('entered if')
        //             this.gridApi.applyTransaction({ add: [res['data']] })
        //         } else if (res['selected'] === 'edit') {
        //             console.log("entered else if")
        //             for(let i=0; i< this.rowData.length; i++) {
        //                 if (i === this.rowIndex) {
        //                     this.rowData.splice(this.rowIndex, 1, res['data']);
        //                 }
        //             }
        //             this.gridApi.setRowData(this.rowData);
        //         } else {
        //             this.gridApi.applyTransaction({ remove: [this.gridApi.getSelectedRows()[0]] })
        //         }
        //     }

        // })
    }

    onRowClick(event) {
        this.rowIndex = event.rowIndex;
    }

    openAddModal() {
        $('#exampleModal').modal('show');
    }

    onCellClicked(params) {
        if (
            params.event.target.dataset.action == 'toggle' &&
            params.column.getColId() == 'action'
        ) {
            const cellRendererInstances = params.api.getCellRendererInstances({
                rowNodes: [params.node],
                columns: [params.column],
            });
            if (cellRendererInstances.length > 0) {
                const instance = cellRendererInstances[0];
                instance.togglePopup();
            }
        }
    }

    // Column Definitions: Defines & controls grid columns.
    // colDefs: ColDef[] = [
    //     {
    //         field: "mission",
    //         width: 150,
    //         // checkboxSelection: true,
    //     },
    //     {
    //         field: "company",
    //         width: 130,
    //     },
    //     {
    //         field: "location",
    //         width: 225,
    //     },
    //     {
    //         field: "date",
    //     },
    //     {
    //         field: "price",
    //         width: 130,
    //         cellStyle: params => {
    //             if (params.value > 3630000) {
    //                 return { backgroundColor: 'green' };
    //             }
    //             return { backgroundColor: 'orange' };
    //         }
    //     },
    //     {
    //         field: "Actions",
    //         cellStyle: { overflow: 'visible' },
    //         // editable: true,
    //         colId: 'action',
    //         cellRenderer: ActionButtonsComponent,
    //         maxWidth: 150,
    //         cellEditor: 'agRichSelectCellEditor',
    //     }
    // ];

    // rowData = [
    //     {
    //         "mission": "CRS SpX-25",
    //         "company": "SpaceX",
    //         "location": "LC-39A, Kennedy Space Center, Florida, USA",
    //         "date": "2022-07-15",
    //         "time": "0:44:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 12480000,
    //     },
    //     {
    //         "mission": "LARES 2 & Cubesats",
    //         "company": "ESA",
    //         "location": "ELV-1, Guiana Space Centre, French Guiana, France",
    //         "date": "2022-07-13",
    //         "time": "13:13:00",
    //         "rocket": "Vega C",
    //         "price": 4470000,
    //     },
    //     {
    //         "mission": "Wise One Looks Ahead (NROL-162)",
    //         "company": "Rocket Lab",
    //         "location": "Rocket Lab LC-1A, Māhia Peninsula, New Zealand",
    //         "date": "2022-07-13",
    //         "time": "6:30:00",
    //         "rocket": "Electron/Curie",
    //         "price": 9750000,
    //     },
    //     {
    //         "mission": "TROPICS Flight 1",
    //         "company": "Astra",
    //         "location": "SLC-46, Cape Canaveral SFS, Florida, USA",
    //         "date": "2022-07-12",
    //         "time": "17:43:00",
    //         "rocket": "Rocket 3",
    //         "price": 3670000,
    //     },
    //     {
    //         "mission": "Starlink Group 3-1",
    //         "company": "SpaceX",
    //         "location": "SLC-4E, Vandenberg SFB, California, USA",
    //         "date": "2022-07-11",
    //         "time": "1:39:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 11590000,
    //     },
    //     {
    //         "mission": "Starlink Group 4-21",
    //         "company": "SpaceX",
    //         "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
    //         "date": "2022-07-07",
    //         "time": "13:11:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 2330000,
    //     },
    //     {
    //         "mission": "DS-EO, NeuSAR, SCOOB-I & POEM",
    //         "company": "ISRO",
    //         "location": "Second Launch Pad, Satish Dhawan Space Centre, India",
    //         "date": "2022-06-30",
    //         "time": "12:32:00",
    //         "rocket": "PSLV-CA",
    //         "price": 21050000,
    //     },
    //     {
    //         "mission": "SES-22",
    //         "company": "SpaceX",
    //         "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
    //         "date": "2022-06-29",
    //         "time": "21:04:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 16350000,
    //     },
    //     {
    //         "mission": "CAPSTONE",
    //         "company": "Rocket Lab",
    //         "location": "Rocket Lab LC-1B, Māhia Peninsula, New Zealand",
    //         "date": "2022-06-28",
    //         "time": "9:55:00",
    //         "rocket": "Electron/Photon",
    //         "price": 3630000,
    //     },
    //     {
    //         "mission": "IXPE",
    //         "company": "SpaceX",
    //         "location": "LC-39A, Kennedy Space Center, Florida, USA",
    //         "date": "2021-12-09",
    //         "time": "6:00:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 18290000,
    //     },
    //     {
    //         "mission": "A Data With Destiny",
    //         "company": "Rocket Lab",
    //         "location": "Rocket Lab LC-1A, Māhia Peninsula, New Zealand",
    //         "date": "2021-12-09",
    //         "time": "0:02:00",
    //         "rocket": "Electron/Curie",
    //         "price": 9560000,
    //     },
    //     {
    //         "mission": "Soyuz MS-20 / Space Adventures",
    //         "company": "Roscosmos",
    //         "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
    //         "date": "2021-12-08",
    //         "time": "7:38:00",
    //         "rocket": "Soyuz 2.1a",
    //         "price": 4900000,
    //     },
    //     {
    //         "mission": "Galileo FOC FM23-FM24",
    //         "company": "Arianespace",
    //         "location": "ELS, Guiana Space Centre, French Guiana, France",
    //         "date": "2021-12-05",
    //         "time": "0:19:00",
    //         "rocket": "Soyuz ST-B/Fregat-MT",
    //         "price": 17810000,
    //     },
    //     {
    //         "mission": "Starlink Group 4-3 & BlackSky",
    //         "company": "SpaceX",
    //         "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
    //         "date": "2021-12-02",
    //         "time": "23:12:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 2760000,
    //     },
    //     {
    //         "mission": "Progress M-UM Prichal",
    //         "company": "Roscosmos",
    //         "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
    //         "date": "2021-11-24",
    //         "time": "13:06:00",
    //         "rocket": "Soyuz 2.1b",
    //         "price": 3430000,
    //     },
    //     {
    //         "mission": "DART",
    //         "company": "SpaceX",
    //         "location": "SLC-4E, Vandenberg SFB, California, USA",
    //         "date": "2021-11-24",
    //         "time": "6:21:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 5890000,
    //     },
    //     {
    //         "mission": "STP-27AD2",
    //         "company": "Astra",
    //         "location": "LP-3B, Pacific Spaceport Complex, Kodiak, Alaska, USA",
    //         "date": "2021-11-20",
    //         "time": "6:16:00",
    //         "rocket": "Rocket 3",
    //         "price": 8540000,
    //     },
    //     {
    //         "mission": "Love At First Insight",
    //         "company": "Rocket Lab",
    //         "location": "Rocket Lab LC-1A, Māhia Peninsula, New Zealand",
    //         "date": "2021-11-18",
    //         "time": "1:38:00",
    //         "rocket": "Electron/Curie",
    //         "price": 10550000,
    //     },
    //     {
    //         "mission": "CERES 1, 2 & 3",
    //         "company": "Arianespace",
    //         "location": "ELV-1, Guiana Space Centre, French Guiana, France",
    //         "date": "2021-11-16",
    //         "time": "9:27:00",
    //         "rocket": "Vega",
    //         "price": 1480000,
    //     },
    //     {
    //         "mission": "Starlink Group 4-1",
    //         "company": "SpaceX",
    //         "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
    //         "date": "2021-11-13",
    //         "time": "12:19:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 1790000,
    //     },
    //     {
    //         "mission": "SpaceX Crew-3",
    //         "company": "SpaceX",
    //         "location": "LC-39A, Kennedy Space Center, Florida, USA",
    //         "date": "2021-11-11",
    //         "time": "2:03:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 7360000,
    //     },
    //     {
    //         "mission": "Progress MS-18",
    //         "company": "Roscosmos",
    //         "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
    //         "date": "2021-10-28",
    //         "time": "0:00:00",
    //         "rocket": "Soyuz 2.1a",
    //         "price": 18170000,
    //     },
    //     {
    //         "mission": "SES-17 & Syracuse-4A",
    //         "company": "Arianespace",
    //         "location": "ELA-3, Guiana Space Centre, French Guiana, France",
    //         "date": "2021-10-24",
    //         "time": "2:10:00",
    //         "rocket": "Ariane 5 ECA",
    //         "price": 15460000,
    //     },
    //     {
    //         "mission": "Soyuz MS-19",
    //         "company": "Roscosmos",
    //         "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
    //         "date": "2021-10-05",
    //         "time": "8:55:00",
    //         "rocket": "Soyuz 2.1a",
    //         "price": 22510000,
    //     },
    //     {
    //         "mission": "Inspiration4",
    //         "company": "SpaceX",
    //         "location": "LC-39A, Kennedy Space Center, Florida, USA",
    //         "date": "2021-09-16",
    //         "time": "0:02:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 20220000,
    //     },
    //     {
    //         "mission": "CRS SpX-25",
    //         "company": "SpaceX",
    //         "location": "LC-39A, Kennedy Space Center, Florida, USA",
    //         "date": "2022-07-15",
    //         "time": "0:44:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 12480000,
    //     },
    //     {
    //         "mission": "LARES 2 & Cubesats",
    //         "company": "ESA",
    //         "location": "ELV-1, Guiana Space Centre, French Guiana, France",
    //         "date": "2022-07-13",
    //         "time": "13:13:00",
    //         "rocket": "Vega C",
    //         "price": 4470000,
    //     },
    //     {
    //         "mission": "Wise One Looks Ahead (NROL-162)",
    //         "company": "Rocket Lab",
    //         "location": "Rocket Lab LC-1A, Māhia Peninsula, New Zealand",
    //         "date": "2022-07-13",
    //         "time": "6:30:00",
    //         "rocket": "Electron/Curie",
    //         "price": 9750000,
    //     },
    //     {
    //         "mission": "TROPICS Flight 1",
    //         "company": "Astra",
    //         "location": "SLC-46, Cape Canaveral SFS, Florida, USA",
    //         "date": "2022-07-12",
    //         "time": "17:43:00",
    //         "rocket": "Rocket 3",
    //         "price": 3670000,
    //     },
    //     {
    //         "mission": "Starlink Group 3-1",
    //         "company": "SpaceX",
    //         "location": "SLC-4E, Vandenberg SFB, California, USA",
    //         "date": "2022-07-11",
    //         "time": "1:39:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 11590000,
    //     },
    //     {
    //         "mission": "Starlink Group 4-21",
    //         "company": "SpaceX",
    //         "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
    //         "date": "2022-07-07",
    //         "time": "13:11:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 2330000,
    //     },
    //     {
    //         "mission": "DS-EO, NeuSAR, SCOOB-I & POEM",
    //         "company": "ISRO",
    //         "location": "Second Launch Pad, Satish Dhawan Space Centre, India",
    //         "date": "2022-06-30",
    //         "time": "12:32:00",
    //         "rocket": "PSLV-CA",
    //         "price": 21050000,
    //     },
    //     {
    //         "mission": "SES-22",
    //         "company": "SpaceX",
    //         "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
    //         "date": "2022-06-29",
    //         "time": "21:04:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 16350000,
    //     },
    //     {
    //         "mission": "CAPSTONE",
    //         "company": "Rocket Lab",
    //         "location": "Rocket Lab LC-1B, Māhia Peninsula, New Zealand",
    //         "date": "2022-06-28",
    //         "time": "9:55:00",
    //         "rocket": "Electron/Photon",
    //         "price": 3630000,
    //     },
    //     {
    //         "mission": "IXPE",
    //         "company": "SpaceX",
    //         "location": "LC-39A, Kennedy Space Center, Florida, USA",
    //         "date": "2021-12-09",
    //         "time": "6:00:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 18290000,
    //     },
    //     {
    //         "mission": "A Data With Destiny",
    //         "company": "Rocket Lab",
    //         "location": "Rocket Lab LC-1A, Māhia Peninsula, New Zealand",
    //         "date": "2021-12-09",
    //         "time": "0:02:00",
    //         "rocket": "Electron/Curie",
    //         "price": 9560000,
    //     },
    //     {
    //         "mission": "Soyuz MS-20 / Space Adventures",
    //         "company": "Roscosmos",
    //         "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
    //         "date": "2021-12-08",
    //         "time": "7:38:00",
    //         "rocket": "Soyuz 2.1a",
    //         "price": 4900000,
    //     },
    //     {
    //         "mission": "Galileo FOC FM23-FM24",
    //         "company": "Arianespace",
    //         "location": "ELS, Guiana Space Centre, French Guiana, France",
    //         "date": "2021-12-05",
    //         "time": "0:19:00",
    //         "rocket": "Soyuz ST-B/Fregat-MT",
    //         "price": 17810000,
    //     },
    //     {
    //         "mission": "Starlink Group 4-3 & BlackSky",
    //         "company": "SpaceX",
    //         "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
    //         "date": "2021-12-02",
    //         "time": "23:12:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 2760000,
    //     },
    //     {
    //         "mission": "Progress M-UM Prichal",
    //         "company": "Roscosmos",
    //         "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
    //         "date": "2021-11-24",
    //         "time": "13:06:00",
    //         "rocket": "Soyuz 2.1b",
    //         "price": 3430000,
    //     },
    //     {
    //         "mission": "DART",
    //         "company": "SpaceX",
    //         "location": "SLC-4E, Vandenberg SFB, California, USA",
    //         "date": "2021-11-24",
    //         "time": "6:21:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 5890000,
    //     },
    //     {
    //         "mission": "STP-27AD2",
    //         "company": "Astra",
    //         "location": "LP-3B, Pacific Spaceport Complex, Kodiak, Alaska, USA",
    //         "date": "2021-11-20",
    //         "time": "6:16:00",
    //         "rocket": "Rocket 3",
    //         "price": 8540000,
    //     },
    //     {
    //         "mission": "Love At First Insight",
    //         "company": "Rocket Lab",
    //         "location": "Rocket Lab LC-1A, Māhia Peninsula, New Zealand",
    //         "date": "2021-11-18",
    //         "time": "1:38:00",
    //         "rocket": "Electron/Curie",
    //         "price": 10550000,
    //     },
    //     {
    //         "mission": "CERES 1, 2 & 3",
    //         "company": "Arianespace",
    //         "location": "ELV-1, Guiana Space Centre, French Guiana, France",
    //         "date": "2021-11-16",
    //         "time": "9:27:00",
    //         "rocket": "Vega",
    //         "price": 1480000,
    //     },
    //     {
    //         "mission": "Starlink Group 4-1",
    //         "company": "SpaceX",
    //         "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
    //         "date": "2021-11-13",
    //         "time": "12:19:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 1790000,
    //     },
    //     {
    //         "mission": "SpaceX Crew-3",
    //         "company": "SpaceX",
    //         "location": "LC-39A, Kennedy Space Center, Florida, USA",
    //         "date": "2021-11-11",
    //         "time": "2:03:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 7360000,
    //     },
    //     {
    //         "mission": "Progress MS-18",
    //         "company": "Roscosmos",
    //         "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
    //         "date": "2021-10-28",
    //         "time": "0:00:00",
    //         "rocket": "Soyuz 2.1a",
    //         "price": 18170000,
    //     },
    //     {
    //         "mission": "SES-17 & Syracuse-4A",
    //         "company": "Arianespace",
    //         "location": "ELA-3, Guiana Space Centre, French Guiana, France",
    //         "date": "2021-10-24",
    //         "time": "2:10:00",
    //         "rocket": "Ariane 5 ECA",
    //         "price": 15460000,
    //     },
    //     {
    //         "mission": "Soyuz MS-19",
    //         "company": "Roscosmos",
    //         "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
    //         "date": "2021-10-05",
    //         "time": "8:55:00",
    //         "rocket": "Soyuz 2.1a",
    //         "price": 22510000,
    //     },
    //     {
    //         "mission": "Inspiration4",
    //         "company": "SpaceX",
    //         "location": "LC-39A, Kennedy Space Center, Florida, USA",
    //         "date": "2021-09-16",
    //         "time": "0:02:00",
    //         "rocket": "Falcon 9 Block 5",
    //         "price": 20220000,
    //     },
    // ];

    // colDefs: ColDef[] = [
    //     {
    //         field: "firstName",
    //         width: 150,
    //         // checkboxSelection: true,
    //     },
    //     {
    //         field: "lastName",
    //         width: 130,
    //     },
    //     {
    //         field: "userEmail",
    //         width: 225,
    //     },
    //     {
    //         field: "userPassword",
    //     },
    //     {
    //         field: "skillsNeeded",
    //         width: 130,
    //         cellStyle: params => {
    //             if (params.value > 3630000) {
    //                 return { backgroundColor: 'green' };
    //             }
    //             return { backgroundColor: 'orange' };
    //         }
    //     },
    //     {
    //         field: "Actions",
    //         cellStyle: { overflow: 'visible' },
    //         editable: true,
    //         colId: 'action',
    //         // cellRenderer: ActionButtonsComponent,
    //         cellRenderer: ActionButtonsComponent,
    //         maxWidth: 150,
    //         // cellEditor: 'agRichSelectCellEditor',
    //     },
    //     // {
    //     //     field: "Actions",
    //     //     cellStyle: { overflow: 'visible' },
    //     //     editable: true,
    //     //     colId: 'action',
    //     //     // cellRenderer: ActionButtonsComponent,
    //     //     cellRenderer: ActionButtonsComponent,
    //     //     cellRendererParams: {
    //     //         onClick: this.openAddModal.bind(this),
    //     //         label: "Add",

    //     //     },
    //     //     maxWidth: 150,
    //     //     // cellEditor: 'agRichSelectCellEditor',
    //     // },
    //     // {
    //     //     field: "Actions",
    //     //     cellStyle: { overflow: 'visible' },
    //     //     editable: true,
    //     //     colId: 'action',
    //     //     // cellRenderer: ActionButtonsComponent,
    //     //     cellRenderer: ActionButtonsComponent,
    //     //     cellRendererParams: {
    //     //         onClick: this.editUser.bind(this),
    //     //         label: "Edit",
    //     //     },
    //     //     maxWidth: 150,
    //     //     // cellEditor: 'agRichSelectCellEditor',
    //     // },
    //     // {
    //     //     field: "Actions",
    //     //     cellStyle: { overflow: 'visible' },
    //     //     editable: true,
    //     //     colId: 'action',
    //     //     // cellRenderer: ActionButtonsComponent,
    //     //     cellRenderer: ActionButtonsComponent,
    //     //     cellRendererParams: {
    //     //         onClick: this.removeUserData.bind(this),
    //     //         label: "Delete"
    //     //     },
    //     //     maxWidth: 150,
    //     //     // cellEditor: 'agRichSelectCellEditor',
    //     // }
    // ];

    // ------------------ FOR GROUPING DATA IN ROW -------------------------

    // rowData = [
    //     {
    //         "athlete": "Michael Phelps",
    //         "age": 23,
    //         "country": "United States",
    //         "year": 2008,
    //         "date": "24/08/2008",
    //         "sport": "Swimming",
    //         "gold": 8,
    //         "silver": 0,
    //         "bronze": 0,
    //         "total": 8
    //     },
    //     {
    //         "athlete": "Michael Phelps",
    //         "age": 19,
    //         "country": "United States",
    //         "year": 2004,
    //         "date": "29/08/2004",
    //         "sport": "Swimming",
    //         "gold": 6,
    //         "silver": 0,
    //         "bronze": 2,
    //         "total": 8
    //     },
    //     {
    //         "athlete": "Michael Phelps",
    //         "age": 27,
    //         "country": "United States",
    //         "year": 2012,
    //         "date": "12/08/2012",
    //         "sport": "Swimming",
    //         "gold": 4,
    //         "silver": 2,
    //         "bronze": 0,
    //         "total": 6
    //     },
    //     {
    //         "athlete": "Natalie Coughlin",
    //         "age": 25,
    //         "country": "United States",
    //         "year": 2008,
    //         "date": "24/08/2008",
    //         "sport": "Swimming",
    //         "gold": 1,
    //         "silver": 2,
    //         "bronze": 3,
    //         "total": 6
    //     },
    //     {
    //         "athlete": "Aleksey Nemov",
    //         "age": 24,
    //         "country": "Russia",
    //         "year": 2000,
    //         "date": "01/10/2000",
    //         "sport": "Gymnastics",
    //         "gold": 2,
    //         "silver": 1,
    //         "bronze": 3,
    //         "total": 6
    //     },
    //     {
    //         "athlete": "Alicia Coutts",
    //         "age": 24,
    //         "country": "Australia",
    //         "year": 2012,
    //         "date": "12/08/2012",
    //         "sport": "Swimming",
    //         "gold": 1,
    //         "silver": 3,
    //         "bronze": 1,
    //         "total": 5
    //     },
    //     {
    //         "athlete": "Missy Franklin",
    //         "age": 17,
    //         "country": "United States",
    //         "year": 2012,
    //         "date": "12/08/2012",
    //         "sport": "Swimming",
    //         "gold": 4,
    //         "silver": 0,
    //         "bronze": 1,
    //         "total": 5
    //     },
    //     {
    //         "athlete": "Ryan Lochte",
    //         "age": 27,
    //         "country": "United States",
    //         "year": 2012,
    //         "date": "12/08/2012",
    //         "sport": "Swimming",
    //         "gold": 2,
    //         "silver": 2,
    //         "bronze": 1,
    //         "total": 5
    //     },
    //     {
    //         "athlete": "Allison Schmitt",
    //         "age": 22,
    //         "country": "United States",
    //         "year": 2012,
    //         "date": "12/08/2012",
    //         "sport": "Swimming",
    //         "gold": 3,
    //         "silver": 1,
    //         "bronze": 1,
    //         "total": 5
    //     },
    //     {
    //         "athlete": "Natalie Coughlin",
    //         "age": 21,
    //         "country": "United States",
    //         "year": 2004,
    //         "date": "29/08/2004",
    //         "sport": "Swimming",
    //         "gold": 2,
    //         "silver": 2,
    //         "bronze": 1,
    //         "total": 5
    //     },
    //     {
    //         "athlete": "Ian Thorpe",
    //         "age": 17,
    //         "country": "Australia",
    //         "year": 2000,
    //         "date": "01/10/2000",
    //         "sport": "Swimming",
    //         "gold": 3,
    //         "silver": 2,
    //         "bronze": 0,
    //         "total": 5
    //     },
    //     {
    //         "athlete": "Dara Torres",
    //         "age": 33,
    //         "country": "United States",
    //         "year": 2000,
    //         "date": "01/10/2000",
    //         "sport": "Swimming",
    //         "gold": 2,
    //         "silver": 0,
    //         "bronze": 3,
    //         "total": 5
    //     },
    //     {
    //         "athlete": "Cindy Klassen",
    //         "age": 26,
    //         "country": "Canada",
    //         "year": 2006,
    //         "date": "26/02/2006",
    //         "sport": "Speed Skating",
    //         "gold": 1,
    //         "silver": 2,
    //         "bronze": 2,
    //         "total": 5
    //     },
    //     {
    //         "athlete": "Nastia Liukin",
    //         "age": 18,
    //         "country": "United States",
    //         "year": 2008,
    //         "date": "24/08/2008",
    //         "sport": "Gymnastics",
    //         "gold": 1,
    //         "silver": 3,
    //         "bronze": 1,
    //         "total": 5
    //     },
    //     {
    //         "athlete": "Marit Bjørgen",
    //         "age": 29,
    //         "country": "Norway",
    //         "year": 2010,
    //         "date": "28/02/2010",
    //         "sport": "Cross Country Skiing",
    //         "gold": 3,
    //         "silver": 1,
    //         "bronze": 1,
    //         "total": 5
    //     },
    //     {
    //         "athlete": "Sun Yang",
    //         "age": 20,
    //         "country": "China",
    //         "year": 2012,
    //         "date": "12/08/2012",
    //         "sport": "Swimming",
    //         "gold": 2,
    //         "silver": 1,
    //         "bronze": 1,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Kirsty Coventry",
    //         "age": 24,
    //         "country": "Zimbabwe",
    //         "year": 2008,
    //         "date": "24/08/2008",
    //         "sport": "Swimming",
    //         "gold": 1,
    //         "silver": 3,
    //         "bronze": 0,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Libby Lenton-Trickett",
    //         "age": 23,
    //         "country": "Australia",
    //         "year": 2008,
    //         "date": "24/08/2008",
    //         "sport": "Swimming",
    //         "gold": 2,
    //         "silver": 1,
    //         "bronze": 1,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Ryan Lochte",
    //         "age": 24,
    //         "country": "United States",
    //         "year": 2008,
    //         "date": "24/08/2008",
    //         "sport": "Swimming",
    //         "gold": 2,
    //         "silver": 0,
    //         "bronze": 2,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Inge de Bruijn",
    //         "age": 30,
    //         "country": "Netherlands",
    //         "year": 2004,
    //         "date": "29/08/2004",
    //         "sport": "Swimming",
    //         "gold": 1,
    //         "silver": 1,
    //         "bronze": 2,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Petria Thomas",
    //         "age": 28,
    //         "country": "Australia",
    //         "year": 2004,
    //         "date": "29/08/2004",
    //         "sport": "Swimming",
    //         "gold": 3,
    //         "silver": 1,
    //         "bronze": 0,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Ian Thorpe",
    //         "age": 21,
    //         "country": "Australia",
    //         "year": 2004,
    //         "date": "29/08/2004",
    //         "sport": "Swimming",
    //         "gold": 2,
    //         "silver": 1,
    //         "bronze": 1,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Inge de Bruijn",
    //         "age": 27,
    //         "country": "Netherlands",
    //         "year": 2000,
    //         "date": "01/10/2000",
    //         "sport": "Swimming",
    //         "gold": 3,
    //         "silver": 1,
    //         "bronze": 0,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Gary Hall Jr.",
    //         "age": 25,
    //         "country": "United States",
    //         "year": 2000,
    //         "date": "01/10/2000",
    //         "sport": "Swimming",
    //         "gold": 2,
    //         "silver": 1,
    //         "bronze": 1,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Michael Klim",
    //         "age": 23,
    //         "country": "Australia",
    //         "year": 2000,
    //         "date": "01/10/2000",
    //         "sport": "Swimming",
    //         "gold": 2,
    //         "silver": 2,
    //         "bronze": 0,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Susie O'Neill",
    //         "age": 27,
    //         "country": "Australia",
    //         "year": 2000,
    //         "date": "01/10/2000",
    //         "sport": "Swimming",
    //         "gold": 1,
    //         "silver": 3,
    //         "bronze": 0,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Jenny Thompson",
    //         "age": 27,
    //         "country": "United States",
    //         "year": 2000,
    //         "date": "01/10/2000",
    //         "sport": "Swimming",
    //         "gold": 3,
    //         "silver": 0,
    //         "bronze": 1,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Pieter van den Hoogenband",
    //         "age": 22,
    //         "country": "Netherlands",
    //         "year": 2000,
    //         "date": "01/10/2000",
    //         "sport": "Swimming",
    //         "gold": 2,
    //         "silver": 0,
    //         "bronze": 2,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "An Hyeon-Su",
    //         "age": 20,
    //         "country": "South Korea",
    //         "year": 2006,
    //         "date": "26/02/2006",
    //         "sport": "Short-Track Speed Skating",
    //         "gold": 3,
    //         "silver": 0,
    //         "bronze": 1,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Aliya Mustafina",
    //         "age": 17,
    //         "country": "Russia",
    //         "year": 2012,
    //         "date": "12/08/2012",
    //         "sport": "Gymnastics",
    //         "gold": 1,
    //         "silver": 1,
    //         "bronze": 2,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Shawn Johnson",
    //         "age": 16,
    //         "country": "United States",
    //         "year": 2008,
    //         "date": "24/08/2008",
    //         "sport": "Gymnastics",
    //         "gold": 1,
    //         "silver": 3,
    //         "bronze": 0,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Dmitry Sautin",
    //         "age": 26,
    //         "country": "Russia",
    //         "year": 2000,
    //         "date": "01/10/2000",
    //         "sport": "Diving",
    //         "gold": 1,
    //         "silver": 1,
    //         "bronze": 2,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Leontien Zijlaard-van Moorsel",
    //         "age": 30,
    //         "country": "Netherlands",
    //         "year": 2000,
    //         "date": "01/10/2000",
    //         "sport": "Cycling",
    //         "gold": 3,
    //         "silver": 1,
    //         "bronze": 0,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Petter Northug Jr.",
    //         "age": 24,
    //         "country": "Norway",
    //         "year": 2010,
    //         "date": "28/02/2010",
    //         "sport": "Cross Country Skiing",
    //         "gold": 2,
    //         "silver": 1,
    //         "bronze": 1,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Ole Einar Bjørndalen",
    //         "age": 28,
    //         "country": "Norway",
    //         "year": 2002,
    //         "date": "24/02/2002",
    //         "sport": "Biathlon",
    //         "gold": 4,
    //         "silver": 0,
    //         "bronze": 0,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Janica Kostelic",
    //         "age": 20,
    //         "country": "Croatia",
    //         "year": 2002,
    //         "date": "24/02/2002",
    //         "sport": "Alpine Skiing",
    //         "gold": 3,
    //         "silver": 1,
    //         "bronze": 0,
    //         "total": 4
    //     },
    //     {
    //         "athlete": "Nathan Adrian",
    //         "age": 23,
    //         "country": "United States",
    //         "year": 2012,
    //         "date": "12/08/2012",
    //         "sport": "Swimming",
    //         "gold": 2,
    //         "silver": 1,
    //         "bronze": 0,
    //         "total": 3
    //     },
    //     {
    //         "athlete": "Yannick Agnel",
    //         "age": 20,
    //         "country": "France",
    //         "year": 2012,
    //         "date": "12/08/2012",
    //         "sport": "Swimming",
    //         "gold": 2,
    //         "silver": 1,
    //         "bronze": 0,
    //         "total": 3
    //     },
    //     {
    //         "athlete": "Brittany Elmslie",
    //         "age": 18,
    //         "country": "Australia",
    //         "year": 2012,
    //         "date": "12/08/2012",
    //         "sport": "Swimming",
    //         "gold": 1,
    //         "silver": 2,
    //         "bronze": 0,
    //         "total": 3
    //     },
    //     {
    //         "athlete": "Matt Grevers",
    //         "age": 27,
    //         "country": "United States",
    //         "year": 2012,
    //         "date": "12/08/2012",
    //         "sport": "Swimming",
    //         "gold": 2,
    //         "silver": 1,
    //         "bronze": 0,
    //         "total": 3
    //     },
    //     {
    //         "athlete": "Ryosuke Irie",
    //         "age": 22,
    //         "country": "Japan",
    //         "year": 2012,
    //         "date": "12/08/2012",
    //         "sport": "Swimming",
    //         "gold": 0,
    //         "silver": 2,
    //         "bronze": 1,
    //         "total": 3
    //     },
    //     {
    //         "athlete": "Cullen Jones",
    //         "age": 28,
    //         "country": "United States",
    //         "year": 2012,
    //         "date": "12/08/2012",
    //         "sport": "Swimming",
    //         "gold": 1,
    //         "silver": 2,
    //         "bronze": 0,
    //         "total": 3
    //     },
    // ]

    // colDefs: ColDef[] = [
    //     { 
    //         field: 'country', 
    //         // rowGroup: true, 
    //         // hide: true 
    //     },
    //     { 
    //         field: 'year', 
    //         // rowGroup: true, 
    //         // hide: true 
    //     },
    //     { 
    //         field: 'athlete' 
    //     },
    //     { 
    //         field: 'sport' 
    //     },
    //     { 
    //         field: 'gold' 
    //     },
    //     { 
    //         field: 'silver' 
    //     },
    //     { 
    //         field: 'bronze' 
    //     },
    // ]

}
