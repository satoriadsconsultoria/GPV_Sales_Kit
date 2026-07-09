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
- Navegação direta para a Página 2 após clique na marca.

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

## Regra obrigatória de preservação de logos

Os logos devem ser exibidos exatamente como foram fornecidos.

### Permitido

- Redimensionar proporcionalmente.
- Posicionar em containers.
- Usar `object-fit: contain`.
- Aplicar margem e espaçamento externo.
- Aplicar cor apenas no fundo/container externo.

### Proibido

- Recolorir.
- Aplicar filtros CSS.
- Alterar opacidade.
- Usar `mix-blend-mode`.
- Converter para monocromático.
- Substituir cores internas pelas cores do tema.
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

1. Grand Prix de Vendas.
2. Champions Festival.
3. VELOCE.
4. Projeto Conquista.
5. Edney Ulisses — Acelerador de Vendas.

---

## Comportamento funcional

### Estado inicial

- Nenhuma empresa selecionada.
- Tela carregada com identidade visual do Grupo GPV.
- Logo branco do Grupo GPV em destaque.
- Logos das marcas disponíveis para clique.
- Não há botão Continuar na Página 1.

### Hover nos logos das marcas

O hover deve afetar somente o container do logo, nunca o logo diretamente.

Permitido no container:

- Elevação leve.
- Borda sutil.
- Brilho discreto.
- Destaque com cor da marca ou `#5BBFC8`.

Proibido no logo:

- Filtro.
- Opacidade.
- Recoloração.
- Blend mode.

### Clique em uma marca

Ao clicar em uma marca, o sistema deve:

1. Identificar a empresa pelo `id`.
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
| P1-RF05 | Exibir os logos das empresas cadastradas no `companies.json` |
| P1-RF06 | Tornar cada logo de empresa clicável |
| P1-RF07 | Permitir seleção de apenas uma empresa |
| P1-RF08 | Salvar empresa selecionada no `appState.selectedCompany` |
| P1-RF09 | Carregar serviços vinculados ao `companyId` |
| P1-RF10 | Aplicar identidade visual da empresa selecionada a partir da Página 2 |
| P1-RF11 | Avançar automaticamente para a Página 2 após clique na marca |
| P1-RF12 | Preservar as cores originais de todos os logos |

---

## Critérios de aceite

A Página 1 será considerada aprovada se:

- O logo branco do Grupo GPV aparece como elemento visual dominante.
- O fundo é escuro, dentro da paleta oficial.
- A cor base da Página 1 é `#252324`.
- A cor secundária institucional é `#A5A09C`.
- A tipografia segue o padrão do sistema.
- As cores de apoio são usadas somente como detalhe visual externo ao logo.
- Todos os logos das marcas são clicáveis.
- Nenhum logo sofre alteração de cor, filtro, opacidade ou proporção.
- O clique em uma marca salva a empresa selecionada.
- O clique em uma marca avança automaticamente para a Página 2.
- A identidade visual da empresa selecionada é aplicada somente a partir da Página 2.
