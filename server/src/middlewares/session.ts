import { Request, Response } from 'express';
import { User } from '../models/user';

export function checkUserExistOrCreate(req: Request, _: Response, next: Function) {
    if (!req.session.user) {
        req.session.user = User.new();
    }
    next();
}