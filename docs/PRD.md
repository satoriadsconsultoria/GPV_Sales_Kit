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
- Hover colorido de pré-seleção na Página 1, aplicado somente no container/card.
- Submenu no logo Grand Prix de Vendas para seleção entre Grand Prix de Vendas e Champions Festival.
- Carregamento automático da identidade visual da empresa selecionada a partir da Página 2.
- Todas as páginas com animações, microinterações e feedback visual.
- Cadastro do cliente.
- Nome do cliente.
- Telefone do cliente com DDD.
- E-mail do cliente.
- Upload e preview do logotipo do cliente.
- Seleção dinâmica de serviços e planos por empresa.
- Banco local de serviços em JSON.
- Campo para valor da proposta em formato `R$`.
- Campo livre para observações.
- Campo para prazo de entrega, obrigatório somente para VELOCE.
- Campo para validade da proposta.
- Campos do emissor da proposta: nome, função, telefone e e-mail.
- Tela de conferência com prévia da proposta.
- Opção de edição por bloco na conferência.
- Proposta final interativa e animada.
- Dois slides/páginas institucionais sobre Edney Ulisses na proposta final.
- Fotos finais validadas do Edney Ulisses para os slides institucionais.
- Slide institucional com marcas oficiais do Grupo GPV.
- Exportação em PDF executivo.
- PDF com layout diferente da página interativa.
- PDF em formato A4 landscape.
- PDF gerado por template dedicado, separado da tela interativa.
- Página final com validade, dados do emissor e logo da marca selecionada.
- Fallback visual para backgrounds ausentes.

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

1. Página 1 — Portal institucional Grupo GPV com seleção da marca.
2. Página 2 — Cliente: cadastro de nome, telefone, e-mail e logo do cliente.
3. Página 3 — Serviços: seleção dos serviços ou planos conforme empresa selecionada.
4. Página 4 — Comercial: valor, observações, prazo, validade e dados do emissor.
5. Página 5 — Conferência: prévia da proposta e edição por bloco.
6. Página 6 — Proposta final interativa e exportação PDF.

---

## 5. Requisitos funcionais

| ID | Requisito | Prioridade |
|---|---|---|
| RF001 | Exibir página inicial institucional com identidade visual do Grupo GPV | Alta |
| RF002 | Permitir seleção da empresa por logos clicáveis | Alta |
| RF003 | Aplicar hover colorido de pré-seleção nas marcas da Página 1 | Alta |
| RF004 | Exibir submenu Grand Prix de Vendas / Champions Festival ao interagir com o logo Grand Prix | Alta |
| RF005 | Carregar identidade visual da empresa selecionada a partir da Página 2 | Alta |
| RF006 | Aplicar animações e interações em todas as páginas | Alta |
| RF007 | Permitir cadastro do nome do cliente | Alta |
| RF008 | Permitir cadastro do telefone do cliente com DDD | Alta |
| RF009 | Permitir cadastro do e-mail do cliente | Alta |
| RF010 | Permitir upload e preview do logo do cliente | Alta |
| RF011 | Permitir seleção de serviços ou planos conforme empresa | Alta |
| RF012 | Permitir inserir valor da proposta em formato monetário `R$` | Alta |
| RF013 | Permitir inserir observações opcionais | Média |
| RF014 | Permitir inserir prazo de entrega | Média |
| RF015 | Tornar prazo de entrega obrigatório somente para VELOCE | Alta |
| RF016 | Permitir inserir validade da proposta | Alta |
| RF017 | Tornar validade da proposta obrigatória | Alta |
| RF018 | Permitir inserir dados do emissor: nome, função, telefone e e-mail | Alta |
| RF019 | Tornar dados do emissor obrigatórios | Alta |
| RF020 | Exibir conferência completa da proposta | Alta |
| RF021 | Permitir edição por bloco na conferência | Alta |
| RF022 | Retornar para a tela correta ao clicar em editar | Alta |
| RF023 | Preservar dados preenchidos ao editar | Alta |
| RF024 | Renderizar proposta final interativa | Alta |
| RF025 | Aplicar animações suaves na proposta interativa | Média |
| RF026 | Incluir dois slides/páginas institucionais sobre Edney Ulisses | Alta |
| RF027 | Usar as fotos finais validadas do Edney Ulisses nos slides institucionais | Alta |
| RF028 | Adaptar slides de Edney às cores e elementos da marca selecionada | Alta |
| RF029 | Exibir somente marcas oficiais do Grupo GPV no slide institucional 01 de Edney | Alta |
| RF030 | Disponibilizar download em PDF | Alta |
| RF031 | Gerar PDF executivo diferente da página interativa | Alta |
| RF032 | Gerar PDF com layout premium, elegante e otimizado para envio ao cliente | Alta |
| RF033 | Gerar PDF por template dedicado, separado da tela interativa | Alta |
| RF034 | Usar PDF A4 landscape | Alta |
| RF035 | Usar config JSON para dados institucionais quando aplicável | Alta |
| RF036 | Preservar os logos originais fora do hover temporário da Página 1 | Alta |
| RF037 | Usar tipografia padrão do sistema | Alta |
| RF038 | Aplicar fallback visual quando backgrounds não existirem | Alta |

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
| RNF009 | Integridade visual de marca | Logos não podem ser alterados permanentemente |
| RNF010 | Privacidade local | Dados e arquivos do cliente devem permanecer no navegador na V1 |
| RNF011 | PDF | Documento final deve ser legível, paginado e adequado para envio digital |
| RNF012 | Animações | Devem ser leves, elegantes e não prejudicar leitura/performance |
| RNF013 | Robustez de assets | Sistema não pode quebrar por ausência de background |

