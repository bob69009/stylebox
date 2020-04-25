import PropTypes from 'prop-types'

import React from 'react'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      //playerNumber:1,
      life:this.props.life,
      position:0,
      vanish:null,
      bonnus1: [0,0],
      bonnus2: [0,0],
      bonnus3: [0,0],
      bonnus4: [0,0],
      bonnus6: [0,0],
      bonnus7: [0,0]
    }
  }

  render() {
    const { playerNumber } = this.props
    return (
      <span className={`player-${playerNumber} ${this.state.vanish}`}> 
        <progress max='100' value={this.state.life}></progress>
      </span>
    )
  }

}

/*
const Player = ({ playerNumber, life, vanish}) => (
    <span className={`player-${playerNumber} ${vanish}`}> 
        <progress max='100' value={life}></progress>
    </span>
)

*/


export default Player