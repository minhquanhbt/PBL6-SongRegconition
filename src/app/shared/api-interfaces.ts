export interface ISystemLogChangeData {
    field: string,
    oldValue: any,
    newValue: any
}

export interface IUserRole {
    id: number;
    name: string;
    code: string;
}


export interface IUser {
    id: number;
    birthday: string;
    createdAt: string;
    email: string;
    fullName: string;
    phone: string
    updatedAt: string
    updatedUser: number;
    userRole: IUserRole;
    userRoleCode: string;
    username: string;
}

export interface ISong{
    id: number;
    name: string;
    link: string;
    image: number;
    filename: number;
    singer_id: number;
    createdAt: string;
    updatedAt: string;
}

export interface IModelSanPham{
    id: number;
    fullname: string;
    nickname: string;
    createdAt: string;
    updatedAt: string;
}
