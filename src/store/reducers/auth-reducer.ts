import { createSlice, PayloadAction } from '@reduxjs/toolkit'

type AuthUser = {
	IsLoggedIn: boolean
	jwtToken: string
} & User

const initialState: AuthUser = {
	firstName: '',
	lastName: '',
	email: '',
	profileImage: '',
	IsLoggedIn: false,
	jwtToken: '',
}

const authSlicer = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		setUserData: (state, action: PayloadAction<any>) => {
			const { payload } = action
			return {
				...state,
				firstName: payload?.firstname,
			}
		},
	},
})

export const { setUserData } = authSlicer.actions

export default authSlicer.reducer
