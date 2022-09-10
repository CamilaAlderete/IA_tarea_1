main()

function main() {

    //dificultad media
    cuadricula = [
        [0, 0, 0, 0, 8, 3, 1, 4, 9],
        [9, 0, 0, 0, 0, 5, 8, 0, 2],
        [0, 0, 0, 1, 9, 6, 0, 5, 0],

        [0, 0, 8, 3, 5, 0, 0, 0, 7],
        [0, 0, 0, 0, 0, 2, 3, 0, 5],
        [0, 0, 0, 8, 6, 7, 0, 0, 0],

        [0, 7, 0, 0, 0, 8, 0, 0, 1],
        [0, 8, 4, 7, 0, 0, 0, 2, 0],
        [2, 0, 3, 6, 0, 4, 9, 7, 8]
    ]


    let matrizValoresRestantes = inicializarMatrizVR();

    inicializalizarMRV(cuadricula, matrizValoresRestantes);

    let casilla = getCasillaMenosRestringida(cuadricula, matrizValoresRestantes);

    if(resolverSudoku(cuadricula, matrizValoresRestantes, casilla)){
        console.log('Sudoku resuelto');
    }else{
        console.log('No pudo resolverse')
    }

    console.log()

}


function resolverSudoku(cuadricula, matrizValoresRestantes, casilla){

    let fila = casilla.fila;
    let col = casilla.col;
    let valoresRestantes = casilla.valoresRestantes;
    let sudokuResuelto = casilla.sudokuResuelto;

    //resuelto
    if(sudokuResuelto){ return true }

    //sin valores restantes para asignar y todavia no esta resuelto
    if( valoresRestantes.size === 0 ){ return false}

    for (const valor of valoresRestantes) {

        cuadricula[fila][col] = valor;
        actualizarCuadricula(cuadricula,matrizValoresRestantes,fila,col);

        let casillaMenosRestringida = getCasillaMenosRestringida(cuadricula, matrizValoresRestantes);
        if (resolverSudoku(cuadricula, matrizValoresRestantes, casillaMenosRestringida)){
            return true;
        }
        console.log()

    }

    console.log()
    cuadricula[fila][col] = 0;
    actualizarCuadricula(cuadricula,matrizValoresRestantes,fila,col);
    return false;



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


function inicializarMatrizVR(){
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


function check(cuadricula, valor, fila, columna){

    /*Chequea si un valor puede ingresarse en las coordenadas fila y columna*/

    //filas y columnas finales de las regiones de dimension 3x3
    let filaAux = Math.ceil((fila+1)/3)*3 - 1; // cola de la caja
    let colAux = Math.ceil((columna+1)/3)*3 - 1;// lado derecho de la caja

    //esquinas de las regiones  #####reubicar la segunda condicion
    if(cuadricula[filaAux][colAux] === valor && filaAux!==fila && colAux!== columna) return false;
    if(cuadricula[filaAux-2][colAux-2] === valor && filaAux!==fila && colAux!== columna) return false;
    if(cuadricula[filaAux-2][colAux] === valor && filaAux!==fila && colAux!== columna) return false;
    if(cuadricula[filaAux][colAux-2] ===  valor && filaAux!==fila && colAux!== columna) return false;

    //horizontal y vertical
    for( let i = 0; i< cuadricula.length; i++){
        if(cuadricula[fila][i] === valor && columna !== i) return false;
        if(cuadricula[i][columna]=== valor && fila !== i) return false;
    }

    return true;
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

    return { valoresRestantes: valoresRestantes, fila: fila, col: col, sudokuResuelto: sudokuResuelto};

}

