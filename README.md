
# Desafio AZShip Front-end Web
## 🛸 Rick and Morty : Aplicação para explorar o universo de Rick and Morty — construída com, consumindo a [API GraphQL oficial](https://rickandmortyapi.com/graphql).

**🔗 Deploy na vercel:** [azs-web-rickandmorty-kappa.vercel.app](https://azs-web-rickandmorty-kappa.vercel.app/)
<img width="400" height="225" alt="Sequência 01_1 (1)" src="https://github.com/user-attachments/assets/3f4e3f9e-e13b-46c6-a1ad-36aee39f2b2c" />
</div>

---

## 📸 Screenshots

| Home |
|---|

<img width="1913" height="1021" alt="home_ricky" src="https://github.com/user-attachments/assets/09b2de3d-b5f4-4526-afc0-9aa45c7c5d3c" />
<img width="1910" height="972" alt="personagens" src="https://github.com/user-attachments/assets/9c2b1fed-dfce-4792-890f-4f9d4f79c4c0" />

| iPhone | iPad | IPad Pro |
|---|---|--- |

<img width="1403" height="711" alt="mobile" src="https://github.com/user-attachments/assets/8b1c4d67-d15d-4026-b109-07a8cb29cddd" />

**Testes E2E Com Cypress:**

<img width="1890" height="906" alt="testes_e2e" src="https://github.com/user-attachments/assets/df00e059-8115-4d2b-a8da-b1012fb6d88e" />

## ✨ Funcionalidades
---
## 🏠 Home
- Banner e conteúdos em destaque.
- Carrosséis de episódios, personagens e locais.
- Acesso rápido aos detalhes.

## 🔎 Explorar / Pesquisar
- Busca por episódios, personagens e locais.
- Filtros e navegação pelos conteúdos.

## 🎬 Episódios
- Lista de episódios e mais avaliados.
- Busca por temporada e episódio.
- Modal com: sinopse, data, avaliação, roteiro, direção e personagens.
- Ações: assistir, favoritar e marcar como assistido.

## 👤 Personagens
- Pesquisa e visualização dos personagens.
- Modal com: espécie, gênero, origem, status e episódios.
- Ações: favoritar e marcar como assistido.

## 🌍 Locais
- Busca e paginação dos locais.
- Modal com informações do local e personagens relacionados.
- Ações: favoritar e marcar como explorado.

## ⭐ Favoritos
- Centraliza episódios, personagens e locais favoritos.
- Permite visualizar detalhes e remover favoritos.

## ✅ Assistidos
- Gerencia conteúdos assistidos.
- Permite consultar detalhes e atualizar estado.

## 🪟 Modal de Detalhes
- Exibe informações completas sem sair da página.
- Ações rápidas: favoritar e assistir.

## ℹ️ Sobre
- Informações da série e explicação da organização da aplicação.

## 🧱 Stack

| Camada | Tecnologia |
|---|---|
| UI | React 19 + TypeScript + Javascript |
| Estilo | Tailwind CSS v4 |
| Dados | Apollo Client 4 → [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) |
| Rotas | React Router 7 |
| Ícones | lucide-react |
| Build | Vite |
| Testes E2E | Cypress |
| Deploy | Vercel |

## 🚀 Como rodar localmente

Pré-requisito: **Node.js 18+**.

```bash
# 1. git clone

# 2. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev
# abre em http://localhost:5173

```

## 🗂️ Estrutura do projeto

```
src/
├── components/
│   ├── layout/     Header, Sidebar, MobileTopBar, MobileBottomNav, Layout
│   ├── cards/      BaseCard + EpisodeCard, CharacterCard, LocationCard, CharacterCollage
│   ├── modal/      BaseModal + EpisodeModal, CharacterModal, LocationModal
│   ├── common/     SearchBar, Pagination, Carousel, EmptyState, Skeletons, PortalLoader
│   └── ui/         BookmarkButton, WatchButton, RatingBadge, StatusDot
├── graphql/
│   ├── apolloClient.ts
│   ├── fragments/  fragmentos reutilizáveis (CharacterFields, EpisodeFields, LocationFields)
│   └── queries/    characters.ts, episodes.ts, locations.ts
├── mocks/          mockData.ts — dados que NÃO existem no schema público (ver seção abaixo)
├── services/       favorites.service.ts, watched.service.ts (persistência via localStorage)
├── hooks/          useCharacters, useEpisodes, useLocations, useEntityDetails,
│                   useEntitiesByIds, useFavorites, useWatchedHistory, usePageSearch...
├── context/        SearchContext (busca global compartilhada pelo Header)
├── pages/          HomePage, EpisodesPage, CharactersPage, LocationsPage,
│                   FavoritesPage, WatchedPage, AboutPage
├── routes/         AppRoutes.tsx
└── types/          tipos TypeScript (API + mockados combinados)

cypress/
├── e2e/            navigation.cy.ts, search.cy.ts, favorites.cy.ts
├── fixtures/        respostas GraphQL simuladas, por operação
└── support/        comando customizado stubApi()
```

## 🧪 Testes E2E (Cypress)

Os specs usam `cy.intercept` para simular as respostas do GraphQL com fixtures determinísticas (`cypress/fixtures/`), então rodam rápido e de forma confiável, sem depender da API real estar no ar.

```bash
# Interface interativa (recomendado durante desenvolvimento)
npm run cypress open

# Modo headless, subindo o servidor de dev local automaticamente
npm run test:e2e
```

**Cobertura:**

| Spec | O que valida |
|---|---|
| `navigation.cy.ts` | Valida a navegação pela aplicação, sidebar, banner da Home e abertura do modal de personagem.|
| `search.cy.ts` | 	Valida a busca global, troca de placeholder por página e envio correto dos filtros ao GraphQL após o debounce |
| `home.cy.ts` | Valida a página inicial, carregamento do conteúdo e exibição dos principais elementos da Home. |

Resumo: Testamos a Home, a navegação entre páginas e o funcionamento da busca global.

## 🎭 Sobre os dados mockados

A API GraphQL pública do Rick and Morty **não retorna** alguns campos que aparecem na UI. Eles são gerados de forma **determinística por ID** (o mesmo item sempre mostra o mesmo valor, mesmo depois de recarregar a página):

| Campo | Onde é usado | Como é gerado |
|---|---|---|
| Avaliação (rating) | Episódios, Personagens | Determinístico por ID (`src/mocks/mockData.ts`) |
| Sinopse | Modal de Episódio | Template rotativo por ID |
| Roteiro / Direção | Modal de Episódio | Nome fictício rotativo por ID |
| Imagem de fundo | Cards/Modal de Local | Banco de imagens ilustrativas por ID |
| Favoritos / Assistidos | Header, Sidebar, páginas dedicadas | 100% local (`localStorage`), nunca vai para a API |

Basta editar `src/mocks/mockData.ts` para trocar por uma fonte de dados real no futuro.

## 🎨 Design System

- Dark mode fixo (sem alternância de tema)
- Roxo como cor primária, verde para "assistido", amarelo para avaliação, bookmark roxo para favoritos
- Glassmorphism, bordas arredondadas, cards com hover elevado
- Header único em todas as páginas: busca global + Favoritos + Assistidos (nessa ordem)
- Banner da Home e cards/modal de episódios usam **fotos reais dos personagens** (via GraphQL), compostas em colagem quando há mais de um personagem (`CharacterCollage`)
- Estados de carregamento usam o `PortalLoader` (efeito de portal animado) nos modais, e uma versão compacta inline nas listagens durante busca/paginação

---

<div align="center">

Dados fornecidos pela [Rick and Morty API](https://rickandmortyapi.com) · Rick and Morty © 2013–presente, todos os direitos reservados aos seus respectivos donos.
