//https://sudokuspoiler.com/sudoku/sudoku9
//https://sudoku.com/es/evil/
import sudokus_9x9_easy from '../../sudokus y soluciones/sudokus_9x9_easy.js';
import sudokus_16x16_easy from '../../sudokus y soluciones/sudokus_16x16_easy.js';
import sudokus_16x16_medium from "../../sudokus y soluciones/sudokus_16x16_medium.js";
import sudokus_25x25 from "../../sudokus y soluciones/sudokus_25x25.js";

import resolverPorBacktracking from "./backtracking.js"
import resolverPorLasVegas from "./lasVegas.js"
import resolverPorHeuristica from "./heuristica.js"

import {copiarSudoku} from "./funciones.js";



var nodosExpandidos = 0;

main();


function main() {


    //let cuadricula = copiarSudoku(sudokus_9x9_easy[0]);
    let cuadricula = copiarSudoku(sudokus_16x16_easy[1]);
    //let cuadricula = copiarSudoku(sudokus_16x16_medium[0]);
    //let cuadricula = copiarSudoku(sudokus_25x25[0]);

    console.log('holaaa');
    //resolverPorHeuristica(cuadricula);
    //resolverPorLasVegas(cuadricula);
    resolverPorBacktracking(cuadricula);
    console.log()

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



