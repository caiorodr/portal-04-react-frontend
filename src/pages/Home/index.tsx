import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';

import { BookOutlined, DashboardOutlined, DownOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import { DndContext, DragEndEvent, PointerSensor, useSensor } from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  horizontalListSortingStrategy,
  useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { css } from '@emotion/css';
import { Badge, Dropdown, MenuProps, Radio, SelectProps, Space, Spin, Tabs, Tooltip } from 'antd';
import { useContextSelector } from 'use-context-selector';

import { ToastContainer, toast } from 'react-toastify';

import "primereact/resources/primereact.min.css";
import 'react-toastify/dist/ReactToastify.css';

import logoTopBar from "../../assets/logoTopBar.svg";

import { Envelope, GlobeHemisphereWest, List, ShareNetwork, SignOut, User, UserList, X } from "phosphor-react";
import { AvatarAutoComplete, AvatarCard, AvatarPortal, AvatarToastify, Buscar, CardButton, CardUserBody, CardUserHeader, CloseButton, Container, ContainerCenter, ContainerLeft, ContainerRight, ContentGroup, ContentLabelSelect, ContentTabs, ContentTextToatify, ContentToastify, DescriToastify, DocumentSearch, GpsAmigo, Header, IconsBar, KeyUser, LogOut, Main, MenuTabs, MobileBar, MobileCard, NameColaboratorCard, Overlay, PhotoAndName, PhotoColaborator, ResponsiveMode, SearchContent, SearchInput, SideBar, Sino, SkeletonLoad, TabFrame, Text, TextToastify, TitleToastify, UserContent, UserSearch } from './styles';


import { AuthContext } from '../../context/Auth';
import { useApi } from "../../hooks/useApi";


interface DraggableTabPaneProps extends HTMLAttributes<HTMLDivElement> {
  'data-node-key': string;
  onActiveBarTransform: (className: string) => void;
}

interface Tab {
  key: string;
  label: string;
  children: JSX.Element;
}

type MenuItem = Required<MenuProps>['items'][number]


export function Home() {
  const [visibleSpin, setVisibleSpin] = useState<boolean>(false)
  const [visible, setVisible] = useState<string>('flex')
  const [activeKey, setActiveKey] = useState("")
  const [remContent, setRemContent] = useState<number>(25)
  const [tabs, setTabs] = useState<Tab[]>([])
  const iframeRef = useRef<HTMLIFrameElement>(null)
  const [optionsSearch, setOptionsSearch] = useState<SelectProps<object>['options']>([])
  const [userOrDocument, setUserOrDocument] = useState<string>('user')
  const [valueSearchInput, setValueSearchInput] = useState<string>('')
  const [colorIconDocument, setColorIconDocument] = useState<string>('#004E83')
  const [colorIconUser, setColorIconUser] = useState<string>('white')
  const [placeholderSearch, setPlaceholderSearch] = useState<string>('Pesquisar funcionário...')
  const [className, setClassName] = useState('')

  //? Responsive States
  const [activeCard, setActiveCard] = useState<string>('none')
  const [hideMobileBar, setHideMobileBar] = useState<string>('')
  const [remCard, setRemCard] = useState<number>(100)
  const [searchContent, setSearchContent] = useState<string>('none')
  const [userContent, setUserContent] = useState<string>('none')
  const [glowIconUser, setGlowIconUser] = useState<string>('drop-shadow(white 0px 0px 2px)')
  const [glowIconDoc, setGlowIconDoc] = useState<string>('none')
  const [shadowUser, setShadowUser] = useState<string>('inset -3px 3px 18px 2px rgba(0,0,0,0.25)')
  const [shadowDoc, setShadowDoc] = useState<string>('none')


  
  const api = useApi()
  
  const user = useContextSelector(AuthContext, (context) => {
    return context.user
  })

  const notification = useContextSelector(AuthContext, (context) => {
    return context.notification
  })

  const setNewNotification = useContextSelector(AuthContext, (context) => {
    return context.setNewNotification
  })

  const socket = useContextSelector(AuthContext, (context) => {
    return context.socket
  })
  
  const signout = useContextSelector(AuthContext, (context) => {
      return context.signout
  })


  const responseMenu = useContextSelector(AuthContext, (context) => {
    return context.menuPrincipal
  })

  const isLoadingMenu = useContextSelector(AuthContext, (context) => {
    return context.isLoading
  })


  const itemsMenu: MenuItem[] = responseMenu


  useEffect(() => {
    if (socket && socket.connected) {
      const notificationHandler = (data) => {
        
        toast((
          <ContentToastify>
            <AvatarToastify src={data.access.access[0].foto ? 'https://portal.gpssa.com.br' + data.access.access[0].foto : ''} >{obterLetras(data.access.access[0].nome)}</AvatarToastify>
            <ContentTextToatify>
              <TitleToastify>{data.access.access[0].nome}</TitleToastify>
              <DescriToastify>{data.access.responsePayLoad.descricao.substr(0,20)}</DescriToastify>
              <TextToastify>{data.access.responsePayLoad.comentario.substr(0,30) + "..."}</TextToastify>
            </ContentTextToatify>      
          </ContentToastify>
        ),{
          position: "bottom-right",
          autoClose: 5000,
          closeOnClick: true,
          hideProgressBar: true,
          pauseOnHover: true,
          draggable: true,

        });

        localStorage.removeItem('@notification:')
        localStorage.setItem('@notification:', JSON.stringify(data.data))
        setNewNotification(data.data)
      };
  
      socket.on('notification', notificationHandler);
  
      return () => {
        socket.off('notification', notificationHandler);
      };
    }

  }, [socket]);
  

  //Envia a contexto da notificação para a tab filho
  const sendNotificationToIframe = () => {
    localStorage.setItem('@notification:', JSON.stringify(notification))
  };

  

  /*
   * useEffect responsavel por receber do componente filho da iframe
   * as notificações atualizadas. 
   * 
   */
  
  useEffect(() => {
    const handleMessage = (event) => {
      if(event.data.notification) {
        setNewNotification(event.data)
      }
    };

    window.addEventListener('message', handleMessage);

    return () => {
      window.removeEventListener('message', handleMessage);
    };
  }, [])


  function handleDisableSideBar() {
    if (visible === 'none') {
      setRemContent(25)
      setVisible('flex')
    } else {
      setRemContent(0)
      setVisible('none')
    }
  }


  //* function para ativar/desativar o card na versão responsiva
  function handleEnableCard() {
    setRemCard(4.5)
    setActiveCard('flex')
  }

  function handleDisableCard() {
    setRemCard(100)
    setActiveCard('none')
    setSearchContent('none')
    setUserContent('none')
    setHideMobileBar('flex')
  }


  //* function para mostrar o conteudo dos cards
  function showSearchContent() {
    setSearchContent('grid')
    setUserContent('none')
  }

  function showUserContent() {
    setSearchContent('none')
    setUserContent('grid')
  }


  const items: MenuProps['items'] = [

    {
      key: '1',
      label: (
        <a onClick={() => { handleTabPerfil("500000") }}>
          Ver Perfil
        </a>
      ),
      icon: <UserOutlined />,
    },
    {
      key: '2',
      label: (
        <a onClick={() => { handleTabPerfil("600000") }}>
          P.A / P.M / P.P
        </a>
      ),
      icon: <TrophyOutlined />,
      disabled: false,
    },
    {
      key: '3',
      label: (
        <a onClick={() => { handleTabPerfil("700000") }}>
          Dashboard
        </a>
      ),
      icon: <DashboardOutlined />,
      disabled: false,
    },
    {
      key: '4',
      label: (
        <a onClick={() => { handleTabPerfil("900000") }}>
          Código de ética
        </a>
      ),
      icon: <BookOutlined />,
      disabled: false,
    },
    {

      key: '5',
      danger: true,
      label: (
        <a onClick={() => { signout() }}>
          Sair
        </a>
      ),
    },
  ]

  function obterLetras(nomeCompleto) {
    var partesNome = nomeCompleto.trim().split(" ");
    var nome = partesNome[0];
    var sobrenome = partesNome[partesNome.length - 1];

    var primeiraLetraNome = nome.charAt(0);
    var primeiraLetraSobrenome = sobrenome.charAt(0);

    return primeiraLetraNome + primeiraLetraSobrenome;
  }

  //* function para iniciar a pesquisa de usuario ou de documento
  function handleChangeSearch(textInput){
    setValueSearchInput(textInput)
    const token: any = localStorage.getItem('@token:') ? localStorage.getItem('@token:') : 'nao autorizado'
    let resultCreateSearch
  
    if(textInput){
        if(userOrDocument === 'user'){
          api.requestSearchUserOrDocument(token, userOrDocument, textInput).then((searchFull) => { 
              resultCreateSearch = searchFull.map((value) => {
              const chartUser = value.avatar ? '' : obterLetras(value.nome)
              return {
              value: value.nome,
              idSiga: value.idsiga,
              url: value.urluser,
              label: (
                <div style={{display: 'flex', gap: '1rem', fontSize: '0.75rem', width:'100%'}}>
                  <div style={{width:'17%'}}>
                    <AvatarAutoComplete shape="square" size={{ xs: 30, sm: 35, md: 40, lg: 43, xl: 45, xxl: 50 }} style={{backgroundColor: value.avatar ? undefined : '#004E83'}} src={value.avatar ? ('https://portal.gpssa.com.br' + value.avatar) : ''}>{chartUser}</AvatarAutoComplete>
                  </div>
                  <ContentLabelSelect>
                    <Tooltip title={value.nome.length > 35 ? value.nome : ''} color='#004E83'>
                      <h3>{value.nome}</h3>
                    </Tooltip>
                    <p style={{display: value.email ? 'flex' : 'none'}}><Envelope weight="bold" style={{margin:'0.2rem 0.4rem 0.2rem 0'}}/>{value.email}</p>
                    <p style={{display: value.cargo ? 'flex' : 'none'}}><UserList  weight="bold" style={{margin:'0.2rem 0.4rem 0.2rem 0'}}/>{value.cargo}</p>
                  </ContentLabelSelect>
                </div>
              ),
            };
      
            })
            setTimeout(() => {
              setOptionsSearch(resultCreateSearch)
            }, 50);
          })
        }else {
          api.requestSearchUserOrDocument(token, userOrDocument, textInput).then((searchFull) => {
          const resultCreateSearch = searchFull.map((value) => {
            return {
            value: value.nomedoc,
            idDoc: value.iddoc,
            url: value.urldoc,
            label: (
              <div style={{display: 'flex', gap: '1rem', fontSize: '0.75rem', width:'100%'}}>
                <AvatarAutoComplete  shape="square" size={{ xs: 30, sm: 35, md: 40, lg: 43, xl: 45, xxl: 50 }} src={'https://portal.gpssa.com.br/cracha/documento.png'} />
                <ContentLabelSelect>
                    <Tooltip title={value.nomedoc.length > 35 ? value.nomedoc : ''} color='#004E83'>
                      <h3>{value.nomedoc}</h3>
                    </Tooltip>
                    <p style={{display: value.userdoc ? 'flex' : 'none'}}><User weight="bold" style={{margin:'0.2rem 0.4rem 0.2rem 0'}}/>{value.userdoc}</p>
                    <p style={{display: value.regionaldoc ? 'flex' : 'none'}}><GlobeHemisphereWest weight="bold" style={{margin:'0.2rem 0.4rem 0.2rem 0'}}/>{value.regionaldoc}</p>
                    <p style={{display: value.areadoc ? 'flex' : 'none'}}><ShareNetwork weight="bold" style={{margin:'0.2rem 0.4rem 0.2rem 0'}}/>{value.areadoc}</p>
                </ContentLabelSelect>
              </div>
            ),
          };
          })
          setTimeout(() => {
            setOptionsSearch(resultCreateSearch)
          }, 50);
        })
      }
    }else {
      setOptionsSearch([])
    }
  }

  //*function para abertura de tab no search 
  function handleClickSearch(login, values){
    console.log(login)
    setOptionsSearch([])
    const width: number = window.innerWidth;

    if (width < 900 && visible === 'flex'){
      handleDisableSideBar() 
    }

    if(userOrDocument === 'user'){
      const validUserTab = tabs.filter((tab) => (tab.key === "500000" + String(values.idSiga)));
      if(validUserTab.length > 0){
        setActiveKey("500000" + String(values.idSiga));
      }else{
        setTabs((valuesTabs) => [...valuesTabs, { key: "500000" + values.idSiga, label: "Perfil: " + values.value, children: <TabFrame src={'https://portal.gpssa.com.br' + values.url}/> }]);
        setActiveKey("500000" + values.idSiga);
      }
    }else{
      if(((values.url.slice(values.url.length - 3)).toUpperCase() === 'PDF')){
        const validDocTab = tabs.filter((tab) => (tab.key === "900000" + String(values.idDoc)));
        if(validDocTab.length > 0){
           setActiveKey("900000" + String(values.idDoc));
        }else {
          setTabs((valuesTabs) => [...valuesTabs, { key: "900000" + String(values.idDoc), label: 'Documento: ' + values.value.substring(0,10) + '...', children: <TabFrame src={'https://portal.gpssa.com.br' + values.url}/> }]);
          setActiveKey("900000" + String(values.idDoc));
        }

      }else{
        window.open('https://portal.gpssa.com.br' + values.url)
      }
    }
  }


  function handleFocusSearch(){
    if(valueSearchInput.length > 0){
      handleChangeSearch(valueSearchInput)
    }else{
      setOptionsSearch([])
    }
  }

  function handleBlurSearch(){
    setValueSearchInput('')
    setOptionsSearch([])
  }


  //* effect para alterar o tamanho do card e ocultar o menu na versão responsiva
  useEffect(() => {
    if (activeCard === 'none'){
      setRemCard(100);
      setHideMobileBar('flex')
    } else if (valueSearchInput.length >= 1) {
      setRemCard(0);
      setHideMobileBar('none')
    } else {
      setRemCard(4.5);
      setHideMobileBar('flex')
    }
  }, [valueSearchInput]);


  //* function para alterar valor de pesquisa do search (documento / usuario)
  function handleSelectSearch(option){
    if (option === 'user'){
      setPlaceholderSearch('Pesquisar funcionario...')
      setUserOrDocument('user')
      setColorIconUser('white')
      setColorIconDocument('#004E83')

      setGlowIconUser('drop-shadow(white 0px 0px 2px)')
      setGlowIconDoc('none')
      setShadowUser('inset -3px 3px 18px 2px rgba(0,0,0,0.25)')   
      setShadowDoc('none')
    }else {
      setPlaceholderSearch('Pesquisar documento...')
      setUserOrDocument('document')
      setColorIconUser('#004E83')
      setColorIconDocument('white')

      setGlowIconUser('none')
      setGlowIconDoc('drop-shadow(white 0px 0px 2px)')
      setShadowUser('none')      
      setShadowDoc('inset 1px 5px 18px 2px rgba(0,0,0,0.25) ')
    }

    setValueSearchInput('')
    setOptionsSearch([])
  }



  function handleTabPerfil(event: string) {

    const width: number = window.innerWidth;

    if (width < 900 && visible === 'flex'){
      handleDisableSideBar()
    }
    
    setVisibleSpin(true);
    const validTabs = tabs.filter((tab) => (tab.key === event));

    if (validTabs.length === 0) {
      if (event === '500000') {
        setTabs((values) => [...values, { key: "500000", label: "Meu Perfil", children: <TabFrame src={"https://nestjs-wsnotify-3spe-dev.fl0.io/profile"} title={"Perfil"} /> }]);
      } else if (event === '600000') {
        setTabs((values) => [...values, { key: "600000", label: "P.A / P.M / P.P", children: <TabFrame src={"pa pm pp"} title={"P.A / P.M / P.P"} /> }]);
      } else if (event === '700000') {
        setTabs((values) => [...values, { key: "700000", label: "Dashboard", children: <TabFrame src={"dash"} title={"Dashboard"} /> }]);
      } else if (event === '800000') {

        setTabs((values) => [
          ...values, 
          { 
            key: "800000",
            label: "Notificações",
            children: <TabFrame 
              ref={iframeRef} 
              src={"https://caiorodr.github.io/portal-04-react-frontend/notifications"}
              title={"Notifications"}
              onLoad={() => {
                sendNotificationToIframe();
              }}
            /> 
          }
        ]);

      } else {
        setTabs((values) => [...values, { key: "900000", label: "Código de ética", children: <TabFrame src={"https://portal.gpssa.com.br/gps/files/C%C3%B3digo%20de%20Conduta%20GPS.pdf?IDPAGINA=&GRUPOABA=C%C3%B3digo&_dc=1686929092649"} title={"Código de ética"} /> }]);
      }
    }
    setTimeout(() => {setVisibleSpin(false)}, 600)
    setActiveKey(event)

  }

  function handleCreateTab(event: any) {
    
    const width: number = window.innerWidth;

    if (width < 900 && visible === 'flex'){
      handleDisableSideBar() 
    }
    
    setVisibleSpin(true)
    const validTabs = tabs.filter((tab) => (tab.key === event.key))
    if (validTabs.length === 0) {
      setTabs((values) => [...values, { key: event.key, label: event.domEvent.target.innerText, children: <TabFrame src={event.item.props.title}/> }])
    }
    setTimeout(() => { setVisibleSpin(false) }, 600)
    setActiveKey(event.key)
  }

  function handleTabChange(key: string) {
    setActiveKey(key)
  }

  function handleDeleteTab(event: any) {
    const closeTab = tabs.filter(tab => (tab.key !== event))
    setTabs(closeTab)
    if(closeTab.length > 0){
      setActiveKey(closeTab[closeTab.length - 1].key)
    }
    
  }


  const DraggableTabNode = ({ className, onActiveBarTransform, ...props }: DraggableTabPaneProps) => {
    const { attributes, listeners, setNodeRef, transform, transition, isSorting } = useSortable({
      id: props['data-node-key'],
    })

    const style: React.CSSProperties = {
      ...props.style,
      transform: CSS.Transform.toString(transform),
      transition: transition || '',
      cursor: 'pointer',
    }



    const isActiveTab = className?.includes('ant-tabs-tab-active')

    const tabRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
      if (isActiveTab && tabRef.current) {
        const tabsNode = tabRef.current.parentNode?.parentNode?.parentNode
        if (tabsNode && tabsNode instanceof HTMLElement && tabsNode.classList.contains('ant-tabs-tab')) {
          const activeTabNode = tabsNode.querySelector('.ant-tabs-tab-active')
          if (activeTabNode && activeTabNode instanceof HTMLElement) {
            activeTabNode.style.transform = CSS.Transform.toString(transform) || ''
            activeTabNode.style.transition = transition || ''// Atribui uma string vazia se transition for undefined
          }
        }
      }
    }, [isActiveTab, transform, transition])

    useEffect(() => {
      if (!isSorting) {
        onActiveBarTransform('')
      } else if (isActiveTab) {
        onActiveBarTransform(
          css`
            .ant-tabs-ink-bar {
              transform: ${CSS.Transform.toString(transform)};
              transition: ${transition || ''} !important;
            }
          `,
        );
      }
    }, [isActiveTab, transition, isSorting, transform])



    return React.cloneElement(props.children as React.ReactElement, {
      ref: setNodeRef,
      style,
      ...listeners,
      ...attributes
    })
  }

  

  const sensor = useSensor(PointerSensor, { activationConstraint: { distance: 10 } });

  const onDragEnd = ({ active, over }: DragEndEvent) => {
    if (active.id !== over?.id) {
      setTabs((prev) => {
        const activeIndex = prev.findIndex((i) => i.key === active.id)
        const overIndex = prev.findIndex((i) => i.key === over?.id)
        return arrayMove(prev, activeIndex, overIndex)
      });
    }
  };

  var letrasImagem = obterLetras(user?.nome);


  return (
    <Main>
      <ToastContainer/>
      <Header>

        <ContainerLeft>
          <button onClick={() => { handleDisableSideBar()}}>
            <List size={32} />
          </button>

          <img src={logoTopBar} alt="Logo branco Grupo GPS" />
        </ContainerLeft>

        <ContainerCenter >
          <Radio.Group defaultValue="user" onChange={(a) => handleSelectSearch(a.target.value)} buttonStyle="solid">
            <Radio.Button value="user">
              <UserSearch color={colorIconUser} size={20}/>
            </Radio.Button>
            <Radio.Button value="document">
              <DocumentSearch color={colorIconDocument} size={20}/>
            </Radio.Button>
          </Radio.Group>
      
          <SearchInput
            value={valueSearchInput}
            options={optionsSearch}
            placeholder={placeholderSearch}
            defaultActiveFirstOption={false}
            // notFoundContent={(<h4>Nenhum dado encontrado...</h4>)}
            allowClear={true}
            onChange={(textInput ) => {handleChangeSearch(textInput)}}
            onSelect={(login, values) => {handleClickSearch(login,values)}}
            onFocus={() => {handleFocusSearch()}}
            onBlur={() => {handleBlurSearch()}}
          >
          </SearchInput>
        </ContainerCenter>
        
        <ContainerRight>

          <IconsBar>
            <Tooltip title="GPS Amigo" color='#5398DD'>
              <GpsAmigo size={25} onClick={() => { window.open("https://gpsamigo.com.br/") }} />
            </Tooltip>

            <Tooltip title="Key User" color='#5398DD'>
              <KeyUser size={25} />
            </Tooltip>

            <Tooltip title={`Notificações`} color='#5398DD'>

              <Badge count={notification?.countAll} showZero={false} >
                <a onClick={() => { handleTabPerfil("800000") }}>
                  <Sino size={25} />
                </a>
              </Badge>
            </Tooltip>
          </IconsBar>

          <PhotoAndName>
            <li>
              <AvatarPortal size={47} src={user?.imagem ? 'https://portal.gpssa.com.br' + user?.imagem : ''} >{letrasImagem}</AvatarPortal>
            </li>

            <li>
              <Dropdown menu={{ items }} >
                <a onClick={(e) => e.preventDefault()}>
                  <Space>
                    {user?.nome}
                    <DownOutlined />
                  </Space>
                </a>
              </Dropdown>
            </li>
          </PhotoAndName>

        </ContainerRight>

      </Header>

      <Container >

        <SideBar style={{ display: visible }}>
          <SkeletonLoad active loading={isLoadingMenu} title={false} paragraph={{ rows: 30, width: 300 }}>
            <MenuTabs mode="inline" items={itemsMenu} onSelect={(e) => { handleCreateTab(e) }}></MenuTabs>
          </SkeletonLoad>

          
        </SideBar>

        <ContentTabs style={{ width: `calc(100vw - ${remContent}rem)` }}>
          <Spin spinning={visibleSpin} size="large" style={{ top: '10vh', marginLeft: '-8px' }}>
            <Tabs
              className={className}
              hideAdd
              onChange={(e) => { handleTabChange(e) }}
              activeKey={activeKey}
              type="editable-card"
              items={tabs}
              onEdit={(e) => { handleDeleteTab(e) }}
              renderTabBar={(tabBarProps, DefaultTabBar) => (
                <DndContext sensors={[sensor]} onDragEnd={onDragEnd}>
                  <SortableContext items={tabs.map((i) => i.key)} strategy={horizontalListSortingStrategy}>
                    <DefaultTabBar {...tabBarProps}>
                      {(node) => (
                        <DraggableTabNode
                          {...node.props}
                          key={node.key}
                          onActiveBarTransform={setClassName}
                        >
                          {node}
                        </DraggableTabNode>
                      )}
                    </DefaultTabBar>
                  </SortableContext>
                </DndContext>
              )}

            />
          </Spin>
        </ContentTabs>

      </Container>

      <ResponsiveMode>
        <MobileBar style={{ display: `${hideMobileBar}` }}>
          <GpsAmigo size={25} onClick={() => {window.open("https://gpsamigo.com.br/"); handleDisableCard(); }} />
          
          <a onClick={() => { handleEnableCard(); showSearchContent(); }}>
            <Buscar size={25} />
          </a>

          <PhotoColaborator>
            <a onClick={() =>  {handleEnableCard(); showUserContent(); }}>
              <AvatarPortal src={'https://portal.gpssa.com.br' + user?.imagem} />
            </a>
          </PhotoColaborator>

          <Badge count={notification?.countAll} showZero={false} >
            <a onClick={() => { handleTabPerfil("800000"); handleDisableCard(); }}>
              <Sino size={25} />
            </a>
          </Badge>

          <KeyUser size={25} />
        </MobileBar>

        <Overlay onClick={() => {handleDisableCard(); }} style={{display: `${activeCard}`}} />

        <MobileCard style={{ height: `calc(100vh - ${remCard}rem)` }}>
          <CloseButton>
            <X onClick={() => { handleDisableCard(); }} />
          </CloseButton>

          <SearchContent style={{ display: `${searchContent}`}}>
            <Radio.Group defaultValue="user" onChange={(a) => handleSelectSearch(a.target.value)} buttonStyle="solid" >
              <Radio.Button value="user" style={{width: '45vw', textAlign: 'center', outline: 'none', boxShadow: `${shadowUser}` }} >
                <UserSearch color={colorIconUser} size={20} style={{ filter: glowIconUser }}/>
              </Radio.Button>
              <Radio.Button value="document" style={{width: '45vw', textAlign: 'center', outline: 'none', boxShadow: `${shadowDoc}` }} >
                <DocumentSearch color={colorIconDocument} size={20} style={{ filter: glowIconDoc }}/>
              </Radio.Button>
            </Radio.Group>
            <SearchInput
              value={valueSearchInput}
              options={optionsSearch}
              placeholder={placeholderSearch}
              defaultActiveFirstOption={false}
              // notFoundContent={(<h4>Nenhum dado encontrado...</h4>)}
              allowClear={true}
              onChange={(textInput) => { handleChangeSearch(textInput); }}
              onSelect={(login, values) => {handleClickSearch(login,values); handleDisableCard(); }}
              onFocus={() => {handleFocusSearch()}}
            >  
            </SearchInput>

            <Text>Pesquisar funcionarios ou documentos</Text>
          </SearchContent>

          <UserContent style={{ display: `${userContent}`}}>
            <ContentGroup>
              <CardUserHeader>
                <AvatarCard src={'https://portal.gpssa.com.br' + user?.imagem} />            
                <NameColaboratorCard>
                  {user?.nome}
                </NameColaboratorCard>
              </CardUserHeader>
                        
              <CardUserBody>
                <CardButton onClick={() => {handleTabPerfil("500000"); handleDisableCard(); }}>
                  <UserOutlined style={{ marginLeft: '1.5rem', paddingRight: '2.6rem' }}/>
                  Ver Perfil
                </CardButton>
                        
                <CardButton onClick={() => {handleTabPerfil("500001"); handleDisableCard(); }}>
                  <TrophyOutlined style={{ marginLeft: '1.5rem', paddingRight: '2.6rem' }}/>
                  P.A / P.M / P.P
                </CardButton>
                        
                <CardButton onClick={() => {handleTabPerfil("500002"); handleDisableCard(); }}>
                  <DashboardOutlined style={{ marginLeft: '1.5rem', paddingRight: '2.6rem' }}/>
                  Dashboard
                </CardButton>
                        
                <CardButton onClick={() => {handleTabPerfil("500004"); handleDisableCard(); }}>
                  <BookOutlined style={{ marginLeft: '1.5rem', paddingRight: '2.6rem' }}/>
                  Código de ética
                </CardButton>
              </CardUserBody>
            </ContentGroup>

            <LogOut>
              <SignOut size={20} color="#ffffff" weight="bold"/>
                <a style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }} href="/login">
                  Sair
                </a>
            </LogOut>
          </UserContent>
        </MobileCard>
      </ResponsiveMode>
    </Main>
  )
}