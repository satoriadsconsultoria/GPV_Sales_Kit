# Página 1 — Portal Institucional do Grupo GPV

## Objetivo

A Página 1 será a tela inicial institucional do **GPV Sales Kit**, com predominância visual da marca **Grupo GPV**.

A função principal é apresentar o sistema como uma ferramenta corporativa do Grupo GPV e permitir que o usuário escolha a empresa responsável pela proposta por meio dos logos clicáveis das marcas.

---

## Conceito aprovado

A Página 1 deve funcionar como uma porta de entrada institucional premium, com:

- Logo principal do Grupo GPV em destaque.
- Fundo escuro dentro da paleta oficial.
- Título da página na parte superior.
- Logos das marcas abaixo do logo principal.
- Logos das marcas clicáveis.
- Hover colorido de pré-seleção antes do clique.
- Navegação direta para a Página 2 após clique na marca.
- Animações e microinterações premium.

---

## Identidade visual oficial

| Elemento | Definição |
|---|---|
| Marca dominante | Grupo GPV |
| Cor principal | `#252324` |
| Cor secundária | `#A5A09C` |
| Texto principal | `#FFFFFF` |
| Texto secundário | `#A5A09C` |
| Tipografia | `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif` |

## Logo oficial do Grupo GPV

O sistema deve usar sempre o **logo branco** do Grupo GPV sobre fundo escuro dentro da paleta oficial.

Arquivo padrão da Página 1:

```txt
assets/logos/grupo-gpv-negativo.png
```

Arquivo de referência recebido e mantido para acervo:

```txt
assets/logos/grupo-gpv-positivo.png
```

Arquivo auxiliar legado da régua institucional:

```txt
assets/logos/grupo-gpv.svg
```

---

## Navegação das marcas

A Página 1 deve carregar a navegação a partir de:

```txt
data/navigation.json
```

### Regra especial — Grand Prix de Vendas / Champions Festival

No logo institucional do Grupo GPV existe somente o ícone do **Grand Prix de Vendas**.

Por isso, na Página 1, o logo do **Grand Prix de Vendas** deve funcionar como um item agrupador.

### Comportamento obrigatório

Ao passar o mouse sobre o logo do **Grand Prix de Vendas**, o sistema deve abrir um submenu com duas opções:

| Opção | Destino |
|---|---|
| Grand Prix de Vendas | `companyId: grand-prix` |
| Champions Festival | `companyId: champions` |

Ao clicar em uma das opções, o sistema deve seguir o fluxo normalmente para a Página 2, carregando a identidade visual, os serviços e a estrutura da proposta da opção selecionada.

### Regra mobile

Em dispositivos mobile, como não existe hover, o primeiro toque no logo do Grand Prix de Vendas deve abrir as opções. O segundo toque em uma opção deve selecionar a empresa e avançar para a Página 2.

---

## Hover colorido de pré-seleção

Ao passar o mouse sobre cada marca na Página 1, o sistema deve mostrar a seleção antes do clique.

Esse efeito deve usar a cor da linha superior da marca no logo institucional do Grupo GPV.

### Cores de hover da Página 1

| Marca | Cor de pré-seleção |
|---|---|
| Grand Prix de Vendas | `#FA0115` |
| Champions Festival | `#95C223` |
| VELOCE | `#32D9D9` |
| Projeto Conquista | `#FFFFFF` |
| Edney Ulisses — Acelerador de Vendas | `#D8DBD3` |

Essas cores são usadas somente na Página 1, exclusivamente no estado de hover/foco/pré-seleção.

Nas páginas seguintes, o sistema deve usar as cores oficiais da marca cadastradas em `data/companies.json`.

### Comportamento visual esperado

No hover:

- O card da marca ganha borda, glow ou linha superior na cor correspondente.
- O logo/card ganha destaque visual de pré-seleção.
- O cursor indica item clicável.
- O card pode ter leve elevação e escala discreta.
- A transição deve ser suave e premium.

### Exceção controlada de hover

Na Página 1, é permitida uma exceção visual temporária para indicar seleção da marca no hover.

O sistema pode aplicar tint/destaque temporário no estado de hover, desde que:

- Não altere permanentemente o arquivo original do logo.
- O efeito exista somente durante hover/foco.
- O efeito seja removido ao tirar o mouse.
- O efeito não seja usado nas páginas seguintes.
- O PDF e a proposta final usem os logos originais.

---

## Regra obrigatória de preservação de logos

Os logos devem ser exibidos exatamente como foram fornecidos, exceto pelo efeito visual temporário de hover da Página 1 descrito acima.

### Permitido

- Redimensionar proporcionalmente.
- Posicionar em containers.
- Usar `object-fit: contain`.
- Aplicar margem e espaçamento externo.
- Aplicar cor apenas no fundo/container externo.
- Aplicar destaque visual temporário de hover na Página 1.

### Proibido

