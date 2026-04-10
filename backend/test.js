const request = require("supertest");
const express = require("express");

const app = require("./index"); // if exporting app

describe("Tasks API", () => {
  it("GET /tasks should return array", async () => {
    const res = await request(app).get("/tasks");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});