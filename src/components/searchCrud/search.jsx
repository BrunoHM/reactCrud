import React, { Component } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import CheckIcon from '@material-ui/icons/Check';
import CreateIcon from '@material-ui/icons/Create';
import DeleteIcon from '@material-ui/icons/Delete';

import axios from 'axios'


class Search extends Component {
  constructor(){
    super()
  
    this.state = {
      tabelaDadosBanco: [],
      registros: [],
      renderiza: false
    };

    this.getStatusServer  = this.getStatusServer.bind(this);
    this.alteraRegistro   = this.alteraRegistro.bind(this);
    this.deletaRegistro   = this.deletaRegistro.bind(this);
  }

  getStatusServer = async () => {
      const response = await axios.get('http://localhost:3333/status');
      
      if(response.data.online){
        console.log("Sucesso");
      }else{
        console.error("Erro");
      }
  };

  getDataPostgres = async () => {
    console.log("Teste");
    const response = await axios.get('http://localhost:3333/simpleTable');
    
    if(response.data.result !== ""){

      this.setState({  
        registros : response.data.result,
        renderiza : true
      });

    }
  };

  alteraRegistro = async (id) => {
    let nome  = document.getElementById("nome"+id).value;
    let idade = document.getElementById("idade"+id).value;
    
    if(nome.length <= 0 && idade.length <= 0){
      return false;
    }
    
    if(nome.length <= 0){
      nome = document.getElementById("nome"+id+"-label").textContent;
    }else if(idade.length <= 0){
      idade = document.getElementById("idade"+id+"-label").textContent;
    }
    
    const response = axios.put('http://localhost:3333/simpleTable?id='+id+'&nome='+nome+'&idade='+idade)
    .then((response)=>{
      console.log(response.data)
      this.getDataPostgres();
      
    });

  }

  deletaRegistro = async (id) => {

    const response = axios.delete('http://localhost:3333/simpleTable?id='+id)
    .then((response)=>{
      console.log(response.data)
      this.getDataPostgres();
    });
  }

  DataTable = () => {
    const {registros} = this.state;

    return (
      <TableContainer component={Paper}>
        <Table size="small" aria-label="a dense table">

          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell>Nome</TableCell>
              <TableCell>Data Criação</TableCell>
              <TableCell>Idade</TableCell>
              <TableCell>Ações</TableCell>
            </TableRow>
          </TableHead>
          
          <TableBody>
            {registros.map((row) => (
              <TableRow key={row.id}>
                
                <TableCell component="th" scope="row"> {row.id} </TableCell>

                <TableCell component="th" scope="row">
                  <TextField id={'nome'+row.id} label={row.nome} variant="outlined"/>
                </TableCell>

                <TableCell component="th" scope="row"> {row.datacriacao} </TableCell>
                <TableCell component="th" scope="row">
                  <TextField id={'idade'+row.id} label={row.idade} variant="outlined"/>
                </TableCell>
                <TableCell component="th" scope="row">
                <CheckIcon  onClick={()=>this.alteraRegistro(row.id)} ></CheckIcon>
                <DeleteIcon onClick={()=>this.deletaRegistro(row.id)}></DeleteIcon>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>

        </Table>
      </TableContainer>
    )
  }

  render() {
    const {renderiza} = this.state;

    if (renderiza) {
      this.tabelaDadosBanco = (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md">
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '90vh' }}>

            <this.DataTable/>

            </Typography>
          </Container>
        </React.Fragment>
      )
    }
    
    return (
      <div>
        <Button variant="outlined" color="primary" onClick={this.getDataPostgres}>
          Search
        </Button> 
        {this.tabelaDadosBanco}
      </div>
    );

  }
}
export default Search;