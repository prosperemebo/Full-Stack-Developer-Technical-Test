import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isDate, isString } from 'class-validator';

@Injectable()
export class UserService {
  constructor(private readonly databaseService: DatabaseService) {}

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.databaseService.userContact.findUnique({
      where: { email: createUserDto.contact.email },
    });

    if (existingUser) {
      throw new BadRequestException('Oops! This Email Already Exists!');
    }

    return this.databaseService.userInfo.create({
      data: {
        profilePhoto: createUserDto.profilePhoto,
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        dob: new Date(createUserDto.dob),
        occupation: createUserDto.occupation,
        gender: createUserDto.gender,
        contact: {
          create: { ...createUserDto.contact },
        },
        address: {
          create: { ...createUserDto.address },
        },
        academics: {
          create: createUserDto.academics.map((academic) => ({
            school: academic.school,
          })),
        },
      },
      include: {
        contact: true,
        address: true,
        academics: true,
      },
    });
  }

  async findAll() {
    return this.databaseService.userInfo.findMany({
      include: {
        academics: true,
        address: true,
        contact: true,
      },
    });
  }

  async findOne(id: string) {
    const user = await this.databaseService.userInfo.findUnique({
      where: { id },
      include: { contact: true, address: true, academics: true },
    });

    if (!user) {
      throw new NotFoundException(`Oops! Could Not Found User With ID '${id}'`);
    }

    return user;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const dob = updateUserDto.dob
      ? new Date(updateUserDto.dob as string)
      : null;

    if (!isDate(dob) || isNaN(dob.getTime())) {
      throw new BadRequestException(
        'Date of Birth Format is Invalid, Use A MM-DD-YYYY Format!',
      );
    }

    if (
      !Array.isArray(updateUserDto.academics) ||
      !updateUserDto.academics.every(isString)
    ) {
      throw new BadRequestException(
        'Academics Must Be An Array Of School Names!',
      );
    }

    return this.databaseService.userInfo.update({
      where: { id },
      data: {
        ...updateUserDto,
        dob,
        contact: { update: updateUserDto.contact },
        address: { update: updateUserDto.address },
        academics: {
          deleteMany: {},
          create: updateUserDto.academics.map((entry) => ({
            school: entry.school,
          })),
        },
      },
      include: { contact: true, address: true, academics: true },
    });
  }

  remove(id: string) {
    return this.databaseService.userInfo.delete({ where: { id } });
  }
}
