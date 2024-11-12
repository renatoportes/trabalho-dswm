const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const getSettings = async (req, res) => {
  const data = await prisma.settings.findFirst({})

  setTimeout(() => {
    return res.status(200).send(data)
  }, 500);
};

module.exports = { getSettings };