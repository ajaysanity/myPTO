export interface User{
    name: string
    lastname: string,
    email: string,
    img: string,
    role: string,
    user: boolean
}
export interface location{
    id: string,
    name: string
}
export interface authInfo{
    email: string;
    password: string;
  }
  export interface Approval{
    Reason: string
    To: Date
    Until: Date
    name: string
    lastname: string,
    img: string,
    role: string
    }