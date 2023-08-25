//? LIBS
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from '@radix-ui/react-dialog';
import { useForm } from "react-hook-form";
import * as zod from "zod";

//? Styles
import { CancelButton, Content, Overlay, SendButton, SendInput, Title } from './styles';

//? Components
import { PaperPlaneTilt, X } from "phosphor-react";
import forgotPasswordSvg from "../../../../assets/forgotPasswordSvg.svg";



const formValidatorSchema = zod.object({
  user: zod.string().nonempty('Informe o usuário!'),
});

type FormData = zod.infer<typeof formValidatorSchema>;

export function ModalForgotMyPassword({setDialogOpen, setDialogOpenSendEmail}: any) {
  
  const formForgotPassword = useForm<FormData>({
    resolver: zodResolver(formValidatorSchema),
    defaultValues: {
      user: ""
    }
  });

  const {handleSubmit, reset, register, watch, formState: { errors },} = formForgotPassword;

  const [user] = watch(["user"]);
  const disableForgotPassword = !(user);

  function sendEmail(data: FormData) {
    if(data.user){
      setDialogOpen(false);
      setDialogOpenSendEmail(true);
      reset();
    }
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
        
        <img src={forgotPasswordSvg} />
        <Title>Esqueceu sua senha?</Title>
        <p>Por favor, informe seu Login do Portal GPS. Enviaremos uma senha alternativa para seu e-mail.</p>

        <form >
          <SendInput 
            placeholder="Digite seu Login..." 
            {...register("user")}
          />
          {errors.user && <span>{errors.user?.message}</span>}
          
          <SendButton 
            onClick={handleSubmit(sendEmail)}
            disabled={disableForgotPassword}
          >
            Solicitar
            <PaperPlaneTilt />
          </SendButton>
        </form>

      </Content>

    </Dialog.Portal>
  )
}