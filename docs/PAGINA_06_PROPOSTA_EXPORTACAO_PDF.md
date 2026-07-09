# Página 6 — Proposta Final e Exportação PDF

## Objetivo

A Página 6 será responsável por gerar a proposta final após a validação da Página 5.

Ela terá duas saídas distintas:

1. **Proposta interativa na tela** — versão visual, animada e navegável dentro do sistema.
2. **PDF executivo para envio ao cliente** — versão estática, organizada, premium e otimizada para leitura.

A versão interativa e o PDF não devem ser cópias idênticas. Cada formato deve ser desenhado para sua finalidade.

---

## Contexto de entrada

A Página 6 depende obrigatoriamente de:

- `appState.selectedCompany` preenchido.
- `appState.client` preenchido e validado.
- `appState.selectedServices` preenchido e validado.
- `appState.commercial` preenchido e validado.
- Validação concluída na Página 5.

Se algum dado obrigatório estiver ausente, o sistema deve retornar para a etapa correspondente.

---

## Saída 1 — Proposta interativa

A proposta interativa deve ser exibida dentro do sistema, com visual premium, animações suaves e leitura agradável.

### Características obrigatórias

- Interface totalmente personalizada com a identidade visual da marca selecionada.
- Visual premium, elegante e executivo.
- Animações suaves de entrada dos blocos.
- Transições discretas entre seções.
- Hierarquia visual forte.
- Cards, blocos ou seções com bom espaçamento.
- Exibição do logo da marca selecionada sem alteração visual.
- Exibição do logo do cliente sem alteração visual.
- Exibição clara dos dados comerciais.
- Botão para download em PDF.

### Animações permitidas

- Fade-in.
- Slide-up suave.
- Hover sutil em cards e botões.
- Transição de opacidade.
- Transição de escala leve.

### Animações proibidas

- Animações agressivas.
- Efeitos que prejudiquem leitura.
- Movimento excessivo.
- Parallax pesado.
- Elementos piscando.
- Qualquer animação que dificulte a exportação do PDF.

---

## Estrutura da proposta interativa

A proposta interativa deve conter, no mínimo:

1. Capa da proposta.
2. Apresentação da marca selecionada.
3. Dados do cliente.
4. Serviço/plano selecionado.
5. Escopo, serviços oferecidos ou serviços personalizados.
6. Condições específicas, quando existirem.
7. Investimento da proposta.
8. Observações, se preenchidas.
9. Prazo de entrega, se preenchido.
10. Encerramento institucional.
11. Botão de download em PDF.

---

## Saída 2 — PDF executivo

O PDF deve ser diferente da página interativa.

Ele deve ser organizado especificamente para envio ao cliente, priorizando clareza, leitura, elegância e apresentação executiva.

### Características obrigatórias

- Design premium, elegante e executivo.
- Layout limpo e paginado.
- Melhor aproveitamento de espaço para leitura em PDF.
- Hierarquia clara de títulos, subtítulos, cards e blocos de conteúdo.
- Capa institucional da proposta.
- Sumário ou sequência lógica de seções, se fizer sentido para o tamanho da proposta.
- Informações comerciais em destaque.
- Logos preservados sem recoloração, filtro ou distorção.
- Conteúdo sem animações.
- Conteúdo sem botões ou elementos interativos.
- Formatação correta para impressão ou envio digital.

---

## Estrutura recomendada do PDF

### Página 1 — Capa

- Logo da marca selecionada.
- Logo do cliente.
- Título: `Proposta Comercial`.
- Nome do cliente.
- Marca/empresa responsável pela proposta.

### Página 2 — Contexto da proposta

- Breve apresentação da solução selecionada.
- Objetivo da proposta.
- Dados do cliente.

### Página 3 em diante — Escopo

Conteúdo conforme a empresa selecionada:

#### Grand Prix de Vendas

- Serviço: Grand Prix de Vendas.
- Serviços Oferecidos.
- Condições para Realização do Evento.

#### VELOCE

- Plano selecionado.
- Serviços Oferecidos.
- Se Plano Diamond, exibir serviços personalizados digitados.
- Prazo de entrega obrigatório.

#### Champions Festival

