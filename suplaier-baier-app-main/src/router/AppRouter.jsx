import React from "react";
import { useContext} from "react";
import { Route, Routes } from "react-router-dom";
import { AdmRoutes } from "../administradores";
import { AuthContext, LoginPage, SignupComprador, SignupPage, SignupProveedor, TerminosPage, ExpirationPage } from "../auth";
import { CompRoutes } from "../compradores";
import { ProvRoutes } from "../proveedores";
import { PrivateRoute } from "./PrivateRoute";
import { PublicRoute } from "./PublicRoute";


export const AppRouter = () => {

  const {authState} = useContext(AuthContext);


  const getRoutesByTypeOfUser = (tipo) => {
    switch (tipo) {
      case "comprador":
        return <CompRoutes/>;
      case "proveedor":    
          return <ProvRoutes/>;
      default:
        return <AdmRoutes/>;
    }
  }

  return (
    <>
      <Routes>
        <Route path="/login" element={
          <PublicRoute>
            <LoginPage/>
          </PublicRoute>
        }/>
        <Route path="/signup" element={
          <PublicRoute>
            <SignupPage/>
          </PublicRoute>
        }/>
        <Route path="/signup_comprador" element={
          <PublicRoute>
            <SignupComprador/>
          </PublicRoute>
        }/>
        <Route path="/signup_proveedor" element={
          <PublicRoute>
            <SignupProveedor/>
          </PublicRoute>
        }/>
        <Route path="/terminos_y_condiciones" element={
          <PublicRoute>
            <TerminosPage/>
          </PublicRoute>
        }/>
                <Route path="/sesion_expirada" element={
          <PublicRoute>
            <ExpirationPage/>
          </PublicRoute>
        }/>
        <Route path="/*" element={
          <PrivateRoute>
            {getRoutesByTypeOfUser(authState?.user?.Rol)}
          </PrivateRoute>
        }/>
      </Routes>
    </>
  )
}
