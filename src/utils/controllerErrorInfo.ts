import { Request } from 'express';
import methodArguments from './methodArguments';

export default function controllerErrorInfo(
    req: Request,
    errMessage: string
): Record<string, string> {
    return {
        method: `${req.method}`,
        path: `${req.baseUrl}${req.path}`,
        args: methodArguments(req),
        error: errMessage
    };
}
