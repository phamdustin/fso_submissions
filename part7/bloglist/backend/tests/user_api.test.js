const { test, after, describe, beforeEach } = require("node:test");
const bcrypt = require("bcryptjs");
const mongoose = require("mongoose");
const User = require("../models/user");
const supertest = require("supertest");
const assert = require("node:assert");
const helper = require("./test_helper");
const app = require("../app");

const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    await User.deleteMany({});

    const passwordHash = await bcrypt.hash("sekret", 10);
    const user = new User({ username: "root", passwordHash });

    await user.save();
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "mluukkai",
      name: "Matti Luukkainen",
      password: "salainen",
    };

    await api
      .post("/api/users")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("test fails with username < 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "ab",
      name: "Failure",
      password: "failureaswell",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(!usernames.includes(newUser.username));
  });

  test("test fails with password < 3 characters", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "Failure",
      name: "FailureAsWell",
      password: "ab",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(!usernames.includes(newUser.username));
  });

  test("test fails with non unique username", async () => {
    const usersAtStart = await helper.usersInDb();

    const newUser = {
      username: "root",
      name: "Failure",
      password: "failure",
    };

    await api.post("/api/users").send(newUser).expect(400);

    const usersAtEnd = await helper.usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});

after(async () => {
  await mongoose.connection.close();
});
