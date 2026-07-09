# Página 1 — Portal Institucional do Grupo GPV

## Objetivo

A Página 1 será a tela inicial institucional do **GPV Sales Kit**, com predominância visual da marca **Grupo GPV**.

A função principal da página é apresentar o sistema como uma ferramenta corporativa do Grupo GPV e permitir que o usuário escolha rapidamente a empresa responsável pela proposta por meio dos logos clicáveis das marcas.

---

## Conceito aprovado

A primeira página não deve ter aparência de formulário comum.

Ela deve funcionar como uma **porta de entrada institucional premium**, com:

- Logo principal do Grupo GPV em destaque.
- Cores institucionais do Grupo GPV como base visual.
- Título da página na parte superior.
- Logos das marcas abaixo do logo principal.
- Logos das marcas clicáveis.
- Navegação direta para a página da empresa selecionada.
- Início imediato do fluxo de proposta após o clique na marca.

---

## Hierarquia visual da tela

### 1. Topo da página

Conteúdo:

- Nome do sistema: **GPV Sales Kit**.
- Subtítulo: **Gerador de Propostas Comerciais Premium**.
- Indicador discreto: **Etapa 1 de 6**.

### 2. Área institucional central

Conteúdo principal:

- Logo grande do **Grupo GPV**.
- Frase institucional curta.

Texto sugerido:

**Selecione a marca responsável pela proposta comercial**

Subtítulo sugerido:

**Cada marca carrega automaticamente sua identidade visual, serviços e estrutura comercial.**

### 3. Área de marcas

Exibir os logos das empresas do Grupo GPV:

1. Grand Prix de Vendas
2. Champions Festival
3. VELOCE
4. Projeto Conquista
5. Edney Ulisses — Acelerador de Vendas

Os logos devem funcionar como botões clicáveis.

---

## Empresas exibidas

| ID | Empresa | Ação ao clicar |
|---|---|---|
| grand-prix | Grand Prix de Vendas | Seleciona a empresa e avança para a Página 2 |
| champions | Champions Festival | Seleciona a empresa e avança para a Página 2 |
| veloce | VELOCE | Seleciona a empresa e avança para a Página 2 |
| conquista | Projeto Conquista | Seleciona a empresa e avança para a Página 2 |
| edney | Edney Ulisses — Acelerador de Vendas | Seleciona a empresa e avança para a Página 2 |

---

## Layout recomendado

### Desktop

