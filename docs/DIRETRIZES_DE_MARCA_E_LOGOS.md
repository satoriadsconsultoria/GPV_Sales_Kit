# Diretrizes de Marca e Logos — GPV Sales Kit

## Regra central

Os logos do sistema são **assets imutáveis de marca**.

As cores cadastradas para Grupo GPV, Grand Prix de Vendas, Champions Festival, VELOCE, Projeto Conquista, Edney Ulisses e clientes devem ser usadas para compor a interface e a proposta, mas nunca para alterar permanentemente o logo.

---

## Aplicação correta das cores

As cores institucionais devem ser aplicadas em:

- Fundos.
- Cards.
- Botões.
- Bordas.
- Ícones externos.
- Divisórias.
- Linhas decorativas.
- Títulos.
- Textos.
- Elementos gráficos.
- Destaques visuais.
- Containers de logos.

---

## Aplicação proibida das cores

As cores institucionais não podem ser aplicadas diretamente em:

- Arquivo de logo.
- Cores internas do logo.
- SVG interno do logo.
- Imagem enviada pelo cliente.
- Marca das empresas.

---

## Exceção controlada — Hover da Página 1

Na Página 1, o sistema deve exibir pré-seleção visual ao passar o mouse sobre uma marca.

Essa exceção é limitada ao **container/card do logo**.

### Permitido no hover da Página 1

- Borda colorida no card.
- Glow discreto no card.
- Linha superior colorida.
- Fundo auxiliar sutil no container.
- Sombra leve.
- Escala leve do card.

### Proibido no hover da Página 1

- Recolorir o arquivo do logo.
- Aplicar `filter` diretamente no logo.
- Alterar opacidade do logo.
- Usar `mix-blend-mode` no logo.
- Alterar cores internas do SVG/logo.
- Substituir o logo por uma versão recolorida.

---

## Tratamento técnico obrigatório

Na construção em HTML/CSS/JavaScript, os logos devem seguir:

```css
.logo {
  object-fit: contain;
  filter: none;
  opacity: 1;
  mix-blend-mode: normal;
}
```

O hover colorido deve ser aplicado no container:

```css
.brand-card:hover {
  border-color: var(--hover-color);
  box-shadow: 0 0 24px color-mix(in srgb, var(--hover-color) 35%, transparent);
}

.brand-card:hover .logo {
  filter: none;
  opacity: 1;
  mix-blend-mode: normal;
}
```

Tipografia padrão do sistema:

```css
font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial, sans-serif;
```

Também deve ser preservado:

- Proporção original.
- Cores originais.
- Área útil do logo.
- Resolução original sempre que possível.

---

## Proibido tecnicamente

```css
.logo {
  filter: grayscale(1);
  filter: brightness();
  filter: invert();
  opacity: 0.7;
  mix-blend-mode: screen;
  fill: var(--primary-color);
  stroke: var(--primary-color);
}
```

---

## Regra por marca

| Marca | Regra |
|---|---|
| Grupo GPV | Usar logo branco original sobre fundo escuro da paleta oficial |
| Grand Prix de Vendas | Usar logo original sem alteração de cor |
| Champions Festival | Usar logo original sem alteração de cor |
| VELOCE | Usar logo original sem alteração de cor |
| Projeto Conquista | Usar logo original sem alteração de cor |
| Edney Ulisses | Usar logo original sem alteração de cor |
| Cliente | Usar logo enviado sem alteração de cor |

---

## Arquivos oficiais do Grupo GPV

| Uso | Arquivo |
|---|---|
| Logo branco padrão | `assets/logos/grupo-gpv-negativo.png` |
| Referência/acervo | `assets/logos/grupo-gpv-positivo.png` |
| Apoio visual / régua | `assets/logos/grupo-gpv.svg` |

Regra aprovada:

```txt
Usar sempre o logo branco do Grupo GPV com fundo escuro dentro da paleta de cores.
```

---

## Critério de aceite

A proposta, interface ou PDF será considerada incorreta se qualquer logo for:

- Recolorido permanentemente.
- Distorcido.
- Monocromatizado.
- Filtrado.
- Cortado indevidamente.
- Renderizado com opacidade alterada.
- Substituído por versão visual não aprovada.

A única exceção visual permitida é o hover da Página 1, aplicado exclusivamente ao container/card da marca, nunca ao arquivo do logo.