- Serviço: Champions Festival.
- Serviços Oferecidos.

#### Projeto Conquista

- Serviço: Projeto Conquista.
- Serviços personalizados digitados.

#### Edney Ulisses — Acelerador de Vendas

- Serviço: Edney Ulisses - Acelerador de Vendas.
- Serviços personalizados digitados.

### Última página — Investimento e encerramento

- Valor da proposta em `R$`.
- Observações, se preenchidas.
- Prazo de entrega, se preenchido.
- Dados institucionais e responsável configurados em `data/config.json`.

---

## Diferença obrigatória entre interativo e PDF

| Item | Proposta interativa | PDF executivo |
|---|---|---|
| Finalidade | Visualização dentro do sistema | Envio ao cliente |
| Formato | Tela navegável | Documento paginado |
| Animações | Sim, suaves | Não |
| Botões | Sim | Não |
| Layout | Dinâmico e visual | Estático, limpo e executivo |
| Leitura | Experiência digital | Clareza documental |
| Exportação | Possui botão de PDF | Arquivo final |

---

## Botões da Página 6

| Botão | Ação |
|---|---|
| Voltar para conferência | Retorna para Página 5 |
| Baixar PDF | Gera e baixa o PDF executivo |
| Nova proposta | Limpa o estado e retorna para Página 1, se implementado na V1 |

---

## Geração do PDF

A geração do PDF deve usar os dados consolidados do `appState`.

### Estado utilizado

```js
appState.selectedCompany
appState.client
appState.selectedServices
appState.commercial
```

### Regras técnicas

- O PDF deve ser gerado no navegador.
- Não deve depender de backend.
- Deve ser compatível com hospedagem estática no Netlify.
- Deve preservar logos e imagens carregadas pelo usuário.
- Deve evitar cortes ruins entre páginas.
- Deve usar margens adequadas.
- Deve gerar arquivo com nome amigável.

### Nome sugerido do arquivo

```txt
proposta-[marca]-[cliente].pdf
```

Exemplo:

```txt
proposta-veloce-autohaus.pdf
```

---

## Regras funcionais

| ID | Regra |
|---|---|
| P6-RF01 | Abrir Página 6 após confirmação na Página 5 |
| P6-RF02 | Gerar proposta final interativa |
| P6-RF03 | Aplicar identidade visual da marca selecionada |
| P6-RF04 | Exibir logo da marca selecionada sem alteração visual |
| P6-RF05 | Exibir logo do cliente sem alteração visual |
| P6-RF06 | Exibir dados do cliente |
| P6-RF07 | Exibir serviço/plano selecionado |
| P6-RF08 | Exibir escopo, serviços oferecidos ou serviços personalizados |
| P6-RF09 | Exibir condições específicas quando existirem |
| P6-RF10 | Exibir valor da proposta em `R$` |
| P6-RF11 | Exibir observações somente se preenchidas |
| P6-RF12 | Exibir prazo de entrega se preenchido |
| P6-RF13 | Exibir botão para download em PDF |
| P6-RF14 | Gerar PDF diferente da página interativa |
| P6-RF15 | Gerar PDF com design premium, elegante e executivo |
| P6-RF16 | Gerar PDF sem animações, botões ou elementos interativos |
| P6-RF17 | Gerar PDF paginado e otimizado para envio ao cliente |
| P6-RF18 | Baixar o PDF diretamente pelo navegador |
| P6-RF19 | Preservar todos os dados do `appState` durante a geração |
| P6-RF20 | Permitir voltar para Página 5 antes ou depois da geração |

---

## Critérios de aceite

A Página 6 será considerada aprovada se:

- Gerar uma proposta final interativa, visual e animada.
- Manter a identidade visual da marca selecionada.
- Exibir corretamente marca, cliente, serviço/plano, escopo e dados comerciais.
- Disponibilizar botão de download em PDF.
- Gerar um PDF diferente da página interativa.
- O PDF possuir layout paginado, limpo, premium e executivo.
- O PDF for adequado para envio ao cliente.
- O PDF preservar logos e imagens sem alteração visual.
- O PDF não conter botões, animações ou elementos de interface.
- O sistema funcionar sem backend e ser compatível com Netlify.
