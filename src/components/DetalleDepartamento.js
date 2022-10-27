import axios from "axios";
import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import Global from "../Global";
import "./../App.css";
import loading from "./../assets/images/loading.gif";

export default class DetalleDepartamento extends Component {
  state = {
    empleados: {},
    statusEmp: false,
  };

  loadEmpleados = () => {
    var departamento = this.props.iddepartamento;
    var request = "/api/Empleados/EmpleadosDepartamento/" + departamento;
    var url = Global.urlEmpleados + request;
    axios.get(url).then((res) => {
      this.setState({
        statusEmp: true,
        empleados: res.data,
      });
    });
  };

  componentDidMount = () => {
    this.loadEmpleados();
  };

  componentDidUpdate = (oldProps) => {
    if (oldProps.iddepartamento != this.props.iddepartamento){
      this.loadEmpleados();
    }
  }

  render() {
    if (this.state.statusEmp == true) {
      return (
        <div className="App">
          <h1>Detalles departamento Nº {this.props.iddepartamento}</h1>
          <h2 style={{ color: "blue" }}>Nombre: {this.props.nombre}</h2>
          <h2 style={{ color: "green" }}>Localidad: {this.props.localidad}</h2>
          <table className="table table-info table-striped">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Apellido</th>
                <th scope="col">Oficio</th>
                <th scope="col">Salario</th>
                <th scope="col">Acciones</th>
              </tr>
            </thead>
            <tbody>
            {
              this.state.empleados.map((emp, index) =>{
                return(<tr key={emp.idEmpleado}>
                  <td>{emp.idEmpleado}</td>
                  <td>{emp.apellido}</td>
                  <td>{emp.oficio}</td>
                  <td>{emp.salario}</td>
                  <td><NavLink to={"/empleado/" + emp.idEmpleado} className="btn btn-info">Informacion</NavLink></td>
                </tr>)
              })
            }
            </tbody>
          </table>
          <NavLink to="/" className="btn btn-info">
            Volver a Home
          </NavLink>
        </div>
      );
    } else {
      return (
        <div className="App">
          <img src={loading} />
        </div>
      );
    }
  }
}