---

## 7. Diretriz global de animações e interações

Todas as páginas devem ser animadas e interativas.

### Regras

- Página 1 usa identidade visual do Grupo GPV.
- Páginas 2 a 6 usam identidade visual da marca selecionada.
- Todas as páginas devem possuir feedback visual de hover, foco, clique, seleção, upload e erro.
- As animações devem ser suaves e premium.
- O PDF final não deve conter animações, botões ou elementos interativos.

### Animações permitidas

- Fade-in.
- Slide-up suave.
- Scale leve.
- Hover sutil.
- Glow discreto.
- Transição de borda, fundo, sombra e opacidade.

### Proibido

- Movimento excessivo.
- Efeitos piscando.
- Parallax pesado.
- Efeitos que prejudiquem leitura.
- Animação agressiva.

Documento complementar:

```txt
docs/DIRETRIZES_ANIMACOES_INTERACOES.md
```

---

## 8. Página 1 — Portal Grupo GPV

A Página 1 deve usar o Grupo GPV como marca dominante.

### Hover das marcas

Ao passar o mouse sobre uma marca abaixo do logo do Grupo GPV, o sistema deve mostrar pré-seleção visual antes do clique.

As cores de hover são as cores da linha superior da marca no logo institucional do Grupo GPV e devem vir de `data/navigation.json`.

| Marca | Cor de hover Página 1 |
|---|---|
| Grand Prix de Vendas | `#FA0115` |
| Champions Festival | `#95C223` |
| VELOCE | `#32D9D9` |
| Projeto Conquista | `#FFFFFF` |
| Edney Ulisses — Acelerador de Vendas | `#D8DBD3` |

Essas cores são usadas somente na Página 1.

Nas páginas seguintes, usar a paleta oficial de cada marca cadastrada em `data/companies.json`.

### Regra técnica do hover

O hover deve ser aplicado somente no card/container da marca.

Permitido:

- borda colorida;
- glow discreto;
- linha superior colorida;
- fundo auxiliar sutil;
- sombra leve;
- escala leve do card.

Proibido:

- filtro no logo;
- opacidade no logo;
- recoloração do logo;
- `mix-blend-mode` no logo;
- substituição por versão recolorida.

---

## 9. Página 2 — Cliente

