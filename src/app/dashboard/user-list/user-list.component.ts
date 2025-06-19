import { Component, ViewChild, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import * as XLSX from 'xlsx';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { AuthService } from 'src/app/service/auth/auth.service';
import { ToastrService } from 'ngx-toastr';

export interface Usuario {
  id: number;
  nombre: string;
  email: string;
  fechaCreacion?: string;
  fechaUltimoLogin?: string;
}

function formatCustomDate(value: string | Date): string {
  let fecha: Date;
  if (typeof value === 'string') {
    fecha = new Date(value.replace(' ', 'T'));
  } else {
    fecha = new Date(value);
  }
  const yyyy = fecha.getFullYear();
  const m = fecha.getMonth() + 1;
  const d = fecha.getDate();
  let h = fecha.getHours();
  const min = String(fecha.getMinutes()).padStart(2, '0');
  const s = String(fecha.getSeconds()).padStart(2, '0');
  const ampm = h >= 12 ? 'pm' : 'am';
  h = h % 12;
  h = h ? h : 12;
  return `${yyyy}-${m}-${d} ${h}:${min}:${s} ${ampm}`;
}

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
})
export class UserListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  displayedColumns: string[] = ['name', 'email', 'registeredAt', 'lastLogin'];

  dataSource: any[] = [];
  listUser: any[] = [];
  dataUser = new MatTableDataSource<Usuario>();

  constructor(
    private _authService: AuthService,
    private _toastrService: ToastrService
  ) {}

  ngOnInit(): void {
    this._authService.getAllUsers().subscribe({
      next: (data) => {
        console.log('Usuarios Lista: ', data);

        this.dataUser = new MatTableDataSource<Usuario>(
          data.users.map((user: any) => ({
            id: user.id,
            nombre: user.name,
            email: user.email,
            fechaCreacion: user.registered_at,
            fechaUltimoLogin: user.last_login,
          }))
        );
        this.dataSource = this.dataUser.data;
        this.dataUser.paginator = this.paginator;
        this.listUser = this.dataUser.data;
      },
      error: (error) => {
        console.error('Error al obtener los usuarios', error);
      },
    });
  }

  ngAfterViewInit() {
    this.dataUser.sort = this.sort;
  }

  applyFilter(event: Event) {
    const value = (event.target as HTMLInputElement).value.trim().toLowerCase();
    this.dataUser.filter = value;
  }

  exportAsExcel() {
    const exportData = this.dataUser.filteredData.map((user: any) => ({
      nombre: user.nombre,
      email: user.email,
      fechaCreacion: formatCustomDate(user.fechaCreacion),
      fechaUltimoLogin: formatCustomDate(user.fechaUltimoLogin),
    }));
    const ws = XLSX.utils.json_to_sheet(exportData);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Usuarios');

    this._toastrService.success('Excel Exportado Correctamente', 'Sistema', {
      progressBar: true,
      timeOut: 2000,
      progressAnimation: 'decreasing',
    });

    XLSX.writeFile(wb, 'usuarios.xlsx');
  }

  exportAsPDF() {
    const doc = new jsPDF();
    const columns = ['Nombre', 'Email', 'Fecha Registro', 'Último Login'];
    const fields = ['nombre', 'email', 'fechaCreacion', 'fechaUltimoLogin'];

    autoTable(doc, {
      head: [columns],
      body: this.dataUser.filteredData.map((row: any) => [
        row.nombre,
        row.email,
        formatCustomDate(row.fechaCreacion),
        formatCustomDate(row.fechaUltimoLogin),
      ]),
    });

    this._toastrService.success('PDF Exportado Correctamente', 'Sistema', {
      progressBar: true,
      timeOut: 2000,
      progressAnimation: 'decreasing',
    });

    doc.save('UserList.pdf');
  }

  print() {
    window.print();
  }

  copyToClipboard() {
    const textToCopy = this.dataUser.filteredData
      .map(
        (user: any) =>
          `${user.nombre} - ${user.email} - ${formatCustomDate(
            user.fechaCreacion
          )} - ${formatCustomDate(user.fechaUltimoLogin)}`
      )
      .join('\n');
    navigator.clipboard.writeText(textToCopy).then(() => {
      this._toastrService.success('Texto Copiado a Portapapeles', 'Sistema', {
        progressBar: true,
        timeOut: 2000,
        progressAnimation: 'decreasing',
      });
    });
  }
}
