# Marca — Projeto Conquista

## Identidade

| Item | Definição |
|---|---|
| Nome | Projeto Conquista |
| Categoria | Evento Comercial Imobiliário |
| Logo oficial | `assets/logos/projeto-conquista.png` |
| Tipografia | Padrão do sistema |

---

## Paleta oficial

| Cor | Uso recomendado |
|---|---|
| Preto | Fundo, contraste, botões e elementos institucionais |
| Branco | Texto, áreas claras e contraste visual |

---

## Regra de uso do logo

O logo do Projeto Conquista deve ser usado exatamente como fornecido.

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

Na Página 1, Projeto Conquista aparece como marca direta.

Ao clicar no logo:

1. O sistema seleciona `companyId: conquista`.
2. Salva a empresa em `appState.selectedCompany`.
3. Carrega os serviços vinculados ao Projeto Conquista.
4. Aplica a identidade visual do Projeto Conquista a partir da Página 2.
5. Avança automaticamente para a Página 2.

---

## Critérios de aceite

- `data/companies.json` usa `assets/logos/projeto-conquista.png` como logo oficial.
- `data/companies.json` registra a paleta preto e branco.
- `data/navigation.json` aponta para `assets/logos/projeto-conquista.png`.
- O logo não sofre alteração visual.
- A identidade visual do Projeto Conquista é aplicada somente depois da seleção da marca.
