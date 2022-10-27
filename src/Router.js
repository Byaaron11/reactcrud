import React, { Component } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import Departamentos from './components/Departamentos';
import CreateDepartamento from './components/CreateDepartamento';
import DetalleDepartamento from './components/DetalleDepartamento';
import MenuDepartamentos from './components/MenuDepartamentos';
import DeleteDepartamento from './components/DeleteDepartamento';
import UpdateDepartamento from './components/UpdateDepartamento';
import DetalleEmpleado from './components/DetalleEmpleado';

export default class Router extends Component {
  render() {

    function DetalleDeptElement (){
        var {numero, nombre, loc} = useParams();
        return (<DetalleDepartamento iddepartamento={numero} nombre={nombre} localidad={loc}/>);
    }

    function DetalleEmpElement(){
      var {idEmp} = useParams();
      return (<DetalleEmpleado idempleado={idEmp}/>);
  }

    function DeleteDeptElement () {
        var {id} = useParams();
        return (<DeleteDepartamento id={id}/>)
    }

    function UpdateDeptElement () {
        var {iddepartamento} = useParams();
        return (<UpdateDepartamento id={iddepartamento}/>)
    }

    return (
      <BrowserRouter>
        <MenuDepartamentos/>
        <Routes>
            <Route path='/' element={<Departamentos />}/>
            <Route path='/create' element={<CreateDepartamento />}/>
            <Route path='/detalle/:numero/:nombre/:loc' element={<DetalleDeptElement />}/>
            <Route path='/delete/:id' element={<DeleteDeptElement/>}/>
            <Route path='/update/:iddepartamento' element={<UpdateDeptElement/>}/>
            <Route path='/empleado/:idEmp' element={<DetalleEmpElement />}/>

        </Routes>
      </BrowserRouter>
    )
  }
}
