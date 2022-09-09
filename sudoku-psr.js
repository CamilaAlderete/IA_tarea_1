//dificultad media
n = 3;
cuadricula = [
    [0,0,0, 0,8,3, 1,4,9],
    [9,0,0, 0,0,5, 8,0,2],
    [0,0,0, 1,9,6, 0,5,0],

    [0,0,8, 3,5,0, 0,0,7],
    [0,0,0, 0,0,2, 3,0,5],
    [0,0,0, 8,6,7, 0,0,0],

    [0,7,0, 0,0,8, 0,0,1],
    [0,8,4, 7,0,0, 0,2,0],
    [2,0,3, 6,0,4, 9,7,8]
]



let valoresRestantes = inicializarMatrizVR();

inicializalizarMRV(cuadricula, valoresRestantes);

//console.log(valoresRestantes)
//let valoresRestantes = inicializarMatrizVR();




function inicializarMatrizVR(){
    /*
        Crea e inicializa la matriz de valores restantes de la cuadricula.
        Al principio todas las celdas vacias tendran disponibles valores desde 1 a n.
    */

    let valoresRestantes = [];
    for( let i=0; i< cuadricula.length; i++){ valoresRestantes.push(i+1) }

    //crea una matriz de conjuntos
    return new Array(cuadricula.length)
        .fill(null).map(()=> (
            new Array(cuadricula.length).fill(null).map(()=> ( new Set(valoresRestantes) ))
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

function inicializalizarMRV(cuadricula, valoresRestantes){

    /*
        Inicializacion de la matriz de valores restantes. Se verifican las restricciones de filas, columnas y regiones de
        toda la cuadricula.
    */

    //fila
    for(let i=0; i<cuadricula.length; i++){
        actualizarFila(cuadricula, valoresRestantes,i);
    }

    //columna
    for(let i=0; i<cuadricula.length; i++){
        actualizarColumna(cuadricula, valoresRestantes,i);
    }


    //region. Obs.: solo sirve para regiones 3*3
    for(let i= 1; i<= cuadricula.length; i=i*3){
        for(let j=1; j<= cuadricula.length; j=j*3){

            if(i !== cuadricula.length){
                if(j !== cuadricula.length){
                    actualizarRegion(cuadricula, valoresRestantes, i, j);
                }else{
                    actualizarRegion(cuadricula, valoresRestantes, i, j-1);

                }
            }else{
                if(j !== cuadricula.length){
                    actualizarRegion(cuadricula, valoresRestantes, i-1, j);
                }else{
                    actualizarRegion(cuadricula, valoresRestantes, i-1, j-1);

                }
            }

        }
    }

    console.log()




}

function diferencia(setA, setB) {
    const diff = new Set(setA);

    for (const elem of setB) {
        diff.delete(elem);
    }

    return diff;
}

function removeAll(originalSet, toBeRemovedSet) {
    /* Elimina el subconjunto toBeRemovedSet del conjunto originalSet*/
    toBeRemovedSet.forEach(Set.prototype.delete, originalSet);
}

function actualizarFila(cuadricula, valoresRestantes, fila){

    // Las restricciones presentes en la fila son guardadas en un conjunto
    let restricciones = new Set();
    for(let col=0; col<cuadricula.length; col++){
        if(cuadricula[fila][col] !== 0){ restricciones.add(cuadricula[fila][col]) }
    }

    //Las restricciones son eliminadas de los valores restantes
    for(let col=0; col<cuadricula.length; col++){

        if(cuadricula[fila][col] === 0){
            removeAll(valoresRestantes[fila][col], restricciones);
        }else{
            valoresRestantes[fila][col].clear();
        }
    }

}


function actualizarColumna(cuadricula, valoresRestantes, col){

    // Las restricciones presentes en la columna son guardadas en un conjunto
    let restricciones = new Set();
    for(let fila=0; fila<cuadricula.length; fila++){
        if(cuadricula[fila][col] !== 0){ restricciones.add(cuadricula[fila][col]) }
    }

    //Las restricciones son eliminadas de los valores restantes
    for(let fila=0; fila<cuadricula.length; fila++){

        if(cuadricula[fila][col] === 0){
            removeAll(valoresRestantes[fila][col], restricciones);
        }else{
            valoresRestantes[fila][col].clear();
        }
    }

}

function actualizarRegion(cuadricula, valoresRestantes, fila, columna){
    /*
        Verifica las restricciones en una region 3x3 y actualiza los valores restantes que
        puede ser asignados a las celdas de la region.
    */

    let filaAux = Math.ceil((fila+1)/3)*3 - 1; // cola de la caja
    let colAux = Math.ceil((columna+1)/3)*3 - 1;// lado derecho de la caja

    let restricciones = new Set();
    for(let i=filaAux-2, m=0 ; m<3; i++, m++){
        for( let j=colAux-2, n=0; n<3; j++, n++){
            let v = cuadricula[i][j];
           if(cuadricula[i][j]!== 0){ restricciones.add( cuadricula[i][j] ) }
        }
    }

    for(let i=filaAux-2, m=0 ; m<3; i++, m++){
        for( let j=colAux-2, n=0; n<3; j++, n++){
            if(cuadricula[i][j] === 0){
               removeAll(valoresRestantes[i][j], restricciones)
            }else{
                valoresRestantes[i][j].clear();
            }
        }
    }


}