- Recolorir permanentemente.
- Aplicar filtros CSS fora do estado temporário de hover da Página 1.
- Alterar opacidade fora do estado temporário de hover da Página 1.
- Usar `mix-blend-mode` em proposta final ou PDF.
- Converter para monocromático.
- Substituir cores internas pelas cores do tema nas páginas 2 a 6.
- Distorcer proporção.
- Cortar área útil.

Essa regra vale para:

- Grupo GPV.
- Grand Prix de Vendas.
- Champions Festival.
- VELOCE.
- Projeto Conquista.
- Edney Ulisses.
- Logo do cliente.

---

## Hierarquia visual da tela

### 1. Topo

- **GPV Sales Kit**.
- **Gerador de Propostas Comerciais Premium**.
- **Etapa 1 de 6**.

### 2. Área institucional central

- Logo branco do Grupo GPV em grande escala.
- Título: **Selecione a marca responsável pela proposta comercial**.
- Subtítulo: **Cada marca carrega automaticamente sua identidade visual, serviços e estrutura comercial.**

### 3. Área de marcas

Exibir os logos clicáveis:

1. Grand Prix de Vendas — com submenu Grand Prix de Vendas / Champions Festival.
2. VELOCE.
3. Projeto Conquista.
4. Edney Ulisses — Acelerador de Vendas.

---

## Animações e interações

A Página 1 deve conter:

- Entrada suave do logo Grupo GPV.
- Entrada suave dos cards das marcas.
- Hover colorido por marca.
- Microinteração no submenu Grand Prix.
- Transição animada para a Página 2.
- Feedback visual de clique.

Animações permitidas:

- Fade-in.
- Slide-up suave.
- Scale leve.
- Glow discreto.
- Transição de borda, sombra e fundo.

Animações proibidas:

- Movimento agressivo.
- Elementos piscando.
- Efeito que prejudique leitura.
- Animação excessiva.

---

## Comportamento funcional

### Estado inicial

- Nenhuma empresa selecionada.
- Tela carregada com identidade visual do Grupo GPV.
- Logo branco do Grupo GPV em destaque.
- Logos das marcas disponíveis para clique.
- Não há botão Continuar na Página 1.

### Clique em uma marca/opção

Ao clicar em uma marca direta ou em uma opção do submenu, o sistema deve:

1. Identificar a empresa pelo `companyId`.
2. Salvar a empresa em `appState.selectedCompany`.
3. Pré-carregar os serviços vinculados ao `companyId`.
4. Carregar a identidade visual da empresa selecionada para as próximas páginas.
5. Avançar automaticamente para a Página 2 — Cliente.

---

## Regras funcionais

| ID | Regra |
|---|---|
| P1-RF01 | Exibir o logo branco do Grupo GPV em destaque |
| P1-RF02 | Aplicar `#252324` como base visual da Página 1 |
| P1-RF03 | Usar `#A5A09C` como cor secundária institucional |
| P1-RF04 | Usar tipografia padrão do sistema |
| P1-RF05 | Carregar os itens de navegação a partir de `data/navigation.json` |
| P1-RF06 | Exibir o logo Grand Prix como agrupador de Grand Prix de Vendas e Champions Festival |
| P1-RF07 | Abrir submenu no hover do logo Grand Prix em desktop |
| P1-RF08 | Abrir submenu no toque do logo Grand Prix em mobile |
| P1-RF09 | Selecionar `grand-prix` ao clicar em Grand Prix de Vendas |
| P1-RF10 | Selecionar `champions` ao clicar em Champions Festival |
| P1-RF11 | Salvar empresa selecionada no `appState.selectedCompany` |
| P1-RF12 | Carregar serviços vinculados ao `companyId` |
| P1-RF13 | Aplicar identidade visual da empresa selecionada a partir da Página 2 |
| P1-RF14 | Avançar automaticamente para a Página 2 após clique na opção |
| P1-RF15 | Preservar as cores originais dos logos fora da exceção temporária de hover da Página 1 |
| P1-RF16 | Aplicar hover colorido de pré-seleção em cada marca |
| P1-RF17 | Usar cores da linha superior da marca no Grupo GPV somente no hover da Página 1 |

---

## Critérios de aceite

A Página 1 será considerada aprovada se:

- O logo branco do Grupo GPV aparece como elemento visual dominante.
- O fundo é escuro, dentro da paleta oficial.
- A cor base da Página 1 é `#252324`.
- A cor secundária institucional é `#A5A09C`.
- A tipografia segue o padrão do sistema.
- O hover de cada marca mostra pré-seleção com a cor definida.
- As cores de hover da Página 1 não contaminam as páginas seguintes.
- O logo Grand Prix abre submenu com Grand Prix de Vendas e Champions Festival.
- O clique em Grand Prix de Vendas salva `grand-prix` e avança para a Página 2.
- O clique em Champions Festival salva `champions` e avança para a Página 2.
- Nenhum logo sofre alteração permanente de cor, opacidade ou proporção.
- A identidade visual da empresa selecionada é aplicada somente a partir da Página 2.
