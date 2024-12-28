import { Button, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";
import { supabaseClient } from "../../../supabase/supabaseConfig";
import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  GoogleIcon,
  MailIcon,
  UserTestIcon,
} from "../../shared/components/Icons";
import { validatorFields } from "../../shared/utils/validatorFields";
import { Link } from "react-router-dom";

const initForm = {
  email: "",
  password: "",
};

const Login = () => {
  const [form, setForm] = useState(initForm);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [disabledButton, setDisabledButton] = useState(false);

  useEffect(() => {
    setForm(initForm);
    setDisabledButton(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const cleanForm = () => {
    setForm(initForm);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!validatorFields({ form, isLogin: true })) {
      return;
    }

    setDisabledButton(true);
    sendFormLogin({ form });
  };

  const sendFormLogin = async ({ form }) => {
    try {
      const result = await supabaseClient.auth.signInWithPassword({
        email: form.email,
        password: form.password,
      });

    } catch (err) {
      console.log(err);
      alert("Ocurrió un error al iniciar sesión");
    } finally {
      cleanForm();
      setTimeout(() => {
        setDisabledButton(false);
      }, 2000);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabaseClient.auth.signInWithOAuth({
        provider: "google",
      });
      if (error) throw error;
    } catch (err) {
      console.log(err);
      alert("Ocurrió un error al iniciar sesión con Google");
    }
  };

  const handleUserTest = () => {
    setForm({
      email: "john_lennon@vafyxh.com",
      password: "123456789",
    })
  }

  return (
    <section className="w-full max-w-[1280px] mx-auto min-h-[100svh] pt-[4em] h-full px-4">
      <div className="w-full h-full grid place-items-center">
        <div className="flex flex-col gap-2 max-w-xs w-full">
          <h2 className="text-2xl mb-4">Iniciar Sesión</h2>
          <Button
            className="rounded-sm bg-black text-white"
            onPress={handleGoogleSignIn}
          >
            <GoogleIcon className="w-4" /> Ingresar con Google
          </Button>
          <button className="btn-effect-1 text-sm" onClick={handleUserTest}>
            <div className="flex justify-center gap-3">
              <UserTestIcon className="w-4" />
              Usuario de Prueba
            </div>
          </button>

          <p className="text-center my-2">ó</p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-1">
            <Input
              endContent={
                <MailIcon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
              }
              variant="underlined"
              label="Correo electrónico"
              placeholder="tu@ejemplo.com"
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
            />

            <Input
              endContent={
                <button
                  aria-label="toggle password visibility"
                  className="focus:outline-none"
                  type="button"
                  onClick={toggleVisibility}
                >
                  {isVisible ? (
                    <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  ) : (
                    <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                  )}
                </button>
              }
              label="Contraseña"
              placeholder="Introduce tu contraseña"
              type={isVisible ? "text" : "password"}
              id="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              variant="underlined"
            />

            <Button
              type="submit"
              className="rounded-none mt-6"
              isDisabled={disabledButton}
            >
              Iniciar Sesión
            </Button>
          </form>
          <p className="text-center mt-8">
            ¿No tienes una cuenta?
            <Link to="/register" className="ml-2 text-blue-500 hover:underline">
              Regístrate aquí
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Login;
