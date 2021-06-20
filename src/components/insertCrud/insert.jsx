import React, {Component} from 'react'

export default class insert extends Component {
    constructor(props) {
      super(props);
      this.state = { };
    }


    // carregaPessoas = async () => {

    //     const response = await axios.post('http://localhost:8080/pessoas', {
    //         nome : this.filtros.nome,
    //         sobrenome : this.filtros.sobrenome
    //     });

    //     this.setState({ pessoas : response.data });
    //     this.setNumeroPaginas();
    // };


    render() {
      return (
        <div>
          <span>
            insert jsx
          </span>
        </div>
      );
    }
  }