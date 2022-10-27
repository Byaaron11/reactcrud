import React, { Component } from 'react';
import axios from 'axios';
import Global from '../Global';
import { Navigate } from 'react-router-dom';


export default class UpdateDepartamento extends Component {
    cajaNumeroRef = React.createRef();
    cajaNombreRef = React.createRef();
    cajaLocRef = React.createRef();

    state = {
        departamentos: {},
        statusUpdate: false,
        statusGet: false
    }

    buscarDepartamento = () => {
        var valor = this.props.id;
        var request = "/api/departamentos/" + valor;
        var url = Global.urlDepartamentos + request;
        axios.get(url).then(response => {
            this.setState({
                statusGet: true,
                departamentos: response.data
            });
        });
    }

    UpdateDepartamento = (e) => {
        e.preventDefault();
        var num = parseInt(this.cajaNumeroRef.current.value);
        var nom = this.cajaNombreRef.current.value;
        var loc = this.cajaLocRef.current.value;
        var data = {
            numero: num,
            nombre: nom,
            localidad: loc
        };
        var request = "/api/departamentos";
        var url = Global.urlDepartamentos + request;
        axios.put(url, data).then(res => {
            this.setState({
                statusUpdate: true
            });
        });
    }

    componentDidMount = () => {
        this.buscarDepartamento();
    }
  render() {
    return (
      <div>
        <h1>Update Departamentos</h1>
        {
            this.state.status == true &&
            (<Navigate to="/" />)
        }
        {
            this.state.statusGet == true &&
        (<form>
            <input type="hidden" defaultValue={this.state.departamentos.numero}  ref={this.cajaNumeroRef}/>
            <label>Nuevo nombre: </label>
            <input type="text" defaultValue={this.state.departamentos.nombre}  ref={this.cajaNombreRef}/>
            <label>Nueva localidad: </label>
            <input type="text" defaultValue={this.state.departamentos.localidad}  ref={this.cajaLocRef}/>
            <button className = "btn btn-info" onClick = {this.UpdateDepartamento}>
                Modificar departamento
            </button>
        </form>)
        }
      </div>
        
    )
  }
}
