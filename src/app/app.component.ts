import { Component } from "@angular/core";
import { ColDef } from "ag-grid-community";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent {
  
  // columnDefs = [{ field: "make" }, { field: "model" }, { field: "price" }];

  // rowData = [
  //   { make: "Toyota", model: "Celica", price: 35000 },
  //   { make: "Ford", model: "Mondeo", price: 32000 },
  //   { make: "Porsche", model: "Boxter", price: 72000 }
  // ];
  paginationPageSize = 20;
  paginationPageSizeSelector: number[] | boolean = [20, 50, 100];
  rowData = [
    {
      "mission": "CRS SpX-25",
      "company": "SpaceX",
      "location": "LC-39A, Kennedy Space Center, Florida, USA",
      "date": "2022-07-15",
      "time": "0:44:00",
      "rocket": "Falcon 9 Block 5",
      "price": 12480000,
    },
    {
      "mission": "LARES 2 & Cubesats",
      "company": "ESA",
      "location": "ELV-1, Guiana Space Centre, French Guiana, France",
      "date": "2022-07-13",
      "time": "13:13:00",
      "rocket": "Vega C",
      "price": 4470000,
    },
    {
      "mission": "Wise One Looks Ahead (NROL-162)",
      "company": "Rocket Lab",
      "location": "Rocket Lab LC-1A, Māhia Peninsula, New Zealand",
      "date": "2022-07-13",
      "time": "6:30:00",
      "rocket": "Electron/Curie",
      "price": 9750000,
    },
    {
      "mission": "TROPICS Flight 1",
      "company": "Astra",
      "location": "SLC-46, Cape Canaveral SFS, Florida, USA",
      "date": "2022-07-12",
      "time": "17:43:00",
      "rocket": "Rocket 3",
      "price": 3670000,
    },
    {
      "mission": "Starlink Group 3-1",
      "company": "SpaceX",
      "location": "SLC-4E, Vandenberg SFB, California, USA",
      "date": "2022-07-11",
      "time": "1:39:00",
      "rocket": "Falcon 9 Block 5",
      "price": 11590000,
    },
    {
      "mission": "Starlink Group 4-21",
      "company": "SpaceX",
      "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
      "date": "2022-07-07",
      "time": "13:11:00",
      "rocket": "Falcon 9 Block 5",
      "price": 2330000,
    },
    {
      "mission": "DS-EO, NeuSAR, SCOOB-I & POEM",
      "company": "ISRO",
      "location": "Second Launch Pad, Satish Dhawan Space Centre, India",
      "date": "2022-06-30",
      "time": "12:32:00",
      "rocket": "PSLV-CA",
      "price": 21050000,
    },
    {
      "mission": "SES-22",
      "company": "SpaceX",
      "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
      "date": "2022-06-29",
      "time": "21:04:00",
      "rocket": "Falcon 9 Block 5",
      "price": 16350000,
    },
    {
      "mission": "CAPSTONE",
      "company": "Rocket Lab",
      "location": "Rocket Lab LC-1B, Māhia Peninsula, New Zealand",
      "date": "2022-06-28",
      "time": "9:55:00",
      "rocket": "Electron/Photon",
      "price": 3630000,
    },
    {
      "mission": "IXPE",
      "company": "SpaceX",
      "location": "LC-39A, Kennedy Space Center, Florida, USA",
      "date": "2021-12-09",
      "time": "6:00:00",
      "rocket": "Falcon 9 Block 5",
      "price": 18290000,
    },
    {
      "mission": "A Data With Destiny",
      "company": "Rocket Lab",
      "location": "Rocket Lab LC-1A, Māhia Peninsula, New Zealand",
      "date": "2021-12-09",
      "time": "0:02:00",
      "rocket": "Electron/Curie",
      "price": 9560000,
    },
    {
      "mission": "Soyuz MS-20 / Space Adventures",
      "company": "Roscosmos",
      "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
      "date": "2021-12-08",
      "time": "7:38:00",
      "rocket": "Soyuz 2.1a",
      "price": 4900000,
    },
    {
      "mission": "Galileo FOC FM23-FM24",
      "company": "Arianespace",
      "location": "ELS, Guiana Space Centre, French Guiana, France",
      "date": "2021-12-05",
      "time": "0:19:00",
      "rocket": "Soyuz ST-B/Fregat-MT",
      "price": 17810000,
    },
    {
      "mission": "Starlink Group 4-3 & BlackSky",
      "company": "SpaceX",
      "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
      "date": "2021-12-02",
      "time": "23:12:00",
      "rocket": "Falcon 9 Block 5",
      "price": 2760000,
    },
    {
      "mission": "Progress M-UM Prichal",
      "company": "Roscosmos",
      "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
      "date": "2021-11-24",
      "time": "13:06:00",
      "rocket": "Soyuz 2.1b",
      "price": 3430000,
    },
    {
      "mission": "DART",
      "company": "SpaceX",
      "location": "SLC-4E, Vandenberg SFB, California, USA",
      "date": "2021-11-24",
      "time": "6:21:00",
      "rocket": "Falcon 9 Block 5",
      "price": 5890000,
    },
    {
      "mission": "STP-27AD2",
      "company": "Astra",
      "location": "LP-3B, Pacific Spaceport Complex, Kodiak, Alaska, USA",
      "date": "2021-11-20",
      "time": "6:16:00",
      "rocket": "Rocket 3",
      "price": 8540000,
    },
    {
      "mission": "Love At First Insight",
      "company": "Rocket Lab",
      "location": "Rocket Lab LC-1A, Māhia Peninsula, New Zealand",
      "date": "2021-11-18",
      "time": "1:38:00",
      "rocket": "Electron/Curie",
      "price": 10550000,
    },
    {
      "mission": "CERES 1, 2 & 3",
      "company": "Arianespace",
      "location": "ELV-1, Guiana Space Centre, French Guiana, France",
      "date": "2021-11-16",
      "time": "9:27:00",
      "rocket": "Vega",
      "price": 1480000,
    },
    {
      "mission": "Starlink Group 4-1",
      "company": "SpaceX",
      "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
      "date": "2021-11-13",
      "time": "12:19:00",
      "rocket": "Falcon 9 Block 5",
      "price": 1790000,
    },
    {
      "mission": "SpaceX Crew-3",
      "company": "SpaceX",
      "location": "LC-39A, Kennedy Space Center, Florida, USA",
      "date": "2021-11-11",
      "time": "2:03:00",
      "rocket": "Falcon 9 Block 5",
      "price": 7360000,
    },
    {
      "mission": "Progress MS-18",
      "company": "Roscosmos",
      "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
      "date": "2021-10-28",
      "time": "0:00:00",
      "rocket": "Soyuz 2.1a",
      "price": 18170000,
    },
    {
      "mission": "SES-17 & Syracuse-4A",
      "company": "Arianespace",
      "location": "ELA-3, Guiana Space Centre, French Guiana, France",
      "date": "2021-10-24",
      "time": "2:10:00",
      "rocket": "Ariane 5 ECA",
      "price": 15460000,
    },
    {
      "mission": "Soyuz MS-19",
      "company": "Roscosmos",
      "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
      "date": "2021-10-05",
      "time": "8:55:00",
      "rocket": "Soyuz 2.1a",
      "price": 22510000,
    },
    {
      "mission": "Inspiration4",
      "company": "SpaceX",
      "location": "LC-39A, Kennedy Space Center, Florida, USA",
      "date": "2021-09-16",
      "time": "0:02:00",
      "rocket": "Falcon 9 Block 5",
      "price": 20220000,
    },
    {
      "mission": "CRS SpX-25",
      "company": "SpaceX",
      "location": "LC-39A, Kennedy Space Center, Florida, USA",
      "date": "2022-07-15",
      "time": "0:44:00",
      "rocket": "Falcon 9 Block 5",
      "price": 12480000,
    },
    {
      "mission": "LARES 2 & Cubesats",
      "company": "ESA",
      "location": "ELV-1, Guiana Space Centre, French Guiana, France",
      "date": "2022-07-13",
      "time": "13:13:00",
      "rocket": "Vega C",
      "price": 4470000,
    },
    {
      "mission": "Wise One Looks Ahead (NROL-162)",
      "company": "Rocket Lab",
      "location": "Rocket Lab LC-1A, Māhia Peninsula, New Zealand",
      "date": "2022-07-13",
      "time": "6:30:00",
      "rocket": "Electron/Curie",
      "price": 9750000,
    },
    {
      "mission": "TROPICS Flight 1",
      "company": "Astra",
      "location": "SLC-46, Cape Canaveral SFS, Florida, USA",
      "date": "2022-07-12",
      "time": "17:43:00",
      "rocket": "Rocket 3",
      "price": 3670000,
    },
    {
      "mission": "Starlink Group 3-1",
      "company": "SpaceX",
      "location": "SLC-4E, Vandenberg SFB, California, USA",
      "date": "2022-07-11",
      "time": "1:39:00",
      "rocket": "Falcon 9 Block 5",
      "price": 11590000,
    },
    {
      "mission": "Starlink Group 4-21",
      "company": "SpaceX",
      "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
      "date": "2022-07-07",
      "time": "13:11:00",
      "rocket": "Falcon 9 Block 5",
      "price": 2330000,
    },
    {
      "mission": "DS-EO, NeuSAR, SCOOB-I & POEM",
      "company": "ISRO",
      "location": "Second Launch Pad, Satish Dhawan Space Centre, India",
      "date": "2022-06-30",
      "time": "12:32:00",
      "rocket": "PSLV-CA",
      "price": 21050000,
    },
    {
      "mission": "SES-22",
      "company": "SpaceX",
      "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
      "date": "2022-06-29",
      "time": "21:04:00",
      "rocket": "Falcon 9 Block 5",
      "price": 16350000,
    },
    {
      "mission": "CAPSTONE",
      "company": "Rocket Lab",
      "location": "Rocket Lab LC-1B, Māhia Peninsula, New Zealand",
      "date": "2022-06-28",
      "time": "9:55:00",
      "rocket": "Electron/Photon",
      "price": 3630000,
    },
    {
      "mission": "IXPE",
      "company": "SpaceX",
      "location": "LC-39A, Kennedy Space Center, Florida, USA",
      "date": "2021-12-09",
      "time": "6:00:00",
      "rocket": "Falcon 9 Block 5",
      "price": 18290000,
    },
    {
      "mission": "A Data With Destiny",
      "company": "Rocket Lab",
      "location": "Rocket Lab LC-1A, Māhia Peninsula, New Zealand",
      "date": "2021-12-09",
      "time": "0:02:00",
      "rocket": "Electron/Curie",
      "price": 9560000,
    },
    {
      "mission": "Soyuz MS-20 / Space Adventures",
      "company": "Roscosmos",
      "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
      "date": "2021-12-08",
      "time": "7:38:00",
      "rocket": "Soyuz 2.1a",
      "price": 4900000,
    },
    {
      "mission": "Galileo FOC FM23-FM24",
      "company": "Arianespace",
      "location": "ELS, Guiana Space Centre, French Guiana, France",
      "date": "2021-12-05",
      "time": "0:19:00",
      "rocket": "Soyuz ST-B/Fregat-MT",
      "price": 17810000,
    },
    {
      "mission": "Starlink Group 4-3 & BlackSky",
      "company": "SpaceX",
      "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
      "date": "2021-12-02",
      "time": "23:12:00",
      "rocket": "Falcon 9 Block 5",
      "price": 2760000,
    },
    {
      "mission": "Progress M-UM Prichal",
      "company": "Roscosmos",
      "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
      "date": "2021-11-24",
      "time": "13:06:00",
      "rocket": "Soyuz 2.1b",
      "price": 3430000,
    },
    {
      "mission": "DART",
      "company": "SpaceX",
      "location": "SLC-4E, Vandenberg SFB, California, USA",
      "date": "2021-11-24",
      "time": "6:21:00",
      "rocket": "Falcon 9 Block 5",
      "price": 5890000,
    },
    {
      "mission": "STP-27AD2",
      "company": "Astra",
      "location": "LP-3B, Pacific Spaceport Complex, Kodiak, Alaska, USA",
      "date": "2021-11-20",
      "time": "6:16:00",
      "rocket": "Rocket 3",
      "price": 8540000,
    },
    {
      "mission": "Love At First Insight",
      "company": "Rocket Lab",
      "location": "Rocket Lab LC-1A, Māhia Peninsula, New Zealand",
      "date": "2021-11-18",
      "time": "1:38:00",
      "rocket": "Electron/Curie",
      "price": 10550000,
    },
    {
      "mission": "CERES 1, 2 & 3",
      "company": "Arianespace",
      "location": "ELV-1, Guiana Space Centre, French Guiana, France",
      "date": "2021-11-16",
      "time": "9:27:00",
      "rocket": "Vega",
      "price": 1480000,
    },
    {
      "mission": "Starlink Group 4-1",
      "company": "SpaceX",
      "location": "SLC-40, Cape Canaveral SFS, Florida, USA",
      "date": "2021-11-13",
      "time": "12:19:00",
      "rocket": "Falcon 9 Block 5",
      "price": 1790000,
    },
    {
      "mission": "SpaceX Crew-3",
      "company": "SpaceX",
      "location": "LC-39A, Kennedy Space Center, Florida, USA",
      "date": "2021-11-11",
      "time": "2:03:00",
      "rocket": "Falcon 9 Block 5",
      "price": 7360000,
    },
    {
      "mission": "Progress MS-18",
      "company": "Roscosmos",
      "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
      "date": "2021-10-28",
      "time": "0:00:00",
      "rocket": "Soyuz 2.1a",
      "price": 18170000,
    },
    {
      "mission": "SES-17 & Syracuse-4A",
      "company": "Arianespace",
      "location": "ELA-3, Guiana Space Centre, French Guiana, France",
      "date": "2021-10-24",
      "time": "2:10:00",
      "rocket": "Ariane 5 ECA",
      "price": 15460000,
    },
    {
      "mission": "Soyuz MS-19",
      "company": "Roscosmos",
      "location": "Site 31/6, Baikonur Cosmodrome, Kazakhstan",
      "date": "2021-10-05",
      "time": "8:55:00",
      "rocket": "Soyuz 2.1a",
      "price": 22510000,
    },
    {
      "mission": "Inspiration4",
      "company": "SpaceX",
      "location": "LC-39A, Kennedy Space Center, Florida, USA",
      "date": "2021-09-16",
      "time": "0:02:00",
      "rocket": "Falcon 9 Block 5",
      "price": 20220000,
    },
  ];

  // Column Definitions: Defines & controls grid columns.
  colDefs: ColDef[] = [
    {
      field: "mission",
      // width: 150,
      checkboxSelection: true,
    },
    {
      field: "company",
      // width: 130,
    },
    {
      field: "location",
      // width: 225,
    },
    {
      field: "date"
    },
    {
      field: "price",
      // width: 130,
      cellStyle: params => {
        if (params.value > 3630000) {
            //mark police cells as red
            return {backgroundColor: 'green'};
        }
        return {backgroundColor: 'orange'};
    }
    }
  ];

  defaultColDef: ColDef = {
    filter: true, // Enable filtering on all columns
    editable: true, // Enable editing on all columns
    // enableSorting: true,
  };

  
}
