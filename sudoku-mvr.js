//https://sudokuspoiler.com/sudoku/sudoku9

var valoresPosibles = [1,2,3,4,5,6,7,8,9];

main()


function main() {


    //dificultad experto
    let cuadricula = [
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
    let cuadricula2 = [
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

    let sudokuStr = 'Entrada: \n'+toString(cuadricula);

    let matrizValoresRestantes = inicializarMatrizVR(cuadricula);

    inicializalizarMRV(cuadricula, matrizValoresRestantes);

    if(resolverSudoku( cuadricula, copiar(matrizValoresRestantes)) ){

        console.log('Sudoku resuelto, mirar archivo txt');
        sudokuStr = sudokuStr + 'Salida: \n'+toString(cuadricula);
        writeFile(sudokuStr);

    }else{
        console.log('No pudo resolverse')
    }

    console.log()

}

function toString(cuadricula){

    let output = '';
    for(let i=0; i< cuadricula.length; i++){
        output = output + cuadricula[i].toString() + '\n';
    }

    return output + '\n';
}

function writeFile(str){

    var fs  = require('fs')

    var writeStream = fs.createWriteStream("sudoku.txt");
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

    console.log()
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
    
    //region. Obs.: solo sirve para regiones 3*3
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
        Solo sirve con regiones 3x3.
    */

    let filaAux = Math.ceil((fila+1)/3)*3 - 1; // cola de la caja
    let colAux = Math.ceil((columna+1)/3)*3 - 1;// lado derecho de la caja


    let region= "";

    for(let i=filaAux-2, m=0 ; m<3; i++, m++){
        for( let j=colAux-2, n=0; n<3; j++, n++){
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


    //region. Obs.: solo sirve para regiones 3*3
    for(let i= 1; i<= cuadricula.length; i=i*3){
        for(let j=1; j<= cuadricula.length; j=j*3){

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

    let filaAux = Math.ceil((fila+1)/3)*3 - 1; // cola de la caja
    let colAux = Math.ceil((columna+1)/3)*3 - 1;// lado derecho de la caja

    //colecta todas las restricciones presentes en la region
    let restricciones = new Set();
    for(let i=filaAux-2, m=0 ; m<3; i++, m++){
        for( let j=colAux-2, n=0; n<3; j++, n++){
           if(cuadricula[i][j]!== 0){ restricciones.add( cuadricula[i][j] ) }
        }
    }

    //elimina el subconjunto restricciones del conjunto valores restantes de la region
    for(let i=filaAux-2, m=0 ; m<3; i++, m++){
        for( let j=colAux-2, n=0; n<3; j++, n++){
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