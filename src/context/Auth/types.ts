import { ReactNode } from "react";
import { Socket } from "socket.io-client";

export type SignInUser = {
  accessToken: string | null
  idSiga: number
  nome: string
  login?: string
  imagem: string
}

export type Menu = {
    key: number,
		label: string,
		title: string,
		children: Array<object>
}

export type AuthContextType = {
  menuPrincipal: Menu[]
  user: SignInUser | null
  signin: (data: AuthLogIn) => Promise<void>
  signout: () => void
  userError: string
  setErrorSignInUser: (message: string) => void
  socket: Socket | null
  notification: Notification | null
  setNewNotification: (data: Notification) => void
  isLoading: boolean
  setConnectionSocket: (socket: Socket | null) => void
}

export type AuthProviderProps = {
  children: ReactNode
}

export type AuthLogIn = {
  login: string
  senha: string
}

export type Notification = {
  notification: [{
    id: number
    name: string
    count: number
    notifications: {
      id: number,
      ativo: boolean
      photo: string
      name: string
      descricao: string
      sistema: string
      id_siga_citado: number
      id_siga_comentou: number
      comentario: string
      url: string
      comentario_id: number
      created_at: string
      visualized: boolean
    }[]
  }]
  countAll: number
}
