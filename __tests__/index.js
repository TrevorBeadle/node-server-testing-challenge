const request = require("supertest");
const server = require("../api/server");

test("GET /", async () => {
  const res = await request(server).get("/");
  expect(res.status).toBe(200);
  expect(res.type).toBe("application/json");
  expect(res.body).toEqual({ api: "up" });
});
