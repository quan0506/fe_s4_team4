import {create} from 'zustand'

const UserStore = create((set) => ({
  user: '',
  setUser: (data) => set({user: data}), 
  clearUser: () => set({user: emptyUser})
}))

export default UserStore

