import React, { Component } from 'react'
import '../App.css';
import Global from '../Global';
import axios from 'axios';
import { Navigate } from 'react-router-dom';

export default class CreateDepartamento extends Component {
    cajaNumeroRef = React.createRef(); //Ojo que este es numero PARSEAR
    cajaNombreRef = React.createRef();
    cajaLocRef = React.createRef();

    state = {
        mensaje: "",
        status: false
    }

    insertDepartamento = (e) => {
        e.preventDefault();
        var request = "/api/departamentos";
        var url = Global.urlDepartamentos + request;
        var numero = parseInt(this.cajaNumeroRef.current.value);
        var nombre = this.cajaNombreRef.current.value;
        var localidad = this.cajaLocRef.current.value;
        //react ya permite declarar objetos con formato json (no hace falta traducción al json)
        //de hecho hemos creado el objeto Global.js solo hay que utilizar las propiedades de la Api JSON
        var departamento = {
            numero: numero,
            nombre: nombre,
            localidad: localidad
        }
        //En axios el metodo post recibe 2 parámetros:
        //El primero es la url, el segundo el objeto json para el api (en este caso departamentos)
        axios.post(url, departamento).then(response => {
            this.setState({
                status: true,
                mensaje: "¡Departamento insertado satisfactoriamente!"
            });
        });
    }

  render() {
    if(this.state.status == true){
        return (<Navigate to="/"/>)
    }
    return (
      <div className='App'>
        <h1>Crear Departamentos</h1>
        <form onSubmit={this.insertDepartamento}>
            <label>Número: </label>
            <input type="text" className="form-control" ref={this.cajaNumeroRef}/>
            <label>Nombre: </label>
            <input type="text" className ="form-control" ref={this.cajaNombreRef}/>
            <label>Localidad</label>
            <input type="text" className="form-control" ref={this.cajaLocRef}/>
            <br/>
            <button className="btn btn-success">
                Insertar departamento
            </button>
        </form>
        <h2 style={{color:"blue"}}>
            {this.state.mensaje}
        </h2>
      </div>
    )
  }
}
