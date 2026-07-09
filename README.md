# GPV Sales Kit

Sistema web estático para geração de propostas comerciais premium do Grupo GPV.

## Objetivo

Gerar propostas comerciais executivas, padronizadas e profissionais em poucos minutos, utilizando identidade visual dinâmica por empresa e exportação final em PDF.

## Stack

- HTML5
- CSS3
- JavaScript
- JSON local
- html2pdf.js ou biblioteca equivalente de exportação PDF no navegador
- Netlify

## Empresas contempladas

- Grand Prix de Vendas
- Champions Festival
- VELOCE
- Projeto Conquista
- Edney Ulisses — Acelerador de Vendas

## Fluxo do sistema

1. Página 1 — Portal institucional Grupo GPV e seleção da marca
2. Página 2 — Cadastro do cliente
3. Página 3 — Seleção dos serviços/planos
4. Página 4 — Dados comerciais, validade e emissor
5. Página 5 — Conferência e edição por bloco
6. Página 6 — Proposta final interativa e exportação em PDF executivo

## Diretrizes principais

- Página 1 usa identidade institucional do Grupo GPV.
- Páginas 2 a 6 usam a identidade visual da marca selecionada.
- Todas as páginas devem ser animadas e interativas.
- O hover da Página 1 usa cores de pré-seleção por marca, aplicadas somente no container/card.
- Logos não podem ser recoloridos, filtrados ou distorcidos.
- O PDF deve ser diferente da página interativa.
- O PDF deve ser gerado por template dedicado, sem animações ou botões.
- O PDF deve usar formato A4 landscape.
- A proposta final deve incluir capa, dois slides institucionais de Edney Ulisses, proposta/escopo, investimento e encerramento.

## Estrutura planejada

```txt
GPV_Sales_Kit/
├── index.html
├── assets/
│   ├── backgrounds/
│   ├── images/
│   │   └── edney/
│   └── logos/
├── css/
├── js/
├── data/
├── docs/
└── libs/
```

## Assets validados

Fotos finais do Edney Ulisses validadas nos caminhos:

```txt
assets/images/edney/edney-institucional-01.png
assets/images/edney/edney-institucional-02.png
```

## Como rodar localmente

O sistema usa `fetch()` para carregar os arquivos em `data/*.json`, então **não funciona abrindo `index.html` direto no navegador** (`file://`) — é preciso servir via HTTP.

Com Node instalado:

```txt
npx serve .
```

Sem Node, no Windows, use o servidor auxiliar incluso:

```txt
powershell -ExecutionPolicy Bypass -File serve-local.ps1
```

Depois acesse `http://localhost:8090/`.

## Status

Sistema construído: as 6 páginas (portal institucional, cliente, serviços, comercial, conferência e proposta final com exportação em PDF) estão implementadas em HTML5, CSS3 e JavaScript puro, orientadas pelos dados em `data/*.json`, e testadas de ponta a ponta em navegador.
