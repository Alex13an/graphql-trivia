import jwt from 'jsonwebtoken';
import * as dotenv from 'dotenv';
dotenv.config();

const token = jwt.sign({
  userName: 'Traxar',
}, process.env.JWT_SECRET)

console.log('TOKEN', token);
