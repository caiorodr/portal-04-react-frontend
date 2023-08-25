//? LIBS
import * as Dialog from "@radix-ui/react-dialog";
import { Radio, SelectProps, Tooltip } from 'antd';

//? Styles
import { Envelope, GlobeHemisphereWest, ShareNetwork, User, UserList } from "phosphor-react";
import searchModal from "../../../assets/searchModal.svg"

import { 
  CancelButton, 
  Content, 
  Overlay,
  RemoveDot,
  AvatarAutoComplete,
  ContainerCenter,
  ContentLabelSelect,
  DocumentSearch,
  SearchInput,
  UserSearch,
  Title,
  CloseLeft,
  SearchBar,
  GlobalStyle

} from "./styles";

//? Components
import { useState } from "react";
import { useApi } from "../../../hooks/useApi";

export function RadixSearchModal({setDialogOpen, handleClickSearch} : any){

  const [optionsSearch, setOptionsSearch] = useState<SelectProps<object>['options']>([])
  const [userOrDocument, setUserOrDocument] = useState<string>('user')
  const [valueSearchInput, setValueSearchInput] = useState<string>('')
  const [colorIconDocument, setColorIconDocument] = useState<string>('#004E83')
  const [colorIconUser, setColorIconUser] = useState<string>('white')
  const [placeholderSearch, setPlaceholderSearch] = useState<string>('Buscar...')

  const api = useApi()

  const restoreSearch = () => {
    setOptionsSearch([]);
    setUserOrDocument('user');
    setValueSearchInput('');
    setColorIconDocument('#004E83');
    setColorIconUser('white');
    setPlaceholderSearch('Buscar...');
  };

  const closeModalSearch = () => {
    restoreSearch();
    setDialogOpen(false)
  }

  //*função que retorna 2 cores iguais, porem uma escura e uma clara 
  function randomColor() {
    var letras = "0123456789ABCDEF";
    var cor = "#";
    for (var i = 0; i < 6; i++) {
      cor += letras[Math.floor(Math.random() * 16)];
    }
    return cor;
  }


  function obterLetras(nomeCompleto) {
    var partesNome = nomeCompleto.split(" ");
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
        setOptionsSearch([])
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
                  <AvatarAutoComplete shape="square" size={{ xs: 30, sm: 35, md: 40, lg: 43, xl: 45, xxl: 50 }} style={{backgroundColor: value.avatar ? undefined : randomColor()}} src={value.avatar ? ('https://portal.gpssa.com.br' + value.avatar) : ''}>{chartUser}</AvatarAutoComplete>
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
        setOptionsSearch([])
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

  //* function para alterar valor de pesquisa do search (documento / usuario)
  function handleSelectSearch(option){
    if (option === 'user'){
      setPlaceholderSearch('Funcionarios...')
      setUserOrDocument('user')
      setColorIconUser('white')
      setColorIconDocument('#004E83')  
      
    }else {
      setPlaceholderSearch('Documentos...')
      setUserOrDocument('document')
      setColorIconUser('#004E83')
      setColorIconDocument('white')
    }
    setValueSearchInput('')
    setOptionsSearch([])
    
  }

  function handleSearchClick(values: any) {
    handleClickSearch(values);
    setDialogOpen(false);
  }

  return (
    <>
      <Dialog.Portal>
      {/*Fundo preto */}
        <Overlay />

        {/* Conteúdo da página */}
        <Content>

          <ContainerCenter >

            <Radio.Group defaultValue="user" onChange={(a) => handleSelectSearch(a.target.value)} buttonStyle="solid" style={{marginTop: '1rem'}}>
              <Radio.Button value="user" style={{width: '45vw', textAlign: 'center', outline: 'none'}} >
                <UserSearch color={colorIconUser} size={20} />
              </Radio.Button>
              <Radio.Button value="document" style={{width: '45vw', textAlign: 'center', outline: 'none'}} >
                <DocumentSearch color={colorIconDocument} size={20}/>
              </Radio.Button>
            </Radio.Group>

            <SearchBar>
              <RemoveDot>
                <CancelButton onClick={() => { closeModalSearch() }} >
                  <CloseLeft  size={20} weight="bold" />
                </CancelButton>
              </RemoveDot>
              <GlobalStyle />
              <SearchInput
                allowClear={true}
                value={valueSearchInput}
                options={optionsSearch}
                placeholder={placeholderSearch}
                onChange={(textInput ) => {handleChangeSearch(textInput)}}
                onSelect={(values) => {handleSearchClick(values)}}> 
              </SearchInput>

            </SearchBar>

            <img src={searchModal} />
            <Title>Pesquisar funcionarios ou documentos</Title>


          </ContainerCenter>
        </Content>
      </Dialog.Portal>
    </>
  );
}