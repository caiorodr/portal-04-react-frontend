import { Empty } from 'antd';
import { Notification } from '../../../../components/Notification';

interface NotificationPortalProps {
  items: NotificationType.Item[]
  allNotification: NotificationType.All | undefined
  updateData: (update: NotificationType.All | undefined) => void
  nameSystem: string
}


export const NotificationTab = ({items, allNotification, updateData, nameSystem}: NotificationPortalProps)  => {

  /* 
  *   Responsavel por renderizar os items em tela
  */
  const renderNotifications = () => {
    
    if (items.length > 0) {
      return items.map((item: NotificationType.Item) => (
        <Notification 
          system={nameSystem}
          item={item} 
          updateAndNotify={updateData} 
          allNotification={allNotification}  
        />
      ));

    } else if (nameSystem === 'Não lidas') {

      const notRead = allNotification?.notification.flatMap((values) => {
        if(values.name !== 'Não lidas') {
          return values.notifications.filter((item) => !item.visualized);
        }else {
          return []; // Retorna um array vazio se o nome for 'Não lidas'
        }
      })     

      if(notRead !== undefined && notRead.length > 0) {
        
        return notRead.map((item: NotificationType.Item,) => (
          <Notification 
            system={nameSystem}
            item={item} 
            updateAndNotify={updateData} 
            allNotification={allNotification}  
          />
        ))
      }else {
        return (
          <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={<span>Não há notificações disponíveis</span>}>   
          </Empty>
        );
      }

    }
    else {

      return (
        <Empty
          image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
          imageStyle={{ height: 60 }}
          description={<span>Não há notificações disponíveis</span>}>   
        </Empty>
      );

    }
  };

  

  return <>{renderNotifications()}</>;
}