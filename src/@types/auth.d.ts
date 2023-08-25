declare namespace Auth {
   
   type AuthStateUserObject = {
      accessToken: string | null
      idSiga: number
      nome: string
      login?: string
      imagem: string
    }

   type AuthStateInterface = {
      authSL: {
         token: string,
         expiresAt: Date
      } | null,
      authCookie: {
         token: string,
         expiresAt: Date
      } | null,
      userState: AuthStateUserObject | null,
      isSignIn: boolean
   }
   
}