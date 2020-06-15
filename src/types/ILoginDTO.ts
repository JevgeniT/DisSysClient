export interface ILoginDTO {
    email: string;
    password: string;
}


export interface IRegisterDTO extends ILoginDTO{
    firstname: string;
    lastname: string;
    ishost:boolean;
}