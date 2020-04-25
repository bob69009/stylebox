import PropTypes from 'prop-types'

import React from 'react'

import Player from './Player'

const Square = ({ 
    xIsNext, 
    player1, 
    player2, 
    player1Life, 
    player2Life,
    player1Vanish, 
    player2Vanish,
    player1Sleep,
    player2Sleep, 
    player1Jump,
    player2Jump,
    actions, 
    square, 
    index, 
    onClick }) => (
    <div className={`square ${index}`}>
        
        {square === player1 ? <Player playerNumber={1} life={player1Life} vanish={player1Vanish} /> : null}
        {square === player2 ? <Player playerNumber={2} life={player2Life} vanish={player2Vanish} /> : null} 
        
        {xIsNext === true ? 
            calculatePosition(player1, square, player1Jump) && !player1Sleep ?
              actions.length > 0 && index < actions.length ? 
              <button className={`active bg-${actions[index]}`} onClick={()=> onClick(index)}> </button>
              : <button className={`active`} onClick={()=> onClick(index)}></button>
            : actions.length > 0 && index < actions.length ? 
              <button className={`bg-${actions[index]}`}></button>
              : <button></button>
          
        :
            calculatePosition(player2, square, player2Jump) && !player2Sleep ? 
              actions.length > 0 && index < actions.length ? 
              <button className={`active bg-${actions[index]}`} onClick={()=> onClick(index)}></button>
              : <button className={`active`} onClick={()=> onClick(index)}></button>
            : actions.length > 0 && index < actions.length ? 
              <button className={`bg-${actions[index]}`}></button>
              : <button></button>
        } 
        
    </div>
  )
  
  function calculatePosition(player, square, jump) {
    let lines = [ -2, -1, 1, 2, -11, -12, -13, -14, -15,-24,-25,-26, -27,-28, 11, 12, 13, 14, 15, 24, 25, 26, 27, 28];

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

Square.propTypes = {
  xIsNext: PropTypes.bool.isRequired,
  index: PropTypes.number.isRequired,
  onClick: PropTypes.func.isRequired,
}

  export default Square