import { useApi } from "../../hooks/useApi";
import { ContainerNotification, NotificationContent, NotificationDetails, NotificationMessage } from "./styles";

interface NotificationProps {
   system: string
   item: NotificationType.Item
   allNotification: NotificationType.All | undefined
   updateAndNotify: (update: NotificationType.All | undefined) => void
} 

import { format, formatRelative } from 'date-fns';

export function Notification({ system, item, updateAndNotify, allNotification} : NotificationProps) {
   const api = useApi()

   
   const handleClick = async (notification) => {
      if(!notification.visualized){
         let countAllNotification = allNotification?.countAll ? allNotification.countAll : 0
         const res = await api.visualizedNotification(notification.id)
   
         console.log(allNotification)
         if(res) {
            
            const notificationVisualized = allNotification?.notification.map((item) => {
               if(item.name === notification.sistema) {
               const updatedNotifications = item.notifications.map((notificationUpdated) => {
                  if (notificationUpdated.id === notification.id) {
                     return {
                     ...notificationUpdated,
                     visualized: true
                     };
                  }
                  return notificationUpdated;
               });
   
               countAllNotification -= 1
   
               return {
                  ...item,
                  count: item.count - 1,
                  notifications: updatedNotifications
               };
               }
   
               return item
            })
   
            updateAndNotify({notification: notificationVisualized, countAll: countAllNotification} as NotificationType.All)
            window.parent.postMessage({notification: notificationVisualized, countAll: countAllNotification} as NotificationType.All, '*')
   
            localStorage.removeItem('@notification:')
            localStorage.setItem('@notification:', JSON.stringify({notification: notificationVisualized, countAll: countAllNotification}) )
         }
      }
      
   }
  
   

   function formatDate(dateString) {
      const today = new Date()
      const data = new Date(dateString)
      const newFormat = formatRelative(data,today)
      const week = ["Segunda-feira","Terça-feira","Quarta-feira","Quinta-feira","Sexta-feira","Sabado","Domingo"]
      
      if (newFormat.includes("today")){
         //return intlFormatDistance(data,today)
         return "Hoje " + format(data, 'HH:mm')
      }else if (newFormat.includes("yesterday")){
         return "Ontem ás " + format(data, 'HH:mm')
      }else if (newFormat.includes("last")){
         return week[Number(format(data, 'i')) - 1] + " ás " + format(data, 'HH:mm') 
      } else {
         return format(data, 'dd/MM/yyyy HH:mm')
      }
   }


   return (

      <ContainerNotification
         onClick={() => handleClick(item)}
         key={item.id}
         style={{ borderLeft: item.visualized ? "" : "0.5rem solid #72c8fa" }}
      >
         
         <NotificationMessage>
            
            <img src={'https://portal.gpssa.com.br' + item.photo} />

            <NotificationContent>
               <h4>{item.name}</h4>
               <p>{item.descricao}</p>
               <p>{item.comentario}</p>
            </NotificationContent>

            <NotificationDetails>
               <p>{formatDate(item.created_at)}</p>
               {system === 'Não lidas' ? <p>{item.sistema}</p> : ''}
               
            </NotificationDetails>
         
         </NotificationMessage>


      </ContainerNotification>

   )
}