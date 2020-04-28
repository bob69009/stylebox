import PropTypes from 'prop-types'

import React, { Component, Fragment } from 'react'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        play: this.props.play,
        case: this.props.case,
        number: this.props.playerNumber,
        life:this.props.life,
        position:this.props.position,
        bonus1:[0,0], //bonus1
        bonus2:[0,0], //bonus2
        bonus3:[0,0], //bonus3
        bonus4:[0,0], //bonus4
        bonus5:[0,0], //bonus5
        bonus6:[0,0] //bonus6
    }
    
  }
  

  _updatePos(i) {
      if (i !== this.position) {
        this.position = i;
      
    }
  }

  _display(){
    const vanish = this.state.bonus5[1] > 0 ? 'vanish' : null 
    
    if (this.state.case === this.state.position) {
      return (
        <span className={`player-${this.state.number} ${vanish}`} value={this.props.getInfo(this.state)}> 
          <progress max='100' value={this.state.life}></progress>
        </span>
       
      )
    }
  }

  render() {
    return (
      <div>
        {this._display()} 
      </div>
    )
  }

}


export default Player