import { BaseRepository } from "./baseRepository.js";
import { user } from "../models/entity/user.js";

export class UserRepository extends BaseRepository {
    constructor() {
        super(user);
    }
}