```txt
┌────────────────────────────────────────────────────┐
│ GPV Sales Kit                         Etapa 1 de 6 │
├────────────────────────────────────────────────────┤
│                                                    │
│              [LOGO GRANDE GRUPO GPV]               │
│                                                    │
│       Selecione a marca responsável pela proposta  │
│       Subtítulo institucional                      │
│                                                    │
│   [Grand Prix] [Champions] [VELOCE] [Conquista]    │
│                 [Edney Ulisses]                    │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Mobile

```txt
┌──────────────────────────────┐
│ GPV Sales Kit                 │
│ Etapa 1 de 6                  │
├──────────────────────────────┤
│                              │
│       [LOGO GRUPO GPV]        │
│                              │
│ Selecione a marca             │
│ Subtítulo                     │
│                              │
│ [Grand Prix]                  │
│ [Champions Festival]          │
│ [VELOCE]                      │
│ [Projeto Conquista]           │
│ [Edney Ulisses]               │
│                              │
└──────────────────────────────┘
```

---

## Estrutura dos botões/logos das marcas

Cada item de marca deve conter:

- Logo oficial da marca.
- Área clicável ampla.
- Estado normal.
- Estado hover.
- Estado ativo/clicado.
- Acessibilidade mínima com `aria-label`.

O foco visual deve estar no logo, não em textos longos.

Textos descritivos devem ser reduzidos ou ocultos na Página 1 para manter a entrada limpa, institucional e premium.

---

## Comportamento funcional

### Estado inicial

- Nenhuma empresa selecionada.
- Tela carregada com identidade visual do Grupo GPV.
- Logo do Grupo GPV em destaque.
- Logos das marcas disponíveis para clique.
- Não há necessidade de botão Continuar na Página 1.

### Hover nos logos das marcas

Ao passar o mouse sobre uma marca:

- O logo deve ganhar destaque visual.
- Deve haver leve elevação.
- Deve haver brilho ou borda sutil.
- A cor de destaque pode usar a cor da própria marca ou cor institucional do Grupo GPV.
- Cursor deve ser `pointer`.
- Transição entre 200ms e 300ms.

### Clique em uma marca

Ao clicar em uma marca, o sistema deve:

1. Identificar a empresa pelo `id`.
2. Salvar a empresa em `appState.selectedCompany`.
3. Pré-carregar os serviços vinculados ao `companyId`.
4. Carregar a identidade visual da empresa selecionada para as próximas páginas.
5. Avançar automaticamente para a Página 2 — Cliente.

---

## Regra importante de identidade visual

A Página 1 usa majoritariamente a identidade visual do **Grupo GPV**.

As páginas seguintes passam a usar a identidade visual da empresa selecionada.

Exemplo:

- Página 1: Grupo GPV.
- Página 2 em diante: Grand Prix, VELOCE, Champions, Projeto Conquista ou Edney Ulisses, conforme seleção.

---

## Dados necessários no projeto

### Logo institucional do Grupo GPV

Caminho recomendado:

```txt
assets/logos/grupo-gpv.png
```

### Logos das empresas

Caminhos recomendados:

```txt
assets/logos/grand-prix.png
assets/logos/champions-festival.png
assets/logos/veloce.png
assets/logos/projeto-conquista.png
assets/logos/edney-ulisses.png
```

---

## Dados necessários no JSON

O arquivo `companies.json` deve continuar armazenando os dados das marcas.

O arquivo `config.json` deve receber a identidade institucional do Grupo GPV para a Página 1.

Estrutura recomendada:

```json
{
  "groupBrand": {
    "name": "Grupo GPV",
    "logo": "assets/logos/grupo-gpv.png",
    "theme": {
      "primaryColor": "",
      "secondaryColor": "",
      "accentColor": "",
      "backgroundColor": "",
      "textColor": "#FFFFFF"
    }
  }
}
```

As cores serão definidas após envio do material oficial do Grupo GPV.

---

## Regras funcionais

| ID | Regra |
|---|---|
| P1-RF01 | Exibir o logo principal do Grupo GPV em destaque |
| P1-RF02 | Aplicar as cores institucionais do Grupo GPV na Página 1 |
| P1-RF03 | Exibir os logos das empresas cadastradas no `companies.json` |
| P1-RF04 | Tornar cada logo de empresa clicável |
| P1-RF05 | Permitir seleção de apenas uma empresa |
| P1-RF06 | Salvar empresa selecionada no `appState.selectedCompany` |
| P1-RF07 | Carregar serviços vinculados ao `companyId` |
| P1-RF08 | Aplicar identidade visual da empresa selecionada a partir da Página 2 |
| P1-RF09 | Avançar automaticamente para a Página 2 após clique na marca |
| P1-RF10 | Não exigir botão Continuar na Página 1 |

---

## Regras visuais

| Elemento | Regra |
|---|---|
| Fundo | Cores institucionais do Grupo GPV |
| Logo Grupo GPV | Grande, centralizado e dominante |
| Título | Parte superior, claro e institucional |
| Logos das marcas | Abaixo do logo principal, clicáveis e bem espaçados |
| Cards/containers | Minimalistas, sem excesso de texto |
| Tipografia | Moderna, forte e legível |
| Animações | Suaves, premium e sem exagero |
| Responsividade | Logos empilhados ou em grid adaptável no mobile |

---

## Critérios de aceite

A Página 1 será considerada aprovada se:

- O logo do Grupo GPV aparece como elemento visual dominante.
- As cores da Página 1 seguem a identidade institucional do Grupo GPV.
- O título da página aparece na parte superior.
- Os logos das marcas aparecem abaixo do logo principal.
- Todos os logos das marcas são clicáveis.
- O clique em uma marca salva a empresa selecionada.
- O clique em uma marca avança automaticamente para a Página 2.
- A identidade visual da empresa selecionada é aplicada somente a partir da Página 2.
- Não existe botão Continuar obrigatório na Página 1.
- O layout funciona em desktop, tablet e mobile.
