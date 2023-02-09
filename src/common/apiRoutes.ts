import queryString from 'query-string'

export const AUTH_ROUTES: GenericObject = {
	login: 'api/auth',
}

export const USER_ROUTES: GenericObject = {
	getUsers: (tableFilters: GenericObject): string =>
		`api/users?${queryString.stringify(tableFilters)}`,
	getUser: (id: string) => `api/users/${id}`,
	createUser: () => `api/users`,
	updateUser: (id: string) => `api/users/${id}`,
	deleteUser: (id: string) => `api/users/${id}`,
}

export const ROLES_ROUTES: GenericObject = {
	getRoles: (tableFilters: GenericObject): string =>
		`api/roles?${queryString.stringify(tableFilters)}`,
	getRole: (id: string) => `api/users/${id}`,
	createRole: (id: string) => `api/roles`,
	updateRole: (id: string) => `api/roles/${id}`,
	deleteRole: (id: string) => `api/roles/${id}`,
}

export const LOCATION_ROUTES: GenericObject = {
	getLocations: (tableFilters: GenericObject): string =>
		`api/locations?${queryString.stringify(tableFilters)}`,
}

export const RIDE_ROUTES: GenericObject = {
	getRides: (tableFilters: GenericObject): string =>
		`api/rides?${queryString.stringify(tableFilters)}`,
	getRide: (id: string) => `api/rides/${id}`,
	createRide: () => `api/rides`,
	updateRide: (id: string) => `api/rides/${id}`,
	deleteRide: (id: string) => `api/rides/${id}`,
}
