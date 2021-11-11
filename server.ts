import { createConnection } from 'typeorm'
import 'reflect-metadata'

import App from './src/app'
import 'dotenv/config'

const PORT = process.env.PORT || 3333

async function startup() {
  await createConnection()
    .then(() => console.log(`✅ Successfully connect to db!`))
    .catch((error) => console.error(`❌ Error: ${error}`))

  App.listen(PORT, () => console.log(`🔥 Server up at ::${PORT}`))
}

startup()
