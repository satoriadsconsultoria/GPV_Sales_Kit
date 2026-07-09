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

- Seleção da empresa.
- Carregamento automático da identidade visual.
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

1. Seleção da empresa.
2. Cadastro do cliente.
3. Seleção dos serviços.
4. Dados comerciais.
5. Conferência.
6. Proposta e exportação em PDF.

---

## 5. Requisitos funcionais

| ID | Requisito | Prioridade |
|---|---|---|
| RF001 | Permitir seleção da empresa | Alta |
| RF002 | Carregar identidade visual dinamicamente | Alta |
| RF003 | Carregar serviços conforme empresa | Alta |
| RF004 | Permitir cadastro do cliente | Alta |
| RF005 | Permitir upload do logo do cliente | Média |
| RF006 | Permitir seleção múltipla de serviços | Alta |
| RF007 | Exibir conferência completa | Alta |
| RF008 | Renderizar proposta final | Alta |
| RF009 | Exportar proposta em PDF | Alta |
| RF010 | Exibir página institucional final | Alta |
| RF011 | Usar config JSON para dados do responsável | Alta |

---

## 6. Requisitos não funcionais

| ID | Requisito | Critério |
|---|---|---|
| RNF001 | Performance | Carregamento inicial inferior a 3 segundos |
| RNF002 | Responsividade | Desktop, tablet e mobile |
| RNF003 | Escalabilidade | Empresas e serviços via JSON |
| RNF004 | Manutenibilidade | Código modular |
| RNF005 | Compatibilidade | Chrome, Edge e Safari modernos |
| RNF006 | Design | Padrão premium e executivo |
| RNF007 | Segurança | Sem envio de dados para servidor |
| RNF008 | Hospedagem | Compatível com Netlify |

---

## 7. Decisões técnicas oficiais

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
| Identidade visual | Dinâmica por empresa |
| Serviços | Desacoplados da interface |
| Assinatura | Configurável via JSON |

---

## 8. Critérios gerais de aceite

- O sistema roda localmente sem backend.
- O sistema pode ser hospedado no Netlify.
- O usuário consegue gerar proposta completa em PDF.
- A identidade visual muda conforme a empresa selecionada.
- Os serviços podem ser editados via JSON.
- O layout possui aparência premium, institucional e executiva.
