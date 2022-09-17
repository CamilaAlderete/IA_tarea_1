//https://sudokuspoiler.com/sudoku/sudoku9
//https://sudoku.com/es/evil/


main();

function main() {

    //dificultad experto
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

    //dificultad media
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

    //demoniaco
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

    //facil
    let cuadricula1_16x16 = [
        [ 0,11, 9, 0,    0,16,13, 4,     0, 0,14, 0,     10, 6,15, 0],
        [ 4,12,15, 0,    3, 6, 0,11,     0, 5, 0, 1,     16, 7,14, 2],
        [ 1, 0, 6, 0,   15, 2, 0, 0,    11, 9,10, 0,      0, 0, 8, 0],
        [ 0,13, 0, 0,    0, 1, 0, 0,     4, 6, 0,15,      0, 0, 0, 0],

        [ 0, 0, 0, 0,    0, 0,15, 0,     8, 1, 5, 3,      0, 4,11, 7],
        [ 6, 0, 1, 0,    0,12, 8, 0,     9, 0, 0, 2,      0, 0, 3, 0],
        [14, 0, 4,13,    6, 0, 0, 3,     0,12, 7,10,      8, 0, 2, 0],
        [ 3, 8, 0, 0,    4, 7, 2, 0,     6, 0, 0, 0,      0,12,16, 5],

        [13, 0, 0,16,    0, 8,14,10,     3, 4,15, 0,     12, 5, 1,11],
        [ 0, 0, 0, 6,    2, 0, 0, 1,    10, 0,11, 0,     15, 3, 0, 9],
        [ 7, 0, 0,12,    0, 4, 0,15,     5, 0, 9,14,      0, 0, 0, 0],
        [10, 0, 0, 8,    0, 0,11, 0,     0, 0, 1,12,      4, 0,13,16],

        [ 0, 0, 0, 0,    0, 0, 7, 0,    15, 2, 0, 0,      0, 0,12, 3],
        [ 0, 0, 7, 0,    0,10, 6, 0,     1, 8, 0,13,     11, 0, 9,14],
        [ 8, 6, 5, 0,    0, 3, 0, 0,    14, 0, 0, 9,      0, 0, 0, 0],
        [ 0,16, 0, 2,    0, 0, 0,14,     0,10, 0, 0,      0, 0, 0, 0],

    ]

    //medio
    let cuadricula = [
        [ 8, 7, 0, 0,    0, 0, 0, 0,     0, 3, 0, 0,     13, 0, 4, 0],
        [ 0, 5,14, 0,    0, 0, 3,10,    15, 9, 1, 0,      0, 6, 0, 0],
        [16, 0, 0, 0,    5, 8, 7, 0,     0,14, 0, 0,      9, 0,11,12],
        [ 0, 0, 4, 0,    0,14, 6,13,     0,11,10,12,      0, 7, 0, 3],

        [14, 0, 0, 8,    0, 0, 1, 0,     0, 0, 0, 3,      7, 4,12, 0],
        [ 9, 0, 0, 0,    0, 6,15,12,     0, 0,13,14,      0, 3, 1, 0],
        [11, 0,10, 3,    0, 0,13, 0,     0, 8, 0, 1,      0, 0, 6, 0],
        [ 6, 0, 0, 1,   14, 0, 4, 0,     0, 5, 0, 9,     11, 0, 0,13],

        [ 0, 0, 0, 0,   15, 0, 0, 0,     0, 0, 9, 0,      5, 0, 2,10],
        [10, 1, 0, 0,    6, 0, 5, 0,    13,15, 7,16,      0, 0, 0, 0],
        [ 0, 0,16,11,    0, 4, 0, 8,     2, 0, 0, 0,      0,13, 0, 7],
        [ 0, 9, 0, 7,    1, 3, 0, 2,     6, 0, 8,10,     16,15,14, 4],

        [ 7, 0,13, 0,    9,16, 0, 5,     0, 0,14, 4,      3, 8, 0, 2],
        [ 0, 0, 3, 0,   10, 0, 0, 0,     0, 0, 0, 0,      0,16,15, 0],
        [ 1, 0, 9, 0,    0, 0,14, 4,     0, 0, 0, 0,      0, 0, 7, 0],
        [ 0, 6, 8, 0,    3, 0, 0, 0,    10, 7, 0, 0,      0, 0, 0, 0],

    ]

    let sudokuStr = 'Entrada: \n'+toString(cuadricula);

    //Tiempo de inicio
    var start = new Date().getTime();

    let matrizValoresRestantes = inicializarMatrizVR(cuadricula);

    inicializalizarMRV(cuadricula, matrizValoresRestantes);

    if( resolverSudoku( cuadricula, matrizValoresRestantes) ){

        console.log('Sudoku resuelto, mirar archivo txt');
        sudokuStr = sudokuStr + 'Salida: \n'+toString(cuadricula);
        writeFile(sudokuStr);

    }else{
        console.log('No pudo resolverse')
    }

    //Tiempo de finalizacion
    var end = new Date().getTime();
    var time = end - start;
    console.log('Tiempo de ejecucion: ' + time+' ms');
}

