import { createSlice, PayloadAction } from '@reduxjs/toolkit'

declare type Users = {
	totalUsers: number
	users: User[]
}

const initialState: Users = {
	totalUsers: 0,
	users: [],
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
	},
})

export const { setUsers } = userSlicer.actions

export default userSlicer.reducer
