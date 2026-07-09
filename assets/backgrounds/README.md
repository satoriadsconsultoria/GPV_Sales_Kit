# Backgrounds das marcas

Esta pasta pode receber imagens de background específicas para cada marca.

## Arquivos previstos

```txt
assets/backgrounds/grand-prix-bg.jpg
assets/backgrounds/champions-bg.jpg
assets/backgrounds/veloce-bg.jpg
assets/backgrounds/conquista-bg.jpg
assets/backgrounds/edney-bg.jpg
```

## Regra técnica

Os backgrounds são opcionais.

Se uma imagem de background não existir, o sistema deve usar fallback visual baseado no tema da marca selecionada:

- cor sólida;
- gradiente premium;
- elementos gráficos CSS;
- textura leve gerada por CSS.

## Regra de implementação

O sistema não pode quebrar se um background não estiver disponível.

Cada marca possui em `data/companies.json`:

```json
"backgroundRequired": false,
"backgroundFallback": "theme-gradient"
```
