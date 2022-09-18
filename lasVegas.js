import {actualizarCuadricula, copiarSudoku, calcularSalto, printRegion, toString, actualizarFila,
    actualizarColumna, removeAll, actualizarRegion, copiarMatrizValoresRestantes,
    inicializalizarMRV, inicializarMatrizVR, writeFile} from "./funciones.js";



export default function resolverPorLasVegas(cuadricula){


    let matrizValoresRestantes = inicializarMatrizVR(cuadricula);
    inicializalizarMRV(cuadricula, matrizValoresRestantes);

    //Tiempo de inicio
    let start = new Date().getTime();

    let sudokuStr = 'Entrada: \n'+toString(cuadricula);

    if( resolverSudoku( cuadricula, matrizValoresRestantes) ){

        console.log('Sudoku resuelto por Las Vegas, mirar el archivo resultadoLasVegas.txt');
        sudokuStr = sudokuStr + 'Salida: \n'+toString(cuadricula);
        writeFile(sudokuStr, 'resultadoLasVegas');

    }else{
        console.log('No pudo resolverse')
    }


    //Tiempo de finalizacion
    let end = new Date().getTime();
    let time = end - start;
    console.log('Tiempo de ejecucion: ' + time+' ms');

}





function resolverSudoku(cuadricula, matrizValoresRestantes){
    /*
        Resuelve el sudoku asignando valores a casillas aleatorias.

    */

    console.log();


    let casilla = getCasillaAleatoria(cuadricula, matrizValoresRestantes);

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

        //nodosExpandidos= nodosExpandidos+1;
        //console.log(nodosExpandidos)
        if ( asignarValor(cuadricula, copiarMatrizValoresRestantes(matrizValoresRestantes), fila, col, valor) ){
            return true;
        }

        cuadricula[fila][col] = 0;

    }
    // console.log('------------------------------------');
    // console.log(toString(cuadricula));
    // console.log('Valores restantes : '+valoresRestantes);
    // console.log('------------------------------------');
    return false;

}



function asignarValor(cuadricula, matrizValoresRestantes, fila, col, valor){

    cuadricula[fila][col] = valor;
    actualizarCuadricula(cuadricula,matrizValoresRestantes,fila,col);
    return resolverSudoku(cuadricula, matrizValoresRestantes);

}

function generarNumAleatorio(min, max){

    /*
        Genera numeros aleatorios mayores o iguales a min y menores o iguales a max
    */

    return Math.floor(Math.random()*(max-min+1))+min;

}


function getCasillaAleatoria( cuadricula, matrizValoresRestantes ){

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


