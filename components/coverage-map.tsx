"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/button";

interface CoverageArea {
  id: number;
  name: string;
  state: string;
  status: string;
  latitude: number;
  longitude: number;
  description: string;
}

// Converter coordenadas para posição percentual no mapa
// O mapa mostra região do Amazonas aproximadamente:
// Latitude: -2 a -8 (Norte para Sul)
// Longitude: -74 a -64 (Oeste para Leste)
function coordToPercent(lat: number, lon: number) {
  const minLat = -2;
  const maxLat = -8;
  const minLon = -74;
  const maxLon = -64;

  // Calcular porcentagem (invertendo latitude pois sul é maior em valor absoluto)
  const top = ((lat - minLat) / (maxLat - minLat)) * 100;
  const left = ((lon - minLon) / (maxLon - minLon)) * 100;

  return { top: Math.max(5, Math.min(95, top)), left: Math.max(5, Math.min(95, left)) };
}

export function CoverageMap() {
  const [areas, setAreas] = useState<CoverageArea[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredArea, setHoveredArea] = useState<string | null>(null);

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

  // Gerar URL do mapa OpenStreetMap centrado no Amazonas
  const mapUrl =
    "https://www.openstreetmap.org/export/embed.html?bbox=-74,-8,-64,-2&layer=mapnik";

  return (
    <div className="relative w-full rounded-xl overflow-hidden shadow-lg border bg-card">
      {/* Mapa Base OpenStreetMap */}
      <div className="relative w-full h-[500px]">
        <iframe
          src={mapUrl}
          className="w-full h-full border-0"
          loading="lazy"
          title="Mapa de Cobertura Ondeline"
        />

        {/* Overlay com marcadores */}
        <div className="absolute inset-0 pointer-events-none">
          {loading ? (
            <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/90 px-4 py-2 rounded-lg shadow">
              <div className="flex items-center gap-2">
                <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#00a651]"></div>
                <span className="text-sm">Carregando cidades...</span>
              </div>
            </div>
          ) : (
            <>
              {/* Marcadores das cidades ativas */}
              {activeAreas.map((area) => {
                const pos = coordToPercent(area.latitude, area.longitude);
                return (
                  <div
                    key={area.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer z-10"
                    style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                    onMouseEnter={() => setHoveredArea(area.name)}
                    onMouseLeave={() => setHoveredArea(null)}
                  >
                    <div className="relative">
                      {/* Pino do marcador */}
                      <div className="w-6 h-6 bg-[#00a651] rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <div className="w-2 h-2 bg-white rounded-full" />
                      </div>
                      {/* Pulso de animação */}
                      <div className="absolute inset-0 w-6 h-6 bg-[#00a651] rounded-full animate-ping opacity-25" />

                      {/* Tooltip */}
                      {hoveredArea === area.name && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap">
                          <div className="bg-white px-3 py-2 rounded-lg shadow-lg border">
                            <p className="font-semibold text-sm text-gray-900">{area.name}</p>
                            <p className="text-xs text-gray-500">{area.state}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-green-100 text-green-800 text-xs rounded-full">
                              Cobertura Ativa
                            </span>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                            <div className="w-2 h-2 bg-white border-b border-r transform rotate-45" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}

              {/* Marcadores das cidades em breve */}
              {comingSoonAreas.map((area) => {
                const pos = coordToPercent(area.latitude, area.longitude);
                return (
                  <div
                    key={area.id}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto cursor-pointer z-10"
                    style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                    onMouseEnter={() => setHoveredArea(area.name)}
                    onMouseLeave={() => setHoveredArea(null)}
                  >
                    <div className="relative">
                      {/* Pino do marcador */}
                      <div className="w-5 h-5 bg-yellow-500 rounded-full border-2 border-white shadow-lg flex items-center justify-center">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                      </div>

                      {/* Tooltip */}
                      {hoveredArea === area.name && (
                        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 whitespace-nowrap">
                          <div className="bg-white px-3 py-2 rounded-lg shadow-lg border">
                            <p className="font-semibold text-sm text-gray-900">{area.name}</p>
                            <p className="text-xs text-gray-500">{area.state}</p>
                            <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-xs rounded-full">
                              Em Breve
                            </span>
                          </div>
                          <div className="absolute top-full left-1/2 transform -translate-x-1/2 -mt-1">
                            <div className="w-2 h-2 bg-white border-b border-r transform rotate-45" />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </div>
      </div>

      {/* Legenda */}
      <div className="p-4 bg-muted/50 border-t">
        <div className="flex flex-wrap justify-center gap-6">
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-[#00a651] rounded-full border-2 border-white shadow" />
            <span className="text-sm text-muted-foreground">Cobertura Ativa ({activeAreas.length})</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-4 bg-yellow-500 rounded-full border-2 border-white shadow" />
            <span className="text-sm text-muted-foreground">Em Breve ({comingSoonAreas.length})</span>
          </div>
        </div>
        {areas.length === 0 && !loading && (
          <p className="text-center text-sm text-muted-foreground mt-2">
            Nenhuma área de cobertura cadastrada. Cadastre áreas no painel administrativo.
          </p>
        )}
      </div>
    </div>
  );
}
