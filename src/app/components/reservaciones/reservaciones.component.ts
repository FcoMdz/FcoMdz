import { EmptyExpr } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { Auth, getAuth } from '@angular/fire/auth';
import { CasasService } from 'src/app/services/casas.service';
import { LocalStorageService, casasData } from 'src/app/services/local-storage.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-reservaciones',
  templateUrl: './reservaciones.component.html',
  styleUrls: ['./reservaciones.component.css']
})
export class ReservacionesComponent implements OnInit{
  data!:any;
  informacion!:any;
  auth:Auth = getAuth();
  constructor(private casasService:CasasService){
  }

  async ngOnInit() {
    if(this.auth.currentUser){
      let modal = Swal;
      modal.fire({
        title: 'Cargando',
        html: 'Se estan cargando las reservaciones',
        didOpen: ()=>{
          Swal.showLoading();
        },
        allowOutsideClick: false
      });
      await this.casasService.consultaApartadosCasas().then((data)=>{
        this.data = data;
        modal.close();
      });
    }

  }



  verificarDatos():boolean{
    if(this.data == null){
      return false;
    }
    return true;
  }
}
