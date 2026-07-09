# PRD — GPV Sales Kit

## 1. Visão Geral

### Nome do Projeto
GPV Sales Kit

### Objetivo
Desenvolver uma aplicação web em HTML5, CSS3 e JavaScript puro para geração de propostas comerciais premium das empresas do Grupo GPV.

### Proposta de Valor
Padronizar, acelerar e elevar o nível visual das propostas comerciais do Grupo GPV, permitindo criação de propostas executivas em poucos minutos.

---

## 2. Empresas contempladas

- Grand Prix de Vendas
- Champions Festival
- VELOCE
- Projeto Conquista
- Edney Ulisses — Acelerador de Vendas

---

## 3. Escopo da V1

### Incluído

- Página inicial institucional com predominância da marca Grupo GPV.
- Seleção da empresa por meio dos logos clicáveis das marcas.
- Submenu no logo Grand Prix de Vendas para seleção entre Grand Prix de Vendas e Champions Festival.
- Carregamento automático da identidade visual da empresa selecionada a partir da Página 2.
- Cadastro do cliente.
- Upload do logotipo do cliente.
- Seleção múltipla de serviços.
- Banco local de serviços em JSON.
- Campo manual para valor da proposta.
- Campo livre para observações.
- Tela de conferência.
- Renderização da proposta.
- Exportação em PDF.
- Página institucional final com dados do responsável.

### Fora da V1

- Login.
- Backend.
- Banco online.
- Histórico de propostas.
- Envio automático por e-mail.
- Integração com CRM.
- Gateway de pagamento.
- Editor visual de templates.

---

## 4. Fluxo funcional

1. Portal institucional Grupo GPV com seleção da marca.
2. Quando o usuário interagir com o logo Grand Prix de Vendas, abrir opções: Grand Prix de Vendas ou Champions Festival.
3. Cadastro do cliente.
4. Seleção dos serviços.
5. Dados comerciais.
6. Conferência.
7. Proposta e exportação em PDF.

---

## 5. Requisitos funcionais

| ID | Requisito | Prioridade |
|---|---|---|
| RF001 | Exibir página inicial institucional com identidade visual do Grupo GPV | Alta |
| RF002 | Permitir seleção da empresa por logos clicáveis | Alta |
| RF003 | Exibir submenu Grand Prix de Vendas / Champions Festival ao interagir com o logo Grand Prix | Alta |
| RF004 | Carregar identidade visual da empresa selecionada a partir da Página 2 | Alta |
| RF005 | Carregar serviços conforme empresa | Alta |
| RF006 | Permitir cadastro do cliente | Alta |
| RF007 | Permitir upload do logo do cliente | Média |
| RF008 | Permitir seleção múltipla de serviços | Alta |
| RF009 | Exibir conferência completa | Alta |
| RF010 | Renderizar proposta final | Alta |
| RF011 | Exportar proposta em PDF | Alta |
| RF012 | Exibir página institucional final | Alta |
| RF013 | Usar config JSON para dados do responsável | Alta |
| RF014 | Preservar as cores originais de todos os logos | Alta |
| RF015 | Usar tipografia padrão do sistema | Alta |

---

## 6. Requisitos não funcionais

| ID | Requisito | Critério |
|---|---|---|
| RNF001 | Performance | Carregamento inicial inferior a 3 segundos |
| RNF002 | Responsividade | Desktop, tablet e mobile |
| RNF003 | Escalabilidade | Empresas, serviços e navegação via JSON |
| RNF004 | Manutenibilidade | Código modular |
| RNF005 | Compatibilidade | Chrome, Edge e Safari modernos |
| RNF006 | Design | Padrão premium e executivo |
| RNF007 | Segurança | Sem envio de dados para servidor |
| RNF008 | Hospedagem | Compatível com Netlify |
| RNF009 | Integridade visual de marca | Logos não podem ser recoloridos, distorcidos ou tratados por filtros |

---

## 7. Identidade visual oficial da Página 1

