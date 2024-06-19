import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Supervisor } from 'src/app/classes/supervisor';
import { SupervisorService } from 'src/app/services/supervisor.service';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-supervisor',
  templateUrl: './formulario-supervisor.component.html',
  styleUrls: ['./formulario-supervisor.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule],
})
export class FormularioSupervisorComponent implements OnInit {
  formRegistrar!: FormGroup;

  get nombre() {
    return this.formRegistrar.get('nombre') as FormControl;
  }
  get apellido() {
    return this.formRegistrar.get('apellido') as FormControl;
  }
  get dni() {
    return this.formRegistrar.get('dni') as FormControl;
  }
  get cuil() {
    return this.formRegistrar.get('cuil') as FormControl;
  }
  get foto() {
    return this.formRegistrar.get('foto') as FormControl;
  }
  get correo() {
    return this.formRegistrar.get('correo') as FormControl;
  }
  get clave() {
    return this.formRegistrar.get('clave') as FormControl;
  }

  constructor(private supervisorService: SupervisorService) {
    this.crearFormGroup();
  }

  private crearFormGroup() {
    this.formRegistrar = new FormGroup({
      nombre: new FormControl('', [Validators.required]),
      apellido: new FormControl('', [Validators.required]),
      dni: new FormControl(0, [
        Validators.required,
        Validators.min(10000000),
        Validators.max(99999999),
      ]),
      cuil: new FormControl(0, [
        Validators.required,
        Validators.min(10000000000),
        Validators.max(99999999999),
      ]),
      foto: new FormControl(undefined, [Validators.required]),
      correo: new FormControl('', [Validators.required, Validators.email]),
      clave: new FormControl('', [
        Validators.required,
        Validators.min(6),
        Validators.max(30),
      ]),
    });
  }
  private getSupervisor() {
    let supervisor = new Supervisor();
    supervisor.setNombre(this.nombre.value);
    supervisor.setApellido(this.apellido.value);
    supervisor.setDni(this.dni.value);
    supervisor.setCuil(this.cuil.value);
    supervisor.setFile(this.foto.value);
    supervisor.setCorreo(this.correo.value);
    supervisor.setClave(this.clave.value);
    return supervisor;
  }

  public ngOnInit() {
    console.log(''); // Solo para que tire error
  }

  public async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        promptLabelHeader: 'Foto de Supervisor',
        promptLabelPhoto: 'Buscar foto local',
        promptLabelPicture: 'Tomar foto',
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
      });
      if (image.base64String === undefined) {
        throw new Error('No se pudo recuperar la imagen de Camera.getPhoto()');
      }

      const swalertResult = await Swalert.modalCargarFoto();
      if (swalertResult.isConfirmed) {
        this.foto.setValue(image.base64String);
      }
    } catch (e: any) {
      console.log(e.message);
    } finally {
      console.log(this.foto.value);
    }
  }
  public async registrar() {
    try {
      const supervisor = await this.supervisorService.alta(
        this.getSupervisor()
      );
      console.log(supervisor);
      await Swalert.toastSuccess('Registrado exitosamente');
    } catch (e: any) {
      console.log(e.message);
    }
  }
  public limpiar() {
    this.formRegistrar.reset();
    this.nombre.setValue('');
    this.apellido.setValue('');
    this.dni.setValue(0);
    this.cuil.setValue(0);
    this.foto.setValue(undefined);
    this.correo.setValue('');
    this.clave.setValue('');
  }
}
