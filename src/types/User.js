export class User {
  constructor (email, password) {
    this.email = email
    this.password = password
  }
}

export class UserRegister {
  constructor (firstname, lastname, email, password, host) {
    this.firstname = firstname
    this.lastname = lastname
    this.email = email
    this.password = password
    this.isHost = host
  }
}
