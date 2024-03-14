export const CreateError = (status, message) => {
    const err = new Error()
    err.status = status
    err.message = message
    return err
}

export const CreateSucess = (statusCode, sucessMessage, data) => {
    const sucessObj = {
        status: statusCode,
        message: sucessMessage,
        data: data
    }
    return sucessObj
}

export const SucessAndErrorHandler = (obj, req, res, next) => {
    const statusCode = obj.status || 500
    const message = obj.message || "Something Went Wrong "
    return res.status(statusCode).json({
        sucess: [200, 201, 204].some(a => a === obj.status) ? true : false,
        status: statusCode,
        message: message,
        data: obj.data,
       

    })
}