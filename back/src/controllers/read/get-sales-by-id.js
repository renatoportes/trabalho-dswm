const { PrismaClient } = require("@prisma/client")

const prisma = new PrismaClient()

const getSalesById = async (req, res) => {

  const { id } = req.params

  const data = await prisma.sales.findFirst({
    where: {
      id: parseInt(id)
    }
  })
  setTimeout(() => {
    return res.status(200).send(data)
  }, 500);
};

module.exports = { getSalesById };