function toString(cuadricula){

    let output = '';
    let str = '';

    for(let i=0; i< cuadricula.length; i++){

        let row = '';
        for(let j=0; j< cuadricula.length; j++) {

            str = cuadricula[i][j].toString();
            if (str.length === 1) {
                str = '   ' + str;
            }else{
                str = '  ' + str;
            }

            row = row + str;

        }

        output = output + row + '\n';

    }

    return output + '\n';
}

function writeFile(str){

    var fs  = require('fs');

    var writeStream = fs.createWriteStream("resultado.txt");
    writeStream.write(str);
    writeStream.end();
}


function resolverSudoku(cuadricula, matrizValoresRestantes){

    let casilla = getCasillaMenosRestringida(cuadricula, matrizValoresRestantes);

    let fila = casilla.fila;
    let col = casilla.col;
    let valoresRestantes = casilla.valoresRestantes;
    let sudokuResuelto = casilla.sudokuResuelto;

    //resuelto
    if(sudokuResuelto){ return true }

    //sin valores restantes para asignar y todavia no esta resuelto
    if( valoresRestantes.size === 0 ){ return false}

    for (const valor of valoresRestantes) {

        /*
            Para asignar valor a una celda, se envia una copia de la matriz con valores disponibles ya que en caso de que el dfs deba retroceder
            es dificil restaurar la matriz con los valores restantes a su estado anterior. (Emulacion de paso de matriz por valor)
        */

        if ( asignarValor(cuadricula, copiar(matrizValoresRestantes), fila, col, valor) ){
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


function actualizarCuadricula(cuadricula, matrizValoresRestantes, fila, columna){
    /*
      Actualiza los valores restantes de la columna, fila y region a la que la casilla pertenece
   */

    //fila
    actualizarFila(cuadricula, matrizValoresRestantes,fila);
    
    //columna
    actualizarColumna(cuadricula, matrizValoresRestantes, columna);
    
    //region
    actualizarRegion(cuadricula, matrizValoresRestantes, fila, columna);


}


function inicializarMatrizVR(cuadricula){
    /*
        Crea e inicializa la matriz de valores restantes de la cuadricula.
        Al principio todas las celdas vacias tendran disponibles valores desde 1 a n.
    */

    let matrizValoresRestantes = [];
    for( let i=0; i< cuadricula.length; i++){ matrizValoresRestantes.push(i+1) }

    //crea una matriz de conjuntos
    return new Array(cuadricula.length)
        .fill(null).map(()=> (
            new Array(cuadricula.length).fill(null).map(()=> ( new Set(matrizValoresRestantes) ))
        ));

}


function printRegion(cuadricula, fila, columna){

    /*
        Imprime la region en el que se encuentra la casilla con coordenadas fila y columna.

    */

    let salto = calcularSalto(cuadricula.length); //se asume que siempre va ser entero

    let filaAux = Math.ceil((fila+1)/salto)*salto - 1; // cola de la caja
    let colAux = Math.ceil((columna+1)/salto)*salto - 1;// lado derecho de la caja


    let region= "";

    for(let i=filaAux-(salto-1), m=0 ; m<salto; i++, m++){
        for( let j=colAux-(salto-1), n=0; n<salto; j++, n++){
            region = region + cuadricula[i][j].toString();
        }
        region = region + '\n';
    }

    console.log(region)

}

function inicializalizarMRV(cuadricula, matrizValoresRestantes){

    /*
        Inicializacion de la matriz de valores restantes. Se verifican las restricciones de filas, columnas y regiones de
        toda la cuadricula.
    */

    //fila
    for(let i=0; i<cuadricula.length; i++){
        actualizarFila(cuadricula, matrizValoresRestantes,i);
    }

    //columna
    for(let i=0; i<cuadricula.length; i++){
        actualizarColumna(cuadricula, matrizValoresRestantes,i);
    }


    //region
    let salto = calcularSalto(cuadricula.length);

    for(let i= 1; i<= cuadricula.length; i=i*salto){
        for(let j=1; j<= cuadricula.length; j=j*salto){

            if(i !== cuadricula.length){
                if(j !== cuadricula.length){
                    actualizarRegion(cuadricula, matrizValoresRestantes, i, j);
                }else{
                    actualizarRegion(cuadricula, matrizValoresRestantes, i, j-1);

                }
            }else{
                if(j !== cuadricula.length){
                    actualizarRegion(cuadricula, matrizValoresRestantes, i-1, j);
                }else{
                    actualizarRegion(cuadricula, matrizValoresRestantes, i-1, j-1);

                }
            }

        }
    }

    console.log()




}



function removeAll(originalSet, toBeRemovedSet) {
    /*
        Elimina el subconjunto toBeRemovedSet del conjunto originalSet
    */

    toBeRemovedSet.forEach(Set.prototype.delete, originalSet);

}

function actualizarFila(cuadricula, matrizValoresRestantes, fila){

    // Las restricciones presentes en la fila son guardadas en un conjunto
    let restricciones = new Set();
    for(let col=0; col<cuadricula.length; col++){
        if(cuadricula[fila][col] !== 0){ restricciones.add(cuadricula[fila][col]) }
    }

    //Las restricciones son eliminadas de los valores restantes
    for(let col=0; col<cuadricula.length; col++){

        if(cuadricula[fila][col] === 0){
            removeAll(matrizValoresRestantes[fila][col], restricciones);
        }else{
            matrizValoresRestantes[fila][col].clear();
        }
    }

}


function actualizarColumna(cuadricula, matrizValoresRestantes, col){

    // Las restricciones presentes en la columna son guardadas en un conjunto
    let restricciones = new Set();
    for(let fila=0; fila<cuadricula.length; fila++){
        if(cuadricula[fila][col] !== 0){ restricciones.add(cuadricula[fila][col]) }
    }

    //Las restricciones son eliminadas de los valores restantes
    for(let fila=0; fila<cuadricula.length; fila++){

        if(cuadricula[fila][col] === 0){
            removeAll(matrizValoresRestantes[fila][col], restricciones);
        }else{
            matrizValoresRestantes[fila][col].clear();
        }
    }

}

function actualizarRegion(cuadricula, matrizValoresRestantes, fila, columna){
    /*
        Verifica las restricciones en una region 3x3 y actualiza los valores restantes que
        pueden ser asignados a las celdas de la region.
    */

    let salto = calcularSalto(cuadricula.length);
    let filaAux = Math.ceil((fila+1)/salto)*salto - 1; // cola de la region
    let colAux = Math.ceil((columna+1)/salto)*salto - 1;// lado derecho de la region

    //colecta todas las restricciones presentes en la region
    let restricciones = new Set();
    for(let i=filaAux-(salto-1), m=0 ; m<salto; i++, m++){
        for( let j=colAux-(salto-1), n=0; n<salto; j++, n++){
           if(cuadricula[i][j]!== 0){ restricciones.add( cuadricula[i][j] ) }
        }
    }

    //elimina el subconjunto restricciones del conjunto valores restantes de la region
    for(let i=filaAux-(salto-1), m=0 ; m<salto; i++, m++){
        for( let j=colAux-(salto-1), n=0; n<salto; j++, n++){
            if(cuadricula[i][j] === 0){
               removeAll(matrizValoresRestantes[i][j], restricciones)
            }else{
                matrizValoresRestantes[i][j].clear();
            }
        }
    }


}


function getCasillaMenosRestringida( cuadricula, matrizValoresRestantes ){

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

function copiar(matrizValoresRestantes){


    let copia = new Array( matrizValoresRestantes.length)
        .fill(null).map(()=> (
            new Array(matrizValoresRestantes.length)
            ));


    for(let i=0; i<matrizValoresRestantes.length; i++){
        for(let j=0;j<matrizValoresRestantes.length; j++){
            copia[i][j] = new Set( matrizValoresRestantes[i][j] );
            //copia[i][j] = new Set( Array.from(matrizValoresRestantes[i][j]) );
        }
    }

    return copia;


}

function calcularSalto(dimMatriz){
    return Math.sqrt(dimMatriz); //se asume que siempre va ser entero
}