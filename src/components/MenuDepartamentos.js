import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';
import Global from '../Global';


export default class MenuDepartamentos extends Component {
  state = {
    statusGet: false,
    departamentos: {}
  }

  loadDepartamentos = () => {
    var request = "/api/departamentos"
    var url = Global.urlDepartamentos + request;
    axios.get(url).then(res => {
      this.setState({
        statusGet: true,
        departamentos: res.data
      })
    })
  }

  componentDidMount = () =>{
    this.loadDepartamentos();
  }


  render() {
    return (
        <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">CRUD departamentos</a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link active" aria-current="page" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/create">Create</NavLink>
              </li>
              <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Departamentos
                </a>
                <ul className="dropdown-menu">
                  {
                    this.state.statusGet == true &&
                    (this.state.departamentos.map((dep, index)=>{
                      return(<li key={dep.numero}><a className="dropdown-item" href={"/detalle/"+dep.numero + "/" + dep.nombre + "/" + dep.localidad}>{dep.nombre}</a></li>)
                    })) 
                  }
                  {/* <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider"/></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li> */}
                </ul>
              </li>
              {/* <li className="nav-item">
                <a className="nav-link disabled">Disabled</a>
              </li> */}
            </ul>
            <form className="d-flex" role="search">
              <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
              <button className="btn btn-outline-success" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>
    )
  }
}
