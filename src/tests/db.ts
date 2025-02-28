import request from 'supertest';
import { Express, Request, Response } from "express";

export async function clearAllUsers(app: Express) {
    app.delete('/cleanup', async (req: Request, res: Response) => {
        await (req.db.db as any).push('/users', [])
        res.sendStatus(200)
    })
    const res = await request(app).delete('/cleanup')
    expect(res.status).toBe(200)
}