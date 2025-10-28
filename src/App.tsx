// import { Toaster } from "./Componets/ui/toaster.tsx";
// import { Toaster as Sonner } from "./Componets/ui/sonner";
// import { TooltipProvider } from "./Componets/ui/tooltip";
// import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
// import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Index from "./pages/index.tsx";
// import NotFound from "./pages/NotFound";

// const queryClient = new QueryClient();

// const App = () => (
//   <QueryClientProvider client={queryClient}>
//     <TooltipProvider>
//       <Toaster />
//       <Sonner />
//       <BrowserRouter>
//         <Routes>
//           <Route path="/" element={<Index />} />
//           {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
//           <Route path="*" element={<NotFound />} />
//         </Routes>
//       </BrowserRouter>
//     </TooltipProvider>
//   </QueryClientProvider>
// );

// export default App;






import { Toaster } from "./Componets/ui/toaster.tsx";
import { Toaster as Sonner } from "./Componets/ui/sonner";
import { TooltipProvider } from "./Componets/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/index";
import Login from "./pages/Login.tsx"; 
import Register from "./pages/Register.tsx";
import Profile from "./pages/Profile.tsx";
import Contact from "./Componets/Contact.tsx";
import MoctalGallery from "./Componets/MoctalGalleryComponent.tsx";
import About from "./Componets/About.tsx";
import FullMenu from "./Componets/FullMenu.tsx";
import VisitUs from "./Componets/VisitUs.tsx";
import Cart from "./pages/Cart.tsx";
import NotFound from "./pages/NotFound";
import { AuthProvider } from './pages/AuthContext';

const queryClient = new QueryClient();

const Dashboard = () => (
  <div className="min-h-screen flex items-center justify-center text-white">
    <h1 className="text-4xl font-bold">Mocktail Dashboard (Placeholder)</h1>
  </div>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/about" element={<About />} />
            <Route path="/gallery" element={<MoctalGallery />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Fmenu" element={<FullMenu />} />
            <Route path="/visit" element={<VisitUs />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;