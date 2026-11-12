# Ilustrações editoriais — 2026-11-12

13 imagens originais geradas pela ferramenta integrada `image_gen`, com prompts
exatos em `editorial-image-prompts.json` e origem registrada nos arquivos
`.webp.json` que acompanham os WebP.
São ilustrações conceituais, sem alegação de precisão anatômica, sem pacientes,
sem procedimento em andamento, comparação de resultados, texto ou logotipo.

## Aplicação

`app/src/lib/editorial-images.ts` concentra alt, dimensões e correspondência
por slug. Cobre os 14 posts existentes sem fotografia e as 9 páginas de
tratamento. Também prepara bruxismo (#16) e manutenção de implantes (#17):
esses slugs só ganham página quando os respectivos PRs forem aprovados.
As 3 publicações que já têm fotografia mantêm suas imagens e sua lógica atual.
Não há alteração de conteúdo clínico em `content/posts` ou nos dados de tratamentos.

A biblioteca usa azul #042B48, azul acinzentado #3C576A e verde-água #4F9D93,
com coral pontual na imagem de sensibilidade. As imagens compartilham uma
linguagem visual; temas próximos podem compartilhar um mesmo arquivo. Isso
não representa identidade ou técnica de um fabricante.

| Tema | Uso principal |
|---|---|
| Implantes | Instalação e planejamento 3D |
| Enxerto | Reconstrução de suporte |
| Prótese | Prótese total, protocolo e tipos de prótese |
| Restauração | Dentística restauradora |
| Bucomaxilofacial | Especialidade e traumatismo facial |
| Sisos | Avaliação de terceiros molares |
| Gengiva | Saúde gengival e cirurgia plástica periodontal |
| Ortognática | Perfil facial e maxilares |
| Avaliação oral | Investigação de alterações na boca |
| Trauma dental | Dente quebrado |
| Sensibilidade | Sensação térmica |
| Bruxismo | Apertamento e proteção |
| Manutenção | Acompanhamento de implantes |

## Separação de funções

A figura aparece na página e no cartão do blog. A legenda identifica geração por
IA. Essas capas **não** são figuras didáticas: não entram em `og:image`, Twitter,
`Article.image` ou `primaryImageOfPage`. Os metadados sociais continuam usando o
fallback institucional ou a fotografia que já pertencia ao post. O PR #14 mantém
seu papel independente de trazer retratos reais ao cartão institucional.

Imagens são 1536×1024 WebP; o componente usa essas dimensões reais e `sizes`
responsivo. O texto Markdown, seus links e as FAQs não foram reescritos.
A data de atualização dos tratamentos no sitemap acompanha a nova apresentação;
datas editoriais e de revisão clínica dos posts permanecem como estavam.

## Revisão

Verificar adequação simbólica das figuras antes do merge, especialmente modelos
de arcadas e perfil facial. Não interpretar a ilustração como plano de tratamento,
resultado possível ou demonstração de técnica. Este PR não resolve as pendências
de consentimento e autoria das fotografias antigas em `TODO.md`.
