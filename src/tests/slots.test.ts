import request from 'supertest';
import session from 'express-session';

import app from '../index';

const activeSession = session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
})

const api = '/slots'

beforeEach(() => {
    app.use(activeSession);
})

describe(`GET ${api}/start`, () => {
    it('should start the game and initialize session with 10 credits', async () => {
        const response = await request(app).get(api + '/start');
        expect(response.status).toBe(200);
        expect(response.body).toBe(10);
    });
});

describe(`POST ${api}/roll`, () => {
    it('should return roll results', async () => {
        const agent = request.agent(app);

        const startResponse = await agent.GET(api + '/start');
        const initialCredits = startResponse.body;

        const rollResponse = await agent.POST(api + '/roll');

        expect(rollResponse.status).toBe(200);
        expect(rollResponse.body.results).toHaveLength(3);
        expect(rollResponse.body.isWinner).toBeDefined();
        if (rollResponse.body.isWinner) {
            expect(rollResponse.body.credits).toBeGreaterThan(initialCredits);
        } else {
            expect(rollResponse.body.credits).toBe(initialCredits - 1);
        }
    });

    it('should roll until no more credits and return {error: "Not enough credits"}', async () => {
        const agent = request.agent(app);

        await agent.GET(api + '/start');

        let rollResponse
        do {
            rollResponse = await agent.POST(api + '/roll');

        } while (rollResponse.status === 200);

        expect(rollResponse.status).toBe(400);
        expect(rollResponse.body.error).toBe("Not enough credits");
    });
});

describe(`POST ${api}/cashout`, () => {
    it('should cashout and return 10', async () => {
        const agent = request.agent(app);

        await agent.get(api + '/start');

        const cashoutResponse = await agent.post(api + '/cashout');

        expect(cashoutResponse.status).toBe(200);
        expect(cashoutResponse.body).toBe(10);
    });
});
