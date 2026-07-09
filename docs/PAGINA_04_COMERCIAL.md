# Página 4 — Comercial

## Objetivo

A Página 4 será responsável pelo preenchimento das condições comerciais da proposta.

Ela deve abrir após a validação da Página 3 — Serviços.

A Página 4 deve manter a identidade visual da marca selecionada na Página 1.

---

## Contexto de entrada

A Página 4 depende obrigatoriamente de:

- `appState.selectedCompany` preenchido.
- `appState.client` preenchido e validado.
- `appState.selectedServices` preenchido e validado.

Se algum desses dados estiver ausente, o sistema deve retornar para a etapa correspondente.

---

## Campos da Página 4

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| Valor da proposta | Moeda | Sim | Campo formatado em Real brasileiro `R$` |
| Observações | Texto longo | Não | Campo livre para observações comerciais, operacionais ou específicas da proposta |
| Prazo de entrega | Texto ou data | Condicional | Obrigatório apenas quando a marca selecionada for VELOCE |

---

## Campo — Valor da proposta

O campo de valor da proposta deve ser configurado em formato monetário brasileiro.

### Regras

- Obrigatório para todas as marcas.
- Deve exibir prefixo `R$`.
- Deve aceitar apenas valores numéricos.
- Deve formatar o valor automaticamente no padrão brasileiro.
- Deve salvar o valor numérico e o valor formatado no estado da aplicação.

### Exemplo visual

```txt
R$ 12.000,00
```

### Estado sugerido

```js
appState.commercial.value = {
  raw: 12000,
  formatted: "R$ 12.000,00"
}
```

---

## Campo — Observações

Campo livre para inserir qualquer observação necessária na proposta.

### Regras

- Não obrigatório.
- Deve ser textarea.
- Deve aceitar múltiplas linhas.
- Deve ser salvo mesmo se estiver vazio.
- Deve aparecer na proposta final somente se tiver conteúdo preenchido.

### Exemplos de uso

- Condição comercial específica.
- Observação sobre escopo.
- Observação sobre negociação.
- Observação sobre prazo, pagamento ou dependências.

---

## Campo — Prazo de entrega

Campo para registrar prazo de entrega, início de execução ou prazo operacional da proposta.

### Regra condicional por marca

| Marca | Obrigatório? |
|---|---|
| Grand Prix de Vendas | Não |
| Champions Festival | Não |
| VELOCE | Sim |
| Projeto Conquista | Não |
| Edney Ulisses — Acelerador de Vendas | Não |

### Regra VELOCE

Quando `appState.selectedCompany.id === "veloce"`, o campo **Prazo de entrega** deve ser obrigatório.

O sistema deve impedir avanço para a Página 5 se a marca for VELOCE e o prazo estiver vazio.

---

## Estado esperado

```js
appState.commercial = {
  proposalValue: {
    raw: 0,
    formatted: ""
  },
  notes: "",
  deliveryDeadline: ""
}
```

---

## Comportamento funcional

Ao entrar na Página 4, o sistema deve:

1. Ler `appState.selectedCompany`.
2. Aplicar a identidade visual da marca selecionada.
3. Exibir o logo da marca selecionada.
4. Exibir campo de valor da proposta.
5. Exibir campo de observações.
6. Exibir campo de prazo de entrega.
7. Aplicar obrigatoriedade condicional do prazo para VELOCE.

---

## Validações

### Valor da proposta

| Regra | Critério |
|---|---|
| Obrigatório | Valor não pode estar vazio |
| Numérico | Deve conter valor monetário válido |
| Maior que zero | Deve ser superior a R$ 0,00 |

### Observações

| Regra | Critério |
|---|---|
| Opcional | Pode ficar vazio |

### Prazo de entrega

| Regra | Critério |
|---|---|
| Condicional | Obrigatório somente para VELOCE |
| Opcional nas demais marcas | Pode ficar vazio |

---

## Mensagens de erro

| Situação | Mensagem sugerida |
|---|---|
| Valor vazio | Informe o valor da proposta. |
| Valor inválido | Informe um valor válido para a proposta. |
| Valor zerado | O valor da proposta deve ser maior que R$ 0,00. |
| Prazo VELOCE vazio | Informe o prazo de entrega para a proposta da VELOCE. |

---

## Botões

| Botão | Ação |
|---|---|
| Voltar | Retorna para a Página 3 mantendo serviços selecionados |
| Continuar | Valida os campos e avança para a Página 5 — Conferência |

---

## Regras funcionais

| ID | Regra |
|---|---|
| P4-RF01 | Abrir Página 4 após validação da Página 3 |
| P4-RF02 | Aplicar identidade visual da marca selecionada |
| P4-RF03 | Exibir campo de valor da proposta em formato `R$` |
| P4-RF04 | Validar valor obrigatório, numérico e maior que zero |
| P4-RF05 | Exibir campo de observações como textarea |
| P4-RF06 | Observações devem ser opcionais |
| P4-RF07 | Exibir campo de prazo de entrega |
| P4-RF08 | Tornar prazo de entrega obrigatório somente para VELOCE |
| P4-RF09 | Nas demais marcas, prazo de entrega deve ser opcional |
| P4-RF10 | Salvar dados comerciais em `appState.commercial` |
| P4-RF11 | Impedir avanço se houver erro de validação |
| P4-RF12 | Avançar para Página 5 — Conferência após validação correta |

---

## Critérios de aceite

A Página 4 será considerada aprovada se:

- Abrir após a seleção dos serviços na Página 3.
- Manter a identidade visual da marca selecionada.
- Exibir campo de valor da proposta já formatado em `R$`.
- Exigir valor da proposta para todas as marcas.
- Exibir campo livre de observações.
- Permitir observações vazias.
- Exibir campo de prazo de entrega.
- Tornar prazo de entrega obrigatório apenas para VELOCE.
- Permitir prazo vazio nas demais marcas.
- Salvar os dados em `appState.commercial`.
- Avançar somente após validação correta.
