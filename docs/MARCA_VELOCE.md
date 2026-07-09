# Marca — VELOCE

## Identidade

| Item | Definição |
|---|---|
| Nome | VELOCE |
| Categoria | Marketing e Vendas Automotivo |
| Logo oficial | `assets/logos/veloce.png` |
| Cor principal | `#32D9D9` |
| Cor secundária/base | `#222828` |
| Tipografia | Padrão do sistema |

---

## Regra de uso do logo

O logo da VELOCE deve ser usado exatamente como fornecido.

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

## Aplicação das cores

| Cor | Uso recomendado |
|---|---|
| `#32D9D9` | Botões, destaques, bordas, indicadores, elementos de ação |
| `#222828` | Fundo institucional, cards escuros, áreas de contraste |
| `#FFFFFF` | Texto principal sobre fundo escuro |

---

## Comportamento na Página 1

Na Página 1, a VELOCE aparece como marca direta.

Ao clicar no logo da VELOCE:

1. O sistema seleciona `companyId: veloce`.
2. Salva a empresa em `appState.selectedCompany`.
3. Carrega os serviços vinculados à VELOCE.
4. Aplica a identidade visual da VELOCE a partir da Página 2.
5. Avança automaticamente para a Página 2.

---

## Critérios de aceite

- O arquivo `assets/logos/veloce.png` existe no repositório.
- `data/companies.json` usa `#32D9D9` como cor principal.
- `data/companies.json` usa `#222828` como fundo/base.
- `data/navigation.json` aponta para `assets/logos/veloce.png`.
- O logo não sofre alteração visual.
