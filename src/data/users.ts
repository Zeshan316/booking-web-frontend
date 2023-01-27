export interface userInterface {
	firstName: String
	lastName: String
	phoneNumber: String
	profileImage?: String
	role: String
	level: Number
}

const users: userInterface[] = [
	{
		firstName: 'Sys Admin',
		lastName: '',
		phoneNumber: '12312313',
		profileImage: '',
		role: 'System Administrator',
		level: 0,
	},
	{
		firstName: 'App Admin',
		lastName: '',
		phoneNumber: '12312313',
		profileImage: '',
		role: 'App Administrator',
		level: 1,
	},
	{
		firstName: 'Zeshan',
		lastName: ' Ghafoor',
		phoneNumber: '1212121221',
		profileImage: '',
		role: 'User',
		level: 2,
	},
]
