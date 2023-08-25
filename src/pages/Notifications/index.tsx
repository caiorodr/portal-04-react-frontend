import { Badge, Divider, Tabs } from 'antd';
import { useEffect, useState } from 'react';
import { NotificationTab } from './Components/NotificationTab';
import { NotificationContainer } from "./styles";

export function Notifications() {
  const [itemNotification, setItemNotification] = useState()
  const [data, setData] = useState<any>( )

  useEffect(() => { 
    const notificationLS = localStorage.getItem('@notification:') || ''
    setData(JSON.parse(notificationLS))
  }, []);


  useEffect(() => { 
    if (data) {
      const itemNotification = data.notification.map((item) => ({
        label: <Badge count={item.name === 'Não lidas' ? data.countAll : item.count} size="small">{item.name}</Badge>,
        key: item.id,
        children: <NotificationTab 
            items={item.notifications} 
            allNotification={data} 
            updateData={updateData}  
            nameSystem={item.name}
          />,
      }))

      setItemNotification(itemNotification);
    }
  }, [data]);



  const updateData = (newState) => {
    setData(newState);
  };

  
  return (
    <NotificationContainer>
      <h2>Notificações</h2>
      <Divider />
      <Tabs
        defaultActiveKey="1"
        items={itemNotification}
      />
    </NotificationContainer>
  )
}