import { Request, Response, NextFunction } from 'express'

function updateSessionAppDataAndRespond(req: Request, res: Response, resData: ResponseDataI, status = 200) {
    req.session.appData = {
        ...req.session.appData!,
        ...resData
    }
    delete resData.id
    if (!resData.username) {
        delete resData.username
    }
    res.status(status).json(resData)
}

function handleError(res: Response, code: number, error: string) {
    res.status(code).json({ error });
}

export function responsesMiddleware(req: Request, res: Response, next: NextFunction) {
    if (!res.appRes) {
        res.appRes = {
            updateAppSessionAndResponedWithCode200(data) {
                updateSessionAppDataAndRespond(req, res, data)
            },
            updateAppSessionAndResponedWithCode201(data) {
                updateSessionAppDataAndRespond(req, res, data, 201)
            },
            updateAppSessionAndResponedWithCode202(data) {
                updateSessionAppDataAndRespond(req, res, data, 202)
            },
            errors: {
                handle400(error: string) {
                    handleError(res, 400, error);
                },
                handle401() {
                    handleError(res, 401, 'Unauthorized access');
                },
                handle500(action: string) {
                    handleError(res, 500, `Failed to ${action}, please try again later`);
                }
            }
        }
        next()
    }
}
