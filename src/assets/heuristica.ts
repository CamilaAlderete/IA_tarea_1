import * as funciones from "./funciones";

var nodos = 0;

export function resolver(cuadricula:number[][]){
  return new Promise((resolve) => {
    resolve(iniciar( funciones.copiarSudoku(cuadricula) ));

  });
}

function iniciar(cuadricula:number[][]){

    let matrizValoresRestantes = funciones.inicializarMatrizVR(cuadricula);
    funciones.inicializalizarMRV(cuadricula, matrizValoresRestantes);
    let resuelto = false;

    //Tiempo de inicio
    let start = new Date().getTime();

    //let sudokuStr = 'Entrada: \n'+toString(cuadricula);

    if( resolverSudoku( cuadricula, matrizValoresRestantes) ){

      resuelto = true;
      console.log('Sudoku resuelto por Heurística')

        /*console.log('Sudoku resuelto por heurística, mirar el archivo resultadoHeuristica.txt');
        sudokuStr = sudokuStr + 'Salida: \n'+toString(cuadricula);
        writeFile(sudokuStr, 'resultadoHeuristica');*/

    }else{
        console.log('No pudo resolverse por Heurística')
    }


    //Tiempo de finalizacion
    let end = new Date().getTime();
    let time = end - start;
    console.log('Tiempo de ejecucion: ' + time+' ms');

    //return {cuadricula: cuadricula, tiempo:time, resuelto: resuelto, nodos: nodos};
    return {cuadricula: cuadricula, tiempo:time, resuelto: resuelto};

}


function resolverSudoku(cuadricula:number[][], matrizValoresRestantes:any[][]){
    /*
        Resuelve el sudoku asignando valores primeramente a las casillas
        menos restringidas.

    */

    let casilla = getCasillaMenosRestringida(cuadricula, matrizValoresRestantes);

    let fila: any = casilla.fila;
    let col: any = casilla.col;
    let valoresRestantes: any[] = casilla.valoresRestantes;
    let sudokuResuelto: boolean = casilla.sudokuResuelto;

    //resuelto
    if(sudokuResuelto){ return true }

    //sin valores restantes para asignar y todavia no esta resuelto
    if( valoresRestantes.length === 0 ){ return false}

    for (const valor of valoresRestantes) {

        /*
            Para asignar valor a una celda, se envia una copia de la matriz con valores disponibles ya que en caso de que el dfs deba retroceder
            es dificil restaurar la matriz con los valores restantes a su estado anterior. (Emulacion de paso de matriz por valor)
        */

        if ( asignarValor(cuadricula, funciones.copiarMatrizValoresRestantes(matrizValoresRestantes), fila, col, valor) ){
            return true;
        }

        cuadricula[fila][col] = 0;

    }

    return false;

}

function asignarValor(cuadricula:number[][], matrizValoresRestantes:any[][], fila:any, col:any, valor:any){

    cuadricula[fila][col] = valor;
    funciones.actualizarCuadricula(cuadricula,matrizValoresRestantes,fila,col);
    return resolverSudoku(cuadricula, matrizValoresRestantes);

}

function getCasillaMenosRestringida( cuadricula:number[][], matrizValoresRestantes:any[][] ){

    let min = matrizValoresRestantes.length;
    let fila = undefined, col=undefined;
    let valoresRestantes = new Set();
    let sudokuResuelto = true;

    for(let i=0; i<matrizValoresRestantes.length; i++ ){
        for(let j=0; j<matrizValoresRestantes.length; j++){

            let cantidad = matrizValoresRestantes[i][j].size;
            if( cantidad!== 0 && cantidad < min){
                fila = i;
                col = j;
                min = cantidad;
                valoresRestantes = matrizValoresRestantes[i][j];
            }

            if(cuadricula[i][j] === 0){
                sudokuResuelto = false;
            }
        }
    }

    return { valoresRestantes: Array.from(valoresRestantes), fila: fila, col: col, sudokuResuelto: sudokuResuelto};

}

