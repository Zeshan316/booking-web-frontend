export const AUTH_ROUTES: GenericObject = {
	login: 'api/auth',
}

export const USER_ROUTES: GenericObject = {
	users: () => `api/users`,
	getUser: (id: string) => `api/users/${id}`,
	deleteUser: (id: string) => `api/users/${id}`,
	updateUser: (id: string) => `api/users/${id}`,
}
