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
import { Producto } from 'src/app/classes/producto';
import { Swalert } from 'src/app/classes/utils/swalert.class';
import { ProductoService } from 'src/app/services/producto.service';

@Component({
  selector: 'app-formulario-producto',
  templateUrl: './formulario-producto.component.html',
  styleUrls: ['./formulario-producto.component.scss'],
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, NgIf, NgFor],
})
export class FormularioProductoComponent implements OnInit {
  @Input() modoAlta: boolean = false;
  @Input() modoBaja: boolean = false;
  @Input() modoModificar: boolean = false;
  @Input() producto: Producto | undefined = undefined;
  @Output() handlerTerminado: EventEmitter<void> = new EventEmitter<void>();

  formAlta!: FormGroup;
  formModificar!: FormGroup;
  formBaja!: FormGroup;
  procesando: boolean = false;
  fotoUnoBlob: any;
  fotoDosBlob: any;
  fotoTresBlob: any;

  get id() {
    if (this.modoModificar) {
      return this.formModificar.get('id') as FormControl;
    }
    return this.formBaja.get('id') as FormControl;
  }
  get nombre() {
    if (this.modoAlta) {
      return this.formAlta.get('nombre') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('nombre') as FormControl;
    }
    return this.formBaja.get('nombre') as FormControl;
  }
  get descripcion() {
    if (this.modoAlta) {
      return this.formAlta.get('descripcion') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('descripcion') as FormControl;
    }
    return this.formBaja.get('descripcion') as FormControl;
  }
  get tiempo() {
    if (this.modoAlta) {
      return this.formAlta.get('tiempo') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('tiempo') as FormControl;
    }
    return this.formBaja.get('tiempo') as FormControl;
  }
  get precio() {
    if (this.modoAlta) {
      return this.formAlta.get('precio') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('precio') as FormControl;
    }
    return this.formBaja.get('precio') as FormControl;
  }
  get fotoUno() {
    if (this.modoAlta) {
      return this.formAlta.get('fotoUno') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('fotoUno') as FormControl;
    }
    return this.formBaja.get('fotoUno') as FormControl;
  }
  get fotoDos() {
    if (this.modoAlta) {
      return this.formAlta.get('fotoDos') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('fotoDos') as FormControl;
    }
    return this.formBaja.get('fotoDos') as FormControl;
  }
  get fotoTres() {
    if (this.modoAlta) {
      return this.formAlta.get('fotoTres') as FormControl;
    } else if (this.modoModificar) {
      return this.formModificar.get('fotoTres') as FormControl;
    }
    return this.formBaja.get('fotoTres') as FormControl;
  }

  constructor(private productoService: ProductoService) {}

  private crearFormGroup() {
    if (this.modoAlta) {
      this.formAlta = new FormGroup({
        nombre: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', [Validators.required]),
        tiempo: new FormControl(0, [Validators.required, Validators.min(1)]),
        precio: new FormControl(0, [Validators.required, Validators.min(1)]),
        fotoUno: new FormControl(undefined, [Validators.required]),
        fotoDos: new FormControl(undefined, [Validators.required]),
        fotoTres: new FormControl(undefined, [Validators.required]),
      });
    } else if (this.modoModificar) {
      this.formModificar = new FormGroup({
        id: new FormControl(0, []),
        nombre: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', [Validators.required]),
        tiempo: new FormControl(0, [Validators.required, Validators.min(1)]),
        precio: new FormControl(0, [Validators.required, Validators.min(1)]),
        fotoUno: new FormControl(undefined, [Validators.required]),
        fotoDos: new FormControl(undefined, [Validators.required]),
        fotoTres: new FormControl(undefined, [Validators.required]),
      });

      if (this.producto !== undefined) {
        this.id.setValue(this.producto.id);
        this.nombre.setValue(this.producto.nombre);
        this.descripcion.setValue(this.producto.descripcion);
        this.tiempo.setValue(this.producto.tiempo);
        this.precio.setValue(this.producto.precio);
      }
    } else if (this.modoBaja) {
      this.formBaja = new FormGroup({
        id: new FormControl(0, []),
        nombre: new FormControl('', [Validators.required]),
        descripcion: new FormControl('', [Validators.required]),
        tiempo: new FormControl(0, [Validators.required, Validators.min(1)]),
        precio: new FormControl(0, [Validators.required, Validators.min(1)]),
        fotoUno: new FormControl(undefined, [Validators.required]),
        fotoDos: new FormControl(undefined, [Validators.required]),
        fotoTres: new FormControl(undefined, [Validators.required]),
      });

      if (this.producto !== undefined) {
        this.id.setValue(this.producto.id);
        this.nombre.setValue(this.producto.nombre);
        this.descripcion.setValue(this.producto.descripcion);
        this.tiempo.setValue(this.producto.tiempo);
        this.precio.setValue(this.producto.precio);
      }
    }
  }

