import { promisify } from 'util';

export const delay = promisify((ms, res) => setTimeout(res, ms));
