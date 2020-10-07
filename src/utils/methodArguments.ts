import { Request } from 'express';

import mapParams from './mapParams';

export default function methodArguments(req: Request): string {
    switch (req.method) {
        case 'GET':
            return mapParams(req.query);
        case 'POST':
            return JSON.stringify(req.body);
        case 'PUT':
            return `${mapParams(req.params)}, ${JSON.stringify(
                req.body
            )}`;
        default:
            return '';
    }
}
