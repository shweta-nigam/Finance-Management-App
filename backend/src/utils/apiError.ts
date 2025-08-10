
class ApiError extends Error { 
    statusCode:number
    errors:{field:string; message: string}[]
    data:any
    success:boolean

    // Error already has a message property typed as string 

    constructor(
        statusCode:number, 
        message :string ="something went wrong",
        errors: {field:string; message: string}[] = [],
        stack :string="" 
    ){
        super(message)
        this.statusCode = statusCode
        this.message = message
        this.errors = errors
        this.data = null
        this.success = false
        if(stack){
            this.stack=stack
        }else{
            Error.captureStackTrace(this,this.constructor)               // If no stack, it uses Error.captureStackTrace to generate one automatically.
        }

    }
}

export { ApiError }