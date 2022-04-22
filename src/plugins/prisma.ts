import { PrismaClient } from '@prisma/client'
import Hapi from '@hapi/hapi'
import { getPrismaClient } from '../prisma/index';

declare module '@hapi/hapi' {
  interface ServerApplicationState {
    prisma: PrismaClient
  }
}

// plugin to instantiate Prisma Client
const prismaPlugin: Hapi.Plugin<null> = {
  name: 'prisma',
  register: async function (server: Hapi.Server) {

    server.app.prisma = getPrismaClient()

    // Close DB connection after the server's connection listeners are stopped
    // Related issue: https://github.com/hapijs/hapi/issues/2839
    server.ext({
      type: 'onPostStop',
      method: async (server: Hapi.Server) => {
        server.app.prisma.$disconnect()
      },
    })
  },
}

export default prismaPlugin
