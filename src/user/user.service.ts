import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserCreateDto, UserUpdateDto } from 'tools/dtos/user.dto';
import { AuditModel } from 'tools/models/audit.model';
import { UserModel } from 'tools/models/user.model';

const result: UserModel[] = [];

@Injectable()
export class UserService {
  constructor(
    @InjectModel('User') private readonly userMongo: Model<UserModel>,
  ) {}

  //   getAllUsers(): UserModel[] {
  //     if (result.length === 0) {
  //         this.creatingMockUser({
  //             name:'Elvin',
  //             surname:'Aliyev',
  //             email:'elal@gmail.com',
  //             birthDay:new Date(),
  //             password:'123456'
  //         });
  //     }
  //     return result;
  //   }

  async create(user: UserCreateDto): Promise<UserModel> {
    const audit = new AuditModel();
    audit.active = true;
    audit.createdBy = 'Admin';
    audit.createdDate = new Date();

    const createdUser = new this.userMongo({ ...user, ...audit });

    return await createdUser.save();
  }

  //   getUserById(id:string):any{
  //     const user = result.find(data=>data.id == id);

  //     if(!user){
  //         return 'User not found';
  //     }
  //     else{
  //         return user;
  //     }
  //   }

  async findAll(): Promise<UserModel[]> {
    return await this.userMongo.find().exec();
  }

  async findOne(id: string): Promise<UserModel> {
    return await this.userMongo.findOne({ _id: id }).exec();
  }

  //   createUser(body: UserCreateDto) {
  //     const isExist = result.find((res) => res.email === body.email);
  //     if (isExist) {
  //       return isExist;
  //     } else {
  //       this.creatingMockUser(body);
  //       return result.slice(result.length - 1, result.length);
  //     }
  //   }

  //   private creatingMockUser(data: any) {
  //     const user: UserModel = new UserModel();
  //     user.name = data.name;
  //     user.surname = data.surname;
  //     user.email = data.email;
  //     user.birthDay = data.birthDay;
  //     user.password = data.password;
  //     user.id = (Math.floor(Math.random() * 60) + 1).toString();

  //     result.push(user);
  //   }

  async delete(id: string): Promise<UserModel> {
    return await this.userMongo.findByIdAndRemove({ _id: id }).exec();
  }

  async update(id: string, user: UserUpdateDto): Promise<UserModel> {
    let newModel = this.userMongo.findOne({ _id: id }).exec();
    newModel = { ...newModel, ...user };

    return await this.userMongo.findByIdAndUpdate(id, newModel, {new:true}).exec();
  }
}
