# Página 2 — Cliente

## Objetivo

A Página 2 será a tela de cadastro dos dados básicos do cliente que receberá a proposta comercial.

Ela será aberta imediatamente após a seleção da marca na Página 1.

A Página 2 deve carregar automaticamente a identidade visual da empresa selecionada, utilizando as cores, elementos e logo da marca escolhida.

---

## Contexto de entrada

A Página 2 depende obrigatoriamente da seleção feita na Página 1.

O sistema deve receber de `appState.selectedCompany`:

- `companyId`.
- Nome da empresa selecionada.
- Logo da empresa selecionada.
- Paleta visual da empresa selecionada.
- Estrutura de proposta vinculada à empresa.

Se não houver empresa selecionada, o sistema deve retornar para a Página 1.

---

## Regra de identidade visual

A Página 2 não usa mais a identidade visual predominante do Grupo GPV.

A partir da Página 2, toda a interface deve ser personalizada conforme a marca selecionada.

Exemplo:

| Marca selecionada | Identidade aplicada na Página 2 |
|---|---|
| Grand Prix de Vendas | Paleta Grand Prix |
| Champions Festival | Paleta Champions Festival |
| VELOCE | Paleta VELOCE |
| Projeto Conquista | Paleta Projeto Conquista |
| Edney Ulisses | Paleta Edney Ulisses |

---

## Campos da Página 2

| Campo | Tipo | Obrigatório | Observação |
|---|---|---|---|
| Nome do cliente | Texto | Sim | Nome da empresa ou cliente que receberá a proposta |
| Telefone do cliente | Telefone | Sim | Deve conter DDD |
| E-mail do cliente | E-mail | Sim | Deve validar formato básico de e-mail |
| Upload do logo do cliente | Arquivo | Sim | PNG, JPG, JPEG, WEBP ou SVG |

---

## Estrutura visual sugerida

### Desktop

```txt
┌────────────────────────────────────────────────────┐
│ [Logo da marca selecionada]          Etapa 2 de 6  │
├────────────────────────────────────────────────────┤
│                                                    │
│  Dados do cliente                                  │
│  Informe as informações que serão usadas na        │
│  proposta comercial.                               │
│                                                    │
│  [Nome do cliente_____________________________]    │
│  [Telefone com DDD____________________________]    │
│  [E-mail_____________________________________]     │
│                                                    │
│  [Upload do logo do cliente]                       │
│                                                    │
│  [Voltar]                              [Continuar] │
│                                                    │
└────────────────────────────────────────────────────┘
```

### Mobile

```txt
┌──────────────────────────────┐
│ [Logo da marca]               │
│ Etapa 2 de 6                  │
├──────────────────────────────┤
│ Dados do cliente              │
│ [Nome do cliente]             │
│ [Telefone com DDD]            │
│ [E-mail]                      │
│ [Upload do logo]              │
│ [Voltar]                      │
│ [Continuar]                   │
└──────────────────────────────┘
```

---

## Comportamento funcional

### Entrada na Página 2

Ao entrar na Página 2, o sistema deve:

1. Ler `appState.selectedCompany`.
2. Buscar a empresa correspondente em `data/companies.json`.
3. Aplicar as cores da empresa selecionada.
4. Exibir o logo da empresa selecionada.
5. Preparar o estado `appState.client`.

---

## Estado esperado

```js
appState.client = {
  name: "",
  phone: "",
  email: "",
  logoFile: null,
  logoPreviewUrl: ""
}
```

---

## Regras de validação

### Nome do cliente

| Regra | Critério |
|---|---|
| Obrigatório | Não pode estar vazio |
| Tamanho mínimo | 2 caracteres |

### Telefone do cliente

| Regra | Critério |
|---|---|
| Obrigatório | Não pode estar vazio |
| DDD obrigatório | Deve conter pelo menos 10 dígitos numéricos |
| Máscara recomendada | `(00) 00000-0000` ou `(00) 0000-0000` |

### E-mail do cliente

| Regra | Critério |
|---|---|
| Obrigatório | Não pode estar vazio |
| Formato | Deve conter estrutura básica `nome@dominio.com` |

