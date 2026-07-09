# Página 3 — Serviços

## Objetivo

A Página 3 será responsável pela seleção dos serviços que farão parte da proposta comercial.

Os serviços exibidos devem depender da marca selecionada na Página 1 e carregada a partir da Página 2.

A estrutura deve ser dinâmica e baseada em `data/services.json`.

---

## Contexto de entrada

A Página 3 depende obrigatoriamente de:

- `appState.selectedCompany` preenchido.
- `appState.client` preenchido e validado.
- Serviços carregados a partir de `data/services.json`.

Se a empresa ou os dados do cliente não existirem no estado da aplicação, o sistema deve retornar para a etapa correspondente.

---

## Comportamento geral

Para cada empresa, o sistema deve listar os serviços vinculados ao `companyId`.

Ao marcar um serviço/plano, o sistema deve exibir abaixo os detalhes completos daquele item.

Os detalhes podem incluir:

- Serviços oferecidos.
- Escopo.
- Entregáveis.
- Diferenciais.
- Premissas.
- Condições para realização.
- Campo personalizado de serviços.

---

## Estado esperado

```js
appState.selectedServices = []
```

Ao selecionar um serviço:

```js
appState.selectedServices = [
  {
    serviceId: "grand-prix-de-vendas",
    companyId: "grand-prix"
  }
]
```

---

## Regra específica — Grand Prix de Vendas

No caso do **Grand Prix de Vendas**, existe somente um serviço disponível na Página 3.

### Serviço exibido

```txt
Grand Prix de Vendas
```

### Comportamento

- Exibir apenas uma opção de seleção.
- A opção deve funcionar como checkbox/fleg.
- Ao marcar o serviço, abrir abaixo os detalhes completos.
- Os detalhes devem ser separados em duas seções:
  - Serviços Oferecidos.
  - Condições para Realização do Evento.

---

## Grand Prix de Vendas — Serviços Oferecidos

- Planejamento de todo evento e distribuição de equipe.
- Criação de todas as artes para divulgação do evento, incluindo mais de 300 anúncios.
- Roteiro, produção, gravação e edição de todos os vídeos.
- Criação de script para prospecção e acompanhamento dos agendamentos dos vendedores.
- Prospecção dos clientes captados pela campanha e da base do cliente.
- Setup de automação da IA de prospecção e agendamento.
- Agendamento por IA e ligação.
- Disparo de voz para clientes agendados.
- Envio de QR Code individual e personalizado para cada cliente agendado.
- Planejamento, estratégia e execução das campanhas de performance e captação dos leads.
- Otimização diária de todas as campanhas de performance.
- Pit Stop com toda equipe sobre o evento, estratégia e motivacional.
- Controle de fluxo de loja nos dias do evento.
- Equipe de recepção do evento.

---

## Grand Prix de Vendas — Condições para Realização do Evento

- Espaço para evento e treinamento.
- Espaço para equipe do GP de Vendas no showroom.
- Base para prospecção complementar.
- Disparo de CRM via sistema interno da concessionária.
- Equipe de apoio de marketing da concessionária.
- Decoração interna e externa da loja.
- Fotos internas e externas da loja.
- Verba de tráfego pago a combinar. Média utilizada em eventos: R$ 20.000 por marca + imposto Meta. Valor depositado com antecedência para realização do evento.
- Coffee break para clientes.
- Recepcionistas para controle de fluxo. Serviço realizado pelo GP de Vendas.
- Definição de datas, horários e atividades do evento.
- Informações sobre produtos, promoções, condições e descontos.
- Telão de LED 3x2, palco, iluminação interna, sonorização, chuva de prata e operador.
- Painel externo 3x5 para identificação do evento.

---

## Regra específica — VELOCE

No caso da **VELOCE**, a Página 3 deve exibir planos comerciais.

### Planos exibidos

- Plano Start.
- Plano Bronze.
- Plano Prata.
- Plano Ouro.
- Plano Diamond.

### Comportamento

- Cada plano deve ter uma opção de seleção/fleg.
- A seleção deve funcionar como escolha única entre planos.
- Ao selecionar um plano, exibir abaixo os serviços oferecidos daquele plano.
- No Plano Diamond, ao selecionar, exibir uma caixa de texto para digitar os serviços personalizados.
- O Plano Diamond não possui lista fixa de serviços.

---

## VELOCE — Plano Start

### Serviços Oferecidos

- 2 criativos por mês.
- Tráfego pago Meta.
- 1 reunião por mês.

---

## VELOCE — Plano Bronze

