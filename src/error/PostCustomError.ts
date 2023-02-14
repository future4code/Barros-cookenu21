export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}

export class InvalidTitle extends CustomError{ 
    constructor(){
        super(400, 'Fill in the fields title, description, authorId')
    }
}
export class InvalidFind extends CustomError{ 
    constructor(){
        super(400, 'Fill in the fields id, authorId')
    }
}
export class InvalidFindPostId extends CustomError{ 
    constructor(){
        super(400, 'Recipe not found')
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

export class InvalidRole extends CustomError{ 
    constructor(){
        super(400, 'Fill in the "role" fields with "NORMAL" or "ADMIN"')
    }
}

export class InvalidLogin extends CustomError{ 
    constructor(){
        super(400, 'Fill in the fields "email" e "password"')
    }
}

export class InvalidProfile extends CustomError{ 
    constructor(){
        super(400, "Invalid Authorization!")
    }
}
export class InvalidProfileUser extends CustomError{ 
    constructor(){
        super(400, "Invalid Id User!")
    }
}
export class InvalidNoFollowers extends CustomError{ 
    constructor(){
        super(400, "there are no followers!!")
    }
}