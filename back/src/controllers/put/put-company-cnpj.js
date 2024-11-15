const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const putCompanyCnpj = async (req, res) => {

  const { cnpj } = req.body.data
  await prisma.settings.update({
    data: {
      cnpj: cnpj,
    },
    where: {
      id: 1,
    }
  })

  setTimeout(() => {
    return res.status(200).send()
  }, 500);
}

module.exports = { putCompanyCnpj }