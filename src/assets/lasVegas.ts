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
      console.log('Sudoku resuelto por Las Vegas')
      /*  console.log('Sudoku resuelto por Las Vegas, mirar el archivo resultadoLasVegas.txt');
        sudokuStr = sudokuStr + 'Salida: \n'+toString(cuadricula);
        writeFile(sudokuStr, 'resultadoLasVegas');*/

    }else{
        console.log('No pudo resolverse por Las Vegas')
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
        Resuelve el sudoku asignando valores a casillas aleatorias.

    */

    console.log();


    let casilla = getCasillaAleatoria(cuadricula, matrizValoresRestantes);

    let fila:any = casilla.fila;
    let col:any = casilla.col;
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

        //nodosExpandidos= nodosExpandidos+1;
        //console.log(nodosExpandidos)
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

function generarNumAleatorio(min:any, max:any){

    /*
        Genera numeros aleatorios mayores o iguales a min y menores o iguales a max
    */

    return Math.floor(Math.random()*(max-min+1))+min;

}


function getCasillaAleatoria( cuadricula:number[][], matrizValoresRestantes:any[][] ){

    /*
        Busca casillas libres y entre ellas elige una aleatoria.
    */

    let casillasLibres = [];

    for(let i=0; i< cuadricula.length; i++){
        for(let j=0; j< cuadricula.length; j++) {

            if (cuadricula[i][j] === 0) {
                casillasLibres.push({fila: i, col: j});
            }

        }

    }

    if( casillasLibres.length === 0){
        return { valoresRestantes: [], fila: undefined, col: undefined, sudokuResuelto: true};
    }

    let min = 0;
    let max = casillasLibres.length -1;
    let posAleatoria = generarNumAleatorio(min, max);
    let fila = casillasLibres[posAleatoria].fila;
    let col = casillasLibres[posAleatoria].col;

    return { valoresRestantes: Array.from( matrizValoresRestantes[fila][col] ), fila: fila, col: col, sudokuResuelto: false};

}


