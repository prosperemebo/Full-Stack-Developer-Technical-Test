import {
  IsEmail,
  IsOptional,
  IsString,
  IsDateString,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  profilePhoto: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;

  @IsDateString()
  dob: string;

  @IsString()
  occupation: string;

  @IsString()
  gender: string;

  contact: UserContactDto;
  address: UserAddressDto;
  academics: UserAcademicDto[];
}

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
