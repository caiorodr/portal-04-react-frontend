//? LIBS
import * as Dialog from '@radix-ui/react-dialog';
import { Divider } from 'antd';

//? Styles
import { ButtonResendEmail, CancelButton, Content, Overlay, Title } from './styles';

//? Components
import { PaperPlaneTilt, X } from "phosphor-react";
import sendEmailSvg from "../../../../assets/sendEmailSvg.svg";


export function ModalSendEmail({setDialogOpen}: any) {


function handleResend() {
  setDialogOpen(false);
}

  return (
    <Dialog.Portal>
      {/*Fundo preto */}
      <Overlay />
      {/* Conteúdo da página */}
      <Content>
        <Dialog.Close>
          <CancelButton>
            <X />
          </CancelButton>
        </Dialog.Close>
        
        <img src={sendEmailSvg} />
        
        <Title>Email enviado!</Title>

        <div>
          <p>Caso seu email esteja cadastrado no Portal Grupo GPS, você receberá uma mensagem em seu email com as instruções para definir uma nova senha.</p>
          <Divider />
          <small>Caso não tenha recebido a mensagem, verifique se digitou o usuário corretamente ou se caiu na caixa de spam.</small>
        </div>
        
        <ButtonResendEmail type="submit" variant={"tertiary"} onClick={() => {handleResend()}}>
          <PaperPlaneTilt size={32} />
          Reenviar e-mail
        </ButtonResendEmail>


      </Content>

    </Dialog.Portal>
  )
}