
const request = require("supertest");
const app = require("../app");

describe("Automated Application Deployment Platform API", () => {
  test("GET / returns the application status", async () => {
    const response = await request(app).get("/");

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe("running");
    expect(response.body.version).toBe("1.0.0");
  });

  test("GET /health returns a healthy status", async () => {
    const response = await request(app).get("/health");

    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ status: "healthy" });
  });

  test("GET /api/info returns application information", async () => {
    const response = await request(app).get("/api/info");

    expect(response.statusCode).toBe(200);
    expect(response.body.application).toBe(
      "Automated Application Deployment Platform"
    );
    expect(response.body.version).toBe("1.0.0");
  });
});
