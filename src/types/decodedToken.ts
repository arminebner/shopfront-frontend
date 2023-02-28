export default interface DecodedToken {
  iat: number
  exp: number
  userInfo: {
    userId: string
    userName: string
    roles: string[]
  }
}
