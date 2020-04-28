import PropTypes from 'prop-types'

import React from 'react'

import Player from './Player'


let player1Pos = 55
let player2Pos = 61
let style = ''
class Case extends React.Component {
    constructor(props){
        super(props)
        this.infoPlayer = []
       
        this.playerPos= this.props.position
        this.xIsNext= this.props.xIsNext
        this.click= this.props.click
        this.action = this.props.actions

        this.state = {
            test: this.props.actions,
            value: this.props.case
        }
    }

    _attackPlayer(i) {
        let EspectedActionPlayer1 = player1Pos
        let EspectedActionPlayer2 = this.state.player2
        //même position
        if (player1Pos === this.state.player2) {
          this.diceGame()
        } 
        //corps à corps
        if (this.state.player1Bonus6.length > 0 ) {
          if (this.checkPosPlayer2() && this.state.player2Bonus3[1] === 0 ) {
            this.state.player1Bonus1[1] > 0 ? this.setState({ player2Life: this.state.player2Life - 60 })
                : this.setState({ player2Life: this.state.player2Life - 30 })
          }
        }
        if (this.state.player2Bonus6.length > 0 ) {
          if (this.checkPosPlayer1() && this.state.player1Bonus3[1] === 0 ) {
            this.state.player2Bonus1[1] > 0 ? this.setState({ player1Life: this.state.player1Life - 60 })
                : this.setState({ player1Life: this.state.player1Life - 30 })
          }
        }
    
        //actions générales
        if (this.state.listActions.length >= EspectedActionPlayer1 && this.state.stepNumber%2 !==0) {
          console.log("action player 1")
          this.actionPlayer1(EspectedActionPlayer1)
        }
        if (this.state.listActions.length >= EspectedActionPlayer2 && this.state.stepNumber%2 !==0 ) {
          console.log("action player 2")
          this.actionPlayer2(EspectedActionPlayer2)
        }
      }

    _playerInfo(infos) {
       this.infoPlayer = this.infoPlayer.concat(infos)
       
        if (this.infoPlayer[0].play === true) {
           
            console.log(" PLayer 1 = "+ this.infoPlayer[0].position + " list actions " + this.props.actions)
            //this._displayCase(this.infoPlayer[0].position) 
        }
    }

    _renderPlayer(i, position, index, play) {
        return <Player playerNumber={i} play={play} life={100} position={position} case={index} getInfo={(i) => this._playerInfo(i)} />;
      }

    _changePlayerPosition(PlayerPosition) {
        let position = null
        !this.props.click ? position = player1Pos : position = PlayerPosition

        if (!this.props.xIsNext && player1Pos !== this.props.playerPos) {
            player1Pos = this.props.playerPos
        } else if (this.props.xIsNext && player2Pos !== this.props.playerPos) {
            player2Pos = this.props.playerPos
        }
    }

    _displayCase(PlayerPosition) {
        if (this._calculatePosition(PlayerPosition, this.props.case, 1)) {
            
            this.props.actions.length > 0 && this.state.value < this.props.actions.length ?
                style = `active bg-${this.props.actions[this.state.value]}`
            : style = `active` 

        } else {
            this.props.actions.length > 0 && this.state.value < this.props.actions.length ?
                style = ` bg-${this.props.actions[this.state.value]}`
            : style = '' 
        }
        
       return (
            <button className={style} tabIndex={1} onClick={this.props.boardCaseClick}> </button>
        )
    }

    render () {
        const { value} = this.state
        return (
            <div className={`square ${value}`} >
                {player1Pos === value ? this._renderPlayer(1, player1Pos, value, true) : null}
                {player2Pos === value ? this._renderPlayer(2, player2Pos, value, false) : null}
                {this._changePlayerPosition(this.props.playerPos)}
                {this._displayCase(
                    this.props.xIsNext ? player1Pos : player2Pos
                )}
            </div>
        )
    }

    _calculatePosition(player, square, jump) {
        let lines = [ -2, -1, 1, 2, -11, -12, -13, -14, -15,-24,-25,-26, -27,-28, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28];
        //console.log("_calculatePosition player pos = " + player + " square " + square)
        switch(player) {
          case 0:
            lines = [ 1, 2, 13, 14, 15, 26, 27, 28];
            break;
          case 1:
              lines = [ 1,-1, 2,12, 13, 14, 15,25, 26, 27, 28];
              break;
          case 11:
                lines = [ 1, -1, -2, 11, 12, 13, 14, 24, 25, 26, 27];
                break;
          case 12:
            lines = [ -1, -2,11,12, 13, 24, 25, 26];
            break;
          case 13:
              lines = [ 1, 2,-11,-12, 13,-13, 14, 15, 26, 27, 28];
              break;
          case 14:
                lines = [ 1,-1, 2,-11,-12,12, 13,-13, 14,-14, 15,25, 26, 27, 28];
                break;
          case 24:
            lines = [1, -1, -2,11, 12, -12, 13,-13, 14,-14,-15,24,25,-25, 26, 27];
            break;
          case 25:
            lines = [ -1, -2,11, 12, 13,-13,-14,-15,24,25, 26];
            break;
          case 26:
            lines = [ 1, 2,-11,-12, 13,-13, 14, 15,-24, -25, 26,-26, 27, 28];
            break;
          case 27:
            lines = [ 1,-1, 2,-11,-12,12, 13,-13, 14,-14, 15,25,-24, -25, 26,-26, 27,-27, 28];
            break;
          case 37:
            lines = [ 1, -1, -2,11, 12, -12, 13,-13, 14,-14,-15,24, 25, -25, 26,-26, 27,-27 , -28];
            break;
          case 38:
              lines = [ -1, -2,11, 12, 13,-13,-14,-15,24,25, 26,-26, 27,-27, 28, -28];
              break;
          case 39:
            lines = [ 1, 2,-11,-12, 13,-13, 14, 15, -26, -25, -24];
            break;
          case 40:
              lines = [ 1,-1, 2,-11,-12,12, 13,-13, 14,-14, 15, -24 ,-25, -26, -27];
              break;
          case 50:
            lines = [ 1, -1, -2,11, 12, 13, 14, -12, -13,-14,-15, -25, -26, -27, -28];
            break;
          case 51:
            lines = [ -1, -2,11,12, 13,-13,-14,-15, -26, -27, -28];
            break;
          case 52:
              lines = [ 1, 2, -13, -12, -11, -26,-25,-24];
              break;
          case 53:
            lines = [ 1,-1, 2,-14, -13, -12, -11, -27, -26,-25,-24];
            break;
          case 63:
              lines = [ -1, 1, -2, -12, -13, -14, -15, -25, -26,-27,-28];
              break;
          case 64:
            lines = [ -1, -2, -13, -14, -15, -26,-27,-28];
            break;
          
          default:
            lines = [ -2, -1, 1, 2, -11, -12, -13, -14, -15,-24,-25,-26, -27,-28, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28];  
        }
        if (jump===2) {
           lines = [-4, -3,-2, -1, 1, 2, 3, 4, -9, -10, -11, -12, -13, -14, -15, -16, -17, -22, -23, -24,-25,-26, -27,-28, -29, -30, 9, 10, 11, 12, 13, 14, 15, 16, 17, 22, 23, 24, 25, 26, 27, 28, 29, 30];
        }
        for (let i = 0; i < lines.length; i++) {
          if (lines[i] + player === square) {
            return true
          }
        }
     
        return null
      }
}


  export default Case