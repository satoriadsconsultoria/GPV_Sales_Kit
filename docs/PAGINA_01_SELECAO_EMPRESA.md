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

## Identidade visual oficial da Página 1

### Marca dominante

**Grupo GPV**

### Logo institucional

Arquivo de referência enviado pelo usuário:

```txt
GPV_Regua_logo positivo-03.png
```

Caminho oficial no projeto:

```txt
assets/logos/grupo-gpv.svg
```

Referência raster opcional para uso futuro:

```txt
assets/logos/grupo-gpv.png
```

### Cores institucionais oficiais

| Uso | Cor |
|---|---|
| Cor principal | `#252324` |
| Cor secundária | `#A5A09C` |
| Fundo institucional | `#252324` |
| Texto principal | `#FFFFFF` |
| Texto secundário | `#A5A09C` |

### Cores de apoio presentes no material visual

| Cor | Hexadecimal | Uso recomendado |
|---|---|---|
| Ciano | `#5BBFC8` | Destaques sutis, linha decorativa, hover |
| Vermelho | `#E31838` | Pontos de atenção, microdetalhes |
| Amarelo | `#F5C32C` | Ênfase premium, detalhe visual |
| Azul | `#2F3D8E` | Complemento visual, barra institucional |

### Regra de aplicação

A Página 1 deve ser majoritariamente escura, usando `#252324` como base visual e `#A5A09C` como cor secundária. As cores de apoio devem ser usadas somente como elementos gráficos secundários, especialmente na régua institucional do Grupo GPV.

As cores informadas são para fundos, cards, botões, bordas, textos e elementos gráficos externos. **Nenhuma cor institucional deve ser aplicada diretamente sobre o logo.**

---

## Regra obrigatória de preservação de logos

Os logos devem ser exibidos exatamente como foram fornecidos.

Essa regra vale para:

- Logo do Grupo GPV.
- Logos das empresas do Grupo GPV.
- Logo do cliente enviado na proposta.

### Permitido

- Redimensionar proporcionalmente.
- Posicionar em containers.
- Usar `object-fit: contain`.
- Aplicar margem e espaçamento externo.

### Proibido

- Recolorir.
- Aplicar filtros CSS.
- Alterar opacidade.
- Usar `mix-blend-mode`.
- Converter para monocromático.
- Substituir cores internas pelas cores do tema.
- Distorcer proporção.
- Cortar área útil.

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

- O container do logo deve ganhar destaque visual.
- Deve haver leve elevação no card/container.
- Pode haver brilho ou borda sutil no container.
- A cor de destaque pode usar a cor da própria marca ou o ciano institucional `#5BBFC8`.
- O logo em si não deve receber recoloração, filtro ou alteração de opacidade.
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

As cores de cada empresa devem afetar layout, fundos, botões, bordas, cards e elementos visuais. Elas não devem alterar o arquivo de logo da empresa.

---

## Dados necessários no projeto

### Logo institucional do Grupo GPV

```txt
assets/logos/grupo-gpv.svg
```

### Logos das empresas

```txt
assets/logos/grand-prix.png
assets/logos/champions-festival.png
assets/logos/veloce.png
assets/logos/projeto-conquista.png
assets/logos/edney-ulisses.png
```

---

## Dados necessários no JSON

O arquivo `config.json` deve armazenar a identidade institucional do Grupo GPV para a Página 1.

```json
{
  "brandAssetPolicy": {
    "preserveOriginalLogos": true,
    "applyThemeColorsToLogos": false,
    "allowLogoRecolor": false,
    "allowCssFiltersOnLogos": false,
    "allowLogoOpacityChange": false,
    "allowLogoDistortion": false
  },
  "groupBrand": {
    "name": "Grupo GPV",
    "logo": "assets/logos/grupo-gpv.svg",
    "logoRasterReference": "assets/logos/grupo-gpv.png",
    "theme": {
      "primaryColor": "#252324",
      "secondaryColor": "#A5A09C",
      "accentColor": "#5BBFC8",
      "backgroundColor": "#252324",
      "textColor": "#FFFFFF",
      "mutedTextColor": "#A5A09C",
      "supportColors": {
        "cyan": "#5BBFC8",
        "red": "#E31838",
        "yellow": "#F5C32C",
        "blue": "#2F3D8E"
      }
    }
  }
}
```

---

## Regras funcionais

| ID | Regra |
|---|---|
| P1-RF01 | Exibir o logo principal do Grupo GPV em destaque |
| P1-RF02 | Aplicar `#252324` como base visual da Página 1 |
| P1-RF03 | Usar `#A5A09C` como cor secundária institucional |
| P1-RF04 | Exibir os logos das empresas cadastradas no `companies.json` |
| P1-RF05 | Tornar cada logo de empresa clicável |
| P1-RF06 | Permitir seleção de apenas uma empresa |
| P1-RF07 | Salvar empresa selecionada no `appState.selectedCompany` |
| P1-RF08 | Carregar serviços vinculados ao `companyId` |
| P1-RF09 | Aplicar identidade visual da empresa selecionada a partir da Página 2 |
| P1-RF10 | Avançar automaticamente para a Página 2 após clique na marca |
| P1-RF11 | Não exigir botão Continuar na Página 1 |
| P1-RF12 | Preservar as cores originais dos logos |

---

## Regras visuais

| Elemento | Regra |
|---|---|
| Fundo | Cor principal `#252324` |
| Logo Grupo GPV | Grande, centralizado, dominante e sem alteração de cor |
| Título | Parte superior, claro e institucional |
| Texto secundário | Cor `#A5A09C` |
| Logos das marcas | Abaixo do logo principal, clicáveis, sem alteração de cor e bem espaçados |
| Cards/containers | Minimalistas, sem excesso de texto |
| Tipografia | Moderna, forte e legível |
| Animações | Suaves, premium e sem exagero |
| Responsividade | Logos empilhados ou em grid adaptável no mobile |

---

## Critérios de aceite

A Página 1 será considerada aprovada se:

- O logo do Grupo GPV aparece como elemento visual dominante.
- A cor base da Página 1 é `#252324`.
- A cor secundária institucional é `#A5A09C`.
- As cores de apoio são usadas somente como detalhe visual externo ao logo.
- O título da página aparece na parte superior.
- Os logos das marcas aparecem abaixo do logo principal.
- Todos os logos das marcas são clicáveis.
- Nenhum logo sofre alteração de cor, filtro, opacidade ou proporção.
- O clique em uma marca salva a empresa selecionada.
- O clique em uma marca avança automaticamente para a Página 2.
- A identidade visual da empresa selecionada é aplicada somente a partir da Página 2.
- Não existe botão Continuar obrigatório na Página 1.
- O layout funciona em desktop, tablet e mobile.
