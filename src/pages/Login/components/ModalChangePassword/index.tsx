//? LIBS
import * as Dialog from "@radix-ui/react-dialog";
import { FieldError, FormProvider, UseFormHandleSubmit, UseFormRegister, UseFormWatch, useForm } from "react-hook-form";
import * as zod from "zod";

//? Styles
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, X } from "phosphor-react";
import { ToastContainer, toast } from 'react-toastify';
import changePasswordSvg from "../../../../assets/changePasswordSvg.svg";
import { useApi } from "../../../../hooks/useApi";
import { ChangePasswordForm } from "./ChangePasswordForm";
import {
  CancelButton,
  Content,
  ContentForm,
  Overlay,
  SendButton,
  Title
} from "./styles";



const formValidatorSchema = zod.object({
  login: zod.string().nonempty("Informe o login!"),

  lastPassword: zod
    .string()
    .min(6, "A senha precisa de no mínimo 6 caracteres.")
    .max(20, "O número máximo de caracteres permitido é 20."),

  newPassword: zod
    .string()
    .min(6, "A senha precisa de no mínimo 6 caracteres.")
    .max(20, "O número máximo de caracteres permitido é 20."),

  repeatPassword: zod
    .string()
    .min(6, "A senha precisa de no mínimo 6 caracteres.")
    .max(20, "O número máximo de caracteres permitido é 20."),
}).superRefine(({ newPassword, repeatPassword }, ctx) => {
  if (newPassword !== repeatPassword && ( newPassword.length >= 6 && repeatPassword.length >= 6 )) {
    ctx.addIssue({
      code: "custom",
      message: "As senhas não conferem. Por favor, verifique e tente novamente.",
      path: ["errorValidPassword"]
    })
  }
});

export type ChangePasswordFormData = zod.infer<typeof formValidatorSchema>;


export default function ChangePassword({setDialogOpen} : any) {

  const api = useApi()
  const formChangePassword = useForm<ChangePasswordFormData>({
    resolver: zodResolver(formValidatorSchema),
    defaultValues: {
      login: "",
      lastPassword: "",
      newPassword: "",
      repeatPassword: "",
    }
  })
  
  const {
    handleSubmit,
    reset,
    watch,
    formState: { errors }
  }: {
    handleSubmit: UseFormHandleSubmit<ChangePasswordFormData>;
    reset: () => void;
    register: UseFormRegister<ChangePasswordFormData>;
    watch: UseFormWatch<ChangePasswordFormData>;
    formState: {
      errors: {
        login?: FieldError;
        lastPassword?: FieldError;
        newPassword?: FieldError;
        repeatPassword?: FieldError;
        errorValidPassword?: FieldError;
      };
    };
  } = formChangePassword

  
  const [login, lastPassword, newPassword, repeatPassword] = watch(["login", "lastPassword", "newPassword", "repeatPassword"])
  const disableEditPassword = !(login && lastPassword && newPassword && repeatPassword)
  

  function editPassword(data: ChangePasswordFormData) {
    if(data.login && data.lastPassword && data.newPassword && data.repeatPassword){
      api.changePassword(data.login, data.lastPassword, data.newPassword).then(() => {
        toast.success('Senha alterada com sucesso!', { 
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
          theme: "light",
          })
        setDialogOpen(false)
        reset()
      }, (error) => {
          toast.warn(error.response.data[0].message, { 
          position: "top-right",
          autoClose: 5000,
          closeOnClick: true,
          draggable: true,
          theme: "light",
          })
      })  
    }  
  }

  return (
    <Dialog.Portal>
      {/*Notify */}
      <ToastContainer/>

      {/*Fundo preto */}
      <Overlay />

      {/* Conteúdo da página */}
      <Content>
        <Dialog.Close>
          <CancelButton>
            <X />
          </CancelButton>
        </Dialog.Close>

        <img src={changePasswordSvg} />
        
        <Title>Alteração de senha</Title>

        <form >
          <ContentForm>

            <FormProvider {...formChangePassword} >
              <ChangePasswordForm errors={errors} />
            </FormProvider>

            <SendButton 
              onClick={handleSubmit(editPassword)} 
              disabled={disableEditPassword}
            >
              Alterar senha
              <Check />
            </SendButton>

          </ContentForm>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
