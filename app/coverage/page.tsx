"use client";

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { CoverageMap } from "@/components/coverage-map";
import { CoverageChecker } from "@/components/coverage-checker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Phone, CheckCircle, Clock, Building2 } from "lucide-react";
import { useEffect, useState } from "react";

interface CoverageArea {
  id: number;
  name: string;
  state: string;
  status: string;
  latitude: number;
  longitude: number;
  description: string;
  population: number;
  launch_date: string;
}

export default function CoveragePage() {
  const [areas, setAreas] = useState<CoverageArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/coverage")
      .then((res) => res.json())
      .then((data) => {
        setAreas(data.data || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const activeAreas = areas.filter((a) => a.status === "active");
  const comingSoonAreas = areas.filter((a) => a.status === "coming_soon");

  const formatPopulation = (pop: number) => {
    if (!pop) return "";
    return pop.toLocaleString("pt-BR");
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-20 bg-gradient-to-br from-[#00a651] to-[#008c44]">
        <div className="absolute inset-0 bg-black/10" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="text-center text-white max-w-3xl mx-auto">
            <Badge className="bg-white/20 text-white border-white/30 mb-4">
              Cobertura Regional
            </Badge>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Onde a Ondeline Está Presente
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Levando internet de qualidade para as comunidades do Amazonas.
              Confira nossa área de cobertura e verifique a disponibilidade no seu endereço.
            </p>
          </div>
        </div>
      </section>

      {/* Coverage Map Section */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Mapa de Cobertura
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Visualize todas as cidades onde a Ondeline oferece seus serviços de internet
            </p>
          </div>
          <CoverageMap />
        </div>
      </section>

      {/* Coverage Checker Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto">
            <CoverageChecker />
          </div>
        </div>
      </section>

      {/* Active Areas */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <Badge className="bg-green-100 text-green-800 mb-4">
              <CheckCircle className="w-4 h-4 mr-1" />
              Disponível Agora
            </Badge>
            <h2 className="text-3xl font-bold text-foreground mb-4">
              Cidades com Cobertura Ativa
            </h2>
            <p className="text-muted-foreground">
              Nestas cidades você já pode contratar nossos serviços
            </p>
          </div>

          {loading ? (
            <div className="text-center py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#00a651] mx-auto"></div>
              <p className="mt-4 text-muted-foreground">Carregando...</p>
            </div>
          ) : activeAreas.length === 0 ? (
            <p className="text-center text-muted-foreground py-8">
              Nenhuma cidade com cobertura ativa cadastrada ainda.
            </p>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {activeAreas.map((area) => (
                <Card key={area.id} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div>
                        <CardTitle className="flex items-center gap-2">
                          <MapPin className="w-5 h-5 text-[#00a651]" />
                          {area.name}
                        </CardTitle>
                        <CardDescription>{area.state}</CardDescription>
                      </div>
                      <Badge className="bg-green-100 text-green-800">Ativo</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      {area.description || "Internet de alta qualidade disponível nesta região."}
                    </p>
                    {area.population > 0 && (
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                        <Building2 className="w-4 h-4" />
                        <span>População: {formatPopulation(area.population)} habitantes</span>
                      </div>
                    )}
                    <Button className="w-full bg-[#00a651] hover:bg-[#008c44]" asChild>
                      <a href={`https://wa.me/5597991677795?text=Olá! Tenho interesse em contratar internet em ${area.name}`}>
                        <Phone className="w-4 h-4 mr-2" />
                        Contratar Agora
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Coming Soon Areas */}
      {comingSoonAreas.length > 0 && (
        <section className="py-16 bg-muted/50">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12">
              <Badge className="bg-yellow-100 text-yellow-800 mb-4">
                <Clock className="w-4 h-4 mr-1" />
                Em Breve
              </Badge>
              <h2 className="text-3xl font-bold text-foreground mb-4">
                Próximas Cidades
              </h2>
              <p className="text-muted-foreground">
                Estamos expandindo! Essas cidades receberão cobertura em breve
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {comingSoonAreas.map((area) => (
                <Card key={area.id} className="text-center">
                  <CardContent className="pt-6">
                    <MapPin className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
                    <h3 className="font-semibold">{area.name}</h3>
                    <p className="text-sm text-muted-foreground">{area.state}</p>
                    {area.launch_date && (
                      <Badge variant="outline" className="mt-2">
                        Previsão: {new Date(area.launch_date).toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
                      </Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-br from-[#00a651] to-[#008c44]">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Sua cidade não está na lista?
          </h2>
          <p className="text-white/90 mb-8 max-w-2xl mx-auto">
            Entre em contato conosco! Estamos sempre buscando expandir nossa cobertura
            para levar internet de qualidade a mais comunidades do Amazonas.
          </p>
          <Button size="lg" variant="secondary" asChild>
            <a href="https://wa.me/5597991677795?text=Olá! Gostaria de saber quando a Ondeline chegará na minha cidade">
              <Phone className="w-5 h-5 mr-2" />
              Falar com a Ondeline
            </a>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
