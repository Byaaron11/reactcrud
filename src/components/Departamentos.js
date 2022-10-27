import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import loading from './../assets/images/loading.gif';
import './../App.css';
import { NavLink } from 'react-router-dom';

export default class Departamentos extends Component {
    state = {
        departamentos: [],
        status: false
    }

    loadDepartamentos = () => {
        var request = "/api/departamentos";
        var url = Global.urlDepartamentos + request;
        axios.get(url).then(response =>{
            this.setState({
                departamentos: response.data,
                status: true
            })
        })
        
    }

    componentDidMount = () => {
        this.loadDepartamentos();
    }

  render() {
    //Esto es javascript
    if (this.state.status == false){
        //Loading
        return(
            <div className='App'>
                <img src={loading}/>
            </div>
            
        )
    }else{
        //Pintamos nuestro dibjo
        return(
            <div className='App'>
                <h1>Departamentos</h1>
                <table className='table table-bordered table-warning'>
                    <thead>
                        <tr>
                            <th>Número</th>
                            <th>Nombre</th>
                            <th>Localidad</th>
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            this.state.departamentos.map((dep, index) =>{
                                return(
                                    <tr key={dep.numero}>
                                        <td>{dep.numero}</td>
                                        <td>{dep.nombre}</td>
                                        <td>{dep.localidad}</td>
                                        <td>
<NavLink to={"/detalle/"+ dep.numero + "/" + dep.nombre + "/" + dep.localidad}
 className="btn btn-success">
    Details
</NavLink>
 <NavLink to={"/delete/" + dep.numero} className="btn btn-danger">
    Eliminar
</NavLink>
<NavLink to={"/update/" + dep.numero} className="btn btn-warning">
    Modificar
</NavLink>
                                        </td> 
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        )
    }
  }
}
