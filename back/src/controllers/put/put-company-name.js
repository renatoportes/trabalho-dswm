const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const putCompanyName = async (req, res) => {

  const { company_name } = req.body.data

  await prisma.settings.update({
    data: {
      company_name: company_name,
    },
    where: {
      id: 1,
    }
  })
}

module.exports = { putCompanyName }