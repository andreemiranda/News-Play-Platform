import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import PostDetail from "@/pages/PostDetail";
import CategoryPage from "@/pages/CategoryPage";
import About from "@/pages/About";
import Contact from "@/pages/Contact";
import PrivacyPolicy from "@/pages/PrivacyPolicy";
import TermsOfUse from "@/pages/TermsOfUse";
import CookiePolicy from "@/pages/CookiePolicy";
import OurTeam from "@/pages/OurTeam";
import FAQ from "@/pages/FAQ";
import Layout from "@/components/Layout";

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/post/:id" component={PostDetail} />
        <Route path="/slug/:slug" component={PostDetail} />
        <Route path="/categoria/:slug" component={CategoryPage} />
        <Route path="/category/:slug" component={CategoryPage} />
        <Route path="/sobre" component={About} />
        <Route path="/about" component={About} />
        <Route path="/contato" component={Contact} />
        <Route path="/contact" component={Contact} />
        <Route path="/privacidade" component={PrivacyPolicy} />
        <Route path="/privacy" component={PrivacyPolicy} />
        <Route path="/termos" component={TermsOfUse} />
        <Route path="/terms" component={TermsOfUse} />
        <Route path="/cookies" component={CookiePolicy} />
        <Route path="/equipe" component={OurTeam} />
        <Route path="/team" component={OurTeam} />
        <Route path="/faq" component={FAQ} />
        <Route path="/ajuda" component={FAQ} />
        <Route path="/help" component={FAQ} />
        {/* Fallback to 404 */}
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Router />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
