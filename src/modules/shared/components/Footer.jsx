import { Button } from "@nextui-org/react";
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-[1280px] w-full mx-auto px-4">
        {/* Top Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 items-center gap-8">
          {/* Logo/Brand */}
          <a
            href="https://lanthdev.pages.dev"
            className="hover:underline text-center text-xl font-bold"
            target="_blank"
            rel="noopener noreferrer"
          >
            Lanthdev
          </a>

          {/* Navigation */}
          <nav>
            <ul className="flex flex-wrap justify-center space-x-6">
              <li>
                <a
                  href="https://lanthdev.pages.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="https://lanthdev.pages.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Política de Privacidad
                </a>
              </li>
              <li>
                <a
                  href="https://lanthdev.pages.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  Términos y Condiciones
                </a>
              </li>
            </ul>
          </nav>

          {/* Newsletter */}
          <div className="flex justify-center items-center">
            <form className="w-full max-w-[300px] text-center">
              <h2 className="text-lg font-semibold">
                Suscríbete a nuestra Newsletter
              </h2>
              <div className="flex items-center mt-2">
                <input
                  placeholder="Ingresa tu correo"
                  className="py-2 px-2 bg-transparent border-b-2 border-white flex-grow"
                />
                <Button className="rounded-none ml-2">Suscribirse</Button>
              </div>
            </form>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="flex justify-center space-x-6 mt-8">
          <a
            href="https://lanthdev.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Facebook
          </a>
          <a
            href="https://lanthdev.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Twitter
          </a>
          <a
            href="https://lanthdev.pages.dev"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            Linkedin
          </a>
        </div>

        {/* Footer Bottom */}
        <p className="text-center text-sm mt-16">
          © 2024 - Proyecto Task App - AMAZONTIC.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