  private getProducto() {
    let producto = new Producto();
    if ((this.modoModificar || this.modoBaja) && this.producto !== undefined) {
      producto = this.producto;
    }
    if (this.modoModificar || this.modoBaja) {
      producto.setId(this.id.value);
    }
    producto.setNombre(this.nombre.value);
    producto.setDescripcion(this.descripcion.value);
    producto.setTiempo(this.tiempo.value);
    producto.setPrecio(this.precio.value);
    producto.setFileUno(this.fotoUno.value);
    producto.setFileDos(this.fotoDos.value);
    producto.setFileTres(this.fotoTres.value);
    if ((this.modoModificar || this.modoBaja) && this.producto !== undefined) {
      producto.setUrlFotoUno(this.producto.fotoUno);
      producto.setUrlFotoDos(this.producto.fotoDos);
      producto.setUrlFotoTres(this.producto.fotoTres);
    }
    return producto;
  }

  private async alta() {
    const producto = await this.productoService.alta(this.getProducto());
    console.log(producto);
    Swalert.toastSuccess('Alta realizada exitosamente');
  }

  private async modificar() {
    const producto = await this.productoService.modificar(this.getProducto());
    console.log(producto);
    Swalert.toastSuccess('Modificación realizada exitosamente');
  }

  private async baja() {
    const producto = await this.productoService.baja(this.getProducto());
    console.log(producto);
    Swalert.toastSuccess('Baja realizada exitosamente');
  }

  public ngOnInit() {
    this.crearFormGroup();
  }

  public async tomarFoto(foto: 'fotoUno' | 'fotoDos' | 'fotoTres') {
    try {
      const image = await Camera.getPhoto({
        promptLabelHeader: 'Foto del Producto',
        promptLabelPhoto: 'Buscar foto local',
        promptLabelPicture: 'Tomar foto',
        quality: 75,
        allowEditing: false,
        resultType: CameraResultType.Uri,
      });

      if (image.webPath === undefined) {
        throw new Error('No se pudo recuperar la imagen de Camera.getPhoto()');
      }

      const swalertResult = await Swalert.modalCargarFoto();
      if (swalertResult.isConfirmed) {
        const source = await fetch(image.webPath);
        const blob = await source.blob();

        if (foto === 'fotoUno') {
          this.fotoUnoBlob = URL.createObjectURL(blob);
          this.fotoUno.setValue(image.webPath);
        } else if (foto === 'fotoDos') {
          this.fotoDosBlob = URL.createObjectURL(blob);
          this.fotoDos.setValue(image.webPath);
        } else if (foto === 'fotoTres') {
          this.fotoTresBlob = URL.createObjectURL(blob);
          this.fotoTres.setValue(image.webPath);
        }
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
        await this.alta();
      } else if (this.modoModificar) {
        await this.modificar();
      } else if (this.modoBaja) {
        await this.baja();
      } else {
        throw new Error(
          'Es necesario especificar por Input si el formulario es para Alta o Baja o Modificación'
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
    this.nombre.setValue('');
    this.descripcion.setValue('');
    this.tiempo.setValue(0);
    this.precio.setValue(0);
    this.fotoUno.setValue(undefined);
    this.fotoDos.setValue(undefined);
    this.fotoTres.setValue(undefined);
  }
}
