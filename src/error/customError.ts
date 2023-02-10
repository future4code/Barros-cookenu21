export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}

export class InvalidName extends CustomError{ 
    constructor(){
        super(400, 'Fill in the fields "name", "email", "password" e "role"')
    }
}

export class InvalidEmail extends CustomError{ 
    constructor(){
        super(400, "Email inválido")
    }
}
export class InvalidEmailRegistered extends CustomError{ 
    constructor(){
        super(400, "User already registered")
    }
}

export class InvalidPassword extends CustomError{ 
    constructor(){
        super(400, "Password too short minimum 6 characters")
    }
}

export class UserNotFound extends CustomError{ 
    constructor(){
        super(404, "Usuário não encontrado")
    }
}

export class Unauthorized extends CustomError{ 
    constructor(){
        super(401, "Usuário não autorizado")
    }
}