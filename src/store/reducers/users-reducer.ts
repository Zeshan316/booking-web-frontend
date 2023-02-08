import { createSlice, PayloadAction } from '@reduxjs/toolkit'

declare type Users = {
	totalUsers: number
	users: User[]
	user: User
}

const initialState: Users = {
	totalUsers: 0,
	users: [],
	user: {
		firstName: '',
		email: '',
		role: {
			name: '',
		},
	},
}

const userSlicer = createSlice({
	name: 'users',
	initialState,
	reducers: {
		setUsers: (state, action: PayloadAction<any>) => {
			const { payload } = action
			console.log('pay', payload)
			return {
				...state,
				totalUsers: payload.totalUsers,
				users: payload.users,
			}
		},
		setUserDetail: (state, action: PayloadAction<any>) => {
			const { payload } = action
			return {
				...state,
				user: payload,
			}
		},
	},
})

export const { setUsers, setUserDetail } = userSlicer.actions

export default userSlicer.reducer
