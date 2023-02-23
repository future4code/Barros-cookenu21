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
        super(404, "User not found")
    }
}

export class Unauthorized extends CustomError{ 
    constructor(){
        super(401, "unauthorized user")
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
export class InvalidRecoverLogin extends CustomError{ 
    constructor(){
        super(400, 'Fill in the fields "email"')
    }
}

export class InvalidNotEmail extends CustomError{ 
    constructor(){
        super(404, 'email not found!')
    }
}

export class InvalidLoginPassword extends CustomError{ 
    constructor(){
        super(400, "Invalid password/email")
    }
}
export class InvalidProfile extends CustomError{ 
    constructor(){
        super(401, "Invalid Authorization!")
    }
}
export class InvalidProfileUser extends CustomError{ 
    constructor(){
        super(400, "Invalid Id User!")
    }
}

export class InvalidDelete extends CustomError{ 
    constructor(){
        super(400, 'Fill in the field "id user"')
    }
}