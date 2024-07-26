import { useEffect, useState } from "react";
import DataPagination from "./DataPagination";

const Users = () => {  

    // variables para manejar el estado de la paginacion
    const amountPerPage = 3;
    const [currentPage, setCurrentPage] = useState(1);

    // inicializo un empty state
    const [users, setUsers] = useState([])

    // divido el arreglo de data teniendo en cuenta
    // la cantidad de usuarios por paginas y la pagina actual
    const indiceInicial = (currentPage - 1) * amountPerPage;
    const indiceFinal = indiceInicial + amountPerPage;
    const fragmentos = users.slice(indiceInicial, indiceFinal);

    // para observar los cambios en la paginacion
    const handlePageChange = (newPage) => {

        // actualizo el estado de la currentPage
        setCurrentPage(newPage);
    };

    // funcion para capturar usuarios
    const fetchUsers = async () => {
        try {

            // obtengo los usuarios de la api de placeholder
            const response = await fetch('https://jsonplaceholder.typicode.com/users');

            // convertimos la respuesta en un json
            const data = await response.json();

            // muestro la data
            console.log(data);

            // seteo la data
            setUsers(data);
        } catch (error) {
            
            // muestro un error en caso de que exista
            console.error(error);
        }
    }

    // hook para ejecutar solo una vez el efecto en un componente
    // evitar que no se ejecute muchas veces una dependencia, una funcion, etc
    useEffect(() => {

        // evito que se cargue indefinidiamente la api de usuarios
        fetchUsers();
    }, []);
    

    return (
        <>  
            {/** spinner loading component */}
            {
                users.length === 0 ? ( 
                    <div className="d-flex justify-content-center mt-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading Content...</span>
                        </div>
                    </div>
                ) : (
                    <>
                        <h1 className="mb-5 mt-5 d-flex justify-content-center">Users Table</h1>
                        <table className="table mb-5">
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">Name</th>
                                    <th scope="col">Username</th>
                                    <th scope="col">Email</th>
                                    <th scope="col">Phone</th>
                                    <th scope="col">Website</th>
                                    <th scope="col">Company</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    fragmentos.map((user, index) => (
                                        <tr key={user.id}>
                                            <td>{index + 1}</td>
                                            <td>{user.name}</td>
                                            <td>{user.username}</td>
                                            <td>{user.email}</td>
                                            <td>{user.phone}</td>
                                            <td>{user.website}</td>
                                            <td>{user.company.name}</td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table> 
                        <DataPagination
                            currentPage={currentPage}
                            amountPerPage={amountPerPage}
                            data={users}
                            onPageChange={handlePageChange}
                        />
                    </>
                )
            }
        </>
    )
}

export default Users
