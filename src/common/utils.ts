import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

const notify = (msg: string, type: any = 'info') => {
	toast(msg, { theme: 'light', type })
}

export { notify }
