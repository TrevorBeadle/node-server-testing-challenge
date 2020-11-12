const db = require("../data/config");

function find() {
  return db("hobbits");
}

function findById(id) {
  return db("hobbits").where({ id }).first();
}

async function create(data) {
  const [id] = await db("hobbits").insert(data);
  return findById(id);
}

async function remove(id) {
  await db("hobbits").del().where({ id });
  return find();
}

async function update(id, data) {
  await db("hobbits").update(data).where({ id });
  return findById(id);
}

module.exports = {
  find,
  findById,
  create,
  remove,
  update,
};
