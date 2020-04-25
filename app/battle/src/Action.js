import PropTypes from 'prop-types'

import React from 'react'


const Action = ({ action, index }) => (
    <div><button className={`bg-${action}`}></button></div>
  )

Action.propTypes = {
  action: PropTypes.number.isRequired,
  index: PropTypes.number.isRequired,
}

  export default Action