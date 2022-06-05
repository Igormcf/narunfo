import React from 'react';
import Form from './components/Form';
import Card from './components/Card';
import './style.css';
import Narunfo from './narunfo.png';

const sumMax = 210;
const numMax = 90;

class App extends React.Component {
  constructor() {
    super();

    this.onInputChange = this.onInputChange.bind(this);
    this.onSaveButtonClick = this.onSaveButtonClick.bind(this);
    this.deleteCard = this.deleteCard.bind(this);

    this.state = {
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
      cards: [],
      isSaveButtonDisabled: true,
      hasTrunfo: false,
    };
  }

  onInputChange({ target }) {
    const { name } = target;
    const value = target.type === 'checkbox' ? target.checked : target.value;

    this.setState({
      [name]: value,
    }, () => {
      const {
        cardName,
        cardDescription,
        cardImage,
        cardRare,
        cardAttr1,
        cardAttr2,
        cardAttr3,
      } = this.state;
      const handleSumNumbers = (
        Number(cardAttr1)
        + Number(cardAttr2)
        + Number(cardAttr3)
      );
      let disable = true;
      if (cardName && cardDescription && cardImage && cardRare
      && Number(cardAttr1) <= numMax
      && Number(cardAttr1) >= 0
      && Number(cardAttr2) <= numMax
      && Number(cardAttr2) >= 0
      && Number(cardAttr3) <= numMax
      && Number(cardAttr3) >= 0
      && handleSumNumbers <= sumMax) disable = false;
      this.setState({
        isSaveButtonDisabled: disable,
      });
    });
  }

  onSaveButtonClick() {
    const {
      cardName,
      cardDescription,
      cardAttr1,
      cardAttr2,
      cardAttr3,
      cardImage,
      cardRare,
      cardTrunfo,
    } = this.state;

    if (cardTrunfo) {
      this.setState({ hasTrunfo: true });
    }

    this.setState((prevState) => ({
      cards: [...prevState.cards, {
        cardName,
        cardDescription,
        cardAttr1,
        cardAttr2,
        cardAttr3,
        cardImage,
        cardRare,
        cardTrunfo,
      }],
    }));

    this.setState(() => ({
      cardName: '',
      cardDescription: '',
      cardAttr1: 0,
      cardAttr2: 0,
      cardAttr3: 0,
      cardImage: '',
      cardRare: 'normal',
      cardTrunfo: false,
    }));
  }

  deleteCard(name) {
    const { cards } = this.state;
    const newListCards = cards.filter((item) => item !== name);
    this.setState({
      cards: newListCards,
    }, () => {
      this.setState({
        hasTrunfo: name.hasTrunfo ? !name.hasTrunfo : name.hasTrunfo,
      });
    });
  }

  render() {
    const { cards } = this.state;
    const cardList = cards.map((item) => (
      <div key={ item.cardName } className="container-key">
        <div className="card">
          <Card
            cardName={ item.cardName }
            cardDescription={ item.cardDescription }
            cardAttr1={ item.cardAttr1 }
            cardAttr2={ item.cardAttr2 }
            cardAttr3={ item.cardAttr3 }
            cardImage={ item.cardImage }
            cardRare={ item.cardRare }
            cardTrunfo={ item.cardTrunfo }
          />
        </div>
        <button
          type="button"
          data-testid="delete-button"
          onClick={ () => this.deleteCard(item) }
          className="btn-delete"
        >
          Excluir
        </button>
      </div>
    ));
    return (
      <div className="container-master">
        <header>
          <h1>Tryunfo</h1>
        </header>
        <img src={ Narunfo } alt="narunfo" className="img-header" />
        <section className="section1">
          <h2>Crie a carta do seu ninja</h2>
        </section>
        <div className="container-form">
          <div className="container-form2">
            <Form
              { ...this.state }
              onInputChange={ this.onInputChange }
              onSaveButtonClick={ this.onSaveButtonClick }
            />
          </div>
          <div className="container-createCard">
            <div className="conatiner-card">
              <Card
                { ...this.state }
              />
            </div>
          </div>
        </div>
        <div className="cartas-criadas">
          <section className="section2">
            <h2>Cartas criadas</h2>
          </section>
          <div className="conatainer-cardList">
            { cards ? cardList : '' }
          </div>
        </div>
      </div>
    );
  }
}

export default App;
