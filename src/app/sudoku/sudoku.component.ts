import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';


import * as heuristica from '../../assets/heuristica';
import * as backtracking from '../../assets/backtracking';
import * as lasVegas from '../../assets/lasVegas';
//import * as sudokus_9x9_easy from '../../assets/sudokus_9x9_easy';
import * as funciones from '../../assets/funciones';
import {sudokus_9x9_easy} from '../../assets/sudokus_9x9_easy';
import {sudokus_9x9_medium} from '../../assets/sudokus_9x9_medium';
import {sudokus_9x9_difficult} from '../../assets/sudokus_9x9_difficult';
import {sudokus_16x16_easy} from '../../assets/sudokus_16x16_easy';
import {sudokus_16x16_medium} from '../../assets/sudokus_16x16_medium';
import {sudokus_25x25} from '../../assets/sudokus_25x25';


@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {

  /*

    Observación: desde 16x16 el backtracking se vuelve demasiado lento, y para el 25x25 heuristica ya es demasiado lento y
    consume muchos recursos.

   */

  oculto = false;
  dimension = '9x9'; algoritmo = 'Backtracking'; dificultad= 'Facil';
  dimensiones = [ '9x9', '16x16', '25x25'];
  algoritmos = ['Backtracking', 'Las Vegas', 'Heurística'];
  displayedColumns = ['tamaño', 'algoritmo', 'tiempo', 'nodos'];
  dificultades = ['Facil', 'Medio', 'Dificil'];
  resultados = new MatTableDataSource<any>();

  cadena:any = '';

  cuadricula: any[][] = [
    [0, 0, 0,   0, 0, 2,    0, 8, 0],
    [0, 0, 9,   0, 7, 0,    0, 0, 4],
    [0, 2, 0,   5, 0, 9,    0, 0, 0],

    [0, 0, 0,   0, 0, 0,    0, 4, 0],
    [0, 6, 5,   3, 0, 8,    0, 0, 0],
    [0, 0, 0,   9, 0, 0,    6, 0, 1],

    [0, 0, 0,   1, 0, 0,    0, 0, 5],
    [5, 0, 0,   0, 0, 0,    2, 0, 0],
    [0, 9, 7,   8, 0, 0,    0, 0, 0]
  ]

  sudokuStr: any = [];


  constructor() {}

  ngOnInit(): void {
    this.toString();

  }



  getDificultad(){

    if(this.dimension === '9x9'){
      this.oculto = false;
      this.dificultades = ['Facil', 'Medio', 'Dificil'];
    }else if(this.dimension === '16x16'){
      this.oculto = false;
      this.dificultades = ['Facil', 'Medio']
    }else {
      this.oculto = true;
      this.dificultades = ['Facil'];
      this.dificultad = 'Facil';
    }


  }

  toString(){

    let array = [];
    let output = '';
    let str = '';

    for(let i=0; i< this.cuadricula.length; i++){

      let row = '';
      for(let j=0; j< this.cuadricula.length; j++) {

        let str = this.cuadricula[i][j].toString();
        if (str.length === 1) {
          str = '    ' + str;
        }else{
          str = '   ' + str;
        }

        row = row + str;

      }

      row = row + '\n';
      array.push(row);

    }

    this.sudokuStr = array;


  }

  click(){

    if(this.dificultad !== '' && this.dimension !== '') {

      if (this.algoritmo === 'Backtracking') {
        this.resolverPorBacktracking();
      } else if (this.algoritmo === 'Las Vegas') {
        this.resolverPorLasVegas();
      } else if (this.algoritmo === 'Heurística') {
        this.resolverPorHeuristica();
      }

      console.log('espera?');

    }

  }

  async resolverPorHeuristica(){
    heuristica.resolver(this.cuadricula).then( (data:any) => {
      this.cuadricula = data.cuadricula;
      this.toString();
      let dim = this.cuadricula.length;
      let resultado = { tamanho: dim+'x'+dim, algoritmo:'Heurística', tiempo:data.tiempo, nodos:data.nodos}
      this.resultados.data.push(resultado);
      this.resultados.data = this.resultados.data;

    });

  }

  async resolverPorBacktracking(){
    backtracking.resolver(this.cuadricula).then( (data:any) => {
      this.cuadricula = data.cuadricula;
      this.toString();
      let dim = this.cuadricula.length;
      let resultado = { tamanho: dim+'x'+dim, algoritmo:'Backtracking', tiempo:data.tiempo, nodos:data.nodos}
      this.resultados.data.push(resultado);
      this.resultados.data = this.resultados.data;

      console.log(this.resultados);

    });
  }

  async resolverPorLasVegas(){
    lasVegas.resolver(this.cuadricula).then( (data:any) => {
      this.cuadricula = data.cuadricula;
      this.toString();
      let dim = this.cuadricula.length;
      let resultado = { tamanho: dim+'x'+dim, algoritmo:'Las Vegas', tiempo:data.tiempo, nodos:data.nodos}
      this.resultados.data.push(resultado);
      this.resultados.data = this.resultados.data;

    });
  }

  getSudokuAleatorio(){

    let min = 0;
    if(this.dimension === '9x9'){

      if(this.dificultad === 'Facil'){

        let max = sudokus_9x9_easy.length;
        let posAleatoria: number = Math.floor(Math.random()*(max-min))+min;
        this.cuadricula = funciones.copiarSudoku(sudokus_9x9_easy[posAleatoria]);
        this.toString();

      }/*else if(this.dificultad === 'Medio'){

        let max = sudokus_9x9_medium.length;
        let posAleatoria: number = Math.floor(Math.random()*(max-min))+min;
        this.cuadricula = funciones.copiarSudoku(sudokus_9x9_medium[posAleatoria]);
        this.toString();

      }else if(this.dificultad === 'Dificil'){

        let max = sudokus_9x9_difficult.length;
        let posAleatoria: number = Math.floor(Math.random()*(max-min))+min;
        this.cuadricula = funciones.copiarSudoku(sudokus_9x9_difficult[posAleatoria]);
        this.toString();

      }*/

    }if(this.dimension === '16x16'){

      if(this.dificultad === 'Facil'){

        let max = sudokus_16x16_easy.length;
        let posAleatoria: number = Math.floor(Math.random()*(max-min))+min;
        this.cuadricula = funciones.copiarSudoku(sudokus_16x16_easy[posAleatoria]);

        this.toString();
      }/*else if(this.dificultad === 'Medio') {

        let max = sudokus_16x16_medium.length;
        let posAleatoria: number = Math.floor(Math.random() * (max - min)) + min;
        this.cuadricula = funciones.copiarSudoku(sudokus_16x16_medium[posAleatoria]);
        this.toString();

      }*/
    }if(this.dimension === '25x25'){

        let max = sudokus_25x25.length;
        let posAleatoria: number = Math.floor(Math.random()*(max-min))+min;
        this.cuadricula = funciones.copiarSudoku(sudokus_25x25[posAleatoria]);
        this.toString();

    }

  }





}
