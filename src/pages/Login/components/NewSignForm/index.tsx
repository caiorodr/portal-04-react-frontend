import { TextInput } from "@ggps3-ds/react";
import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { FieldErrors, useFormContext } from "react-hook-form";
import { NewSignFormData } from "../..";
import Portal4 from "../../../../assets/Portal.svg";
import { ButtonFormModal, ForgotPassword, FormContent } from "./styles";

import * as Dialog from '@radix-ui/react-dialog';
import ChangePassword from "../ModalChangePassword";
import { ModalForgotMyPassword } from "../ModalForgotMyPassword";
import { ModalSendEmail } from "../ModalSendEmail";


export function NewSignForm({ errors }: { errors: FieldErrors<NewSignFormData> }) {
  const [typePassword, setTypePassword] = useState("password");
  const [dialogOpenChangePassword, setDialogOpenChangePassword] = useState(false);
  const [dialogOpenForgotPassword, setDialogOpenForgotPassword] = useState(false);
  const [dialogOpenSendEmail, setDialogOpenSendEmail] = useState(false);

  const { register } = useFormContext();

  function handleVisiblePassword() {
    if (typePassword !== "text") {
      setTypePassword("text");
    } else {
      setTypePassword("password");
    }
  }

  function openModalChangePassword(){
    setDialogOpenChangePassword(true);
  }
  
  function openModalForgotPassword(){
    setDialogOpenForgotPassword(true);
  }


  function DialogTrigger({ onClick, children }) {
    return (
      <Dialog.Trigger asChild>
        <ButtonFormModal onClick={onClick}>{children}</ButtonFormModal>
      </Dialog.Trigger>
    );
  }

  
  return (
    <>
      <img src={Portal4} alt="" />
      <h1>Login</h1>

      <FormContent>
        <label htmlFor="usuario">Digite seu usuário</label>
        <TextInput placeholder="Usuário" min={2} {...register("login")} />
        {errors.login && <span>{errors.login?.message}</span>}

        <label htmlFor="password">Digite sua senha</label>
        <TextInput
          placeholder="Senha"
          type={typePassword}
          icon={typePassword === "password" ? EyeSlash : Eye}
          onIconClick={() => handleVisiblePassword()}
          {...register("password")}
        />
        {errors.password && <span>{errors.password?.message}</span>}

        <ForgotPassword>
          {/* RADIX - Chamar modal  */}
          <Dialog.Root open={dialogOpenChangePassword} onOpenChange={setDialogOpenChangePassword}>
            {/* O alvo que vai abrir */}
            <DialogTrigger onClick={openModalChangePassword}>Alterar senha</DialogTrigger>
            {/* Conteúdo da modal */}
            <ChangePassword setDialogOpen={setDialogOpenChangePassword}/>
          </Dialog.Root>


          {/* RADIX - Chamar modal  */}
          <Dialog.Root open={dialogOpenForgotPassword} onOpenChange={setDialogOpenForgotPassword}>
            {/* O alvo que vai abrir */}
            <DialogTrigger onClick={openModalForgotPassword}>Esqueci minha senha</DialogTrigger>
            {/* Conteúdo da modal */}
            <ModalForgotMyPassword setDialogOpen={setDialogOpenForgotPassword}  setDialogOpenSendEmail={setDialogOpenSendEmail}/>
          </Dialog.Root>

          {/* RADIX - Chamar modal  */}
          <Dialog.Root open={dialogOpenSendEmail} onOpenChange={setDialogOpenSendEmail}>
            {/* O alvo que vai abrir */}
            <Dialog.Trigger asChild>
            </Dialog.Trigger>
            {/* Conteúdo da modal */}
          
            <ModalSendEmail setDialogOpen={setDialogOpenSendEmail}/>
          </Dialog.Root>

        </ForgotPassword>
      </FormContent>
    </>
  );
}
