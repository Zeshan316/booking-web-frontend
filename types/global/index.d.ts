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
	id: string
	name: string
	level?: number
	createdAt?: Date
	updatedAt?: Date
	deletedAt?: Date
}

type User = {
	id?: string
	userId?: string
	isActive?: number
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

type Destination = {
	id?: string
	direction: string
	locationName: string
	createdAt?: Date
	deletedAt?: null | Date
	updatedAt?: Date
}

type Pickup = {
	id?: string
	direction: string
	locationName: string
	createdAt?: Date
	deletedAt?: null | Date
	updatedAt?: Date
}

type Ride = {
	id: string
	destination: Destination
	pickup: Pickup
	user: User
	tripDateTime: Date | string
	status: string
	direction: string
	userId?: string
	pickupId?: string
	destinationId?: string
	createdAt?: Date
	deletedAt?: null | Date
	updatedAt?: Date
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
	password?: string
	repeatPassword?: string
	roleId: string
	phoneNumber: string
	oldPassword?: string
	newPassword?: string
	profileImg?: any
}

type RideFormProps = {
	tripDate: Date | string
	tripTime: Date | string
	direction: string
	pickupId: string
	destinationId: string
}
