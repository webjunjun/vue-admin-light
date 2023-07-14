import Cookies from 'js-cookie'
import { setting } from './setting'

export function getToken(): string | undefined {
  return Cookies.get(setting.TokenKey)
}

export function setToken(token: string): string | undefined {
  return Cookies.set(setting.TokenKey, token)
}

export function removeToken(): void {
  return Cookies.remove(setting.TokenKey)
}
