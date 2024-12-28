import React, { useState, useEffect } from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem,
  Button,
  Dropdown,
  DropdownTrigger,
  Avatar,
  DropdownMenu,
  DropdownItem,
} from "@nextui-org/react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../auth/store/useAuthStore";
import { supabaseClient } from "../../../supabase/supabaseConfig";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { session, userData } = useAuthStore();
  const navigate = useNavigate();


  const handleLogout = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (error) {
      console.error("Error logging out:", error);
    } else {
      console.log("Logout successful");
    }
  };

  return (
    <Navbar
      onMenuOpenChange={setIsMenuOpen}
      isMenuOpen={isMenuOpen}
      className="header-navbar"
    >
      <NavbarContent>
        <NavbarMenuToggle
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          className="sm:hidden"
        />
        <NavbarBrand>
          <Link to={"/home"}>
            <p className="font-bold text-inherit brand-color">Task App</p>
          </Link>
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        <NavbarItem>
          <Link to={session ? "/dashboard" : "/login"}>Dashboard</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to={session ? "/dashboard" : "/login"}>Proyectos</Link>
        </NavbarItem>
        <NavbarItem>
          <Link to={session ? "/dashboard" : "/login"}>Calendario</Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarContent justify="end">
        {session && (
          <NavbarItem>
            <Dropdown
              placement="bottom-end"
              radius="none"
              shouldBlockScroll="false"
            >
              <DropdownTrigger>
                <Avatar
                  as="button"
                  className="transition-transform"
                  isBordered
                  color="success"
                  name="Jason Hughes"
                  size="sm"
                  src="https://i.pravatar.cc/150?u=a042581f4e29026024d"
                />
              </DropdownTrigger>
              <DropdownMenu aria-label="Profile Actions" variant="flat">
                <DropdownItem key="profile" className="h-14 gap-2">
                  <p className="font-semibold">Registrado como</p>
                  <p className="font-semibold">{userData?.email}</p>
                </DropdownItem>
                <DropdownItem
                  key="logout"
                  color="danger"
                  onPress={handleLogout}
                >
                  Cerrar Sesión
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
          </NavbarItem>
        )}

        <NavbarItem>
          {!session && (
            <Button
              color="primary"
              className="rounded-none"
              variant="flat"
              onPress={() => navigate("/login")}
            >
              Iniciar Sesión
            </Button>
          )}

          {session && (
            <Link to="/dashboard">
              <Button
                color="primary"
                className="rounded-none"
                variant="flat"
                onPress={() => {
                  setTimeout(() => {
                    setIsMenuOpen(false);
                  }, 200);
                }}
              >
                Registrar Tareas
              </Button>
            </Link>
          )}
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
        <NavbarMenuItem>
          <Link
            to={session ? "/dashboard" : "/login"}
            onClick={() => {
              setTimeout(() => {
          
                setIsMenuOpen(false);
              }, 200);
            }}
          >
            Dashboard
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            to={session ? "/dashboard" : "/login"}
            onClick={() => {
              setTimeout(() => {
                setIsMenuOpen(false);
              }, 200);
            }}
          >
            Proyectos
          </Link>
        </NavbarMenuItem>
        <NavbarMenuItem>
          <Link
            to={session ? "/dashboard" : "/login"}
            onClick={() => {
              setTimeout(() => {
                setIsMenuOpen(false);
              }, 200);
            }}
          >
            Calendario
          </Link>
        </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
};

export default Header;
