import axios from 'axios';
import { Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class CaptchaService {
  async verify(token: string): Promise<boolean> {
    const secret = process.env.RECAPTCHA_SECRET;

    const { data } = await axios.post(
      'https://www.google.com/recaptcha/api/siteverify',
      null,
      {
        params: {
          secret,
          response: token,
        },
      },
    );

    if (!data.success) {
      throw new UnauthorizedException('CAPTCHA inválido');
    }

    return true;
  }
}