import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs/internal/Observable';
import { RadnikDialogComponent } from '../dialog/radnik-dialog/radnik-dialog.component';
import { Radnik } from '../model/radnik.model';
import { RadnikService } from '../service/radnik.service';
import { DatePipe } from '@angular/common';
import { Obrazovanje } from 'src/app/model/obrazovanje.model';
import { Sektor } from '../model/sektor.model';



@Component({
  selector: 'app-radnik',
  templateUrl: './radnik.component.html',
  styleUrls: ['./radnik.component.css']
})
export class RadnikComponent implements OnInit {

  displayedColumns = ['id', 'ime', 'prezime', 'brojLk', 'obrazovanje', 'sektor', 'actions'];

  Obrazovanje!: Obrazovanje;
  Sektor!: Sektor;
  //dataSource!: Observable<Radnik[]>;
  dataSource!: MatTableDataSource<Radnik>;
  selektovanRadnik!: Radnik;

  @ViewChild(MatPaginator)
  paginator!: MatPaginator;

  @ViewChild(MatSort)
  sort!: MatSort;

  constructor(public radnikService: RadnikService,
              public dialog: MatDialog) { }

  ngOnInit(): void {
    this.loadData();
  }

  public loadData(){
    //this.dataSource = this.radnikService.getAllRadnik();
    this.radnikService.getAllRadnik().subscribe( data => {
      this.dataSource = new MatTableDataSource(data);

      // pretraga po nazivu stranog kljuca
      this.dataSource.filterPredicate = (data: any, filter: string) => {
        const accumulator = (currentTerm: string, key: string) => {
          return key === 'sektor' ? currentTerm + data.sektor.naziv : currentTerm + data[key];
        };
        const dataStr = Object.keys(data).reduce(accumulator, '').toLowerCase();
        const transformedFilter = filter.trim().toLowerCase();
        return dataStr.indexOf(transformedFilter) !== -1;
      };

      this.dataSource.sortingDataAccessor = (data:any, property) =>{
        switch(property){
          case 'id': return data[property];
          case 'ime': return data[property];
          case 'prezime': return data[property];
          case 'brojLk': return data[property];
          case 'obrazovanje': return data.Obrazovanje.naziv;
          case 'sektor': return data.sektor.naziv;
          default: return data[property].toLocaleLowerCase();
        }
      };
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
}

  public openDialog(flag: number, id: number, ime: string, prezime: string, brojLk: number, obrazovanje: Obrazovanje, sektor: Sektor) {
    const dialog = this.dialog.open(RadnikDialogComponent, {data: {id: id, ime: ime, prezime: prezime, brojLk: brojLk, obrazovanje: obrazovanje, sektor: sektor}});
    dialog.componentInstance.flag = flag;
    dialog.afterClosed().subscribe(result => {
      if (result === 1) {
        this.loadData();
      }
    })
  }

  public selectedRow(row: Radnik): void {
    this.selektovanRadnik = row;

  }

  applyFilter(filterValue: string) {
    filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }


}
