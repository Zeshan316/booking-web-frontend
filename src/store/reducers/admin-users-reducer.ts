import { createSlice, PayloadAction } from '@reduxjs/toolkit'

declare type AdminUsers = {
	users: User[]
}

const initialState: AdminUsers = {
	users: [],
}

const adminUserSlicer = createSlice({
	name: 'adminUsers',
	initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<any>) => {
			const { payload } = action
			//console.log('payload', payload)
			sessionStorage.setItem('token', payload.jwtToken)
			sessionStorage.setItem('user', JSON.stringify(payload.user))
			return {
				...state,
				isLoggedIn: payload.jwtToken ? true : false,
				...payload,
			}
		},
	},
})

export const { setUsers } = adminUserSlicer.actions

export default adminUserSlicer.reducer
