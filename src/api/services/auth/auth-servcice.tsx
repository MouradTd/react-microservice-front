import { client } from '@/api/common';

class AuthService {
    private URI = 'auth';

    async login(creds: LoginCreds) {
        try {
            const res = await client.post(this.URI, creds);
            console.log(res);
        } catch (e) {
            console.log(e);
        }
    }
}
export const authService = new AuthService();
export type LoginCreds = {
    email: string;
    password: string;
};
