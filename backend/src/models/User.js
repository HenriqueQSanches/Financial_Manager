const UserRepository = require('../repositories/UserRepository');
const bcrypt = require('bcryptjs');

class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.email = data.email;
        this.password = data.password;
        this.created_at = data.created_at;
    }

    // Métodos de negócio
    static async findByEmail(email) {
        const userData = await UserRepository.findByEmail(email);
        return userData ? new User(userData) : null;
    }

    static async create(userData) {
        // Hash da senha
        const salt = await bcrypt.genSalt(10);
        userData.password = await bcrypt.hash(userData.password, salt);

        const newUser = await UserRepository.create(userData);
        return new User(newUser);
    }

    // Métodos de instância
    async validatePassword(password) {
        return bcrypt.compare(password, this.password);
    }

    // Método para retornar dados seguros (sem senha)
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            email: this.email,
            created_at: this.created_at
        };
    }
}

module.exports = User;
