const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const delSales = async (req, res) => {
  const { id } = req.body
  await prisma.sales.delete({
    where: {
      id: parseInt(id)
    }
  })

  return res.status(200)
}

module.exports = { delSales }