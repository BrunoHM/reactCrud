import React, { Component } from 'react'

import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';

import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

import axios from 'axios'

function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const a = [
  { name: "test", values: ["a", "b", "c"] },
  { name: "test2", values: ["a1", "b1", "c1"] }
];

let values = [];

const DataTable = () => {
  return (
    <TableContainer component={Paper}>
    <Table size="small" aria-label="a dense table">
      <TableHead>
        <TableRow>
          <TableCell>Dessert (100g serving)</TableCell>
          <TableCell align="right">Calories</TableCell>
          <TableCell align="right">Fat&nbsp;(g)</TableCell>
          <TableCell align="right">Carbs&nbsp;(g)</TableCell>
          <TableCell align="right">Protein&nbsp;(g)</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {values.map((row) => (
          <TableRow key={row.name}>
            <TableCell component="th" scope="row">
              {row.name}
            </TableCell>
            <TableCell align="right">{row.calories}</TableCell>
            <TableCell align="right">{row.fat}</TableCell>
            <TableCell align="right">{row.carbs}</TableCell>
            <TableCell align="right">{row.protein}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  </TableContainer>
  );
}

class Search extends Component {
  constructor(){
    super()
  
    this.state = {
      registros: [],
      renderiza: false
    };

    this.getStatusServer = this.getStatusServer.bind(this);
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
    const response = await axios.get('http://localhost:3333/simpleTable');
    
    if(response.data.result !== ""){
      console.log(response.data.result[0]);

      this.setState({  
        registros : response.data,
        renderiza : true
      });

      values = response.data
      
    }
  };

  

  render() {
    const {registros, renderiza} = this.state;

    if (renderiza) {
      return <div>Loading ... </div>;
    } else {
      return (
        <React.Fragment>
          <CssBaseline />
          <Container maxWidth="md">
            <Typography component="div" style={{ backgroundColor: '#cfe8fc', height: '90vh' }}>

              <form noValidate autoComplete="off"> 
                <Box m={3} pt={2}>
                  <Button variant="outlined" color="primary" onClick={this.getDataPostgres}>
                    Search
                  </Button>
                </Box>
              </form>

            </Typography>
          </Container>
        </React.Fragment>
      );
    }
  }
}
export default Search;