| Elemento | Definição |
|---|---|
| Marca dominante | Grupo GPV |
| Logo padrão | `assets/logos/grupo-gpv-negativo.png` |
| Logo de referência/acervo | `assets/logos/grupo-gpv-positivo.png` |
| Cor institucional principal | `#252324` |
| Cor secundária | `#A5A09C` |
| Texto principal | Branco `#FFFFFF` |
| Tipografia | `system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif` |

A Página 1 deve usar sempre o **logo branco** do Grupo GPV sobre fundo escuro dentro da paleta institucional.

As cores institucionais devem ser aplicadas em fundos, botões, bordas, textos, linhas, cards e elementos gráficos. Elas não devem alterar as cores do logo.

---

## 8. Regra de navegação agrupada

A navegação da Página 1 deve ser carregada a partir de:

```txt
data/navigation.json
```

O logo do Grand Prix de Vendas deve funcionar como agrupador para duas soluções:

| Opção | `companyId` | Tipo |
|---|---|---|
| Grand Prix de Vendas | `grand-prix` | Evento físico |
| Champions Festival | `champions` | Evento digital |

### Desktop

- Hover sobre o logo Grand Prix abre submenu.
- Clique em uma opção seleciona a empresa e avança para a Página 2.

### Mobile

- Primeiro toque no logo Grand Prix abre submenu.
- Toque em uma opção seleciona a empresa e avança para a Página 2.

---

## 9. Regra global de uso dos logos

Todos os logos do sistema são **assets imutáveis de marca**.

### Permitido

- Usar o logo original exatamente como fornecido.
- Redimensionar proporcionalmente.
- Usar `object-fit: contain`.
- Posicionar em containers, cards, cabeçalhos e capas.
- Aplicar cores do tema somente ao fundo, bordas, textos, botões e elementos visuais externos ao logo.

### Proibido

- Recolorir logos.
- Aplicar filtros CSS em logos.
- Usar `mix-blend-mode` nos logos.
- Alterar opacidade dos logos.
- Converter logos para monocromático.
- Substituir cores internas pelo tema da empresa.
- Distorcer proporção.
- Cortar área útil do logo.

Essa regra vale para todas as marcas e para o logo do cliente.

---

## 10. Decisões técnicas oficiais

| Tema | Decisão |
|---|---|
| Tipo | Aplicação front-end estática |
| Linguagens | HTML, CSS e JavaScript |
| Backend | Não haverá na V1 |
| Dados | JSON local |
| Exportação | PDF |
| Hospedagem | Netlify |
| Repositório | GPV_Sales_Kit |
| Desenvolvimento | VS Code + Claude Code |
| Página 1 | Portal institucional do Grupo GPV |
| Navegação da Página 1 | `data/navigation.json` |
| Seleção da empresa | Logos das marcas clicáveis |
| Grand Prix de Vendas | Logo agrupador com submenu |
| Champions Festival | Opção dentro do agrupamento Grand Prix |
| Identidade visual da Página 1 | Grupo GPV, cor principal `#252324` |
| Logo GPV padrão | Branco sobre fundo escuro |
| Tipografia | Padrão do sistema |
| Identidade visual das páginas seguintes | Empresa selecionada |
| Tratamento dos logos | Preservar cores originais; nunca recolorir |
| Serviços | Desacoplados da interface |
| Assinatura | Configurável via JSON |

---

## 11. Critérios gerais de aceite

- O sistema roda localmente sem backend.
- O sistema pode ser hospedado no Netlify.
- A Página 1 apresenta o Grupo GPV como marca dominante.
- A Página 1 usa `#252324` como cor institucional principal.
- A Página 1 usa `#A5A09C` como cor secundária institucional.
- A Página 1 usa tipografia padrão do sistema.
- A Página 1 usa o logo branco do Grupo GPV sobre fundo escuro.
- O logo Grand Prix abre submenu com Grand Prix de Vendas e Champions Festival.
- O clique em Grand Prix de Vendas seleciona `grand-prix`.
- O clique em Champions Festival seleciona `champions`.
- Nenhum logo é recolorido, filtrado, distorcido ou convertido para outra versão visual não aprovada.
- A identidade visual muda conforme a empresa selecionada a partir da Página 2.
- O usuário consegue gerar proposta completa em PDF.
- Os serviços podem ser editados via JSON.
- O layout possui aparência premium, institucional e executiva.
