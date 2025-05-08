import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: { type: String, required: [true, "Nome do usuário é obrigatório"] },
    email: { type: String, required: [true, "Email é obrigatório"], unique: true },
    password: { type: String, required: [true, "Senha é obrigatória"] },
});

const user = mongoose.model("user", userSchema);

export { user, userSchema };