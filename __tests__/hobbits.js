const request = require("supertest");
const server = require("../api/server");
const db = require("../data/config");

// jest hooks
beforeEach(async () => {
  await db.seed.run();
});
afterAll(async () => {
  await db.destroy();
});

describe("hobbits endpoint tests", () => {
  it("gets a list of hobbits from /api/hobbits", async () => {
    const res = await request(server).get("/api/hobbits");
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength(4);
    expect(res.body[0].name).toBe("sam");
    expect(res.body[1].name).toBe("frodo");
  });

  it("gets a single hobbit by ID", async () => {
    const res = await request(server).get("/api/hobbits/1");
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body.name).toBe("sam");
    expect(res.body.id).toBe(1);
  });

  it("returns an error if ID does not exist", async () => {
    const res = await request(server).get("/api/hobbits/50");
    expect(res.status).toBe(404);
    expect(res.type).toBe("application/json");
    expect(res.body).toEqual({ message: "no hobbit found with that ID" });
  });

  it("adds a hobbit", async () => {
    const res = await request(server)
      .post("/api/hobbits")
      .send({ name: "bilbo" });
    expect(res.status).toBe(201);
    expect(res.type).toBe("application/json");
    expect(res.body.name).toBe("bilbo");
    expect(res.body.id).toBeDefined();
  });

  it("deletes a hobbit", async () => {
    const res = await request(server).delete("/api/hobbits/3");
    expect(res.status).toBe(200);
    expect(res.type).toBe("application/json");
    expect(res.body).toHaveLength(3);
    expect(res.body[2].name).toBe("merry");
  });

  it('cannot delete hobbits twice', async () => {
    await request(server).delete('/api/hobbits/3');
    const res = await request(server).delete('/api/hobbits/3');
    expect(res.status).toBe(400);
    expect(res.type).toBe('application/json');
    expect(res.body).toEqual({message: 'no hibbit found with that ID'})
  })
});
