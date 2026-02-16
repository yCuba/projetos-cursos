import bcrypt from 'bcrypt'

export class AuthService {
    private readonly saltRounds = 10

    async hashPassword(password: string): Promise<string> {
        return await bcrypt.hash(password, this.saltRounds);
    }

    async validadeLogin(password: string, hash: string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }

}