import io from 'socket.io-client';
import { api, apiNotification } from "../services/axios";

//custom hook
export const useApi = () => ({
   validateToken: async (token: string) => {
      await api.post('/validate', {
         token
      }).then(response => {
         return response.data
      }).catch(error => {
         return console.log(error)
      })
   },

   signin: async (login: string, senha: string) => {
      try {
         const response = await api.post('/usuario/entrar', {
            login,
            senha
         })

         return response.data
      } catch (error) {
         console.log(error)
         return error
      }

   },

   changePassword: async (login: string, senhaAtual: string, novaSenha: string) => {
      try {
         const response  = await api.post('/Usuario/alterarSenha', {
            login,
            senhaAtual,
            novaSenha
         })

         return response.data

      } catch (error) {
         throw  error
      }

   },

   logout: async () => {
      await api.post('logout')
         .then(response => {
            return response.data
         }).catch(error => {
            return console.log(error)
         })
   },

   conectSocket: (idSiga: number) => {
      return io('https://nestjs-wsnotify-3spe-dev.fl0.io/', {
         query: {
            userId: idSiga,
         },
      });
   },

   findNotification: async (idSiga: number) => {
      try {
         const response = await apiNotification.get('/notification/count', {
            params: {
               id: idSiga
            }
         })

         return response.data
      } catch (error) {
         return error
      }

   },

   requestMenuPrincipal: async (token:string) => {
      try {
         const response = await api.get('/Menu/usuario', {
            headers: {
               'Authorization': token
            }
         })

         return response.data

      } catch (error) {
         return error
      }

   },

   requestSearchUserOrDocument: async (token: string, tipo: string, text: string) =>{
      try {
         const response = await api.get(`/busca?Tipo=${tipo}&Parametro=${text}`, {
            headers:{
               'Authorization': token
            }
         }).then()
         return response.data
      } catch (error) {
         return error
      }

   },

   visualizedNotification: async (id: number) => {
      try {
         
         const response = await apiNotification.post('/notification/visualized', {
            id: id
         })

         return response.data
      } catch (error) {
         console.log(error)
         return error
      }

   }


})