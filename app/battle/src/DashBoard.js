
import React from 'react'

import BonuPlayer1 from './BonusPlayer1'
import BonuPlayer2 from './BonusPlayer2'


const DashBoard = ({ player1Life, player2Life, 
  player1Bonus1, player1Bonus2, player1Bonus3, player1Bonus4, player1Bonus5, player1Bonus6, player1Bonus7, 
  player2Bonus1, player2Bonus2, player2Bonus3, player2Bonus4, player2Bonus5, player2Bonus6, player2Bonus7, 
  progress, guesses }) => (
  
    <section className="dashboard grid-2 has-gutter">
      <div className="col-all">
        <h5 className="txtcenter alert">BATTLE MONKEYS</h5>
      </div>
      <div>
        <span className="alert--danger txtleft"><span className="pls prs"> Player 1</span></span> 
        <progress className="player-1 html5" max="100" value={player1Life} label={`${player1Life}%`}></progress>
        <BonuPlayer1 
          player1Bonus1={player1Bonus1}
          player1Bonus2={player1Bonus2}
          player1Bonus3={player1Bonus3}
          player1Bonus4={player1Bonus4}
          player1Bonus5={player1Bonus5}
          player1Bonus6={player1Bonus6}
          player1Bonus7={player1Bonus7}
        />
      </div>
      <div>
        <span className="alert--success"><span className="pls prs">Player 2</span></span>
        <progress className="player-2 python" max="100" value={player2Life}></progress>
        <BonuPlayer2
          player2Bonus1={player2Bonus1}
          player2Bonus2={player2Bonus2}
          player2Bonus3={player2Bonus3}
          player2Bonus4={player2Bonus4}
          player2Bonus5={player2Bonus5}
          player2Bonus6={player2Bonus6}
          player2Bonus7={player2Bonus7}
        />
      </div>
      <div className="col-all timeline">
        Tour : {guesses}
        <progress className="css3" max="100" value={progress}></progress>
      </div>
    </section>
) 


export default DashBoard

