let formRefAccessor = null

const UseForm = (props) => {
  const { form, onFinish, children } = props
  formRefAccessor = form

  const handleFormSubmit = (e) => {
    e.preventDefault()
    const nodesArr = [...e.target.elements]
    const valuesObj = nodesArr.reduce((acc, node) => {
      if (node.name) {
        acc[node.name] = node.value
      }
      return acc
    }, {})
    onFinish(valuesObj)
  }

  return (
    <div>
      <form
        ref={form}
        onSubmit={(e) => {
          handleFormSubmit(e)
        }}
      >
        {children}
      </form>
    </div>
  )
}

export default UseForm

const getFormData = () => {
  const nodesArr = [...formRefAccessor.current.elements]
  const valuesObj = nodesArr.reduce((acc, node) => {
    if (node.name) {
      acc[node.name] = node.value
    }
    return acc
  }, {})
  return valuesObj
}

// get form field value
const getFieldValue = (fieldName) => {
  const nodesArr = [...formRefAccessor.current.elements]
  const value = nodesArr.reduce((acc, node) => {
    if (node.name === fieldName) {
      acc = node.value
    }
    return acc
  }, '')
  return value
}

export const formMethodsObject = {
  getFormData: () => {
    return getFormData()
  },
  getFieldValue: (fieldName) => {
    return getFieldValue(fieldName)
  },
}
