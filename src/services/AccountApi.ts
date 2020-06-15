import { ILoginDTO, IRegisterDTO } from '@/types/ILoginDTO';
import Axios from 'axios';

interface ILoginResponse {
    token: string;
    status: string;
}
interface IRegisterResponse{
    token: string;
    status: string;
}
export abstract class AccountApi {
    private static axios = Axios.create(
        {
            baseURL: "https://localhost:5001/api/v1.0/",
            headers: {
                common: {
                    'Content-Type': 'application/json'
                }
            }
        }
    )

    static async getJwt(loginDTO: ILoginDTO): Promise<string | null> {
        const url = "account/login";
        try {
            const response = await this.axios.post<ILoginResponse>(url, loginDTO);
            if (response.status === 200) {
                localStorage.setItem('jwt', response.data.token)
                return response.data.token;
            }
            return null;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return null;
        }
    }

    static async register(registerDTO: IRegisterDTO): Promise<string | null> {
        const url = "account/register "
        const response = await this.axios.post<IRegisterResponse>(url, registerDTO);
        try {
            if (response.status === 200) {
                localStorage.setItem('jwt', response.data.token)
                return null;
            }
            return null;
        } catch (error) {
            console.log('error: ', (error as Error).message);
            return null;
        }
    }
}
