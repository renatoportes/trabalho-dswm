const { faker } = require("@faker-js/faker");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient()

const getSettings = async (req, res) => {
  const data = await prisma.settings.findFirst({})

  setTimeout(function () {
    return res.status(200).send(data)
  }, 2000);
};

module.exports = { getSettings };