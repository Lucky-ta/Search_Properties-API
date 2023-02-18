import { hashPassword, validatePassword } from "./bcrypt/bcryptFunctions";
import { generateToken } from "./jwtToken/jwtFunctions";

import { ICreateUserResponse, ILoginResponse } from "./interfaces";
import { IUserShape } from "../interface";

import { UserRepository } from "./repositories";
import { omitPassword } from "../utils";


require("dotenv").config();

class UserService {
  constructor(private readonly userRepository: typeof UserRepository) { }

  async create(userData: IUserShape): Promise<ICreateUserResponse> {
    const { email, name, password } = userData;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      return {
        status: 400,
        data: { message: "A user with that email already exists" },
      };
    }

    const hashedPassword = await hashPassword(password);
    const newUser = await this.userRepository.create({ name, email, password: hashedPassword });

    const userWithoutPassword: Omit<IUserShape, "password"> = omitPassword(newUser);

    return {
      status: 201,
      data: { user: userWithoutPassword },
    };
  }

  async login(loginData: IUserShape): Promise<ILoginResponse> {
    const { email, password } = loginData;
    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      return {
        status: 404,
        data: { message: "User not found" },
      };
    }

    const isValidPassword = await validatePassword(password, user.password);
    if (!isValidPassword) {
      return {
        status: 401,
        data: { message: "Invalid password" },
      };
    }

    const token = generateToken(user);

    return {
      status: 200,
      data: { token },
    };
  }

  async edit(updatedUserData: IUserShape, userId: number) {
    const user = await this.userRepository.findById(userId);
    if (!user) {
      return {
        status: 404,
        data: { message: "User not found" },
      };
    }

    const updatedUser = await this.userRepository.edit(updatedUserData, userId);
    return {
      status: 200,
      data: { user: updatedUser }
    }
  }
}

export default UserService;
