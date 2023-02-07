declare module 'uuid'

declare type GenericObject = { [key: string]: any }

interface IArticle {
	id?: string
	title?: string
	body?: string
}

type ArticleState = {
	articles: IArticle[]
}

type ArticleAction = {
	type: string
	payload: IArticle
}

// type DispatchType = (args: ArticleAction) => ArticleAction
type User = {
	id?: string
	isActive?: boolean
	firstName: string
	lastName: string
	email: string
	role: string
	phoneNumber?: string
	profileImgUrl?: string
}

type AuthResponse = {
	user: User
	jwtToken: string
}

enum ROLE {
	Admin = 'App Administrator',
	User = 'User',
	Driver = 'Driver',
	SysAdmin = 'System Administrator',
}
