# Diretrizes Globais — Animações e Interações

## Objetivo

Definir o padrão global de animações, microinterações e comportamento visual interativo do GPV Sales Kit.

Todas as páginas do sistema devem ser animadas, interativas, responsivas e visualmente premium.

---

## Regra global

Todas as páginas devem conter:

- Transições suaves entre etapas.
- Animações discretas de entrada dos blocos.
- Microinterações em cards, botões, inputs e seleções.
- Feedback visual claro para hover, foco, seleção, clique, upload e erro.
- Visual premium, elegante e executivo.
- Performance leve, sem excesso de movimento.

---

## Identidade visual por página

| Página | Identidade visual predominante |
|---|---|
| Página 1 | Grupo GPV |
| Página 2 | Marca selecionada |
| Página 3 | Marca selecionada |
| Página 4 | Marca selecionada |
| Página 5 | Marca selecionada |
| Página 6 | Marca selecionada |

A identidade visual da marca selecionada começa oficialmente na Página 2 e permanece até a Página 6.

---

## Animações permitidas

- Fade-in.
- Slide-up suave.
- Scale leve em hover.
- Elevação sutil de cards.
- Glow discreto em elementos selecionáveis.
- Transição de cor em bordas e fundos.
- Transição de sombra.
- Feedback de clique.
- Progressão visual entre etapas.
- Skeleton/placeholder visual para assets pendentes, quando necessário.

---

## Animações proibidas

- Movimento agressivo.
- Efeitos piscando.
- Parallax pesado.
- Transições lentas demais.
- Elementos que prejudiquem leitura.
- Animação excessiva no PDF.
- Qualquer efeito que reduza a percepção premium da interface.

---

## Página 1 — Hover das marcas

Na Página 1, ao passar o mouse sobre uma marca abaixo do logo institucional do Grupo GPV, o sistema deve exibir uma pré-seleção visual antes do clique.

Essa pré-seleção deve usar a cor da linha superior da marca no logo institucional do Grupo GPV.

As cores devem vir de `data/navigation.json`, no campo `hoverColor`.

### Cores de hover da Página 1

| Marca | Cor de hover |
|---|---|
| Grand Prix de Vendas | `#FA0115` |
| Champions Festival | `#95C223` |
| VELOCE | `#32D9D9` |
| Projeto Conquista | `#FFFFFF` |
| Edney Ulisses — Acelerador de Vendas | `#D8DBD3` |

Essas cores são exclusivas para o efeito de hover/pré-seleção da Página 1.

Nas páginas seguintes, devem ser usadas as cores oficiais cadastradas em `data/companies.json`.

---

## Regra de logo no hover da Página 1

O hover da Página 1 deve ser aplicado no **container/card** da marca, não no arquivo do logo.

### Permitido

- Borda colorida.
- Glow discreto.
- Linha superior colorida.
- Fundo auxiliar sutil.
- Sombra leve.
- Escala leve do card.

### Proibido

- Recolorir o logo.
- Aplicar filtro no logo.
- Alterar opacidade do logo.
- Usar `mix-blend-mode` no logo.
- Substituir o logo por versão colorida artificialmente.

Recomendação técnica:

- Usar `--hover-color` no container.
- Manter `.logo { filter: none; opacity: 1; mix-blend-mode: normal; }`.

---

## Interações obrigatórias por tipo de elemento

| Elemento | Interação obrigatória |
|---|---|
| Cards de marca | Hover, foco, estado ativo e clique |
| Inputs | Foco visual, validação e erro claro |
| Checkboxes/flegs | Estado selecionado evidente |
| Botões | Hover, clique e disabled state |
| Upload de logo | Preview e feedback de arquivo carregado |
| Blocos de conferência | Botão editar com retorno para etapa correta |
| Proposta interativa | Navegação visual, cards animados e botão de PDF |
| Template PDF | Sem animação, sem hover, sem botão e sem elemento interativo |

---

## Critérios de aceite

As animações e interações serão consideradas aprovadas se:

- Todas as páginas tiverem animações leves e coerentes.
- Todas as páginas tiverem feedback visual de interação.
- A Página 1 usar hover colorido por marca antes do clique.
- O hover da Página 1 for aplicado no container/card, não no logo.
- As páginas 2 a 6 seguirem a identidade visual da marca selecionada.
- As animações não prejudicarem leitura, performance ou exportação.
- O PDF final permanecer estático, limpo e sem elementos interativos.
