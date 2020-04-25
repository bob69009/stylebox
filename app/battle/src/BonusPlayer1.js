
import React from 'react'


const BonusPlayer1 = ({ player1Bonus1, player1Bonus2, player1Bonus3, player1Bonus4, player1Bonus5, player1Bonus6, player1Bonus7 }) => (
    <div className='player1'>
        {player1Bonus1[1] > 0 ? <div className={`bg-${player1Bonus1[0]}`}>X{player1Bonus1[1]} </div> : null }
        {player1Bonus2[1] > 0 ? <div className={`bg-${player1Bonus2[0]}`}>X{player1Bonus2[1]} </div> : null }
        {player1Bonus3[1] > 0 ? <div className={`bg-${player1Bonus3[0]}`}>X{player1Bonus3[1]} </div> : null }
        {player1Bonus4[1] > 0 ? <div className={`bg-${player1Bonus4[0]}`}>X{player1Bonus4[1]} </div> : null }
        {player1Bonus5[1] > 0 ? <div className={`bg-${player1Bonus5[0]}`}>X{player1Bonus5[1]} </div> : null }
        {player1Bonus6[1] > 0 ? <div className={`bg-${player1Bonus6[0]}`}>X{player1Bonus6[1]} </div> : null }
        {player1Bonus7[1] > 0 ? <div className={`bg-${player1Bonus7[0]}`}>X{player1Bonus7[1]} </div> : null }
    </div>
  )
 



  export default BonusPlayer1



