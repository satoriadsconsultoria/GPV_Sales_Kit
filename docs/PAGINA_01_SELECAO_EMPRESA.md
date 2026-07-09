# Página 1 — Seleção da Empresa

## Objetivo

Permitir que o usuário escolha qual empresa do Grupo GPV será utilizada como base da proposta comercial.

A partir da escolha, o sistema deverá carregar automaticamente:

- Logo.
- Cores.
- Serviços.
- Textos institucionais.
- Template da proposta.
- Identidade visual.

---

## Empresas exibidas

1. Grand Prix de Vendas
2. Champions Festival
3. VELOCE
4. Projeto Conquista
5. Edney Ulisses — Acelerador de Vendas

---

## Estrutura da tela

### Cabeçalho

- Nome do sistema: GPV Sales Kit.
- Subtítulo: Gerador de Propostas Comerciais Premium.
- Indicador: Etapa 1 de 6.

### Título principal

Selecione a empresa responsável pela proposta.

### Subtítulo

A identidade visual, os serviços e a estrutura da proposta serão carregados automaticamente conforme a empresa selecionada.

---

## Estrutura dos cards

Cada card deve conter:

- Logo da empresa.
- Nome oficial.
- Descrição curta.
- Tag de categoria.
- Estado visual normal, hover e selecionado.

---

## Conteúdo dos cards

### Grand Prix de Vendas

**Descrição:** Sistema de aceleração comercial para concessionárias, unindo evento, marketing, operação, dados e conversão.

**Tag:** Evento Comercial Automotivo

### Champions Festival

**Descrição:** Modelo de aceleração comercial digital voltado para geração de oportunidades, campanhas e performance de vendas.

**Tag:** Campanha Digital de Vendas

### VELOCE

**Descrição:** Agência especialista em marketing, performance e aceleração comercial para empresas do setor automotivo.

**Tag:** Marketing Automotivo

### Projeto Conquista

**Descrição:** Evento de vendas estruturado para o mercado imobiliário, com foco em captação, atendimento e conversão comercial.

**Tag:** Evento Comercial Imobiliário

### Edney Ulisses — Acelerador de Vendas

**Descrição:** Treinamento, consultoria e desenvolvimento comercial para equipes de vendas de alta performance.

**Tag:** Treinamento Comercial

---

## Comportamento funcional

### Estado inicial

- Nenhuma empresa selecionada.
- Botão Continuar desabilitado.
- Cards em estado neutro.

### Hover

- Elevação sutil.
- Borda na cor principal da empresa.
- Glow discreto.
- Cursor pointer.
- Transição entre 200ms e 300ms.

### Seleção

Ao selecionar uma empresa, o sistema deve:

1. Salvar a empresa no estado global.
2. Aplicar estado visual selecionado no card.
3. Remover seleção anterior.
4. Ativar o botão Continuar.
5. Pré-carregar os serviços da empresa.
6. Atualizar variáveis CSS da identidade visual.

---

## Regras funcionais

| ID | Regra |
|---|---|
| P1-RF01 | Exibir todas as empresas cadastradas no companies.json |
| P1-RF02 | Permitir seleção de apenas uma empresa |
| P1-RF03 | Destacar visualmente a empresa selecionada |
| P1-RF04 | Bloquear avanço sem empresa selecionada |
| P1-RF05 | Salvar empresa selecionada no appState.selectedCompany |
| P1-RF06 | Carregar serviços vinculados ao companyId |
| P1-RF07 | Aplicar identidade visual via variáveis CSS |
| P1-RF08 | Avançar para a Página 2 ao clicar em Continuar |

---

## Regras visuais

| Elemento | Regra |
|---|---|
| Fundo | Escuro, executivo, com gradiente sutil |
| Cards | Glassmorphism discreto, borda fina e sombra leve |
| Logos | Tamanho padronizado, sem distorção |
| Tipografia | Moderna, forte e legível |
| Espaçamento | Amplo, premium e limpo |
| Animações | Suaves, sem exagero |
| Responsividade | Cards empilhados no mobile |

---

## Critérios de aceite

- Todas as empresas aparecem corretamente.
- Cards possuem logo, nome, descrição e tag.
- A seleção visual funciona.
- Apenas uma empresa pode ser selecionada.
- O botão Continuar inicia desabilitado.
- O botão Continuar ativa após seleção.
- A empresa selecionada fica salva no estado global.
- A identidade visual é aplicada dinamicamente.
- O sistema avança para a Página 2.
- O layout funciona em desktop e mobile.