A Página 2 deve abrir imediatamente após a seleção da empresa na Página 1.

A partir da Página 2, a identidade visual predominante deve ser a da empresa selecionada.

### Campos obrigatórios

| Campo | Tipo | Obrigatório |
|---|---|---|
| Nome do cliente | Texto | Sim |
| Telefone do cliente com DDD | Telefone | Sim |
| E-mail do cliente | E-mail | Sim |
| Logo do cliente | Upload de arquivo | Sim |

### Estado esperado

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

## 10. Página 3 — Serviços

A Página 3 deve carregar os serviços e planos a partir de:

```txt
data/services.json
```

A exibição deve ser filtrada pelo `companyId` da marca selecionada.

### Comportamento por empresa

| Empresa | Comportamento |
|---|---|
| Grand Prix de Vendas | Uma opção: Grand Prix de Vendas; ao selecionar, exibe Serviços Oferecidos e Condições para Realização do Evento |
| VELOCE | Planos Start, Bronze, Prata, Ouro e Diamond; seleção única entre planos |
| Champions Festival | Uma opção: Champions Festival; ao selecionar, exibe Serviços Oferecidos |
| Projeto Conquista | Uma opção; ao selecionar, exibe campo livre de serviços personalizados |
| Edney Ulisses — Acelerador de Vendas | Uma opção; ao selecionar, exibe campo livre de serviços personalizados |

---

## 11. Página 4 — Comercial

A Página 4 deve abrir após a validação da Página 3.

A identidade visual deve continuar sendo a da empresa selecionada.

### Campos

| Campo | Tipo | Obrigatório |
|---|---|---|
| Valor da proposta | Moeda `R$` | Sim |
| Observações | Texto longo | Não |
| Prazo de entrega | Texto ou data | Obrigatório somente para VELOCE |
| Validade da proposta | Texto ou data | Sim |
| Nome do emissor | Texto | Sim |
| Função do emissor | Texto | Sim |
| Telefone do emissor | Telefone | Sim |
| E-mail do emissor | E-mail | Sim |

### Estado esperado

```js
appState.commercial = {
  proposalValue: {
    raw: 0,
    formatted: ""
  },
  notes: "",
  deliveryDeadline: "",
  proposalValidity: "",
  issuer: {
    name: "",
    role: "",
    phone: "",
    email: ""
  }
}
```

---

## 12. Página 5 — Conferência

A Página 5 deve gerar uma prévia da proposta para validação interna antes da geração final.

### Blocos exibidos

| Bloco | Origem | Ação de edição |
|---|---|---|
| Marca selecionada | Página 1 | Editar volta para Página 1 |
| Dados do cliente | Página 2 | Editar volta para Página 2 |
| Serviços/planos selecionados | Página 3 | Editar volta para Página 3 |
| Dados comerciais, validade e emissor | Página 4 | Editar volta para Página 4 |

### Dados obrigatórios exibidos no bloco comercial

- Valor da proposta.
- Observações, se preenchidas.
- Prazo de entrega, se preenchido.
- Prazo de entrega obrigatório para VELOCE.
- Validade da proposta.
- Nome do emissor.
- Função do emissor.
- Telefone do emissor.
- E-mail do emissor.

### Regras principais

- Cada bloco deve exibir opção de edição.
- Ao clicar em editar, voltar para a tela correspondente.
- Ao voltar para edição, os campos devem abrir preenchidos com os dados atuais.
- Todos os dados preenchidos devem ser preservados no `appState`.
- A geração final ocorre somente na Página 6.

---

## 13. Página 6 — Proposta Final e Exportação PDF

A Página 6 deve abrir após a confirmação da Página 5.

Ela possui duas saídas distintas:

1. Proposta final interativa, visual e animada dentro do sistema.
2. PDF executivo, estático, paginado, A4 landscape e otimizado para envio ao cliente.

### Estrutura obrigatória da proposta final

