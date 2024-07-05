import { Component, Input, OnInit } from '@angular/core';
import { listenerCount } from 'process';
import { Encuesta } from 'src/app/classes/encuesta';
import { EncuestaService } from 'src/app/services/encuesta.service';
import { CanvasJSAngularChartsModule } from '@canvasjs/angular-charts';
import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
} from '@ionic/angular/standalone';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-encuesta-graficos',
  templateUrl: './encuesta-graficos.component.html',
  styleUrls: ['./encuesta-graficos.component.scss'],
  standalone: true,
  imports: [
    IonTitle,
    IonToolbar,
    IonHeader,
    IonContent,
    CanvasJSAngularChartsModule,
    NgIf,
    RouterLink,
  ],
})
export class EncuestaGraficosComponent implements OnInit {
  @Input() configTorta: any = undefined;
  @Input() configBarra: any = undefined;

  lista: any;

  constructor(private es: EncuestaService) {}

  ngOnInit() {
    this.es.traerTodosObservable().subscribe((l) => {
      this.lista = l;
      this.calcularPorcentajes();
    });
  }

  calcularPorcentajes() {
    const distribucionRespuestas = this.lista.reduce(
      (r: any, eActual: any, eIndex: any) => {
        if (!r[eActual.id]) {
          r[eActual.id] = {
            idEncuesta: eActual.id,
            cantPositivas: 0,
            cantNegativas: 0,
          };
        }

        eActual.preguntas.forEach((pregunta: any, pIndex: number) => {
          pregunta.respuestas.forEach((respuesta: any, rIndex: number) => {
            if (respuesta === eActual.respuestas[pIndex]) {
              if (rIndex < 2) {
                // Supongo que las primeras dos respuestas son positivas
                r[eActual.id].cantPositivas += 1;
              } else {
                r[eActual.id].cantNegativas += 1;
              }
            }
          });
        });

        return r;
      },
      {}
    );

    const source: any = Object.values(distribucionRespuestas);

    console.log(source);

    let totalPositivas: number = 0;
    let totalNegativas: number = 0;
    let totalRespuestas: number = 0;

    for (let item of source) {
      totalPositivas += item.cantPositivas;
      totalNegativas += item.cantNegativas;
    }

    totalRespuestas = totalPositivas + totalNegativas;

    let porcentajes: any[] = [
      {
        y: (totalPositivas / totalRespuestas) * 100,
        name: 'EP',
        label: 'Encuestas Positivas',
        color: 'darkgreen',
      },
      {
        y: (totalNegativas / totalRespuestas) * 100,
        name: 'EN',
        label: 'Encuestas Negativas',
        color: '#860106',
      },
    ];

    this.configTorta = this.setConfigTorta(porcentajes);
    this.configBarra = this.setConfigBarra(porcentajes);
  }

  private setConfigTorta(porcentajes: any[]) {
    return {
      animationEnabled: false,
      theme: 'dark2',
      //width: 400,
      //height: 200,
      backgroundColor: '#1e1e1e',
      title: {
        text: 'Resultado de Encuestas',
        fontColor: 'white',
      },
      legend: {
        fontColor: 'white',
      },
      data: [
        {
          //startAngle: 240,
          type: 'pie',
          showInLegend: true,
          legendText: '{label}',
          indexLabel: '{name}:{y}',
          indexLabelPlacement: 'outside',
          indexLabelFontColor: 'white', // Cambia el color de los porcentajes
          yValueFormatString: "#,###.##'%'",
          dataPoints: porcentajes,
        },
      ],
    };
  }
  private setConfigBarra(porcentajes: any[]) {
    return {
      animationEnabled: false,
      theme: 'dark2',
      //width: 400,
      //height: 200,
      backgroundColor: '#1e1e1e',
      title: {
        text: 'Resultado de Encuestas',
        fontColor: 'white',
      },
      legend: {
        fontColor: 'white',
      },
      data: [
        {
          //startAngle: 240,
          type: 'bar',
          showInLegend: false,
          legendText: '{label}',
          indexLabel: '{y}',
          indexLabelPlacement: 'outside',
          indexLabelFontColor: 'white', // Cambia el color de los porcentajes
          yValueFormatString: "#,###.##'%'",
          dataPoints: porcentajes,
        },
      ],
    };
  }
}
