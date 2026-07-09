# Logos do projeto

## Regra obrigatória

Todos os logos do projeto devem ser tratados como **assets imutáveis de marca**.

As cores informadas nos arquivos de configuração devem ser usadas em:

- Fundos.
- Cards.
- Botões.
- Bordas.
- Textos.
- Linhas.
- Elementos gráficos.
- Detalhes de interface.

As cores informadas **não devem ser aplicadas sobre os logos**.

---

## Proibido

- Recolorir logos.
- Aplicar filtros CSS.
- Aplicar `mix-blend-mode`.
- Alterar opacidade.
- Converter para monocromático.
- Substituir cores internas do logo pelas cores do tema.
- Distorcer proporção.
- Cortar área útil do logo.

---

## Permitido

- Redimensionar proporcionalmente.
- Usar `object-fit: contain`.
- Aplicar margem externa.
- Posicionar em cards, cabeçalhos, capas e seções.
- Aplicar cor no container externo, nunca no logo.

---

## Grupo GPV

Arquivo oficial definido para uso na Página 1:

```txt
assets/logos/grupo-gpv.svg
```

Referência raster opcional, caso seja necessário substituir por PNG durante a construção:

```txt
assets/logos/grupo-gpv.png
```

## Identidade visual

| Elemento | Cor |
|---|---|
| Cor principal | `#252324` |
| Cor secundária | `#A5A09C` |
| Branco | `#FFFFFF` |
| Ciano de apoio | `#5BBFC8` |
| Vermelho de apoio | `#E31838` |
| Amarelo de apoio | `#F5C32C` |
| Azul de apoio | `#2F3D8E` |

## Observação técnica

Durante a construção, os logos devem ser inseridos como imagens preservadas, sem `filter`, `opacity`, `mix-blend-mode`, alteração de `fill`, alteração de `stroke` ou qualquer manipulação visual interna.
