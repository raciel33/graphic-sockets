import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { WebsocketService } from '../../services/websocket.service';

@Component({
  selector: 'app-graphic',
  templateUrl: './graphic.component.html',
  styleUrls: ['./graphic.component.css']
})
export class GraphicComponent implements OnInit{

  constructor( private http: HttpClient,
    public wsServices: WebsocketService ){

  }
  multi = [
    {
      "name": "Ventas",
      "series": [
        {
          "name": "Enero",
          "value": 0
        },
        {
          "name": "Febrero",
          "value": 0
        },
        {
          "name": "Marzo",
          "value": 0
        },
        {
          "name": "202",
          "value": 0
        }
      ]
    },
  ];

  // options
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  legendTitle: string = 'Years';

  colorScheme = {
    domain: ['#5AA454', '#C7B42C', '#AAAAAA']
  };


  ngOnInit(): void {
    this.getData();
    this.listenSocket();
    this.wsServices.checkStatus();
  }

  getData(){
    //peticion a esta ruta y el resultado se lo aplicamos a los valore de la grafica
    this.http.get('http://localhost:5000/grafica').subscribe ( (data:any) => {
      console.log(data);
      this.multi = data
    })
  }


  listenSocket(){
    console.log( 'socket');

     this.wsServices.listen('cambio-grafica').subscribe((data:any) =>{
      console.log( 'socket'+ data );
      this.multi = data
     })
  }
}
