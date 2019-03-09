import React from 'react';
import { connect } from 'react-redux';
import Tweet from './Tweet';

class Dashboard extends React.Component {
  render() {
    return (
      <div>
        <h3 className='center'>Your Timeline</h3>
        <ul className='dashboard-list'>
          {this.props.tweetIds.map((id) => (
            <li key={id}>
              <Tweet id={id} />
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

const mapStateToProps = ({ tweets }) => {
  return {
    tweetIds: Object.keys(tweets)
      .sort((a, b) => tweets[b].timestamp - tweets[a].timestamp)
  }
}

export default connect(mapStateToProps)(Dashboard);

/*
connect([mapStateToProps], [mapDispatchToProps], [mergeProps], [options])

mapStateToProps - Caso este argumento seja especificado, o novo componente
vai receber as atualizações do store do React. Isso significa que a função
mapStateToProps será chamada toda vez que o store for atualizado. O resultado
de mapStateToProps deve ser um objeto simples, que será incorporado às props
do componente. Se você não quiser receber atualizações do armazenador, passe
um argumento null ou undefined no lugar de mapStateToProps.

mapDispatchToProps - Se um objeto for passado, cada função dentro dele será
interpretada como um criador de ação do Redux. Um objeto com os mesmos nomes
de função, mas em que cada criador de ação foi encapsulado em uma única chamada
de despacho para que eles pudessem ser invocados diretamente, será acrescentado
à props do componente. Se uma função for passada, ela será repassada para o
despacho como seu primeiro parâmetro. Cabe a você retornar um objeto que, de
alguma forma, usa o despacho para vincular criadores de ação à sua maneira.
(Dica: você pode usar a função auxiliar bindActionCreators() do Redux.)

*/