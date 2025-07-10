export declare class AuthService {
    private readonly USER;
    private readonly PASSWORD;
    login(username: string, password: string): {
        token: string;
    };
}
