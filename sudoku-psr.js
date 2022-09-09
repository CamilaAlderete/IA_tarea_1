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


/*
if(check(cuadricula, 8, 2,1)){
    console.log('Puede ingresarse el valor')

}else{
    console.log('No se puede ingresar el valor ');
}
*/

let valoresRestantes = inicializarMatriz();

inicializalizarMRV(cuadricula, valoresRestantes);

//console.log(valoresRestantes)

function inicializarMatrizMVR(){

    //let valoresRestantes = new Set();
    //for( let i=0; i< cuadricula.length; i++){ valoresRestantes.add(i+1) }

    //crea una matriz de conjuntos
    return new Array(cuadricula.length)
        .fill(null).map(
            ()=> (
                new Array(cuadricula.length).fill(null).map(()=> (new Set()))
            ));

}


function check(cuadricula, valor, fila, columna){

    /*Chequea si un valor puede ingresarse en las coordenadas fila y columna*/

    //filas y columnas finales de las regiones de dimension 3x3
    let filaAux = Math.ceil((fila+1)/3)*3 - 1; // cola de la caja
    let colAux = Math.ceil((columna+1)/3)*3 - 1;// lado derecho de la caja

    //esquinas de las regiones
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

    /*Imprime la region en el que se encuentra la casilla con coordenadas fila y columna*/

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

    for(let i=0; i<cuadricula.length; i++){
        actualizarFila(cuadricula, valoresRestantes,i);
    }

    /*for(let i=0; i<cuadricula.length; i++){
        actualizarColumna(cuadricula, valoresRestantes,i);
    }



    for(let i= 1; i<= cuadricula.length; i=i*3){
        for(let j=1; j<= cuadricula.length; j=j*3){
              actualizarRegion(cuadricula, valoresRestantes, i-1, j-1);
        }
    }*/

    console.log(valoresRestantes[7][8]);
    //this.valoresRestantes = valoresRestantes;

}

function diferencia(setA, setB) {
    const diff = new Set(setA);

    for (const elem of setB) {
        diff.delete(elem);
    }

    return diff;
}

function actualizarFila(cuadricula, valoresRestantes, fila){
    
    //nros del 1 al 9
    let nrosDisponibles = new Set();
    for(let i=1; i<=cuadricula.length; i++){ nrosDisponibles.add(i) }
    
    //solo quedaran aquellos numeros sin asignar
    for(let col=0; col<cuadricula.length; col++){
        if(cuadricula[fila][col] !== 0){ nrosDisponibles.delete( cuadricula[fila][col] )}
    }


    //let conjuntos = valoresRestantes[fila]
    for(let col=0; col<cuadricula.length; col++){

        if(cuadricula[fila][col] === 0){

            valoresRestantes[fila][col] = new Set([...nrosDisponibles, ...valoresRestantes[fila][col]]); //merge sets
        }else{
            valoresRestantes[fila][col].clear();
        }
    }


}


function actualizarColumna(cuadricula, valoresRestantes, col){

    //nros del 1 al 9
    let nrosDisponibles = new Set();
    for(let i=1; i<=cuadricula.length; i++){ nrosDisponibles.add(i) }

    //solo quedaran aquellos numeros sin asignar
    for(let fila=0; fila<cuadricula.length; fila++){
        if(cuadricula[fila][col] !== 0){ nrosDisponibles.delete( cuadricula[fila][col] )}
    }

    for(let fila=0; fila<cuadricula.length; fila++){
        if(cuadricula[fila][col] === 0){
            valoresRestantes[fila][col] = new Set([...nrosDisponibles, ...valoresRestantes[fila][col]]);
        }else{
            valoresRestantes[fila][col].clear();

        }
    }

}

function actualizarRegion(cuadricula, valoresRestantes, fila, columna){

    let nrosDisponibles = new Set();
    for(let i=1; i<=cuadricula.length; i++){ nrosDisponibles.add(i) }

    let filaAux = Math.ceil((fila+1)/3)*3 - 1; // cola de la caja
    let colAux = Math.ceil((columna+1)/3)*3 - 1;// lado derecho de la caja

    for(let i=filaAux-2, m=0 ; m<3; i++, m++){
        for( let j=colAux-2, n=0; n<3; j++, n++){
           if(cuadricula[i][j]!== 0){ nrosDisponibles.delete( cuadricula[i][j] ) }
        }
    }

    for(let i=filaAux-2, m=0 ; m<3; i++, m++){
        for( let j=colAux-2, n=0; n<3; j++, n++){
            if(cuadricula[i][j] === 0){
                valoresRestantes[i][j] = new Set([...nrosDisponibles, ...valoresRestantes[i][j]])
            }else{
                valoresRestantes[i][j].clear();
            }
        }
    }


}




