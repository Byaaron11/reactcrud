import React, { Component } from 'react'
import axios from 'axios';
import Global from '../Global';
import './../App.css'
;
import { Navigate, NavLink } from 'react-router-dom';
export default class DeleteDepartamento extends Component {

    state = {
        status: false
    }

    deleteDepartamento = (e) => {
        e.preventDefault();
        var numero = this.props.id;
        var request = "/api/departamentos/" + numero
        var url = Global.urlDepartamentos + request;
        axios.delete(url).then(res => {
            this.setState({
                status: true
            });
        });
    }

  render() {
    //tenemos que dibujar aqui el h2 de Eliminado!!
    //Puedes hacer asi o incluirlo dentro del return del dibujo como solemos hacer
    if(this.state.status == true){
        return (
        <Navigate to='/' className="btn btn-info">Volver a Home</Navigate>
        );
    }
    return (
      <div className='App'>
        <h1>¿Delete departamento:
            <span style={{color:"red"}}>
                {this.props.id}
            </span> ?
        </h1>
        <form onSubmit={this.deleteDepartamento}>
            <button className='btn btn-danger'>
                Eliminar departamento
            </button>
        </form>
      </div>
    )
  }
}
