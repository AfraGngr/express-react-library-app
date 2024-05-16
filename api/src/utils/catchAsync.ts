/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from 'express';

type AsyncFunction = (
    req: Request,
    res: Response,
    next: NextFunction,
) => Promise<any>;
interface ExtendedError extends Error {
    response?: any;
}

const catchAsync = (fn: AsyncFunction) => {
    return (req: Request, res: Response, next: NextFunction) => {
        Promise.resolve(fn(req, res, next)).catch((err: ExtendedError) => {
            next(err);
        });
    };
};

export default catchAsync;
