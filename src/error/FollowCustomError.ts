export class CustomError extends Error {
    constructor(statusCode: number, message: string){
        super(message)
    }
}

export class InvalidInputFollow extends CustomError{ 
    constructor(){
        super(400, 'Fill in the followingId , authorId')
    }
}
export class InvalidFollowed extends CustomError{ 
    constructor(){
        super(400, 'User cannot follow himself!')
    }
}
export class InvalidFollowingId extends CustomError{ 
    constructor(){
        super(400, 'User id does not exist!')
    }
}
export class InvalidFollow extends CustomError{ 
    constructor(){
        super(400, "You already follow this profile!")
    }
}
export class InvalidFollowing extends CustomError{ 
    constructor(){
        super(400, "You don't follow this profile!")
    }
}
export class Unauthorized extends CustomError{ 
    constructor(){
        super(401, "Unauthorized!")
    }
}
