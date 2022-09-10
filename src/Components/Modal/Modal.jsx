import React, { useRef } from 'react'
import ReactDom from 'react-dom'
import './Modal.css'

const Background = ({ children, innerRef, ...restProps }) => (
  <div {...restProps} ref={innerRef} className="background center">
    {children}
  </div>
  // <motion.div
  //   initial={{ opacity: 0 }}
  //   animate={{ opacity: 1 }}
  //   exit={{ opacity: 0 }}
  //   transition={{ ease: 'easeIn', duration: 0.05 }}
  // >
  //   <div {...restProps} ref={innerRef} className="background center">
  //     {children}
  //   </div>
  // </motion.div>
)

const Modal = ({ modal, setModal, children }) => {
  var modalRef = useRef()
  const closeModal = (e) => {
    if (modalRef.current === e.target) setModal(false)
  }
  if (!modal) return null
  return ReactDom.createPortal(
    <Background innerRef={modalRef} onClick={closeModal}>
      {/* <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.1, duration: 0.2, ease: "easeOut" }}
      > */}
      {children}
      {/* </motion.div> */}
    </Background>,
    document.getElementById('modal'),
  )
}

export default Modal
