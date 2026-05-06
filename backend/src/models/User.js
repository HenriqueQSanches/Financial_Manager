const UserRepository = require('../repositories/UserRepository');

class User {
    constructor(data) {
        this.id = data.id;
        this.name = data.name;
        this.created_at = data.created_at;
    }

    // Métodos de negócio
    static async findAll() {
        const usersData = await UserRepository.findAll();
        return usersData.map(userData => new User(userData));
    }

    static async findByName(name) {
        const userData = await UserRepository.findByName(name);
        return userData ? new User(userData) : null;
    }

    static async create(userData) {
        const newUser = await UserRepository.create(userData);
        return new User(newUser);
    }

    // Método para retornar dados seguros
    toJSON() {
        return {
            id: this.id,
            name: this.name,
            created_at: this.created_at
        };
    }
}

module.exports = User;
