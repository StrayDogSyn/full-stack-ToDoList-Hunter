import { Request, Response, NextFunction } from 'express';
export declare const logRequest: (_req: Request, _res: Response, next: NextFunction) => void;
export declare const logError: (error: Error, context?: string) => void;
