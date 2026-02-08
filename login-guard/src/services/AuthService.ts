import bcrypt from 'bcrypt'

export class AuthService {

    private readonly saltRounds = 10;

    async hashPassword(password: string): Promise<string> {
        const salt = await bcrypt.genSalt(this.saltRounds);

        return await bcrypt.hash(password, salt);
    }

    async comparePassword(password: string, hash:string): Promise<boolean> {
        return await bcrypt.compare(password, hash);
    }
}