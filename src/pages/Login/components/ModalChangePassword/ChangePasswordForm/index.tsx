import { Eye, EyeSlash } from "phosphor-react";
import { useState } from "react";
import { FieldError, useFormContext } from "react-hook-form";
import {
   SendInput
} from "../styles";

 const usePasswordVisibility = () => {
   const [showPassword, setShowPassword] = useState(false);
 
   const togglePasswordVisibility = () => {
     setShowPassword(prevState => !prevState);
   };
 
   return { showPassword, togglePasswordVisibility };
 };
 
 interface ErrorChangePasswdState {
   errors: {
      login?: FieldError;
      lastPassword?: FieldError;
      newPassword?: FieldError;
      repeatPassword?: FieldError;
      errorValidPassword?: FieldError;
    }
    
 }
export function ChangePasswordForm({ errors }: ErrorChangePasswdState ) {

   const { showPassword: showLastPassword, togglePasswordVisibility: toggleLastPasswordVisibility } = usePasswordVisibility();
   const { showPassword: showNewPassword, togglePasswordVisibility: toggleNewPasswordVisibility } = usePasswordVisibility();
   const { showPassword: showRepeatPassword, togglePasswordVisibility: toggleRepeatPasswordVisibility } = usePasswordVisibility();
   const { register } = useFormContext();

   function handleVisiblePassword(pass: string) {
      if (pass === "last") {
        toggleLastPasswordVisibility();
      } else if (pass === "new") {
        toggleNewPasswordVisibility();
      } else {
        toggleRepeatPasswordVisibility();
      }
    }
    
   return (
      <>
         <SendInput 
            placeholder="Login"
            {...register("login")}
         />{errors.login && <span>{errors.login?.message}</span>}

         <SendInput
            placeholder="Senha atual"
            type={showLastPassword ? "text" : "password" }
            icon={showLastPassword ? EyeSlash : Eye}
            onIconClick={() => handleVisiblePassword("last")}
            {...register("lastPassword")}
         />{errors.lastPassword && <span>{errors.lastPassword?.message}</span>}

         <SendInput
            placeholder="Nova senha"
            type={showNewPassword ? "text" : "password"}
            icon={showNewPassword ? EyeSlash : Eye}
            onIconClick={() => handleVisiblePassword("new")}
            {...register("newPassword")}
         />{errors.newPassword && <span>{errors.newPassword?.message}</span>}

         <SendInput
            placeholder="Repetir nova senha"
            type={showRepeatPassword ? "text" : "password"}
            icon={showRepeatPassword ? EyeSlash : Eye}
            onIconClick={() => handleVisiblePassword("new2")}
            {...register("repeatPassword")}
         />
         {errors.repeatPassword && <span>{errors.repeatPassword?.message}</span>}
         {errors.errorValidPassword && <span>{errors.errorValidPassword?.message}</span>}
      </>
   )
}