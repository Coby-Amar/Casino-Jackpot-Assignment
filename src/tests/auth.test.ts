import request from 'supertest';

import app from '../index';
import { AUTH_URL } from './consts';
import { clearAllUsers } from './db';
import TestAgent from 'supertest/lib/agent';




let agent: TestAgent;

describe('POST ' + AUTH_URL + '/signup', () => {
    it('should create return username = test@test.test, balance = 0 and credits = 10', async () => {
        const res = await request(app)
            .post(AUTH_URL + '/signup')
            .send({
                username: "test@test.test",
                password: "test"
            });

        expect(res.status).toBe(201);
        expect(res.body).toBeDefined()
        expect(res.body.username).toBe('test@test.test')
        expect(res.body.balance).toBe(0)
        expect(res.body.credits).toBe(10)
    });
});

describe('POST ' + AUTH_URL + '/login', () => {
    it('should login and return  return username = test@test.test, balance = 0 and credits = 10', async () => {
        agent = await request.agent(app)
        const res = await agent.post(AUTH_URL + '/login')
            .send({
                username: "test@test.test",
                password: "test"
            });

        expect(res.status).toBe(200);
        expect(res.body).toBeDefined()
        expect(res.body.username).toBe('test@test.test')
        expect(res.body.balance).toBe(0)
        expect(res.body.credits).toBe(10)
    });
});

describe('DELETE ' + AUTH_URL + '/logout', () => {
    it('should logout and return status 202', async () => {
        await agent
            .post(AUTH_URL + '/login')
            .send({
                username: "test@test.test",
                password: "test"
            });

        const res = await agent
            .delete(AUTH_URL + '/logout');

        expect(res.status).toBe(202);
    });
    afterAll(async () => {
        await clearAllUsers(app)
    })
});
