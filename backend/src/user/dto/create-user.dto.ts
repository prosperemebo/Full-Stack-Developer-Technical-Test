import { Transform, Type } from 'class-transformer';
import {
  IsEmail,
  IsOptional,
  IsString,
  IsDate,
  ValidateNested,
} from 'class-validator';

export class UserContactDto {
  @IsEmail()
  email: string;

  @IsString()
  phoneNumber: string;

  @IsOptional()
  @IsString()
  fax?: string;

  @IsOptional()
  @IsString()
  linkedInUrl?: string;
}

export class UserAddressDto {
  @IsString()
  address: string;

  @IsString()
  city: string;

  @IsString()
  state: string;

  @IsString()
  country: string;

  @IsString()
  zipCode: string;
}

export class UserAcademicDto {
  @IsString()
  school: string;
}

export class CreateUserDto {
  @IsString()
  profilePhoto: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDate()
  @Transform(({ value }) => new Date(value))
  dob: string;

  @IsString()
  occupation: string;

  @IsString()
  gender: string;

  @ValidateNested()
  @Type(() => UserContactDto)
  contact: UserContactDto;

  @ValidateNested()
  @Type(() => UserAddressDto)
  address: UserAddressDto;

  @ValidateNested()
  @Type(() => UserAcademicDto)
  academics: UserAcademicDto[];
}
