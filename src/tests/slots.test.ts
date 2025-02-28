import TestAgent from 'supertest/lib/agent';

import app from '../index';
import { SLOTS_URL } from './consts';
import { clearAllUsers } from './db';
import { signupAndReturnAgent } from './utils';


let agent: TestAgent;
describe('POST ' + SLOTS_URL + '/topup', () => {
    beforeAll(async () => {
        agent = await signupAndReturnAgent(app)
    })
    it('should add 20 to users balance and return balance = 20', async () => {
        const res = await agent.post(SLOTS_URL + '/topup').send({ credits: 20 });

        expect(res.status).toBe(202);
        expect(res.body).toBeDefined()
        expect(res.body.balance).toBe(20)
        expect(res.body.credits).toBe(10)
    });
});

describe('POST ' + SLOTS_URL + '/cashout', () => {
    it('should cashout and return balance = 30, credits = 0', async () => {
        const res = await agent.post(SLOTS_URL + '/cashout').send({ credits: 20 });

        expect(res.status).toBe(202);
        expect(res.body).toBeDefined()
        expect(res.body.balance).toBe(30)
        expect(res.body.credits).toBe(0)
    });
});

describe('POST ' + SLOTS_URL + '/cashin', () => {
    it('should cashin and return balance = 10, credits = 20', async () => {
        const res = await agent.post(SLOTS_URL + '/cashin').send({ credits: 20 });

        expect(res.status).toBe(202);
        expect(res.body).toBeDefined()
        expect(res.body.balance).toBe(10)
        expect(res.body.credits).toBe(20)
    });
});

describe('POST ' + SLOTS_URL + '/roll', () => {
    it('should roll and return isWinner, credits, and results', async () => {
        const res = await agent.post(SLOTS_URL + '/roll');

        expect(res.status).toBe(200);
        expect(res.body).toBeDefined()
        expect(res.body.isWinner).toBeDefined()
        expect(res.body.results).toBeDefined()
        expect(res.body.results).toHaveLength(3)
        if (res.body.isWinner) {
            expect(res.body.credits).toBeGreaterThan(20)
        } else {
            expect(res.body.credits).toBe(19)
        }
    });
    afterAll(async () => {
        await clearAllUsers(app)
    })
});