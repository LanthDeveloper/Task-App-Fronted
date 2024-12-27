import React, { useState, useEffect } from "react";
import "./App.css";
import { HashRouter, Navigate, Route, Routes } from "react-router-dom";

import Header from "./modules/shared/components/Header";
import Home from "./modules/home/pages/Home";
import NotFound from "./modules/shared/components/NotFound";
import Footer from "./modules/shared/components/Footer";
import Login from "./modules/auth/pages/Login";
import Register from "./modules/auth/pages/Register";
import { supabaseClient } from "./supabase/supabaseConfig";
import { useAuthStore } from "./modules/auth/store/useAuthStore";
import Dashboard from "./modules/tasks/pages/Dashboard";
import ScrollToTop from "./modules/shared/components/ScrollToTop";
import useTaskStore from "./modules/tasks/store/useTaskStore";

function App() {
  const { session, userData, setSession, setUserData } = useAuthStore();
  const { getTasks } = useTaskStore();

  useEffect(() => {
    setSession(supabaseClient.auth.getSession());
    const {
      data: { subscription },
    } = supabaseClient.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });
    return () => subscription.unsubscribe();
  }, [setSession]);

  useEffect(() => {
   if(session){
    getTasks(session.access_token);
   }
  }, [session]);

  return (
    <HashRouter>
      <ScrollToTop />
      <main id="layout">
        <Header />
        <article>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="*" element={<NotFound />} />

            <Route
              path="/login"
              element={session ? <Navigate to="/home" replace /> : <Login />}
            />
            <Route
              path="/register"
              element={session ? <Navigate to="/home" replace /> : <Register />}
            />

            <Route
              path="/dashboard"
              element={
                !session ? <Navigate to="/home" replace /> : <Dashboard />
              }
            />
          </Routes>
        </article>
        <Footer />
      </main>
    </HashRouter>
  );
}

export default App;
