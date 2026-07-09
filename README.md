# GPV Sales Kit

Sistema web estático para geração de propostas comerciais premium do Grupo GPV.

## Status

Pronto para publicação. O fluxo completo em 6 páginas está implementado, com redesign visual premium, primeira página institucional do Grupo GPV, páginas internas com cores dinâmicas por marca, campos comerciais formatados para o padrão brasileiro e PDF executivo preparado para envio ao cliente.

## Objetivo

Gerar propostas comerciais executivas, padronizadas e profissionais em poucos minutos, utilizando identidade visual dinâmica por empresa e exportação final em PDF.

## Stack

- HTML5
- CSS3
- JavaScript puro
- JSON local
- html2pdf.js ou biblioteca equivalente de exportação PDF no navegador
- Hospedagem estática, como Netlify, GitHub Pages ou Vercel

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

- Página 1 usa identidade institucional do Grupo GPV em preto, grafite e tons de cinza.
- O logo central da Página 1 usa o arquivo real `assets/logos/grupo-gpv-negativo.png`.
- Os cards de seleção de marca mantêm as cores oficiais de cada marca como sinal visual de escolha.
- Páginas 2 a 6 usam a identidade visual da marca selecionada.
- Todas as páginas têm acabamento visual premium, microinterações e hierarquia mais organizada.
- Logos não são recoloridos, filtrados ou distorcidos.
- O PDF usa template dedicado, estático, sem animações ou botões.
- O PDF deve ser gerado em formato A4 landscape.
- A proposta final inclui capa, slides institucionais de Edney Ulisses, proposta/escopo, investimento e encerramento.

## Camadas visuais

O visual final é aplicado em camadas para preservar o sistema original e facilitar manutenção:

```txt
css/premium-redesign.css          # redesign geral, layout premium e PDF
css/institutional-first-page.css  # primeira página institucional Grupo GPV
css/experience-polish.css         # interações, refinamentos e acabamento final
```

Essas camadas são carregadas automaticamente em `js/main.js`.

## Formatação comercial

A Página 4 aplica os padrões finais solicitados:

- Valor da proposta: `R$ 59.000,00`
- Prazo de entrega: `1 dia` ou `N dias`
- Validade da proposta: `1 dia` ou `N dias`

## Estrutura do projeto

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

Logo institucional do Grupo GPV usado na primeira página:

```txt
assets/logos/grupo-gpv-negativo.png
```

## Como rodar localmente

O sistema usa `fetch()` para carregar os arquivos em `data/*.json`, então não funciona abrindo `index.html` direto no navegador (`file://`). É preciso servir via HTTP.

Com Node instalado:

```txt
npx serve .
```

Sem Node, no Windows, use o servidor auxiliar incluso:

```txt
powershell -ExecutionPolicy Bypass -File serve-local.ps1
```

Depois acesse:

```txt
http://localhost:8090/
```

## Publicação

Por ser um projeto estático, não há etapa obrigatória de build.

Configuração sugerida para Netlify:

```txt
Build command: deixar vazio
Publish directory: .
```

Também pode ser publicado em qualquer hospedagem estática que sirva `index.html`, `css/`, `js/`, `data/` e `assets/` via HTTP.

## Checklist final

- Fluxo de 6 páginas mantido.
- Página 1 com logo do Grupo GPV em destaque.
- Páginas internas com cores da marca selecionada.
- PDF com tratamento visual dedicado para envio ao cliente.
- Campos comerciais formatados em reais e dias.
- Arquivos essenciais atualizados na branch `main`.
