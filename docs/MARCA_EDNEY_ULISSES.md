# Marca — Edney Ulisses — Acelerador de Vendas

## Identidade

| Item | Definição |
|---|---|
| Nome | Edney Ulisses — Acelerador de Vendas |
| Categoria | Acelerador de Vendas |
| Logo oficial | `assets/logos/edney-ulisses.png` |
| Tipografia | Padrão do sistema |

---

## Paleta oficial

| Cor | Uso recomendado |
|---|---|
| `#D8DBD3` | Cor principal clara, textos e áreas institucionais suaves |
| `#1B221D` | Cor secundária escura, cards e blocos de contraste |
| `#0F1712` | Fundo/base principal escuro |
| `#989C95` | Texto secundário, bordas e elementos neutros |
| `#585E58` | Apoio gráfico, divisórias e detalhes de interface |

---

## Regra de uso do logo

O logo do Edney Ulisses deve ser usado exatamente como fornecido.

### Proibido

- Recolorir.
- Aplicar filtros CSS.
- Alterar opacidade.
- Usar `mix-blend-mode`.
- Distorcer proporção.
- Cortar área útil.

### Permitido

- Redimensionar proporcionalmente.
- Usar `object-fit: contain`.
- Aplicar cor somente em containers, fundos, bordas, textos e elementos gráficos externos ao logo.

---

## Comportamento na Página 1

Na Página 1, Edney Ulisses aparece como marca direta.

Ao clicar no logo:

1. O sistema seleciona `companyId: edney`.
2. Salva a empresa em `appState.selectedCompany`.
3. Carrega os serviços vinculados ao Edney Ulisses.
4. Aplica a identidade visual do Edney Ulisses a partir da Página 2.
5. Avança automaticamente para a Página 2.

---

## Critérios de aceite

- `data/companies.json` usa `assets/logos/edney-ulisses.png` como logo oficial.
- `data/companies.json` registra a paleta oficial completa.
- `data/navigation.json` aponta para `assets/logos/edney-ulisses.png`.
- O logo não sofre alteração visual.
- A identidade visual do Edney Ulisses é aplicada somente depois da seleção da marca.
