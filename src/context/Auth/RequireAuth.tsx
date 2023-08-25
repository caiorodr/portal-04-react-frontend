import { ReactNode, useCallback, useEffect, useState } from "react";
import { useContextSelector } from "use-context-selector";
import { AuthContext } from ".";
import { SpinCustom } from "../../components/Spin";
import { useApi } from "../../hooks/useApi";
import { Login } from "../../pages/Login";


export type AuthProviderProps = {
   children: ReactNode
 }

export function RequireAuth ({ children } : AuthProviderProps){
    const api = useApi()
    const [isLoading, setIsLoading] = useState(true);
    const user = useContextSelector(AuthContext, (context) => {
      return context.user
    })
    const setConnectionSocket = useContextSelector(AuthContext, (context) => {
      return context.setConnectionSocket
    })

      

    // Função para conectar o WebSocket
    const connectWebSocket = useCallback(() => {
      if (user?.login) {
        const sockett = api.conectSocket(user.idSiga);
        setConnectionSocket(sockett);

      }
    }, [ api, user ])
    
    useEffect(() => {
      if(user?.login){
        connectWebSocket()
        setTimeout(() => {
          setIsLoading(false)
        }, 600)
      }
    }, [ user ]);
    

    if(isLoading){
      return <SpinCustom size="large"  variant="20rem"/>
    }
    
    if(!user?.login) {
      return <Login />
    }

   return <>{children}</>;
 }