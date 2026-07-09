# Marca — Champions Festival

## Identidade

| Item | Definição |
|---|---|
| Nome | Champions Festival |
| Categoria | Evento Digital Automotivo |
| Marca-mãe operacional | Grand Prix de Vendas |
| Logo oficial | `assets/logos/champions-festival.png` |
| Tipografia | Padrão do sistema |

---

## Paleta oficial

| Cor | Uso recomendado |
|---|---|
| `#95C223` | Cor principal, botões, destaques e elementos de ação |
| `#F6C32E` | Destaques secundários, faixas e elementos de energia visual |
| `#D7EAF1` | Apoio claro, áreas suaves e contraste secundário |
| `#82358C` | Fundo/base, contraste e elementos de profundidade |
| `#D61252` | Pontos de atenção, chamadas e microdestaques |

---

## Regra de uso do logo

O logo do Champions Festival deve ser usado exatamente como fornecido.

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

## Relação com Grand Prix de Vendas

O Champions Festival pertence ao agrupamento operacional do Grand Prix de Vendas.

Na Página 1, o usuário não verá um logo separado do Champions Festival na área principal. O acesso ao Champions Festival ocorre pelo submenu aberto a partir do logo do Grand Prix de Vendas.

### Comportamento obrigatório

1. Usuário passa o mouse ou toca no logo Grand Prix de Vendas.
2. O sistema abre as opções:
   - Grand Prix de Vendas.
   - Champions Festival.
3. Usuário clica em Champions Festival.
4. Sistema seleciona `companyId: champions`.
5. Sistema aplica a identidade visual do Champions Festival a partir da Página 2.

---

## Critérios de aceite

- `data/companies.json` usa `assets/logos/champions-festival.png` como logo oficial do Champions Festival.
- `data/companies.json` registra a paleta oficial completa.
- `data/navigation.json` mantém Champions Festival dentro do agrupamento Grand Prix.
- O logo não sofre alteração visual.
- A identidade visual do Champions Festival é aplicada somente depois da seleção do submenu.
