import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { USER_ROLES } from './constants'

const notify = (msg: string, type: any = 'info') => {
	toast(msg, { theme: 'light', type })
}

const hasUserAccessRights = (userRole: string): boolean => {
	return Object.values(USER_ROLES)
		.map((role) => role.toLowerCase())
		.includes(userRole.toLowerCase())
		? true
		: false
}
export { notify, hasUserAccessRights }
