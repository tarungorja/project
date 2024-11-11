import { Request, Response, NextFunction } from 'express';

export const checkDuplicateFields = (req: Request, res: Response, next: NextFunction) => {
  console.log(req);

  let rawBody = '';

  req.on('data', chunk => {
    rawBody += chunk;
  });
  // Check if the body exists and is an object
  if (rawBody) {
    const parsedBody = JSON.parse(rawBody);
    const keys = Object.keys(parsedBody);

    // Check for duplicate fields by counting occurrences of each key
    const seen: { [key: string]: number; } = {};
    const duplicateFields: string[] = [];

    for (const key of keys) {
      seen[key] = (seen[key] || 0) + 1;
      if (seen[key] > 1) {
        duplicateFields.push(key);
      }
    }

    if (duplicateFields.length > 0) {
      res.status(400).json({ message: `Duplicate fields detected in the request body: ${duplicateFields.join(', ')}` });
      return;
    }
  }

  next();
};


