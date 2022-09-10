import { useState } from 'react'
import './UseInput.css'
import PropTypes from 'prop-types'

const UseInput = (props) => {
  const {
    background = '#f5f5f5',
    borderType = 'solid',
    borderColor = '	#02808f',
    placeholderColor = '#6d99a2',
    name,
    placeholder = 'Enter Your Name',
    error = false,
    required = false,
    getFieldValue,
  } = props

  const [value, setValue] = useState('')

  const getBorderClassFromType = (type) => {
    switch (type) {
      case 'none':
        return ' '
      case 'solid':
        return 'one'
      case 'bottom':
        return 'two'
      case 'box':
        return 'three'
      default:
        return ''
    }
  }

  const handleInputChange = (e) => {
    const { value } = e.target
    setValue(value)
    // getFieldValue(value);
  }

  return (
    <div className={'container'}>
      <label className={`customField ${getBorderClassFromType(borderType)}`}>
        <input
          className={'defaultClass'}
          style={{
            borderColor: borderColor,
          }}
          //   type="email"
          placeholder="&nbsp;"
          onChange={(e) => handleInputChange(e)}
          name={name}
          value={value}
          // required={required}
        //   rules='required'
        />
        <span style={{ color: placeholderColor }} className={'placeholder'}>
          {placeholder}
        </span>

        {/* ERROR MESSAGE SPACE */}
        {error && (
          <span
            id={'errorMessage'}
            className={'errorMessage'}
            aria-live="polite"
          >
            The email is invalid
          </span>
        )}

        {/* ANIMATED BORDER SPACE */}
        {borderType === 'box' && <span className={'border'}></span>}
      </label>

      {/* <label className={`${classList.customField} ${classList.one}`}>
        <input type="text" placeholder="&nbsp;" />
        <span className={classList.placeholder}>Enter your Name</span>
      </label>

      <label className={`${classList.customField} ${classList.two}`}>
        <input type="url" placeholder="&nbsp;" />
        <span className={classList.placeholder}>Enter URL</span>
      </label>

      <label className={`${classList.customField} ${classList.three}`}>
        <input type="password" placeholder="&nbsp;" />
        <span className={classList.placeholder}>Enter Password</span>
        <span className={classList.border}></span>
      </label> */}
    </div>
  )
}

UseInput.propTypes = {
  borderType: PropTypes.string,
  borderColor: PropTypes.object,
  placeholderColor: PropTypes.string,
}

export default UseInput
