import { Routes, Route, BrowserRouter } from "react-router-dom";
import { CartProvider } from "../contexts/CartContext";

// ROTAS PÚBLICAS
import { HomePage } from "../pages/home/home";
import { Profile } from "../pages/profile/profile";
import { Loja } from "../pages/Store/loja";
import { Product } from "../pages/Store/Product/Product";
import { Carrinho } from "../pages/carrinho/carrinho";
import { Checkout } from "../pages/checkout/checkout";
import { Login } from "../pages/login/login";
import { Cadastro } from "../pages/register/register";
import { NoAccess } from "../pages/noAccess/NoAccess";
import { Sobre } from "../pages/sobre/sobre";
import { PageNotFound } from "../pages/PageNotFound/PageNotFound";
import { EditProfile } from "../pages/editProfile/editProfile";
import { FaleConosco } from "../pages/faleconosco/faleconosco";


// ROTAS ADMIN
import { ProtectedRoute } from "../components/protectedRoute/ProtectedRoute";
import { AdminLayout } from "../pages/admin/layout/AdminLayout";
import { AdminDashboard } from "../pages/admin/dashboard/AdminDashboard";
import { AdminProducts } from "../pages/admin/products/AdminProducts";
import { AdminOrders } from "../pages/admin/orders/AdminOrders";
import { AdminCustomers } from "../pages/admin/customers/AdminCustomers";
import { Address } from "../pages/MyAddress/address";
import { AddEnd } from "../pages/addEnd/addEnd";
import { MyOrders } from "../pages/myOrders/myOrders";
import { AdminPayments } from "../pages/admin/payments/AdminPayments";
import { AdminQRCode } from "../pages/admin/qrcode/AdminQRCode";
import { CodeVerific } from "../pages/codeVerific/codeVerific";
import { EsqueciSenha } from "../pages/esqueciSenha/EsqueciSenha";

export function Rotas() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          {/* Rotas Públicas */}
          <Route path="/" element={<HomePage />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/loja" element={<Loja />} />
          <Route path="/product/:id" element={<Product />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/login" element={<Login />} />
          <Route path="/cadastro" element={<Cadastro />} />
          <Route path="/address" element={<Address />} />
          <Route path="/meusPedidos" element={<MyOrders />} />
          <Route path="/newAddress" element={<AddEnd />} />
          <Route path="/editProfile" element={<EditProfile />} />
          <Route path="/faleconosco" element={<FaleConosco />} />
         <Route path="/2-factor" element={<CodeVerific/>}/>
         <Route path="/sobre" element={<Sobre />} />
         <Route path="*" element={<PageNotFound />} />
         <Route path="/esqueci-senha" element={<EsqueciSenha />} />

          {/* Rota para Acesso Negado */}
          <Route path="/sem-acesso" element={<NoAccess />} />

          {/* Rotas Protegidas do Admin */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="produtos" element={<AdminProducts />} />
            <Route path="pedidos" element={<AdminOrders />} />
            <Route path="clientes" element={<AdminCustomers />} />
            <Route path="pagamentos" element={<AdminPayments />} />
            <Route path="qrcodes" element={<AdminQRCode />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  );
}