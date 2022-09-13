# Inteligencia Artificial - Tarea 1
### Sudoku
El objetivo del sudoku es rellenar una cuadrícula de 9x9 celdas dividida en subcuadrículas de 3x3 (también llamadas "cajas" o "regiones") con las cifras del 1 al 9 partiendo de algunos números ya dispuestos en algunas de las celdas. No se debe repetir ninguna cifra en una misma fila, columna o subcuadrícula.
El n-sudoku corresponde al sudoku con NxN celdas, es decir el sudoku 9x9 corresponde al n-sudoku con n=9. Probar el algoritmo con N potencia de 3 (ej: 3, 9), especialmente con N=9. Utilizar juegos conocidos (De internet por ejemplo) o ver una estrategia para generar juegos válidos. Heurística posible: MVR (mínimo de valores restantes o también conocida como variable más restringida)

Implementar Backtracking, que debería ser capaz de encontrar 1 solución o todas; el algoritmo de Las Vegas, que debería parar al encontrar la primera solución; y un
algoritmo Heurístico que utilice alguna heurística aplicable al PSR en cuestión.

### Indicaciones Generales
- Medir el tiempo que toma en terminar un algoritmo.
- Medir la cantidad de estados expandidos (contar cantidad de nodos visitados).
- Probar con varios valores de N (tamaño del problema), incluso con N relativamente grandes (hasta donde sea razonable el tiempo)
- Para los PSR medir tanto tiempo, cantidad de estados expandidos para encontrar 1 solución y para encontrar todas (Para el caso del backtracking).
- Elaborar tablas comparativas entre algoritmos donde se compare tiempo, nodos expandidos, encuentra o no solución óptima, todos para diferentes valores de N.
- Enfocar presentación del trabajo a los resultados obtenidos y visualizar el programa.
- El programa a entregar debe tener GUI, y debe ser posible parametrizar el tamaño del problema (N) y otros parámetros propios de cada problema.
- Durante la presentación haremos una demostración práctica, en donde correríamos el programa varias veces cambiando los parámetros.
