import request from 'supertest';
import app from '../index';

describe('GET /', () => {
    it('should return html', async () => {
        const response = await request(app).get('/');
        expect(response.status).toBe(200);
        expect(response.type).toBe('text/html');
        expect(response.text).toContain('html');
    });
});
