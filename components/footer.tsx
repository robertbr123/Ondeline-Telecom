import { Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-slate-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div>
            <h3 className="font-bold text-lg mb-4 text-cyan-400">Ondeline</h3>
            <p className="text-sm text-gray-300">Conectando o Amazonas com internet rápida e confiável.</p>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-cyan-400">Sobre</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Quem Somos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Planos
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Cobertura
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-cyan-400">Suporte</h4>
            <ul className="space-y-2 text-sm text-gray-300">
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Dúvidas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Problemas
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-cyan-400 transition">
                  Contato
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4 text-cyan-400">Contato</h4>
            <ul className="space-y-3 text-sm text-gray-300">
              <li className="flex items-center gap-2">
                <Phone size={16} className="text-cyan-400" /> (92) 98460-7721
              </li>
              <li className="flex items-center gap-2">
                <Mail size={16} className="text-cyan-400" /> contato@ondeline.com.br
              </li>
              <li className="flex items-center gap-2">
                <MapPin size={16} className="text-cyan-400" /> Rua Albino, 74, Ipixuna/AM - Brasil
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-700 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
            <p>&copy; 2025 Ondeline. Todos os direitos reservados.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="#" className="hover:text-cyan-400 transition">
                Privacidade
              </a>
              <a href="#" className="hover:text-cyan-400 transition">
                Termos
              </a>
              <a href="#" className="hover:text-cyan-400 transition">
                Cookies
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
