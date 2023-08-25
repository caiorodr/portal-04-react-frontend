//? LIBS
import * as Dialog from "@radix-ui/react-dialog";
import { useState } from "react";
import { useContextSelector } from 'use-context-selector';
import { AuthContext } from "../../../context/Auth";

//? Styles
import { BookOutlined, DashboardOutlined, TrophyOutlined, UserOutlined } from '@ant-design/icons';
import { SignOut, X } from "phosphor-react";
import {
  AvatarPortal,
  CancelButton,
  CardGroup,
  CloseButton,
  Content,
  ModalBody,
  ModalButton,
  ModalHeader,
  NameColaborator,
  Overlay,
  ParallaxGroup,
  RemoveDot,
  TabFrame,
  WaveFooter,
  WavesSVG
} from "./styles";

interface Tab {
  key: string;
  label: string;
  children: JSX.Element;
}

export function RadixUserModal({setDialogOpen} : any){

  const [tabs, setTabs] = useState<Tab[]>([])

  function handleTabPerfil(event: string) {
    const validTabs = tabs.filter((tab) => (tab.key === event));

    if (validTabs.length === 0) {
      if (event === '500000') {
        setTabs((values) => [...values, { key: "500000", label: "Perfil", children: <TabFrame src={"/profile"} title={"Perfil"} /> }]);
      } else if (event === '500001') {
        setTabs((values) => [...values, { key: "500001", label: "P.A / P.M / P.P", children: <TabFrame src={"pa pm pp"} title={"P.A / P.M / P.P"} /> }]);
      } else if (event === '500002') {
        setTabs((values) => [...values, { key: "500002", label: "Dashboard", children: <TabFrame src={"dash"} title={"Dashboard"} /> }]);
      } else {
        setTabs((values) => [...values, { key: "500004", label: "Código de ética", children: <TabFrame src={"https://portal.gpssa.com.br/gps/files/C%C3%B3digo%20de%20Conduta%20GPS.pdf?IDPAGINA=&GRUPOABA=C%C3%B3digo&_dc=1686929092649"} title={"Código de ética"} /> }]);
      }
    }
  }

  const user = useContextSelector(AuthContext, (context) => {
    return context.user
  })

  function closeModalUser() {
      setDialogOpen(false);    
  }

  function handleDisableSideBar() {

  }


  return (
    <>
      <Dialog.Portal>
      {/*Fundo preto */}
        <Overlay />

        {/* Conteúdo da página */}
        <Content>
          <RemoveDot>
            <CancelButton>
              <X />
            </CancelButton>
          </RemoveDot>
                
          <CardGroup>
            <ModalHeader>
              <AvatarPortal src={'https://portal.gpssa.com.br' + user?.imagem} />            
              <NameColaborator>
                {user?.nome}
              </NameColaborator>
            </ModalHeader>
                      
            <ModalBody>
              <ModalButton onClick={() => {handleTabPerfil("500000"); handleDisableSideBar(); closeModalUser(); }}>
                <UserOutlined style={{ marginLeft: '1.5rem', paddingRight: '2.6rem' }}/>
                Ver Perfil
              </ModalButton>
                      
              <ModalButton onClick={() => {handleTabPerfil("500001"); handleDisableSideBar(); closeModalUser(); }}>
                <TrophyOutlined style={{ marginLeft: '1.5rem', paddingRight: '2.6rem' }}/>
                P.A / P.M / P.P
              </ModalButton>
                      
              <ModalButton onClick={() => {handleTabPerfil("500002"); handleDisableSideBar(); closeModalUser(); }}>
                <DashboardOutlined style={{ marginLeft: '1.5rem', paddingRight: '2.6rem' }}/>
                Dashboard
              </ModalButton>
                      
              <ModalButton onClick={() => {handleTabPerfil("500004"); handleDisableSideBar(); closeModalUser(); }}>
                <BookOutlined style={{ marginLeft: '1.5rem', paddingRight: '2.6rem' }}/>
                Código de ética
              </ModalButton>
            </ModalBody>
          </CardGroup>

          <WavesSVG
            xmlns="http://www.w3.org/2000/svg"
            xlinkHref="http://www.w3.org/1999/xlink"
            viewBox="0 24 150 28"
            preserveAspectRatio="none"
          >
            <defs>
              <path
                id="gentle-wave"
                d="M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z"
              />
            </defs>
            <ParallaxGroup>
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="0"
                fill="rgba(255,255,255,0.7"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="3"
                fill="rgba(255,255,255,0.5)"
              />
              <use
                xlinkHref="#gentle-wave"
                x="48"
                y="5"
                fill="rgba(255,255,255,0.3)"
              />
              <use xlinkHref="#gentle-wave" x="48" y="7" fill="#fff" />
            </ParallaxGroup>
          </WavesSVG>

          <WaveFooter >
            <CloseButton>
            <SignOut size={20} color="#ffffff" weight="bold"/>
              <a style={{ color: 'white', fontWeight: 'bold', textDecoration: 'none' }} href="/login">
                Sair
              </a>
            </CloseButton>
          </WaveFooter>
        </Content>
      </Dialog.Portal>
    </>
  );
}
