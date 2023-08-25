import { zodResolver } from "@hookform/resolvers/zod";
import { FormProvider, useForm } from "react-hook-form";
import { useContextSelector } from "use-context-selector";
import * as zod from "zod";
import LogoWhite from "../../assets/logoBrancoGps.svg";

import { ArrowRight } from "phosphor-react";
import { useEffect, useState } from "react";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { SpinCustom } from "../../components/Spin";
import { AuthContext } from "../../context/Auth";
import { NewSignForm } from "./components/NewSignForm";
import {
  ButtonEnter,
  ContentHeader,
  HeaderContainer,
  LoginContainer,
  ParallaxGroup,
  SignContainer,
  WavesSVG
} from "./styles";



const newSignFormValidatorSchema = zod.object({
  login: zod.string().nonempty("Informe o usuário!"),
  password: zod
    .string()
    .min(6, "A senha precisa de no mínimo 6 caracteres.")
    .max(20, "O número máximo de caracteres permitido é 20."),
});

export type NewSignFormData = zod.infer<typeof newSignFormValidatorSchema>;

export function Login() {
  const [visibleSpin, setVisibleSpin] = useState<boolean>(false)

  const userError = useContextSelector(AuthContext,
    (context) => {
      return context.userError
    },
  )

  const setUserError = useContextSelector(AuthContext,
    (context) => {
      return context.setErrorSignInUser
    },
  )

  const signin = useContextSelector(AuthContext,
    (context) => {
      return context.signin
    },
  )

  const newSignForm = useForm<NewSignFormData>({
    resolver: zodResolver(newSignFormValidatorSchema),
    defaultValues: {
      login: "",
      password: "",
    },
  })

  const {
    handleSubmit,
    watch,
    formState: { errors, isSubmitting,  },
  } = newSignForm;

  const [login, password] = watch(["login", "password"]);
  const isSubmitDisabled = !(login && password);

  async function handleSign(data: NewSignFormData) {
    setVisibleSpin(true)
    const { login, password } = data

    await signin({
      login,
      senha: password
    })
  }


  useEffect(() => {
    if (userError) {      
      toast.warn(userError, {
        position: "top-right",
        autoClose: 5000,
        closeOnClick: true,
        draggable: true,
        theme: "light",
      });

      setVisibleSpin(false)
      setUserError('')
    }
  }, [userError]);


  return (
    <LoginContainer>
      <ToastContainer/>
      <HeaderContainer>
        <ContentHeader>
          <img src={LogoWhite} alt="" />
          <h1>
            Todos servindo com orgulho e dedicação, nos tornando essenciais aos
            nossos Clientes.
          </h1>
        </ContentHeader>

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
      </HeaderContainer>

      <SignContainer>
        <SpinCustom spinning={visibleSpin} size="large">
          <form onSubmit={handleSubmit(handleSign)} >
            <FormProvider {...newSignForm}>
              <NewSignForm errors={errors} />
            </FormProvider>

            <ButtonEnter disabled={isSubmitDisabled || isSubmitting} type="submit">
              <ArrowRight />
              Entrar
            </ButtonEnter>
          </form>
        </SpinCustom>
      </SignContainer>
    </LoginContainer>
  );
}