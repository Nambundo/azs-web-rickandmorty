import { Info, Tv, Users2, Database, ExternalLink } from 'lucide-react';
import { usePageSearch } from '@/hooks/usePageSearch';

export function AboutPage() {
  usePageSearch('Buscar episódios, personagens, locais...');

  return (
    <div className="space-y-8">
      <div>
        <h1 className="flex items-center gap-3 text-3xl font-bold text-white">
          <Info className="text-purple-400" />
          Sobre Rick and Morty
        </h1>
        <p className="mt-1 text-white/60">Conheça mais sobre a série, o universo e esta aplicação.</p>
      </div>

      <section className="grid gap-0 overflow-hidden rounded-2xl border border-white/10 bg-white/5 md:grid-cols-2">
        <div className="space-y-4 p-8">
          <h2 className="text-2xl font-bold text-white">Sobre a série</h2>
          <p className="leading-relaxed text-white/70">
            Rick and Morty é uma série de animação adulta que segue as aventuras de um cientista brilhante, mas
            sociopata, Rick Sanchez, e seu neto Morty Smith, um garoto tímido e inseguro.
          </p>
          <p className="leading-relaxed text-white/70">
            Juntos, eles viajam por universos, dimensões e realidades alternativas, enfrentando criaturas bizarras,
            sociedade alienígena e versões alternativas de si mesmos.
          </p>
        </div>
        <img
          src="https://images.unsplash.com/photo-1462331940025-496dfbfc7564?w=800&q=80"
          alt="Rick and Morty"
          className="h-64 w-full object-cover md:h-full"
        />
      </section>

      <div className="grid gap-6 md:grid-cols-3">
        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Tv size={18} className="text-purple-400" /> Informações da série
          </h3>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-white/50">Criado por</dt>
              <dd className="text-right text-white/80">Justin Roiland e Dan Harmon</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/50">Estreia</dt>
              <dd className="text-white/80">2 de dezembro de 2013</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/50">Status</dt>
              <dd className="text-white/80">Em produção</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-white/50">Gêneros</dt>
              <dd className="text-right text-white/80">Animação, Comédia, Ficção científica, Aventura</dd>
            </div>
            <div className="flex items-center justify-between">
              <dt className="text-white/50">Classificação</dt>
              <dd>
                <span className="rounded-md bg-purple-600/80 px-2 py-0.5 text-xs font-semibold text-white">TV-MA</span>
              </dd>
            </div>
          </dl>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Users2 size={18} className="text-purple-400" /> Sobre esta aplicação
          </h3>
          <p className="mb-4 text-sm text-white/70">
            Esta aplicação foi desenvolvida para fãs da série Rick and Morty. Explore episódios, personagens e
            locais do universo da série de forma rápida, intuitiva e com uma experiência incrível.
          </p>
          <ul className="space-y-2 text-sm text-white/70">
            <li>✓ Dados em tempo real via GraphQL</li>
            <li>✓ Interface moderna e responsiva</li>
            <li>✓ Favoritos e histórico de episódios</li>
            <li>✓ Tema escuro premium</li>
          </ul>
        </div>

        <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
          <h3 className="mb-4 flex items-center gap-2 text-lg font-semibold text-white">
            <Database size={18} className="text-purple-400" /> Fonte de dados
          </h3>
          <p className="mb-4 text-sm text-white/70">
            Todos os dados exibidos nesta aplicação são fornecidos pela API pública GraphQL do Rick and Morty.
          </p>
          <a
            href="https://rickandmortyapi.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-purple-400 transition-colors hover:border-purple-400/50"
          >
            rickandmortyapi.com
            <ExternalLink size={15} />
          </a>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-4 rounded-2xl border border-white/10 bg-gradient-to-r from-purple-600/20 to-transparent p-6">
        <div>
          <p className="text-lg font-bold text-white">Wubba Lubba Dub Dub!</p>
          <p className="text-sm text-white/60">Obrigado por usar a aplicação e por fazer parte do multiverso!</p>
        </div>
      </div>
    </div>
  );
}
