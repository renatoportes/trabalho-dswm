const { faker } = require("@faker-js/faker");
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

  setTimeout(function () {
    return res.status(200).send(data)
  }, 1000);
};

module.exports = { getOverview };