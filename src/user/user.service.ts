import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ResourceService } from 'libs/services/resource.service';
import { Model } from 'mongoose';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { AuditModel } from 'tools/models/audit.model';
import { UserModel } from 'tools/models/user.model';

const result: UserModel[] = [];

@Injectable()
export class UserService extends ResourceService<UserModel, UserCreateDto, UserUpdateDto> {
  constructor(
    @InjectModel('User') userMongo: Model<UserModel>,
  ) {
    super(userMongo);
  }


}
