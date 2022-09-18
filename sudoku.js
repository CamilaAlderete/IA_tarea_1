//sudoku con backtracking
function tableToArray(table) {
    let result = [].reduce.call(table.rows, function (result, row) {
        result.push([].reduce.call(row.cells, function (res, cell) {
            res.push(parseInt(cell.children[0].value) || 0);
            return res;
        }, []));
        return result;
    }, []);

    return result;
}

/*
    Validar que la entrada sean valores del 1 al tablero.length
*/
function validarEntrada(value) {
    let regex = /^\d*$/.test(value) && parseInt(value) > 0 && parseInt(value) <= tablero.length;
    return !regex ? value.replace(value, '') : value
}

function ok()
{
    var tamanho = document.getElementById("inputTamanho").value;
    leerTamanho(tamanho);
}
function leerTamanho(tamanho) {
    console.log(tamanho);
    let table = document.getElementById('sudoku');
    let tableBody = table.getElementsByTagName('tbody')[0];
    let tableRows = tableBody.getElementsByTagName('tr');
    let tableCells = tableRows[0].getElementsByTagName('td');
    let input = tableCells[0].getElementsByTagName('input')[0];
    	
    let size = parseInt(tamanho);

    if (size < 4 || size > 16) {
        alert("El tamaño debe ser entre 4 y 16");
        tamanho = "";
        return;
    }

    tableBody.innerHTML = "";
    input.value = "";
    input.classList.remove("input-solved");

    for (let i = 0; i < size; i++) {
        let row = tableBody.insertRow(i);
        for (let j = 0; j < size; j++) {
            let cell = row.insertCell(j);
            cell.innerHTML = `<input type="text" class="input-cell" maxlength="1" onkeyup="this.value=validarEntrada(this.value)" />`;
        }
    }

    //table.style.width = `${size * 40}px`;
    //table.style.height = `${size * 40}px`;

}
function esColumnaValida(tablero, column, value) {
    for (let i = 0; i < tablero.length; i++) {
        if (tablero[i][column] === value) {
            return false;
        }
    }

    return true;
}

function esFilaValida(tablero, row, value) {
    for (let i = 0; i < tablero[row].length; i++) {
        if (tablero[row][i] === value) {
            return false;
        }
    }

    return true;
}

function esRegionValida(tablero, row, column, value) {
    
    let regionSize = Math.sqrt(tablero.length);
    let squareRow = Math.floor(row / regionSize) * regionSize;
    let squareCol = Math.floor(column / regionSize) * regionSize;

    for (let i = 0; i < regionSize; i++) {
        for (let j = 0; j < regionSize; j++) {
            if (tablero[squareRow + i][squareCol + j] === value)
                return false;
        }
    }

    return true;
};

function esValorValido(tablero, row, column, value) {
    if (esFilaValida(tablero, row, value) &&
        esColumnaValida(tablero, column, value) &&
        esRegionValida(tablero, row, column, value)) {
        return true;
    }

    return false;
};

function buscarCasillaDisponible(tablero) {
    for (let i = 0; i < tablero.length; i++) {
        for (let j = 0; j < tablero.length; j++) {
            if (tablero[i][j] === 0)
                return [i, j];
        }
    }

    return [-1, -1];
}

function resolverSudoku(tablero) {
    let table = document.getElementById('sudoku');
    let emptyCell = buscarCasillaDisponible(tablero);
    let row = emptyCell[0];
    let col = emptyCell[1];

    if (row === -1 || col === -1) {
        return tablero;
    }

    let num = 1;
    do {
        if (esValorValido(tablero, row, col, num)) {
            tablero[row][col] = num;
            let inputCell = table.rows[row].cells[col].children[0];
            inputCell.value = num;
            inputCell.classList.add("input-solved");
            resolverSudoku(tablero);
        }
    } while (++num <= tablero.length)

    if (buscarCasillaDisponible(tablero)[0] !== -1) {
        tablero[row][col] = 0;
    }

    return tablero;
}

function reiniciarEntrada() {
    let inputs = document.getElementsByTagName("input");
    for (let i = 0; i < inputs.length; i++) {
        if (inputs[i].type == "text") {
            inputs[i].value = "";
            inputs[i].classList.remove("input-solved"); // remove class css
        }
    }
}

function main(table) {
    let tablero = tableToArray(table);
    resolverSudoku(tablero);
}