import React, { Component } from "react";
import "./../App.css";
import axios from "axios";
import Global from "../Global";
import loading from "./../assets/images/loading.gif";

export default class DetalleEmpleado extends Component {
  state = {
    empleado: {},
    statustEmp: false,
  };

  loadEmpSelected = () => {
    var id = this.props.idempleado;
    var request = "/api/Empleados/" + id;
    var url = Global.urlEmpleados + request;
    console.log(url)
    axios.get(url).then((res) => {
      this.setState({
        statustEmp: true,
        empleado: res.data,
      });
    });
  };

  componentDidMount = () => {
    this.loadEmpSelected();
  }

  render() {
    if (this.state.statustEmp == true) {
      return (
        <div className="App">
          <h1>Detalle Empleado {this.props.idempleado}</h1>
          <ul>
            <li>{this.state.empleado.apellido}</li>
            <li>{this.state.empleado.oficio}</li>
            <li>{this.state.empleado.salario}</li>
          </ul>
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
