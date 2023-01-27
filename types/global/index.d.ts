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
	firstName: string
	lastName: string
	email: string
	profileImage: string
}

type AuthResponse = {
	user: User
	jwtToken: string
}
