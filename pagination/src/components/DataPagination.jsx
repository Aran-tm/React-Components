import { useState } from 'react'

// componente para paginar los usuarios (otengo por parametros las propiedades utiles del padre)
// eslint-disable-next-line react/prop-types
const DataPagination = ({ currentPage, amountPerPage, data, onPageChange }) => {

  // numero total de paginas (valor entero)
  // redondeo al entero decimal mas alto hacia arriba
  // eslint-disable-next-line react/prop-types
  const numberOfPages = Math.ceil(data.length / amountPerPage);
  const lastPage = (numberOfPages)

  // verifico el estado de la paginacion
  const [numeroActualPagina, changeNumeroActualPagina] = useState(currentPage);

  const [visiblePageNumbers, setVisiblePageNumbers] = useState([1, 2, 3]); // Inicialmente muestra los primeros tres números de página

  // Maneja el cambio de página
  const handleNumberOfPage = (pageNumber) => {

    // Actualizo el estado de la paginacion
    changeNumeroActualPagina(pageNumber);
    onPageChange(pageNumber);
  };

  // Maneja la pagina siguiente
  const handleNextPage = () => {

    // Obtén el número de la página actual
    const currentNumberOfPage = numeroActualPagina;

    // Calcula el nuevo número de página
    const nextPageNumber = currentNumberOfPage + 1;

    // Actualiza los números de página visibles para incluir el número actual y los siguientes dos números
    let newVisiblePageNumbers = [];

    for (let i = Math.max(1, nextPageNumber - 1); i <= nextPageNumber + 1; i++) {

      // evito que se exceda el numero de paginas en el arreglo de paginacion a mostrar
      if (!(nextPageNumber >= lastPage)) {
        newVisiblePageNumbers.push(i);
      } else {
        newVisiblePageNumbers = visiblePageNumbers;
      }
    }

    // Actualiza el estado de paginas que se muestran
    setVisiblePageNumbers(newVisiblePageNumbers);

    // Actualiza el estado de la página actual
    changeNumeroActualPagina(nextPageNumber);

    // Notifica al componente padre sobre el cambio
    onPageChange(nextPageNumber);
  }

  // Maneja la pagina siguiente
  const handlePreviousPage = () => {

    // Obtén el número de la página actual
    const currentNumberOfPage = numeroActualPagina;  // numero actual 2

    // Calcula el nuevo número de página
    const previousPageNumber = currentNumberOfPage - 1;   // da 1

    // Actualiza los números de página visibles para incluir el número actual y los siguientes dos números
    let newVisiblePageNumbers = [];

    if (numeroActualPagina  >= 3) {

      for (let i = Math.max(0, previousPageNumber - 1); i <= previousPageNumber + 1; i++) {
        newVisiblePageNumbers.push(i);
      }

    } else if (currentNumberOfPage === 2) {      // Caso especial para cuando estamos en la página 2

      newVisiblePageNumbers = [1, 2, 3];  // Configura los números de página visibles para mostrar solo el número 1
    }

    // Actualiza el estado de paginas que se muestran
    setVisiblePageNumbers(newVisiblePageNumbers);

    // Actualiza el estado de la página actual
    changeNumeroActualPagina(previousPageNumber);

    // Notifica al componente padre sobre el cambio
    onPageChange(previousPageNumber);
  }

  // Evento para poder ir a la pagina 1
  const gotToFirstPage = () => {

    // modifico el arreglo de paginado para mostrar las 3 primeras paginas
    let newVisiblePageNumbers = [1, 2, 3];
    setVisiblePageNumbers(newVisiblePageNumbers);

    // actualizo el numero actual de la pagina a 1
    changeNumeroActualPagina(1);

    // actualizo el estado del componente hijo para que el componente
    // padre actulice la vista con los valores de la pagina actual seleccionada
    onPageChange(1);
  }

  // Evento para poder ir a la ultima pagina
  const gotToLastPage = () => {

    // modifico el arreglo de paginado a que sea los 3 primeros nuevamente
    let newVisiblePageNumbers = [lastPage-2, lastPage-1, lastPage];
    setVisiblePageNumbers(newVisiblePageNumbers);

    // actualizo el numero actual de la pagina al ultimo
    changeNumeroActualPagina(lastPage);

    // actualizo el estado del componente hijo para que el componente
    // padre actulice la vista con los valores de la pagina actual seleccionada
    onPageChange(lastPage);
  }

  return (
    <>
      <nav aria-label="...">
        <ul className="pagination mt-5 justify-content-center">
          {
            numberOfPages !== 0 &&
              (
                <>
                  {/* Boton atras */}
                  <li className={`page-item ${numeroActualPagina === 1  ? 'disabled' : ''}`}>
                    <button className="page-link"
                      onClick={() => handlePreviousPage(numeroActualPagina)}
                      >
                      Previous
                    </button>
                  </li>

                  {/** Para regresar a la pgina 1 */}
                  <li className={`page-item ${ visiblePageNumbers.includes(1) ? 'd-none' : '' }`}>
                    <button className='page-link' onClick={() => gotToFirstPage()}>
                      ...
                    </button>
                  </li>

                  {/* Paginado */}
                  {
                    visiblePageNumbers.map((pageNumber) => (
                      <li key={pageNumber} className={`page-item ${numeroActualPagina === pageNumber ? 'active' : ''}`}>
                        <button className='page-link' onClick={() => handleNumberOfPage(pageNumber)}>
                          {pageNumber}
                        </button>
                      </li>))
                  }

                  {/** Para avanzar hacia la ultima pagina */}
                  <li className={`page-item ${ visiblePageNumbers.includes(lastPage) ? 'd-none' : '' }`}>
                    <button className='page-link' onClick={() => gotToLastPage()}>
                      ...
                    </button>
                  </li>

                  {/* Boton siguiente */}
                  <li
                    className={`page-item ${numeroActualPagina === lastPage ? 'disabled' : ''}`}>
                    <button className="page-link"
                      onClick={() => handleNextPage(numeroActualPagina)}
                      >
                      Next
                    </button>
                  </li>
                </>
              )
          }
        </ul>
      </nav>
    </>
  )
}

export default DataPagination
