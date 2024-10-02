const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const postSales = async (req, res) => {

  const { name, email, total_billing } = req.body.data

  await prisma.sales.create({
    data: {
      name: name,
      email: email,
      total_billing: parseInt(total_billing),
      companies: {
        connect: {
          id: 1
        }
      }
    },

  })

  return res.status(200)
}

module.exports = { postSales }