import request from 'supertest';
import app from '../index';
import { AUTH_URL, USER_URL } from './consts';
import { clearAllUsers } from './db';
import TestAgent from 'supertest/lib/agent';
import { signupAndReturnAgent } from './utils';


let agent: TestAgent;

describe('POST ' + USER_URL + '/', () => {
    beforeAll(async () => {
        agent = await signupAndReturnAgent(app)
    })
    it('should return username = test@test.test, balance = 0, credits = 10', async () => {
        const res = await agent.get(USER_URL + '/');

        expect(res.status).toBe(200);
        expect(res.body).toBeDefined()
        console.log('res.body: ', res.body)
        expect(res.body.username).toBe('test@test.test')
        expect(res.body.balance).toBe(0)
        expect(res.body.credits).toBe(10)
    });

    afterAll(async () => {
        await clearAllUsers(app)
    })
});
