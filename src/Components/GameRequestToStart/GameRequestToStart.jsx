import React, { useRef } from 'react'
import UseForm, { formMethodsObject } from '../UseForm/UseForm'
import UseInput from '../UseInput/UseInput'
import './GameRequestToStart.css'

const GameRequestToStart = ({ onStartGame }) => {
  const formRef = useRef(null)

  const onSubmit = () => {
    const playerName = formMethodsObject.getFieldValue('nickName')
    onStartGame(playerName)
  }

  return (
    <div className="game_request_container">
      <p>Ready To Play ?</p>
      {/* dragon caught you */}

      {/* you caught the dragon */}
      <div className="secondary_text">Give us your nick name to call..</div>
      <UseForm
        form={formRef}
        onFinish={(e) => {
          console.log('I AM IN FORM', e)
        }}
      >
        <UseInput
          getFieldValue={(e) => {
            console.log(e)
          }}
          required
          placeholder="Your Nick Name"
          name="nickName"
        />
      </UseForm>
      <div className="btn_wrapper">
        <button className="c_button" onClick={onSubmit}>
          Start
        </button>
      </div>
    </div>
  )
}

export default GameRequestToStart