### Serviços Oferecidos

- 8 criativos por mês.
- Tráfego pago Meta.
- 1 reunião por mês.

---

## VELOCE — Plano Prata

### Serviços Oferecidos

- 20 criativos por mês.
- Tráfego pago Meta e Google.
- 12 posts orgânicos por mês — Motion, post único ou carrossel.
- 2 reuniões por mês.

---

## VELOCE — Plano Ouro

### Serviços Oferecidos

- 50 criativos por mês.
- Tráfego pago Meta, TikTok, LinkedIn e Google.
- 12 posts orgânicos por mês — Motion, post único ou carrossel.
- 3 reuniões por mês.

---

## VELOCE — Plano Diamond

### Serviços Oferecidos

O Plano Diamond é personalizado.

Ao selecionar este plano, o sistema deve exibir uma caixa de texto para digitar manualmente os serviços incluídos na proposta.

Campo obrigatório:

```txt
Serviços personalizados do Plano Diamond
```

Placeholder sugerido:

```txt
Digite os serviços que serão incluídos no Plano Diamond.
```

---

## Layout recomendado

### Desktop

```txt
┌────────────────────────────────────────────────────┐
│ [Logo da marca selecionada]          Etapa 3 de 6  │
├────────────────────────────────────────────────────┤
│                                                    │
│  Serviços da proposta                              │
│  Selecione o serviço/plano que será incluído.      │
│                                                    │
│  [ ] Serviço ou Plano                              │
│                                                    │
│  Se selecionado:                                   │
│                                                    │
│  Serviços Oferecidos                               │
│  - Item 1                                          │
│  - Item 2                                          │
│                                                    │
│  [Voltar]                              [Continuar] │
└────────────────────────────────────────────────────┘
```

---

## Regras funcionais

| ID | Regra |
|---|---|
| P3-RF01 | Abrir Página 3 após validação da Página 2 |
| P3-RF02 | Carregar serviços a partir de `data/services.json` |
| P3-RF03 | Filtrar serviços pelo `companyId` da empresa selecionada |
| P3-RF04 | Exibir opção de seleção/fleg para cada serviço disponível |
| P3-RF05 | No Grand Prix de Vendas, exibir somente o serviço Grand Prix de Vendas |
| P3-RF06 | Ao marcar o serviço, exibir os detalhes abaixo |
| P3-RF07 | Exibir seção Serviços Oferecidos |
| P3-RF08 | Exibir seção Condições para Realização do Evento quando existir |
| P3-RF09 | Salvar seleção em `appState.selectedServices` |
| P3-RF10 | Impedir avanço sem pelo menos um serviço selecionado |
| P3-RF11 | Aplicar identidade visual da marca selecionada |
| P3-RF12 | Preservar logos sem alteração visual |
| P3-RF13 | Na VELOCE, exibir planos Start, Bronze, Prata, Ouro e Diamond |
| P3-RF14 | Na VELOCE, permitir seleção única entre os planos |
| P3-RF15 | Ao selecionar um plano VELOCE, exibir os serviços oferecidos do plano |
| P3-RF16 | No Plano Diamond, exibir textarea para serviços personalizados |
| P3-RF17 | No Plano Diamond, impedir avanço se o campo personalizado estiver vazio |

---

## Botões

| Botão | Ação |
|---|---|
| Voltar | Retorna para a Página 2 mantendo os dados do cliente |
| Continuar | Valida seleção e avança para a Página 4 — Comercial |

---

## Mensagens de erro

| Situação | Mensagem sugerida |
|---|---|
| Nenhum serviço selecionado | Selecione pelo menos um serviço para continuar. |
| Nenhum serviço encontrado para a empresa | Nenhum serviço cadastrado para esta marca. |
| Plano Diamond sem serviços digitados | Informe os serviços personalizados do Plano Diamond. |

---

## Critérios de aceite

A Página 3 será considerada aprovada se:

- Carregar os serviços conforme a marca selecionada.
- No Grand Prix de Vendas, exibir somente o serviço Grand Prix de Vendas.
- Na VELOCE, exibir os planos Start, Bronze, Prata, Ouro e Diamond.
- Na VELOCE, exibir os serviços de cada plano ao selecionar.
- No Plano Diamond, exibir campo livre para digitar os serviços personalizados.
- Permitir marcar/flegar o serviço ou plano.
- Salvar a seleção em `appState.selectedServices`.
- Impedir avanço sem serviço/plano selecionado.
- Usar a identidade visual da marca selecionada.
