import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import DarkThemePage from "./pages/DarkThemePage";
import WhiteThemePage from "./pages/WhiteThemePage";
import EnglishIndex from "./pages/EnglishIndex";
import EnglishDarkThemePage from "./pages/EnglishDarkThemePage";
import EnglishWhiteThemePage from "./pages/EnglishWhiteThemePage";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<DarkThemePage />} />
          <Route path="/white" element={<WhiteThemePage />} />
          <Route path="/en" element={<EnglishDarkThemePage />} />
          <Route path="/en/white" element={<EnglishWhiteThemePage />} />
          <Route path="/1" element={<Index />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
