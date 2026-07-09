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

## Regra visual dos modelos anexados

Os dois prints anexados pelo usuário devem ser usados como **referência visual estrutural**, não como layout fixo imutável.

A proposta deve adaptar:

- Cores.
- Elementos gráficos.
- Destaques.
- Ícones.
- Linhas.
- Blocos visuais.

Sempre conforme a empresa selecionada na Página 1.

Os modelos do Edney servem como referência de hierarquia, composição e narrativa institucional.

---

## Assets validados do Edney

As fotos finais do Edney foram recebidas e validadas no repositório.

Caminhos oficiais:

```txt
assets/images/edney/edney-institucional-01.png
assets/images/edney/edney-institucional-02.png
```

Regras:

- Usar essas fotos nos slides institucionais do Edney.
- Não usar os prints anexados como imagem final chapada.
- Não usar placeholder no fluxo final, salvo se algum asset for removido futuramente.
- Preservar qualidade, proporção e enquadramento adequado das fotos.

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
- Navegação animada entre slides/seções.

### Animações proibidas

- Animações agressivas.
- Efeitos que prejudiquem leitura.
- Movimento excessivo.
- Parallax pesado.
- Elementos piscando.
- Qualquer animação que dificulte a exportação do PDF.

---

## Estrutura obrigatória da proposta final

A proposta final deve seguir a seguinte estrutura mínima:

| Ordem | Página/slide | Conteúdo |
|---|---|---|
| 1 | Capa | Logo da marca selecionada, logo do cliente e título da proposta |
| 2 | Edney Ulisses — Institucional 01 | Apresentação de Edney Ulisses como fundador/especialista e marcas do Grupo GPV |
| 3 | Edney Ulisses — Institucional 02 | Formação, experiência e autoridade comercial |
| 4 | Proposta comercial | Serviço/plano selecionado, escopo, entregáveis e condições |
| 5 | Investimento e condições | Valor, observações, prazo de entrega e validade da proposta |
| 6 | Encerramento / emissor | Validade, dados do emissor e logo da marca selecionada |

A estrutura pode ganhar páginas adicionais se o escopo for longo, mas não pode remover os blocos obrigatórios.

---

## Página/slide 1 — Capa

Deve conter:

- Logo da marca selecionada.
- Logo do cliente.
- Título: `Proposta Comercial`.
- Nome do cliente.
- Marca responsável pela proposta.
- Data de geração, se implementado.

Regra visual:

- Design limpo, premium e executivo.
- A identidade visual deve ser da marca selecionada.
- O logo da marca e o logo do cliente devem ser preservados sem alteração visual.

---

## Página/slide 2 — Edney Ulisses — Institucional 01

Base visual: primeiro print anexado pelo usuário.

Foto oficial:

```txt
assets/images/edney/edney-institucional-01.png
```

Objetivo:

Apresentar Edney Ulisses como fundador/especialista do ecossistema comercial do Grupo GPV.

Conteúdo obrigatório:

- Nome: `Edney Ulisses`.
- Chamada: `Fundador`.
- Descrição: `Especialista em Marketing e Vendas no setor Automotivo`.
- Elementos visuais inspirados no modelo anexado.
- Marcas oficiais do ecossistema GPV.

### Regra obrigatória das marcas no slide 2

O slide 2 deve substituir qualquer marca presente no print de referência pelas marcas oficiais cadastradas no GPV Sales Kit.

Devem aparecer exclusivamente:

- Grand Prix de Vendas.
- Champions Festival.
- VELOCE.
- Projeto Conquista.
- Edney Ulisses — Acelerador de Vendas.

É proibido manter marcas externas, antigas ou que apareçam somente no print de referência.

Os logos devem vir dos arquivos oficiais cadastrados em `data/companies.json` e devem ser exibidos sem alteração permanente de cor, proporção ou forma.

Regra visual:

- Usar o modelo apenas como referência de composição.
- Cores e elementos devem seguir a marca selecionada.
- Evitar replicar cores fixas do modelo quando a proposta for de outra marca.
- As marcas do grupo devem aparecer como vitrine institucional do ecossistema.

---

## Página/slide 3 — Edney Ulisses — Institucional 02

Base visual: segundo print anexado pelo usuário.

Foto oficial:

```txt
assets/images/edney/edney-institucional-02.png
```

Objetivo:

Reforçar autoridade, experiência e diferenciais de Edney Ulisses.

Conteúdo sugerido:

- Formação em marketing.
- Especialista em Marketing e Vendas no setor automotivo.
- Mais de 20 anos de experiência no mercado.
- Criador do Departamento de Vendas Web e InHouse de Marketing e Eventos da Automob.
- Gerenciamento de 17 marcas e mais de 70 concessionárias.
- Participação em startup pioneira no mercado de compra e venda de veículos no Brasil.
- Crescimento de 25% nas vendas ao mês.
- Conversão de 70% de leads em oportunidades concretas.
- Fundador de projeto que transforma eventos em experiências de alto impacto.

Regra visual:

- Usar linhas, bullets e cards inspirados no modelo anexado.
- Cores e elementos gráficos devem ser adaptados à marca selecionada.
- A narrativa deve ser institucional e executiva.

---

## Página/slide 4 — Proposta comercial / escopo

Conteúdo conforme a empresa selecionada:

### Grand Prix de Vendas

- Serviço: Grand Prix de Vendas.
- Serviços Oferecidos.
- Condições para Realização do Evento.

