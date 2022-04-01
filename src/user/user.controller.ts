import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req, UseFilters
} from '@nestjs/common';
import { UserService } from './user.service';
import { PhoneDto } from './dto';
import { SendPhoneNumberExc } from './user.exception';

@Controller('api/user')
export class UserController {
  constructor(private service: UserService) {}

  @Post('signup/send_phone_number')
  @UseFilters(SendPhoneNumberExc)
  @HttpCode(HttpStatus.OK)
  validatePhoneNumber(@Body() data: PhoneDto) {
    return this.service.sendPhoneNumber(data);
  }
}
