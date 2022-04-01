import {
  Matches,
} from 'class-validator';

export class PhoneDto {
  @Matches(/^\+[0-9]+$/, {
    message: 'phoneNumber',
  })
  phoneNumber: string;
}
