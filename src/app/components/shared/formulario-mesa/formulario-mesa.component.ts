import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Camera, CameraResultType } from '@capacitor/camera';
import { Mesa } from 'src/app/classes/mesa';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { CapitalizePipe } from 'src/app/pipes/capitalize.pipe';
import { MesaService } from 'src/app/services/mesa.service';

@Component({
  selector: 'app-formulario-mesa',
  templateUrl: './formulario-mesa.component.html',
  styleUrls: ['./formulario-mesa.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor, CapitalizePipe],
})
export class FormularioMesaComponent implements OnInit {
  @Input() modoAlta: boolean = false;
  @Input() modoBaja: boolean = false;
  @Input() modoModificar: boolean = false;
  @Input() mesa: Mesa | undefined = undefined;
  @Output() handlerTerminado: EventEmitter<void> = new EventEmitter<void>();

  formAlta!: FormGroup;
  formModificar!: FormGroup;
  formBaja!: FormGroup;
  tiposMesas: string[] = [];
  procesando: boolean = false;
  fotoBlob: any;

  get id() {
    if (this.modoModificar) {
      return this.formModificar.get('id') as FormControl;
    }
    return this.formBaja.get('id') as FormControl;
  }
  get cantidadClientes() {
    if (this.modoModificar) {
      return this.formModificar.get('cantidadClientes') as FormControl;
    }
    return this.formBaja.get('cantidadClientes') as FormControl;
  }
  get cantidadMaxima() {
    if (this.modoAlta) {
      return this.formAlta.get('cantidadMaxima') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('cantidadMaxima') as FormControl;
    }
    return this.formBaja.get('cantidadMaxima') as FormControl;
  }
  get tipo() {
    if (this.modoAlta) {
      return this.formAlta.get('tipo') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('tipo') as FormControl;
    }
    return this.formBaja.get('tipo') as FormControl;
  }
  get foto() {
    if (this.modoAlta) {
      return this.formAlta.get('foto') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('foto') as FormControl;
    }
    return this.formBaja.get('foto') as FormControl;
  }

  constructor(private mesaService: MesaService) {}

  private crearFormGroup() {
    if (this.modoAlta) {
      this.formAlta = new FormGroup({
        cantidadMaxima: new FormControl(0, [
          Validators.required,
          Validators.min(1),
          Validators.max(8),
        ]),
        tipo: new FormControl('', [Validators.required]),
        foto: new FormControl(undefined, [Validators.required]),
      });
    } else if (this.modoModificar) {
      this.formModificar = new FormGroup({
        id: new FormControl(0, []),
        cantidadClientes: new FormControl(0, [
          Validators.required,
          Validators.min(1),
          Validators.max(8),
        ]),
        cantidadMaxima: new FormControl(0, [
          Validators.required,
          Validators.min(1),
          Validators.max(8),
        ]),
        tipo: new FormControl('', [Validators.required]),
        foto: new FormControl(undefined, [Validators.required]),
      });

      if (this.mesa !== undefined) {
        this.id.setValue(this.mesa.id);
        this.cantidadClientes.setValue(this.mesa.cantidadClientes);
        this.cantidadMaxima.setValue(this.mesa.cantidadMaxima);
        this.tipo.setValue(this.mesa.tipo);
      }
    } else if (this.modoBaja) {
      this.formBaja = new FormGroup({
        id: new FormControl(0, []),
        cantidadClientes: new FormControl(0, [
          Validators.required,
          Validators.min(1),
          Validators.max(8),
        ]),
        cantidadMaxima: new FormControl(0, [
          Validators.required,
          Validators.min(10000000),
          Validators.max(99999999),
        ]),
        tipo: new FormControl('', [Validators.required]),
        foto: new FormControl(undefined, [Validators.required]),
      });

      if (this.mesa !== undefined) {
        this.id.setValue(this.mesa.id);
        this.cantidadMaxima.setValue(this.mesa.cantidadMaxima);
        this.tipo.setValue(this.mesa.tipo);
      }
    }
  }
  private getMesa() {
    let mesa = new Mesa();
    if(this.cantidadMaxima.value && this.tipo.value && this.foto.value){
      if ((this.modoModificar || this.modoBaja) && this.mesa !== undefined) {
        mesa = this.mesa;
      }
      if (this.modoModificar || this.modoBaja) {
        mesa.setId(this.id.value);
      }
      if (this.modoModificar) {
        mesa.setCantidadClientes(this.cantidadClientes.value);
      }
      mesa.setCantidadMaxima(this.cantidadMaxima.value);
      mesa.setTipo(this.tipo.value);
      mesa.setFile(this.foto.value);
      if ((this.modoModificar || this.modoBaja) && this.mesa !== undefined) {
        mesa.setUrlFoto(this.mesa.foto);
      }
      return mesa;
    } else{
      throw new Error("Introduzca bien los datos.")
    }
   
  }
  private async alta() {
    const mesa = await this.mesaService.alta(this.getMesa());
    console.log(mesa);
    Swalert.toastSuccess('Alta realizada exitosamente');
  }
  private async modificar() {
    const mesa = await this.mesaService.modificar(this.getMesa());
    console.log(mesa);
    Swalert.toastSuccess('Modificacion realizada exitosamente');
  }
  private async baja() {
    const mesa = await this.mesaService.baja(this.getMesa());
    console.log(mesa);
    Swalert.toastSuccess('Baja realizada exitosamente');
  }

  public ngOnInit() {
    this.tiposMesas = Mesa.TIPOS;
    this.crearFormGroup();
  }

  public async tomarFoto() {
    try {
      const image = await Camera.getPhoto({
        promptLabelHeader: 'Foto de Mesa',
        promptLabelPhoto: 'Buscar foto local',
        promptLabelPicture: 'Tomar foto',
        quality: 75, // No subir demasiado este valor, relentiza el celular, almenos el mio.
        allowEditing: false,
        resultType: CameraResultType.Uri, // Usar Uri, es lo optimo, para luego hacer fetch al Uri y transformarlo a blob
      });
      if (image.webPath === undefined) {
        throw new Error('No se pudo recuperar la imagen de Camera.getPhoto()');
      }

      const swalertResult = await Swalert.modalCargarFoto();
      if (swalertResult.isConfirmed) {
        const source = await fetch(image.webPath);
        const blob = await source.blob();
        this.fotoBlob = URL.createObjectURL(blob);
        this.foto.setValue(image.webPath);
      }
    } catch (e: any) {
      console.log(e.message);
      Swalert.toastError(e.message);
    }
  }

  public async accion() {
    try {
      this.procesando = true;

      
      if (this.modoAlta) {
        if (this.formAlta.invalid) {
          this.formAlta.markAllAsTouched();
          console.log("invalid form");
          return;
        } else {
          await this.alta();
        }
      } else if (this.modoModificar) {
        if (this.formModificar.invalid) {
          this.formModificar.markAllAsTouched();
          console.log("invalid form");
          return;
        } else{
          await this.modificar();
        }
      } else if (this.modoBaja) {
        await this.baja();
      } else {
        throw new Error(
          'Es necesario especificar por Input si el formulario es para Alta o Baja o Modificacion '
        );
      }

      setTimeout(() => {
        this.handlerTerminado.emit();
      }, 1500);
    } catch (e: any) {
      console.log(e.message);
      Swalert.toastError(e.message);
    } finally {
      this.procesando = false;
    }
  }

  public limpiar() {
    this.formAlta.reset();
    this.cantidadMaxima.setValue(0);
    this.tipo.setValue('');
    this.foto.setValue(undefined);
  }

  isValidField(field: string): boolean | null {
    let control = null;
    if(this.modoAlta){
      control = this.formAlta.get(field);
    } else {
      control = this.formModificar.get(field);
    }

    return control?.errors && control?.touched || null;
  }

  getFieldError(field: string): string | null {
    let control = null;
    if(this.modoAlta){
      control = this.formAlta.get(field);
    } else {
      control = this.formModificar.get(field);
    }

    if (!control || !control.errors) return null;

    const errors = control.errors;
    for (const key of Object.keys(errors)) {
      switch (key) {
        case 'required':
          return "Este campo es requerido";
        case 'minlength':
          return `Minimo ${errors['minlength'].requiredLength} caracteres.`;
        case 'maxlength':
          return `Maximo ${errors['maxlength'].requiredLength} caracteres.`;
        case 'min':
          return `Como minimo debe ser ${errors['min'].min}.`;
        case 'max':
          return `Como maximo debe ser ${errors['max'].max}.`;
        case 'pattern':
          return "Formato inválido";
        case 'email':
          return "Email invalido";
      }
    }
    return null;
  }
}
