# Diretrizes de Marca e Logos — GPV Sales Kit

## Regra central

Os logos do sistema são **assets imutáveis de marca**.

As cores cadastradas para Grupo GPV, Grand Prix de Vendas, Champions Festival, VELOCE, Projeto Conquista, Edney Ulisses e clientes devem ser usadas para compor a interface e a proposta, mas nunca para alterar o logo.

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

---

## Aplicação proibida das cores

As cores institucionais não podem ser aplicadas diretamente em:

- Arquivo de logo.
- Cores internas do logo.
- SVG interno do logo.
- Imagem enviada pelo cliente.
- Marca das empresas.

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
filter: grayscale(1);
filter: brightness();
filter: invert();
opacity: 0.7;
mix-blend-mode: screen;
fill: var(--primary-color);
stroke: var(--primary-color);
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

- Recolorido.
- Distorcido.
- Monocromatizado.
- Filtrado.
- Cortado indevidamente.
- Renderizado com opacidade alterada.
- Substituído por versão visual não aprovada.
