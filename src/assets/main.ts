//https://sudokuspoiler.com/sudoku/sudoku9
//https://sudoku.com/es/evil/


import * as backtracking from "./backtracking"
import * as lasVegas from "./lasVegas"
import * as heuristica from "./heuristica"

import * as funciones from "./funciones";

import {sudokus_25x25} from './sudokus_25x25';
import {sudokus_9x9} from './sudokus_9x9';



var nodosExpandidos = 0;

main();


export function main() {


    let cuadricula = funciones.copiarSudoku(sudokus_9x9[0]);
    //let cuadricula = copiarSudoku(sudokus_16x16[0]);
    //let cuadricula = funciones.copiarSudoku(sudokus_16x16_medium[0]);
     // let cuadricula = funciones.copiarSudoku(sudokus_25x25[0]);


    //return heuristica.resolverPorHeuristica(cuadricula);
    //lasVegas.resolverPorLasVegas(cuadricula);
    //backtracking.resolverPorBacktracking(cuadricula);

  let a = heuristica.resolver(cuadricula);

  //console.log()

}









/*


//dificultad experto cuadricula2_3x3
    let cuadricula2_3x3 = [
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

    //dificultad media cuadricula1_3x3
    let cuadricula1_3x3 = [
        [0, 0, 0,   0, 8, 3,    1, 4, 9],
        [9, 0, 0,   0, 0, 5,    8, 0, 2],
        [0, 0, 0,   1, 9, 6,    0, 5, 0],

        [0, 0, 8,   3, 5, 0,    0, 0, 7],
        [0, 0, 0,   0, 0, 2,    3, 0, 5],
        [0, 0, 0,   8, 6, 7,    0, 0, 0],

        [0, 7, 0,   0, 0, 8,    0, 0, 1],
        [0, 8, 4,   7, 0, 0,    0, 2, 0],
        [2, 0, 3,   6, 0, 4,    9, 7, 8]
    ]

    //demoniaco cuadricula3_3x3
    let cuadricula3_3x3 = [
        [0, 0, 0,   0, 0, 3,    0, 0, 0],
        [0, 0, 1,   0, 0, 0,    2, 0, 0],
        [7, 0, 0,   6, 0, 9,    0, 0, 1],

        [0, 0, 0,   0, 3, 0,    0, 0, 6],
        [0, 9, 0,   5, 0, 6,    4, 0, 0],
        [5, 0, 0,   0, 2, 0,    0, 0, 0],

        [0, 0, 0,   0, 5, 0,    0, 0, 0],
        [9, 0, 0,   7, 0, 1,    0, 0, 2],
        [0, 4, 0,   0, 0, 0,    0, 8, 0]
    ]

*/



