import { Component, OnInit } from '@angular/core';
import {FormControl} from "@angular/forms";
import { MatTableDataSource } from '@angular/material/table';


import * as heuristica from '../../assets/heuristica';
import * as backtracking from '../../assets/backtracking';
import * as lasVegas from '../../assets/lasVegas';
import * as sudokus_9x9_easy from '../../assets/sudokus_9x9_easy';
import * as funciones from '../../assets/funciones';


@Component({
  selector: 'app-sudoku',
  templateUrl: './sudoku.component.html',
  styleUrls: ['./sudoku.component.css']
})
export class SudokuComponent implements OnInit {


  oculto = false;
  dimension = ''; algoritmo = ''; dificultad= '';
  dimensiones = [ '9x9', '16x16', '25x25', '49x49', '64x64'];
  algoritmos = ['Backtracking', 'Las Vegas', 'Heurística'];
  displayedColumns = ['tamaño', 'algoritmo', 'tiempo', 'nodos'];
  dificultades:any = [];
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

  //click(){
    //lib.prueba();

  //}



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
          str = '     ' + str;
        }else{
          str = '    ' + str;
        }

        row = row + str;

      }

      row = row + '\n';
      array.push(row);

    }

    this.sudokuStr = array;


  }

  click(){
        //this.resolverPorHeuristica();
        //this.resolverPorBacktracking();
        this.resolverPorHeuristica();
  }

  async resolverPorHeuristica(){
    heuristica.resolver(this.cuadricula).then( (data:any) => {
      this.cuadricula = data.cuadricula;
      this.toString();
      let dim = this.cuadricula.length;
      let resultado = { tamanho: dim+'x'+dim, algoritmo:'Heurística', tiempo:data.tiempo, nodos:0}
      this.resultados.data.push(resultado);
      this.resultados.data = this.resultados.data;

    });

  }

  async resolverPorBacktracking(){
    backtracking.resolver(this.cuadricula).then( (data:any) => {
      this.cuadricula = data.cuadricula;
      this.toString();
      let dim = this.cuadricula.length;
      let resultado = { tamanho: dim+'x'+dim, algoritmo:'Backtracking', tiempo:data.tiempo, nodos:0}
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
      let resultado = { tamanho: dim+'x'+dim, algoritmo:'Las Vegas', tiempo:data.tiempo, nodos:0}
      this.resultados.data.push(resultado);
      this.resultados.data = this.resultados.data;

    });
  }

  getSudokuAleatorio(){

    let min = 0;
    if(this.dimension === '9x9'){

      let max = 9;
      let posAleatoria: number = Math.floor(Math.random()*(max-min))+min;

      if(this.dificultad === 'Facil'){
        //this.cuadricula = funciones.copiarSudoku(sudokus_9x9_easy[posAleatoria]);
      }

    }
  }





}
