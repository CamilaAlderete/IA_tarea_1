import {actualizarCuadricula, copiarSudoku, calcularSalto, printRegion, toString, actualizarFila,
        actualizarColumna, removeAll, actualizarRegion, copiarMatrizValoresRestantes,
    inicializalizarMRV, inicializarMatrizVR, writeFile} from "./funciones.js";


export default function resolverPorBacktracking(cuadricula){

    let matrizValoresRestantes = inicializarMatrizVR(cuadricula);
    inicializalizarMRV(cuadricula, matrizValoresRestantes);

    //Tiempo de inicio
    let start = new Date().getTime();

    let sudokuStr = 'Entrada: \n'+toString(cuadricula);

    if( resolverSudoku( cuadricula, matrizValoresRestantes) ){

        console.log('Sudoku resuelto por Backtracking, mirar el archivo resultadoBacktracking.txt');
        sudokuStr = sudokuStr + 'Salida: \n'+toString(cuadricula);
        writeFile(sudokuStr, 'resultadoBacktracking');

    }else{
        console.log('No pudo resolverse')
    }


    //Tiempo de finalizacion
    let end = new Date().getTime();
    let time = end - start;
    console.log('Tiempo de ejecucion: ' + time+' ms');

}

function asignarValor(cuadricula, matrizValoresRestantes, fila, col, valor){

    cuadricula[fila][col] = valor;
    actualizarCuadricula(cuadricula,matrizValoresRestantes,fila,col);
    return resolverSudoku(cuadricula, matrizValoresRestantes);

}


function getCasilla( cuadricula, matrizValoresRestantes ){

    /*
        Busca casillas libres
    */


    for(let i=0; i< cuadricula.length; i++){
        for(let j=0; j< cuadricula.length; j++) {

            if (cuadricula[i][j] === 0) {
                return { valoresRestantes: Array.from( matrizValoresRestantes[i][j]), fila: i, col: j, sudokuResuelto: false};
            }

        }

    }


    return { valoresRestantes: [], fila: undefined, col: undefined, sudokuResuelto: true};

}


function resolverSudoku(cuadricula, matrizValoresRestantes){
    /*
        Resulve el sudoku recursivamente

    */

    let casilla = getCasilla(cuadricula, matrizValoresRestantes);

    let fila = casilla.fila;
    let col = casilla.col;
    let valoresRestantes = casilla.valoresRestantes;
    let sudokuResuelto = casilla.sudokuResuelto;

    //resuelto
    if(sudokuResuelto){ return true }

    //sin valores restantes para asignar y todavia no esta resuelto
    if( valoresRestantes.length === 0 ){ return false}

    for (const valor of valoresRestantes) {

        /*
            Para asignar valor a una celda, se envia una copia de la matriz con valores disponibles ya que en caso de que el dfs deba retroceder
            es dificil restaurar la matriz con los valores restantes a su estado anterior. (Emulacion de paso de matriz por valor)
        */

        if ( asignarValor(cuadricula, copiarMatrizValoresRestantes(matrizValoresRestantes), fila, col, valor) ){
            return true;
        }

        cuadricula[fila][col] = 0;

    }

    return false;

}
