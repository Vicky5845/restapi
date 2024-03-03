export const CreateSucess = (statusCode,sucessMessage,data)=>{
    const sucessObj = {
        status:statusCode,
        message:sucessMessage,
        data:data
    }
    return sucessObj
}