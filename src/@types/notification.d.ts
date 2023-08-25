declare namespace NotificationType {

   
   type All = {
      notification: {
         id: number
         name: string
         count: number
         notifications: NotificationItem[]
       }[]
       countAll: number
   }

   type Item = {
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
    }
}