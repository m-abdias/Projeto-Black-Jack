import React from 'react'
import './App.css'

class App extends React.Component {
  comprarCarta = () => {
    // Cria array de cartas
    const cartas = [
      'A',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      '10',
      'J',
      'Q',
      'K'
    ]

    // Cria array de naipes
    const naipes = ['♦️', '♥️', '♣️', '♠️']

    // Sorteia uma carta
    const numero = cartas[Math.floor(Math.random() * 13)]

    // Sorteia um naipe
    const naipe = naipes[Math.floor(Math.random() * 4)]

    let valor

    // Verifica se é uma das letras e coloca o valor correspondente na variável valor
    if (numero === 'A') {
      valor = 11
    } else if (numero === 'J' || numero === 'Q' || numero === 'K') {
      valor = 10
    } else {
      // Se nao for uma das letras, só converte a string para número
      valor = Number(numero)
    }

    // Cria um objeto da carta com as propriedades que vamos precisar: texto e valor
    const carta = {
      texto: numero + naipe,
      valor: valor
    }

    return carta
  }

  // Preciso saber como fazer essa função
  jogar = () => {
    const iniciarJogo = true
    switch (iniciarJogo) {
      case false:
        return 'O jogo acabou!'

      default:
        const carta1Usuario = this.comprarCarta()
        const carta2Usuario = this.comprarCarta()
        let valorUsuario = carta1Usuario.valor + carta2Usuario.valor

        const carta1Computador = this.comprarCarta()
        const carta2Computador = this.comprarCarta()
        let valorComputador = carta1Computador.valor + carta2Computador.valor

        while (valorUsuario === 22) {
          carta1Usuario = this.comprarCarta()
          carta2Usuario = this.comprarCarta()
          valorUsuario = carta1Usuario.valor + carta2Usuario.valor
        }

        while (valorComputador === 22) {
          carta1Computador = this.comprarCarta()
          carta2Computador = this.comprarCarta()
          valorComputador = carta1Computador.valor + carta2Computador.valor
        }

        let cartasUsuario = `${carta1Usuario.texto} ${carta2Usuario.texto}`
        let cartasComputador = `${carta1Computador.texto} ${carta2Computador.texto}`
        let novasCartas = true

        while (novasCartas && valorUsuario <= 21) {
          novasCartas = `Suas cartas são ${cartasUsuario}. A carta revelada do computador é ${carta1Computador.texto}
         Deseja comprar mais uma carta?`
          if (novasCartas) {
            const novaCarta = this.comprarCarta()
            valorUsuario += novaCarta.valor
            cartasUsuario += ` ${novaCarta.texto}`
          }
        }

        while (valorComputador <= valorUsuario && valorUsuario <= 21) {
          const novaCarta = this.comprarCarta()
          valorComputador += novaCarta.valor
          cartasComputador += ` ${novaCarta.texto}`
        }

        let vencedor = 'O Computador ganhou!'

        if (
          (valorUsuario < 22 && valorUsuario > valorComputador) ||
          valorComputador > 21
        ) {
          vencedor = 'O usuário ganhou!'
        } else if (valorUsuario === valorComputador) {
          vencedor = 'Empatou!'
        }
        return iniciarJogo
    }
  }

  render() {
    return (
      <div className="App">
        <h1>Bem vindo ao jogo de Blackjack!</h1>
        <h2>Quer iniciar uma nova rodada?</h2>
        <button onClick={() => this.jogar(this.iniciarJogo === true)}>
          SIM
        </button>
        <button onClick={() => this.jogar(this.iniciarJogo === false)}>
          NÃO
        </button>
        <div>
          <p>
            <strong>Usuário - Cartas:</strong> {this.cartasUsuario} - Pontuação:
            {this.valorUsuario}
          </p>
          <p>
            <strong>Computador - Cartas: </strong>
            {this.cartasComputador} - Pontuação:
            {this.valorComputador} {this.vencedor}
          </p>
        </div>
      </div>
    )
  }
}

export default App
