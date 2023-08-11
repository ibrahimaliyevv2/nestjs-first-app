import { Injectable } from '@nestjs/common';
import { UserCreateDto } from 'tools/dtos/user.dto';
import { UserModel } from 'tools/models/user.model';

const result: UserModel[] = [];

@Injectable()
export class UserService {
  getAllUsers(): UserModel[] {
    if (result.length === 0) {
        this.creatingMockUser({
            name:'Elvin',
            surname:'Aliyev',
            email:'elal@gmail.com',
            birthDay:new Date(),
            password:'123456'
        });
    }
    return result;
  }

  getUserById(id:string):any{
    const user = result.find(data=>data.id == id);

    if(!user){
        return 'User not found';
    }
    else{
        return user;
    }
  }

  createUser(body:UserCreateDto){
    const isExist = result.find(res=>res.email === body.email);
    if(isExist){
        return isExist;
    }
    else{
        this.creatingMockUser(body);
        return result.slice(result.length-1,result.length);
    }
  }

  private creatingMockUser(data:any){
    const user: UserModel = new UserModel();
    user.name = data.name;
    user.surname = data.surname;
    user.email = data.email;
    user.birthDay = data.birthDay;
    user.password = data.password;
    user.id = (Math.floor(Math.random() * 60) + 1).toString()

    result.push(user);
  }
}
