import { createSlice, PayloadAction } from '@reduxjs/toolkit'

declare type RoleProps = {
	totalRoles: number
	roles: Role[]
}

const initialState: RoleProps = {
	totalRoles: 0,
	roles: [],
}

const roleSlicer = createSlice({
	name: 'role',
	initialState,
	reducers: {
		setRoles: (state, action: PayloadAction<any>) => {
			const { payload } = action
			return {
				...state,
				totalRoles: payload.totaRoles,
				roles: payload.roles,
			}
		},
	},
})

export const { setRoles } = roleSlicer.actions

export default roleSlicer.reducer
