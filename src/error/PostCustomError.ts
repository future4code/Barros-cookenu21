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
        super(404, 'Recipe not found')
    }
}
export class InvalidPostAll extends CustomError{ 
    constructor(){
        super(400, 'Not the publication')
    }
}

export class InvalidPassword extends CustomError{ 
    constructor(){
        super(400, "Password too short minimum 6 characters")
    }
}

export class UserNotFound extends CustomError{ 
    constructor(){
        super(404, "User not found.")
    }
}

export class Unauthorized extends CustomError{ 
    constructor(){
        super(401, "Unauthorized!")
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
        super(401, "Invalid Authorization!")
    }
}
export class InvalidProfileUser extends CustomError{ 
    constructor(){
        super(400, "Invalid Id User!")
    }
}
export class InvalidNoFollowers extends CustomError{ 
    constructor(){
        super(400, "There are no followers!")
    }
}
export class InvalidNoRecipe extends CustomError{ 
    constructor(){
        super(400, "there is no recipe with informed id!")
    }
}
export class InvalidNoAuthorRecipe extends CustomError{ 
    constructor(){
        super(400, "You cannot edit, you are not the author!")
    }
}
export class InvalidRecipeDeleted extends CustomError{ 
    constructor(){
        super(400, "You cannot delete if you are not the author or ADMIN!")
    }
}

export class InvalidBodyEdit extends CustomError{ 
    constructor(){
        super(400, 'Fill in the fields id, title, description')
    }
}

export class UnauthorizedType extends CustomError{ 
    constructor(){
        super(401, "You cannot edit, you are not NORMAL!")
    }
}