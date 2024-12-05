import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FireUsuarioService } from 'src/app/services/fire-usuario.service';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {

  usuario = new FormGroup ({
    rut: new FormControl('',[Validators.required, Validators.pattern("[0-9]{7,8}-[0-9k]{1}")]),
    nombre: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]{3,}")]),
    apellido: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]{3,}")]),
    direccion: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z ]{3,}")]),
    fecha_nacimiento: new FormControl('', [Validators.required]),
    genero: new FormControl('', [Validators.required]),
    telefono: new FormControl('', [Validators.required,Validators.pattern("(9)[0-9]{9}")]),
    correo: new FormControl('', [Validators.required, Validators.pattern("[a-zA-Z0-9.]+(@gmail.com)")]),
    contra: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[-!#$%&/()?¡_.])(?=.*[A-Za-z])(?=.*[a-z]).{8,}$")]),
    contraVali: new FormControl('', [Validators.required, Validators.pattern("^(?=.*[-!#$%&/()?¡_.])(?=.*[A-Za-z])(?=.*[a-z]).{8,}$")]),
    tipo_usuario: new FormControl('', [Validators.required]),
    comuna: new FormControl('', [Validators.required]),
    region: new FormControl('', [Validators.required])
});

  constructor(private router: Router, private fireUsuario: FireUsuarioService) { }

  ngOnInit() {
  }

  public async registrar(){
    if( !this.validarEdad18(this.usuario.controls.fecha_nacimiento.value || "") ){
      alert("ERROR! debe tener al menos 18 años para registrarse!");
      return;
    }
    
    if(this.usuario.controls.contra.value != this.usuario.controls.contraVali.value){
      alert("ERROR! las contraseñas no coinciden!");
      return;
    }

    if(await this.fireUsuario.crearUsuario(this.usuario.value)){
      this.router.navigate(['/login']);
      this.usuario.reset();
      alert("Usuario creado con éxito!")
    }
  }

  validarEdad18(fecha_nacimiento: string){
    var edad = 0;
    if(fecha_nacimiento){
      const fecha_date = new Date(fecha_nacimiento);
      const timeDiff = Math.abs(Date.now() - fecha_date.getTime());
      edad = Math.floor((timeDiff / (1000 * 3600 * 24))/365);
    }
    if(edad>=18){
      return true;
    }else{
      return false;
    }
  }

  validarRut():ValidatorFn{
    return () => {
      const rut = this.usuario.controls.rut.value;
      const dv_validar = rut?.replace("-","").split("").splice(-1).reverse()[0];
      let rut_limpio = [];
      if(rut?.length==10){
        rut_limpio = rut?.replace("-","").split("").splice(0,8).reverse();
      }else{
        rut_limpio = rut?.replace("-","").split("").splice(0,7).reverse() || [];
      }
      let factor = 2;
      let total = 0;
      for(let num of rut_limpio){
        total = total + ((+num)*factor);
        factor = factor + 1;
        if(factor==8){
          factor = 2;
        }
      }
      var dv = (11-(total%11)).toString();
      if(+dv>=10){
        dv = "k";
      }
      if(dv_validar!=dv.toString()) return {isValid: false};
      return null;
    };
  }

}
