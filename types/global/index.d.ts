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

type Role = {
	id?: string
	name: string
	level?: number
	createdAt?: Date
	updatedAt?: Date
}

// type DispatchType = (args: ArticleAction) => ArticleAction
type User = {
	id?: string
	userId?: string
	isActive?: boolean
	firstName: string
	lastName?: string
	email: string
	phoneNumber?: string
	profileImgUrl?: string
	role: Role
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date | null
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

type UserFormProps = {
	firstName: string
	lastName?: string
	email: string
	password: string
	repeatPassword: string
	role: string
	phoneNumber: string
}
