import { Button, Checkbox, Input } from "@nextui-org/react";
import React, { useState, useEffect } from "react";

import {
  EyeFilledIcon,
  EyeSlashFilledIcon,
  GoogleIcon,
  MailIcon,
} from "../../shared/components/Icons";
import { validatorFields } from "../../shared/utils/validatorFields";
import { Link } from "react-router-dom";
import { supabaseClient } from "../../../supabase/supabaseConfig";

const initForm = {
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const [form, setForm] = useState(initForm);
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
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

    if (!validatorFields({ form })) {
      return;
    }
    if (!isTermsAccepted) {
      alert("Debes aceptar los términos y condiciones para continuar");
      return;
    }

    setDisabledButton(true);

    console.log("Correo electrónico:", form.email);
    console.log("Contraseña:", form.password);
    console.log("Confirmar Contraseña:", form.confirmPassword);
    sendFormRegister({ form });
  };

  const sendFormRegister = async ({ form }) => {
    try {
      const result = await supabaseClient.auth.signUp({
        email: form.email,
        password: form.password,
      });
      console.log(result);
      alert("Verifica tu correo electrónico para continuar con el registro");
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

  return (
    <section className="w-full max-w-[1280px] mx-auto min-h-[100svh] pt-[4em] h-full px-4">
      <div className="w-full h-full grid place-items-center">
        <div className="flex flex-col gap-2 max-w-xs w-full">
          <h2 className="text-2xl mb-4">Registrarse</h2>
          <Button className="rounded-sm bg-black text-white" onPress={handleGoogleSignIn}>
            <GoogleIcon className="w-4" /> Registrarse con Google
          </Button>

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
              variant="underlined"
              label="Confirmar Contraseña"
              placeholder="Confirma tu contraseña"
              type={isVisible ? "text" : "password"}
              id="confirmPassword"
              name="confirmPassword"
              value={form.confirmPassword}
              onChange={handleChange}
            />

            <Checkbox
              size="sm"
              className="mt-2 text-lg"
              isSelected={isTermsAccepted}
              onValueChange={setIsTermsAccepted}
            >
              Acepto los términos y condiciones
            </Checkbox>

            <Button
              type="submit"
              className="rounded-none mt-4"
              isDisabled={disabledButton}
            >
              Registrarse
            </Button>
          </form>

          <p className="text-center mt-8">
            ¿Ya tienes una cuenta?
            <Link to="/login" className="ml-2 text-blue-500 hover:underline">
              Ingresa aquí
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Register;
