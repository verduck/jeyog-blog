interface CustomError extends Error {
  code: Number
}

interface CustomErrorClass {
  new (message: string, ...args: any[]): CustomError
}

class NotFoundError implements CustomError {
  code: 404
  name: 'Not Found Error'
  message: string

  constructor(message: string) {
    this.message = message
  }
}

class UnauthorizedError implements CustomError {
  code: 401
  name: 'Unauthorized Error'
  message: string

  constructor(message: string) {
    this.message = message
  }
}
