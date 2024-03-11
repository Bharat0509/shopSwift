import { allowedOrigins } from './allowedOrigins.js'

const corsOptions = {
    origin: (origin, callback) => {
        if ((allowedOrigins.indexOf(origin) !== -1) | !origin) {
            callback(null, true)
        } else {
            callback(new Error('Request is Not Allowed By CORS Policy.'))
        }
    },
    optionalSuccessStatus: 200,
}

export default corsOptions
