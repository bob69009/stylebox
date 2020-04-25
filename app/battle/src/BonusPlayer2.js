
import React from 'react'


const BonusPlayer2 = ({ player2Bonus1, player2Bonus2, player2Bonus3, player2Bonus4, player2Bonus5, player2Bonus6, player2Bonus7 }) => (
    <div className='player2'>
        {player2Bonus1[1] > 0 ? <div className={`bg-${player2Bonus1[0]}`}>X{player2Bonus1[1]} </div> : null }
        {player2Bonus2[1] > 0 ? <div className={`bg-${player2Bonus2[0]}`}>X{player2Bonus2[1]} </div> : null }
        {player2Bonus3[1] > 0 ? <div className={`bg-${player2Bonus3[0]}`}>X{player2Bonus3[1]} </div> : null }
        {player2Bonus4[1] > 0 ? <div className={`bg-${player2Bonus4[0]}`}>X{player2Bonus4[1]} </div> : null }
        {player2Bonus5[1] > 0 ? <div className={`bg-${player2Bonus5[0]}`}>X{player2Bonus5[1]} </div> : null }
        {player2Bonus6[1] > 0 ? <div className={`bg-${player2Bonus6[0]}`}>X{player2Bonus6[1]} </div> : null }
        {player2Bonus7[1] > 0 ? <div className={`bg-${player2Bonus7[0]}`}>X{player2Bonus7[1]} </div> : null }
    </div>
) 



export default BonusPlayer2

