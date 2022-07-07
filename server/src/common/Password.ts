import * as bcrypt from 'bcryptjs';

export class Password {
  static encrypt(plainPassword: string): string {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(plainPassword, salt);
  }

  static verify(plainPassword: string, encryptedPassword: string): boolean {
    return bcrypt.compareSync(plainPassword, encryptedPassword);
  }

  static async generateRandomCode() {
    return Math.floor(100000 + Math.random() * 900000);
  }

}
