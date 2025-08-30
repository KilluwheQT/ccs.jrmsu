import { ref } from 'vue'

const alerts = ref([])

export function useAlert() {
  const showAlert = (options) => {
    const id = Date.now() + Math.random()
    const alert = {
      id,
      ...options
    }
    
    alerts.value.push(alert)
    
    return new Promise((resolve) => {
      const handleConfirm = () => {
        removeAlert(id)
        resolve(true)
      }
      
      const handleCancel = () => {
        removeAlert(id)
        resolve(false)
      }
      
      const handleClose = () => {
        removeAlert(id)
        resolve(false)
      }
      
      alert.onConfirm = handleConfirm
      alert.onCancel = handleCancel
      alert.onClose = handleClose
    })
  }
  
  const removeAlert = (id) => {
    const index = alerts.value.findIndex(alert => alert.id === id)
    if (index > -1) {
      alerts.value.splice(index, 1)
    }
  }
  
  // Convenience methods
  const success = (message, title = 'Success') => {
    return showAlert({
      type: 'success',
      title,
      message,
      autoClose: true,
      autoCloseDelay: 3000
    })
  }
  
  const error = (message, title = 'Error') => {
    return showAlert({
      type: 'error',
      title,
      message
    })
  }
  
  const warning = (message, title = 'Warning') => {
    return showAlert({
      type: 'warning',
      title,
      message
    })
  }
  
  const info = (message, title = 'Information') => {
    return showAlert({
      type: 'info',
      title,
      message,
      autoClose: true,
      autoCloseDelay: 4000
    })
  }
  
  const confirm = (message, title = 'Confirm') => {
    return showAlert({
      type: 'warning',
      title,
      message,
      showCancel: true,
      confirmText: 'Confirm',
      cancelText: 'Cancel'
    })
  }
  
  return {
    alerts,
    showAlert,
    removeAlert,
    success,
    error,
    warning,
    info,
    confirm
  }
}
