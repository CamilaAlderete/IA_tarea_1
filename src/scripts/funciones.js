import fs from 'fs';

export function toString(cuadricula){

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

export function writeFile(str, nombreArchivo){

    let writeStream = fs.createWriteStream(nombreArchivo+".txt");
    writeStream.write(str);
    writeStream.end();
}



export function actualizarCuadricula(cuadricula, matrizValoresRestantes, fila, columna){
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


export function inicializarMatrizVR(cuadricula){
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


export function printRegion(cuadricula, fila, columna){

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

export function inicializalizarMRV(cuadricula, matrizValoresRestantes){

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



export function removeAll(originalSet, toBeRemovedSet) {
    /*
        Elimina el subconjunto toBeRemovedSet del conjunto originalSet
    */

    toBeRemovedSet.forEach(Set.prototype.delete, originalSet);

}

export function actualizarFila(cuadricula, matrizValoresRestantes, fila){

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


export function actualizarColumna(cuadricula, matrizValoresRestantes, col){

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

export function actualizarRegion(cuadricula, matrizValoresRestantes, fila, columna){
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

export function copiarMatrizValoresRestantes(matrizValoresRestantes){


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

export function copiarSudoku(cuadricula){


    let copia = new Array( cuadricula.length)
        .fill(null).map(()=> (
            new Array(cuadricula.length)
        ));


    for(let i=0; i<cuadricula.length; i++){
        for(let j=0;j<cuadricula.length; j++){
            copia[i][j] = cuadricula[i][j];
        }
    }

    return copia;


}


export function calcularSalto(dimMatriz){
    return Math.sqrt(dimMatriz); //se asume que siempre va ser entero
}

