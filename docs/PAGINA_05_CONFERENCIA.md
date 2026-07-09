# Página 5 — Conferência

## Objetivo

A Página 5 será a tela de prévia e validação da proposta antes da geração final.

Ela deve consolidar todas as informações preenchidas nas etapas anteriores e permitir edição pontual de cada bloco de dados.

Ao clicar em editar, o sistema deve retornar automaticamente para a tela correspondente, mantendo todos os dados já preenchidos no estado da aplicação.

---

## Contexto de entrada

A Página 5 depende obrigatoriamente de:

- `appState.selectedCompany` preenchido.
- `appState.client` preenchido e validado.
- `appState.selectedServices` preenchido e validado.
- `appState.commercial` preenchido e validado.

Se algum dado obrigatório estiver ausente, o sistema deve retornar para a etapa correspondente.

---

## Comportamento geral

A Página 5 deve gerar uma prévia organizada da proposta com os dados consolidados.

A prévia deve ser visualmente executiva, clara e objetiva, ainda em formato de conferência interna, não como proposta final em PDF.

---

## Blocos da prévia

| Bloco | Origem | Ação de edição |
|---|---|---|
| Marca selecionada | Página 1 | Editar volta para Página 1 |
| Dados do cliente | Página 2 | Editar volta para Página 2 |
| Serviços/planos selecionados | Página 3 | Editar volta para Página 3 |
| Dados comerciais | Página 4 | Editar volta para Página 4 |

---

## Informações exibidas

### 1. Marca selecionada

Exibir:

- Logo da marca selecionada.
- Nome da marca selecionada.
- Tipo/descrição da marca, quando disponível.

Ação:

```txt
Editar marca
```

Ao clicar, voltar para Página 1.

---

### 2. Dados do cliente

Exibir:

- Nome do cliente.
- Telefone com DDD.
- E-mail.
- Preview do logo do cliente.

Ação:

```txt
Editar cliente
```

Ao clicar, voltar para Página 2.

---

### 3. Serviços/planos selecionados

Exibir conforme a marca:

#### Grand Prix de Vendas

- Serviço selecionado: Grand Prix de Vendas.
- Serviços Oferecidos.
- Condições para Realização do Evento.

#### VELOCE

- Plano selecionado.
- Serviços Oferecidos do plano.
- Se for Plano Diamond, exibir os serviços personalizados digitados.

#### Champions Festival

- Serviço selecionado: Champions Festival.
- Serviços Oferecidos.

#### Projeto Conquista

- Serviço selecionado: Projeto Conquista.
- Serviços personalizados digitados.

#### Edney Ulisses — Acelerador de Vendas

- Serviço selecionado: Edney Ulisses - Acelerador de Vendas.
- Serviços personalizados digitados.

Ação:

```txt
Editar serviços
```

Ao clicar, voltar para Página 3.

---

### 4. Dados comerciais

Exibir:

- Valor da proposta em `R$`.
- Observações, somente se preenchidas.
- Prazo de entrega, se preenchido.
- Para VELOCE, o prazo de entrega sempre deve aparecer, pois é obrigatório.

Ação:

```txt
Editar comercial
```

Ao clicar, voltar para Página 4.

---

## Regra de edição

Cada bloco deve possuir uma ação clara de edição.

Ao clicar em editar:

1. O sistema deve manter todos os dados já preenchidos.
2. O sistema deve navegar para a página correspondente.
3. Os campos da página de destino devem abrir preenchidos com os dados atuais.
4. Após nova validação, o usuário deve poder avançar novamente até a Página 5.

---

## Estado esperado

A Página 5 não deve criar uma nova estrutura principal de dados.

Ela deve apenas ler e apresentar:

```js
appState.selectedCompany
appState.client
appState.selectedServices
appState.commercial
```

Opcionalmente, pode registrar controle de navegação:

```js
appState.currentStep = 5
```

---

## Layout recomendado

### Desktop

```txt
┌────────────────────────────────────────────────────┐
│ [Logo da marca selecionada]          Etapa 5 de 6  │
├────────────────────────────────────────────────────┤
│                                                    │
│  Conferência da proposta                           │
│  Revise todos os dados antes de gerar a proposta.  │
│                                                    │
│  ┌ Marca selecionada ─────────────── [Editar] ┐    │
│  │ Logo | Nome da marca                       │    │
│  └────────────────────────────────────────────┘    │
│                                                    │
│  ┌ Dados do cliente ─────────────── [Editar] ┐     │
│  │ Nome | Telefone | E-mail | Logo           │     │
│  └───────────────────────────────────────────┘     │
│                                                    │
│  ┌ Serviços/planos ──────────────── [Editar] ┐     │
│  │ Serviço/plano selecionado + escopo        │     │
│  └───────────────────────────────────────────┘     │
│                                                    │
│  ┌ Dados comerciais ─────────────── [Editar] ┐     │
│  │ Valor | Observações | Prazo               │     │
│  └───────────────────────────────────────────┘     │
│                                                    │
│  [Voltar]                        [Gerar proposta]  │
└────────────────────────────────────────────────────┘
```

---

## Botões

| Botão | Ação |
|---|---|
| Voltar | Retorna para Página 4 mantendo dados comerciais |
| Gerar proposta | Avança para Página 6 — Proposta / Exportação PDF |

---

## Regras funcionais

| ID | Regra |
|---|---|
| P5-RF01 | Abrir Página 5 após validação da Página 4 |
| P5-RF02 | Exibir prévia consolidada da proposta |
| P5-RF03 | Exibir bloco de marca selecionada |
| P5-RF04 | Exibir bloco de dados do cliente |
| P5-RF05 | Exibir bloco de serviços/planos selecionados |
| P5-RF06 | Exibir bloco de dados comerciais |
| P5-RF07 | Cada bloco deve possuir opção de editar |
| P5-RF08 | Editar marca deve voltar para Página 1 |
| P5-RF09 | Editar cliente deve voltar para Página 2 |
| P5-RF10 | Editar serviços deve voltar para Página 3 |
| P5-RF11 | Editar comercial deve voltar para Página 4 |
| P5-RF12 | Ao editar, preservar todos os dados já preenchidos |
| P5-RF13 | Ao voltar para uma tela, preencher os campos com os dados atuais do estado |
| P5-RF14 | Exibir observações somente se houver conteúdo |
| P5-RF15 | Exibir prazo de entrega sempre que preenchido |
| P5-RF16 | Para VELOCE, exibir prazo de entrega obrigatoriamente |
| P5-RF17 | Avançar para Página 6 somente após o usuário clicar em Gerar proposta |

---

## Critérios de aceite

A Página 5 será considerada aprovada se:

- Gerar uma prévia clara da proposta.
- Consolidar dados da marca, cliente, serviços e comercial.
- Exibir opção de editar em cada bloco.
- Levar o usuário para a tela correta ao clicar em editar.
- Manter os dados preenchidos ao navegar para edição.
- Recarregar os campos já preenchidos na tela editada.
- Permitir retornar à conferência após nova validação.
- Avançar para Página 6 somente quando o usuário confirmar a geração da proposta.