| Ordem | Página/slide | Conteúdo |
|---|---|---|
| 1 | Capa | Logo da marca selecionada, logo do cliente e título da proposta |
| 2 | Edney Ulisses — Institucional 01 | Apresentação de Edney Ulisses como fundador/especialista e marcas do Grupo GPV |
| 3 | Edney Ulisses — Institucional 02 | Formação, experiência e autoridade comercial |
| 4 | Proposta comercial | Serviço/plano selecionado, escopo, entregáveis e condições |
| 5 | Investimento e condições | Valor, observações, prazo de entrega e validade da proposta |
| 6 | Encerramento / emissor | Validade, dados do emissor e logo da marca selecionada |

### Regra dos slides Edney

Os dois prints anexados pelo usuário são referência visual estrutural.

As cores e elementos dos slides de Edney devem ser adaptados à marca selecionada na Página 1.

### Fotos oficiais validadas do Edney

Usar as fotos finais validadas nos caminhos:

```txt
assets/images/edney/edney-institucional-01.png
assets/images/edney/edney-institucional-02.png
```

### Regra obrigatória do slide 2

O slide 2 deve exibir exclusivamente as marcas oficiais do GPV Sales Kit:

- Grand Prix de Vendas.
- Champions Festival.
- VELOCE.
- Projeto Conquista.
- Edney Ulisses — Acelerador de Vendas.

É proibido manter marcas externas, antigas ou presentes somente no print de referência.

### PDF executivo

O PDF deve ser diferente da página interativa.

Requisitos:

- Layout estático, paginado e limpo.
- Design premium, elegante e executivo.
- Otimização para leitura e envio ao cliente.
- Sem botões, animações ou elementos interativos.
- Capa institucional.
- Dois slides/páginas sobre Edney Ulisses.
- Página de proposta/escopo.
- Página de investimento e condições.
- Página final com validade, emissor e logo da marca.
- Nome de arquivo amigável no padrão `proposta-[marca]-[cliente].pdf`.
- Orientação A4 landscape.

### Template técnico do PDF

O PDF deve ser gerado por template dedicado.

```txt
O PDF não deve ser gerado diretamente da tela interativa animada.
```

O sistema deve montar um template PDF separado, oculto ou dedicado, usando os mesmos dados do `appState`.

---

## 14. Regra de navegação agrupada

A navegação da Página 1 deve ser carregada a partir de:

```txt
data/navigation.json
```

O logo do Grand Prix de Vendas deve funcionar como agrupador para duas soluções:

| Opção | `companyId` | Tipo |
|---|---|---|
| Grand Prix de Vendas | `grand-prix` | Evento físico |
| Champions Festival | `champions` | Evento digital |

Cada item direto e cada opção de dropdown deve conter `hoverColor` para o hover de pré-seleção da Página 1.

---

## 15. Regra global de uso dos logos

Todos os logos do sistema são assets imutáveis de marca, exceto pelo destaque temporário de hover no container da Página 1.

### Permitido

- Usar o logo original exatamente como fornecido.
- Redimensionar proporcionalmente.
- Usar `object-fit: contain`.
- Posicionar em containers, cards, cabeçalhos e capas.
- Aplicar cores do tema somente ao fundo, bordas, textos, botões e elementos visuais externos ao logo.
- Aplicar destaque temporário de hover no container/card da Página 1.

### Proibido

- Recolorir permanentemente logos.
- Aplicar filtros diretamente no logo.
- Alterar opacidade do logo.
- Converter logos para monocromático.
- Substituir cores internas pelo tema da empresa nas páginas 2 a 6.
- Distorcer proporção.
- Cortar área útil do logo.

Essa regra vale para todas as marcas e para o logo do cliente.

---

## 16. Backgrounds e fallback visual

Os backgrounds cadastrados em `data/companies.json` são opcionais.

Se um arquivo de background não existir, o sistema deve usar fallback visual baseado no tema da marca selecionada:

- cor sólida;
- gradiente premium;
- elementos gráficos CSS;
- textura leve gerada por CSS.

O sistema não pode quebrar se um background não estiver disponível.

---

## 17. Decisões técnicas oficiais

