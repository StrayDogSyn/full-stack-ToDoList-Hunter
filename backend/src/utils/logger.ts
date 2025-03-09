import { Request, Response, NextFunction } from 'express';

export const logRequest = (_req: Request, _res: Response, next: NextFunction): void => {
  const timestamp = new Date().toISOString();
  const { method, url, body, query } = _req;
  
  console.log(`[${timestamp}] ${method} ${url}`);
  if (Object.keys(body).length > 0) {
    console.log('Body:', body);
  }
  if (Object.keys(query).length > 0) {
    console.log('Query:', query);
  }
  
  next();
};

export const logError = (error: Error, context?: string): void => {
  const timestamp = new Date().toISOString();
  console.error(`[${timestamp}] ${context ? `[${context}] ` : ''}Error:`, error.message);
  if (error.stack) {
    console.error('Stack:', error.stack);
  }
};