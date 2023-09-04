import { HTTPException } from "@/exceptions";
import { DataStoredInToken, TokenData } from "@/interfaces/auth.interface";
import { User } from "@/interfaces/user.interface";
import { compare, hash } from "bcrypt";
import { Service } from "typedi";
import { sign } from "jsonwebtoken";

export const UserModel: User[] = [
  {
    id: 1,
    email: "user@user.org",
    password: "$2b$10$UEE6/iAiKTvjQQ.Q179oZ.l2hz4WUb7YvEwJhseA8IX.MgcLU0Aje",
  },
];

const createToken = (user: User): TokenData => {
  const dataStoredInToken: DataStoredInToken = { id: user.id };
  const expiresIn: number = 60 * 60;

  return {
    expiresIn,
    token: sign(dataStoredInToken, "adasdsa", {
      expiresIn: expiresIn,
    }),
  };
};

const createCookie = (tokenData: TokenData): string => {
  return `Authorization=${tokenData.token}; HttpOnly; Max-Age=${tokenData.expiresIn};`;
};

@Service()
export class AuthService {
  public async signup(userData: User): Promise<User> {
    const findUser: User = UserModel.find(
      (user) => user.email === userData.email
    );
    if (findUser)
      throw new HTTPException(
        409,
        `This email ${userData.email} has already exists`
      );

    const hashedPassword = await hash(userData.password, 10);
    const createUserData: User = {
      ...userData,
      id: UserModel.length,
      password: hashedPassword,
    };

    return createUserData;
  }

  public async login(userData: User): Promise<{
    cookie: string;
    findUser: User;
  }> {
    const findUser: User = UserModel.find(
      (user) => user.email === userData.email
    );
    if (!findUser)
      throw new HTTPException(
        409,
        `This email ${userData.email} was not found`
      );

    const isPasswordMatch: boolean = await compare(
      userData.password,
      findUser.password
    );
    if (!isPasswordMatch) throw new HTTPException(409, "Invalid Password");

    const tokenData = createToken(findUser);
    const cookie = createCookie(tokenData);

    return {
      cookie,
      findUser,
    };
  }
}
