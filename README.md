# Rick and Morty Explorer

Aplicação premium (estilo Netflix/Linear) para explorar o universo de Rick and Morty, construída com React, TypeScript, GraphQL (Apollo Client) e Tailwind CSS.

## Stack

- **React 19** + **TypeScript**
- **Vite** (build tool)
- **Apollo Client 4** consumindo a [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql)
- **Tailwind CSS v4**
- **React Router 7**
- **lucide-react** (ícones)

## Como rodar

Pré-requisitos: Node.js 18+ instalado.

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev
# abre em http://localhost:5173

# 3. Gerar build de produção
npm run build

# 4. Pré-visualizar o build de produção
npm run preview
```

## Estrutura do projeto

```
src/
├── components/
│   ├── layout/     Header, Sidebar, MobileTopBar, MobileBottomNav, Layout
│   ├── cards/      BaseCard + EpisodeCard, CharacterCard, LocationCard
│   ├── modal/       BaseModal + EpisodeModal, CharacterModal, LocationModal
│   ├── common/     SearchBar, Pagination, Carousel, EmptyState, Skeletons
│   └── ui/            BookmarkButton, WatchButton, RatingBadge, StatusDot
├── graphql/
│   ├── apolloClient.ts
│   ├── fragments/     fragmentos reutilizáveis (CharacterFields, EpisodeFields, LocationFields)
│   └── queries/         characters.ts, episodes.ts, locations.ts
├── mocks/               mockData.ts — dados que NÃO existem no schema público (ver abaixo)
├── services/            favorites.service.ts, watched.service.ts (persistência via localStorage)
├── hooks/               useCharacters, useEpisodes, useLocations, useEntityDetails,
│                        useEntitiesByIds, useFavorites, useWatchedHistory, usePageSearch...
├── context/             SearchContext (busca global compartilhada pelo Header)
├── pages/                HomePage, EpisodesPage, CharactersPage, LocationsPage,
│                        FavoritesPage, WatchedPage, AboutPage
├── routes/               AppRoutes.tsx
└── types/                tipos TypeScript (API + mockados combinados)
```

## Testes essenciais (Cypress)

Os testes de e2e usam `cy.intercept` para simular as respostas da API GraphQL com fixtures determinísticas (em `cypress/fixtures/`), então rodam de forma rápida e confiável, sem depender da API real estar no ar.

```bash
# Abre a interface interativa do Cypress (recomendado durante desenvolvimento)
npm run cypress:open

# Roda os testes em modo headless, subindo o servidor de dev automaticamente
npm run test:e2e
```

Cobertura dos specs (`cypress/e2e/`):
- **navigation.cy.ts** — banner da Home com Rick e Morty reais, navegação pela sidebar entre as páginas, e o estado de "Carregando..." ao abrir o modal de personagem
- **search.cy.ts** — a busca global troca de placeholder por página e envia a variável de filtro correta ao GraphQL após o debounce
- **favorites.cy.ts** — favoritar um personagem persiste em `localStorage`, aparece na página de Favoritos, e "Remover todos" limpa o estado

> Na primeira execução, o Cypress baixa seu binário automaticamente (requer conexão com a internet). Se isso falhar por causa de um proxy/firewall corporativo, configure a variável `CYPRESS_DOWNLOAD_MIRROR` ou consulte a [documentação oficial](https://docs.cypress.io/app/references/advanced-installation).

## Sobre os dados mockados

A API GraphQL pública do Rick and Morty **não retorna** alguns campos que aparecem na UI:

| Campo | Onde é usado | Como é gerado |
|---|---|---|
| Avaliação (rating) | Episódios, Personagens | Determinístico por ID (`src/mocks/mockData.ts`) |
| Sinopse | Modal de Episódio | Template rotativo por ID |
| Roteiro / Direção | Modal de Episódio | Nome fictício rotativo por ID |
| Imagem de fundo | Cards/Modal de Local | Banco de imagens ilustrativas por ID |
| Favoritos / Assistidos | Header, Sidebar, páginas dedicadas | 100% local (`localStorage`), nunca vai para a API |

Todos os dados mockados são **determinísticos**: o mesmo ID sempre gera o mesmo valor, então a experiência é consistente entre recarregamentos de página. Basta editar `src/mocks/mockData.ts` para trocar por uma fonte de dados real no futuro.

## Design System

- Dark mode fixo (sem alternância de tema)
- Roxo como cor primária, verde para "assistido", amarelo para avaliação, bookmark roxo para favoritos
- Glassmorphism, bordas arredondadas, cards com hover elevado
- Header único em todas as páginas: busca global + Favoritos + Assistidos (nessa ordem)
- Banner da Home e cards/modal de episódios usam **fotos reais dos personagens** (via GraphQL), compostas em colagem quando há mais de um personagem (`CharacterCollage`)
- Estados de carregamento usam o `PortalLoader` (efeito de portal animado) nos modais e uma versão compacta inline nas listagens durante busca/paginação
