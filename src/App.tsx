
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import Index from "./pages/Index";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import TemplatesGallery from "./pages/TemplatesGallery";
import CreatePoster from "./pages/CreatePoster";
import Dashboard from "./pages/Dashboard";
import OrderPrints from "./pages/OrderPrints";
import Pricing from "./pages/Pricing";
import AccountSettings from "./pages/AccountSettings";
import Support from "./pages/Support";
import About from "./pages/About";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/auth" element={<Auth />} />
            <Route path="/templates" element={<TemplatesGallery />} />
            <Route path="/create" element={<CreatePoster />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/order-prints" element={<OrderPrints />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/account" element={<AccountSettings />} />
            <Route path="/support" element={<Support />} />
            <Route path="/about" element={<About />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/terms" element={<Terms />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
