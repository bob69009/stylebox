import PropTypes from 'prop-types'

import React, { Component, Fragment } from 'react'

class Player extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
        case:     this.props.case,
        number:   this.props.playerNumber,
        life:     this.props.life,
        position: this.props.position,
        bonus1:   this.props.bonus1, //bonus1
        bonus2:   this.props.bonus2, //bonus2
        bonus3:   this.props.bonus3, //bonus3
        bonus4:   this.props.bonus4, //bonus4
        bonus5:   this.props.bonus5, //bonus5
        bonus6:   this.props.bonus6, //bonus6
        bonus7:   this.props.bonus7 //bonus6
    }
    
  }
  
  

  _update() {
      this.setState({
        case:     this.props.case,
        number:   this.props.playerNumber,
        life:     this.props.life,
        position: this.props.position,
        bonus1:   this.props.bonus1, //bonus1
        bonus2:   this.props.bonus2, //bonus2
        bonus3:   this.props.bonus3, //bonus3
        bonus4:   this.props.bonus4, //bonus4
        bonus5:   this.props.bonus5, //bonus5
        bonus6:   this.props.bonus6, //bonus6
        bonus7:   this.props.bonus7 //bonus6
      })
  }

  _display(){
   // const vanish = this.state.bonus5[1] > 0 ? 'vanish' : null 
    let vanish = ''
    if (this.props.bonus5[1] > 0 ) {vanish = 'vanish'}
    if (this.state.case === this.state.position) {
      return (
        <span className={`player-${this.state.number} ${vanish}`} value={this.props.getInfo(this.props)}> 
          <progress max='100' value={this.state.life}></progress>
        </span>
       
      )
    }
  }

  render() {
    //console.log("render player = " + this.state.position)
    return (
      <div> 
        {this._display()} 
        
      </div>
    )
  }

}


export default Player