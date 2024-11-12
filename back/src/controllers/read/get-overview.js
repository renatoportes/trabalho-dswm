const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const getOverview = async (req, res) => {

  const data = await prisma.companies.findFirst({
    include: {
      sales: true,
      monthly_billing: {
        select: {
          name: true,
          total: true
        }
      }
    }
  })

  setTimeout(() => {
    return res.status(200).send(data)
  }, 500);
};

module.exports = { getOverview };