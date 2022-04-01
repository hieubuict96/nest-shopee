import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { PhoneDto } from './dto';
import { PrismaService } from '../prisma/prisma.service';
import twilio, {Twilio } from 'twilio';

@Injectable()
export class UserService {
  private twilioClient: Twilio;

  constructor(private prisma: PrismaService) {
    this.twilioClient = new Twilio("AC1f992454125cf5454177e5fe08e50b58", "59c1a87c5d1d213dbbc76a623798b72a")
  }

  async sendPhoneNumber(data: PhoneDto) {
    const phoneNumber = data.phoneNumber;
    const isAvailable: Array<object> = await this.prisma
      .$queryRaw`SELECT * FROM user WHERE phoneNumber = ${phoneNumber}`;

    if (isAvailable.length > 0) {
      throw new BadRequestException('numberPhoneAlreadyUse');
    }

    const code = Math.random().toString().split('.')[1].slice(0, 6);
    const timeSendCode = Date.now();

    const success = await this.twilioClient.messages.create({
      to: phoneNumber,
      from: "+19362516568",
      body: `Mã xác minh của bạn là ${code}`,
    });

    // this.twilioClient.verify.services("ffsdf").verifications.create({
    //   to: "+84383207498", channel: "sms"
    // })

    return {ok: "ok"}
  }
}
