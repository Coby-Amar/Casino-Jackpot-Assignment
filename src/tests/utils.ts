import request from 'supertest';
import { Express } from 'express';

import { AUTH_URL } from "./consts";

export async function signupAndReturnAgent(app: Express) {
    const agent = request.agent(app);
    const res = await agent
        .post(AUTH_URL + '/signup')
        .send({
            username: "test@test.test",
            password: "test"
        });

    expect(res.status).toBe(201);
    return agent
}