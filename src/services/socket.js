import io from 'socket.io-client'
import { BACKEND_URL } from '../../utils/globalConfig'

const socket = io(`${BACKEND_URL}`)

export default socket;