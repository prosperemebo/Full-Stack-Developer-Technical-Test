import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DatabaseService } from 'src/database/database.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { isString } from 'class-validator';

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
        dob: createUserDto.dob,
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
    const { academics, contact, address } = updateUserDto;

    // Validate academics if provided
    if (academics) {
      if (
        !Array.isArray(academics) ||
        !academics.every((entry) => isString(entry.school))
      ) {
        throw new BadRequestException(
          'Academics must be an array of school names!',
        );
      }
    }

    return this.databaseService.userInfo.update({
      where: { id },
      data: {
        ...updateUserDto,
        contact: contact ? { update: contact } : undefined,
        address: address ? { update: address } : undefined,
        academics: academics
          ? {
              deleteMany: {},
              create: academics.map((entry) => ({ school: entry.school })),
            }
          : undefined,
      },
      include: { contact: true, address: true, academics: true },
    });
  }

  remove(id: string) {
    return this.databaseService.userInfo.delete({ where: { id } });
  }
}