### Logo do cliente

| Regra | Critério |
|---|---|
| Obrigatório | Deve ser enviado antes de avançar |
| Formatos aceitos | `.png`, `.jpg`, `.jpeg`, `.webp`, `.svg` |
| Tamanho máximo recomendado | 5 MB |
| Tratamento visual | Não recolorir, não aplicar filtro, não distorcer |

---

## Upload do logo do cliente

O upload deve permitir pré-visualização do logo antes de avançar.

### Regras técnicas

- O arquivo não será enviado para servidor.
- O arquivo será mantido em memória no navegador.
- A pré-visualização deve usar `URL.createObjectURL(file)` ou equivalente.
- O logo será utilizado automaticamente nas próximas páginas da proposta.
- O logo deve ser preservado exatamente como enviado.

### Comportamento após upload

Ao fazer upload do logo:

1. Validar formato.
2. Validar tamanho.
3. Gerar preview.
4. Salvar em `appState.client.logoFile`.
5. Salvar preview em `appState.client.logoPreviewUrl`.
6. Exibir miniatura do logo na tela.

---

## Botões

| Botão | Ação |
|---|---|
| Voltar | Retorna para a Página 1 mantendo ou limpando a seleção conforme decisão futura |
| Continuar | Valida os campos e avança para a Página 3 — Serviços |

---

## Mensagens de erro

| Situação | Mensagem sugerida |
|---|---|
| Nome vazio | Informe o nome do cliente. |
| Telefone vazio | Informe o telefone do cliente com DDD. |
| Telefone inválido | Informe um telefone válido com DDD. |
| E-mail vazio | Informe o e-mail do cliente. |
| E-mail inválido | Informe um e-mail válido. |
| Logo ausente | Faça o upload do logo do cliente. |
| Formato de logo inválido | Envie um arquivo PNG, JPG, JPEG, WEBP ou SVG. |
| Arquivo muito grande | O logo deve ter no máximo 5 MB. |

---

## Regras funcionais

| ID | Regra |
|---|---|
| P2-RF01 | Abrir Página 2 após seleção de marca na Página 1 |
| P2-RF02 | Carregar a identidade visual da empresa selecionada |
| P2-RF03 | Exibir o logo da empresa selecionada |
| P2-RF04 | Exibir campo de nome do cliente |
| P2-RF05 | Exibir campo de telefone com DDD |
| P2-RF06 | Exibir campo de e-mail |
| P2-RF07 | Exibir upload do logo do cliente |
| P2-RF08 | Validar todos os campos antes de avançar |
| P2-RF09 | Salvar os dados em `appState.client` |
| P2-RF10 | Gerar preview do logo do cliente |
| P2-RF11 | Preservar o logo do cliente sem recoloração, filtro ou distorção |
| P2-RF12 | Avançar para a Página 3 somente se os dados estiverem válidos |

---

## Regras visuais

| Elemento | Regra |
|---|---|
| Fundo | Usar cor base da empresa selecionada |
| Destaques | Usar cor principal/accent da empresa selecionada |
| Logo da empresa | Exibir sem alteração visual |
| Logo do cliente | Exibir sem alteração visual |
| Inputs | Aparência premium, alto contraste e legibilidade |
| Botão principal | Usar cor principal/accent da empresa selecionada |
| Tipografia | Padrão do sistema |
| Layout | Tela inteira, responsivo e com transição suave |

---

## Critérios de aceite

A Página 2 será considerada aprovada se:

- Abrir automaticamente após a escolha da marca na Página 1.
- Usar a identidade visual da empresa selecionada.
- Exibir o logo da marca selecionada sem alteração visual.
- Permitir preencher nome do cliente.
- Permitir preencher telefone com DDD.
- Permitir preencher e-mail do cliente.
- Permitir upload e preview do logo do cliente.
- Validar campos obrigatórios antes de avançar.
- Salvar os dados em `appState.client`.
- Avançar somente para a Página 3 após validação correta.
- Preservar o logo do cliente exatamente como enviado.
