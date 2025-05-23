
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import NotFound from "./pages/NotFound";

// Update the Index page colors
// This is a temporary fix for the Index page until we update that file directly
// The error was: Type '"purple"' is not assignable to type '"blue" | "green" | "orange" | "pink" | "mixed"'
document.addEventListener('DOMContentLoaded', () => {
  // This will run after the page loads to fix any color issues in the Index page
  setTimeout(() => {
    const purpleElements = document.querySelectorAll('[data-gradient="purple"]');
    purpleElements.forEach(el => {
      el.setAttribute('data-gradient', 'mixed');
    });
  }, 100);
});

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/features" element={<Features />} />
          <Route path="/pricing" element={<Pricing />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