### VELOCE

- Plano selecionado.
- Serviços Oferecidos.
- Se Plano Diamond, exibir serviços personalizados digitados.
- Prazo de entrega obrigatório.

### Champions Festival

- Serviço: Champions Festival.
- Serviços Oferecidos.

### Projeto Conquista

- Serviço: Projeto Conquista.
- Serviços personalizados digitados.

### Edney Ulisses — Acelerador de Vendas

- Serviço: Edney Ulisses - Acelerador de Vendas.
- Serviços personalizados digitados.

---

## Página/slide 5 — Investimento e condições

Deve conter:

- Valor da proposta em `R$`.
- Observações, se preenchidas.
- Prazo de entrega, se preenchido.
- Validade da proposta.

Para VELOCE, o prazo de entrega deve aparecer obrigatoriamente.

---

## Página/slide 6 — Encerramento / emissor

Deve conter:

- Validade da proposta.
- Nome do emissor.
- Função do emissor.
- Telefone do emissor.
- E-mail do emissor.
- Logo da marca selecionada novamente.

Os dados vêm da Página 4:

```js
appState.commercial.issuer
appState.commercial.proposalValidity
```

---

## Saída 2 — PDF executivo

O PDF deve ser diferente da página interativa.

Ele deve ser organizado especificamente para envio ao cliente, priorizando clareza, leitura, elegância e apresentação executiva.

### Características obrigatórias

- Design premium, elegante e executivo.
- Layout limpo e paginado.
- Orientação `landscape`, formato A4.
- Melhor aproveitamento de espaço para leitura em PDF.
- Hierarquia clara de títulos, subtítulos, cards e blocos de conteúdo.
- Capa institucional da proposta.
- Páginas institucionais de Edney Ulisses conforme modelo adaptado.
- Informações comerciais em destaque.
- Logos preservados sem recoloração, filtro ou distorção.
- Conteúdo sem animações.
- Conteúdo sem botões ou elementos interativos.
- Formatação correta para impressão ou envio digital.

---

## Template técnico do PDF

O PDF deve usar um template dedicado.

Regra obrigatória:

```txt
O PDF não deve ser gerado diretamente da tela interativa animada.
```

O sistema deve montar um template PDF separado, oculto ou dedicado, usando os mesmos dados do `appState`.

### Motivo técnico

- Evitar cortes ruins.
- Evitar captura de animações.
- Evitar botões e componentes de interface no PDF.
- Melhorar legibilidade.
- Permitir layout paginado premium.

---

## Diferença obrigatória entre interativo e PDF

| Item | Proposta interativa | PDF executivo |
|---|---|---|
| Finalidade | Visualização dentro do sistema | Envio ao cliente |
| Formato | Tela navegável | Documento paginado |
| Orientação | Responsiva | A4 landscape |
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
- O PDF deve ter estrutura própria, diferente do HTML interativo.
- O PDF deve usar orientação landscape.

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
| P6-RF13 | Exibir validade da proposta |
| P6-RF14 | Exibir dados do emissor na última página |
| P6-RF15 | Exibir botão para download em PDF |
| P6-RF16 | Gerar PDF diferente da página interativa |
| P6-RF17 | Gerar PDF com design premium, elegante e executivo |
| P6-RF18 | Gerar PDF sem animações, botões ou elementos interativos |
| P6-RF19 | Gerar PDF paginado e otimizado para envio ao cliente |
| P6-RF20 | Baixar o PDF diretamente pelo navegador |
| P6-RF21 | Preservar todos os dados do `appState` durante a geração |
| P6-RF22 | Permitir voltar para Página 5 antes ou depois da geração |
| P6-RF23 | Incluir duas páginas/slides institucionais sobre Edney Ulisses |
| P6-RF24 | Adaptar os slides de Edney às cores e elementos da marca selecionada |
| P6-RF25 | No slide 2, exibir somente as marcas oficiais do Grupo GPV cadastradas no sistema |
| P6-RF26 | Usar template PDF dedicado, separado da tela interativa |
| P6-RF27 | Usar PDF em A4 landscape |
| P6-RF28 | Usar as fotos finais validadas do Edney nos slides 2 e 3 |

---

## Critérios de aceite

A Página 6 será considerada aprovada se:

- Gerar uma proposta final interativa, visual e animada.
- Manter a identidade visual da marca selecionada.
- Exibir corretamente marca, cliente, serviço/plano, escopo e dados comerciais.
- Incluir capa com logo da marca selecionada e logo do cliente.
- Incluir duas páginas/slides institucionais sobre Edney Ulisses.
- Usar as fotos finais validadas do Edney nos slides 2 e 3.
- Adaptar os slides de Edney conforme a marca selecionada.
- Exibir no slide 2 somente as marcas oficiais do Grupo GPV.
- Não exibir marcas externas presentes no print de referência.
- Incluir página de proposta/escopo.
- Incluir investimento, condições e validade da proposta.
- Incluir página final com validade, dados do emissor e logo da marca.
- Disponibilizar botão de download em PDF.
- Gerar um PDF diferente da proposta interativa.
- Gerar o PDF a partir de template dedicado.
- O PDF possuir layout paginado, landscape, limpo, premium e executivo.
- O PDF for adequado para envio ao cliente.
- O PDF preservar logos e imagens sem alteração visual.
- O PDF não conter botões, animações ou elementos de interface.
- O sistema funcionar sem backend e ser compatível com Netlify.
