import request from '@/utils/request'
import qs from 'querystring'

export interface IToken {
  token: string
}

export function login (data: {
  userName: string,
  password: string
}) {
  return request.post<IToken>(`/admin/login?userName=${data.userName}&password=${data.password}`)
}

export function changePwd (data: {
  newPassword : string
  oldPassword : string
  userName :string
}) {
  return request.get<any>(`/admin/modify?newPassword=${data.newPassword}&oldPassword=${data.oldPassword}&userName=${data.userName}`)
}
