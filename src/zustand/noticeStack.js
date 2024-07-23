import { create } from 'zustand'
import { v4 as uuid } from 'uuid'

const noticeStack = create(set => ({
  notifications: [],

  pushSnackbar: (message, variant, options, detail) => {
    set((state) => {
      const newItem = {
        key: uuid(),
        message,
        options: options
          ? Object.assign(options, { variant })
          : { variant },
        detail,
      }
      return { notifications: [...state.notifications, newItem] }
    })
  },

  removeSnackbar: (payload) => {
    set((state) => {
      let newState = { ...state }
      newState = state.notifications.filter(
        notification => notification.key !== payload
      )
      return { notifications: [...newState] }
    })
  },
}))

export default noticeStack
