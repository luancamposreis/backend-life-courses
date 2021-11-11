import App from './src/app'
import 'dotenv/config'

const PORT = process.env.PORT || 3333

App.listen(PORT, () => console.log(`🔥 Server up at ::${PORT}`))
