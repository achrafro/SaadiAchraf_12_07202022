import React from 'react'

function Welcome(props) {
 

  return (
    <div className='welcome_component'>
<h1>Bonjour <div className='User_name'> {props.name} </div> </h1>
<p>Félicitation ! Vous avez explosé vos objectifs hier 👏</p>

    </div>
  )
}

export default Welcome