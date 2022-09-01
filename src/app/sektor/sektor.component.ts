import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { SektorDialogComponent } from '../dialog/sektor-dialog/sektor-dialog.component';
import { Sektor } from '../model/sektor.model';
import { SektorService } from '../service/sektor.service';
import { Preduzece } from '../model/preduzece.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-sektor',
  templateUrl: './sektor.component.html',
  styleUrls: ['./sektor.component.css']
})
export class SektorComponent implements OnInit {

  displayedColumns = ['id', 'naziv', 'oznaka','preduzece', 'actions'];

  Preduzece!: Preduzece;

  //dataSource!: Observable<Sektor[]>;
  dataSource!: MatTableDataSource<Sektor>; //iyvor podataka ya nasu tabelu

  selektovanSektor!: Sektor;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public sektorService: SektorService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.sektorService.getAllSektor();
    this.sektorService.getAllSektor().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);

      // pretraga po nazivu stranog kljuca
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'preduzece' ? currentTerm + data.preduzece.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      //sortiranje po nazivu ugnježdenog objekta
      this.dataSource.sortingDataAccessor = (data, property) => {
        switch(property) {
          case 'id': return data[property];

          default: return data.naziv.toLocaleLowerCase();
      }
    };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

  public openDialog(flag: number, id: number, naziv: string, oznaka: string, preduzece: Preduzece) {
    const dialog = this.dialog.open(SektorDialogComponent, {data: {id: id, naziv: naziv, oznaka: oznaka, preduzece: preduzece}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  public selectedRow(row: Sektor): void {
    this.selektovanSektor = row;

  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


}