| Tema | Decisão |
|---|---|
| Tipo | Aplicação front-end estática |
| Linguagens | HTML, CSS e JavaScript |
| Backend | Não haverá na V1 |
| Dados | JSON local |
| Exportação | PDF |
| Formato PDF | A4 landscape |
| Template PDF | Dedicado, separado da interface interativa |
| Hospedagem | Netlify |
| Repositório | GPV_Sales_Kit |
| Desenvolvimento | VS Code + Claude Code |
| Página 1 | Portal institucional do Grupo GPV |
| Página 2 | Cadastro do cliente |
| Página 3 | Seleção de serviços e planos |
| Página 4 | Dados comerciais, validade e emissor |
| Página 5 | Conferência e prévia da proposta |
| Página 6 | Proposta final interativa e PDF executivo |
| Navegação da Página 1 | `data/navigation.json` |
| Seleção da empresa | Logos das marcas clicáveis |
| Grand Prix de Vendas | Logo agrupador com submenu |
| Champions Festival | Opção dentro do agrupamento Grand Prix |
| Identidade visual da Página 1 | Grupo GPV |
| Hover Página 1 | Cores da linha superior das marcas no Grupo GPV, via `hoverColor` |
| Identidade visual da Página 2 em diante | Empresa selecionada |
| Tipografia | Padrão do sistema |
| Tratamento dos logos | Preservar cores originais; exceção temporária apenas no container da Página 1 |
| Upload do logo do cliente | Local no navegador, sem backend |
| Serviços | Desacoplados da interface via `data/services.json` |
| Comercial | Valor, observações, prazo, validade e emissor |
| Prazo VELOCE | Obrigatório somente para VELOCE |
| Conferência | Prévia com edição por bloco |
| Fotos Edney | Validadas em `assets/images/edney/` |
| Backgrounds | Opcionais, com fallback por tema |

---

## 18. Critérios gerais de aceite

- O sistema roda localmente sem backend.
- O sistema pode ser hospedado no Netlify.
- Todas as páginas possuem animações e microinterações.
- A Página 1 apresenta o Grupo GPV como marca dominante.
- A Página 1 usa hover colorido de pré-seleção por marca.
- O hover da Página 1 é aplicado no container/card, não no logo.
- O logo Grand Prix abre submenu com Grand Prix de Vendas e Champions Festival.
- `data/navigation.json` possui `hoverColor` para itens diretos e opções do dropdown.
- A Página 2 abre com a identidade visual da empresa selecionada.
- A Página 2 coleta nome, telefone com DDD, e-mail e logo do cliente.
- A Página 3 carrega serviços conforme empresa selecionada.
- A Página 4 coleta valor, observações, prazo, validade e dados do emissor.
- O prazo de entrega é obrigatório somente para VELOCE.
- A validade da proposta é obrigatória para todas as marcas.
- Os dados do emissor são obrigatórios.
- A Página 5 gera prévia consolidada da proposta.
- A Página 5 exibe validade e dados do emissor.
- A Página 5 permite editar marca, cliente, serviços e comercial.
- A edição por bloco retorna para a tela correta mantendo os dados preenchidos.
- A Página 6 gera proposta final interativa, visual e animada.
- A Página 6 inclui capa, dois slides de Edney, proposta, investimento e encerramento.
- A Página 6 usa as fotos finais validadas do Edney.
- O slide 2 de Edney exibe somente marcas oficiais do GPV Sales Kit.
- O sistema não usa marcas externas presentes no print de referência.
- A Página 6 disponibiliza download em PDF.
- O PDF é diferente da proposta interativa.
- O PDF é gerado por template dedicado.
- O PDF possui design premium, elegante, executivo e A4 landscape.
- O PDF é adequado para envio ao cliente.
- O PDF não possui botões, animações ou elementos interativos.
- A identidade visual muda conforme a empresa selecionada a partir da Página 2.
- Os serviços podem ser editados via JSON.
- O sistema não quebra se backgrounds não estiverem disponíveis.
