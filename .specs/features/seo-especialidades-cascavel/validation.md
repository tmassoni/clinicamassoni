# Validação independente do SEO de especialidades

- **Data**. 2026-11-25.
- **Spec**. [SEO de especialidades em Cascavel](spec.md).
- **Faixa verificada**. `184a80e..06dc31b`.
- **Resultado**. Validação técnica concluída. A aprovação dos textos pelos profissionais antecede a publicação.

## Critérios verificados

| Critério | Evidência | Resultado |
| --- | --- | --- |
| SEO-01 | `e2e/seo-especialidades-cascavel.spec.ts:10` usa `.toBe(200)`. Linhas 13–16 verificam H1, profissional e CRO. A asserção `.toBeVisible()` na linha 23 verifica as quatro seções de indicação, avaliação, manutenção e limites. Linha 26 compara o CTA com o número do WhatsApp da clínica. | PASS |
| SEO-02 | `e2e/seo-especialidades-cascavel.spec.ts:32` usa `.toBe(200)`. Linhas 34–39 verificam autoria, H1, CRO de Thiago e a seção de reparo. Linha 41 confirma o destino `/tratamentos/facetas-de-resina` com `.toHaveURL(…)`. Linhas 44–49 verificam os links em Dentística e Recontorno. Linhas 27–28 verificam o link de retorno. A seção “Leia também” recebe esses artigos em `app/tratamentos/[slug]/page.tsx:270`. | PASS |
| SEO-03 | `e2e/seo-especialidades-cascavel.spec.ts:11` e `:33` usam `.toHaveTitle(…)` com os títulos completos terminados em “Clínica Massoni”. Linhas 12 e 34 comparam o campo `author` com “Dr. Thiago Massoni”. Linha 65 usa `.toHaveAttribute('href', canonical)`. Linhas 66–70 verificam indexabilidade, uma entrada por URL, a data `2026-11-25` e as entradas de inventário. Os testes de `tests/sitemap-coverage.test.ts:65` e `:233` conferem o conjunto de URLs e as datas das páginas estáticas. | PASS |
| SEO-04 | `e2e/seo-especialidades-cascavel.spec.ts:79` usa `.toBeVisible()` para o checklist. Linha 81 verifica os rótulos de encaminhamento opcional, exames e medicamentos. Linhas 86–91 usam `.toHaveAttribute('href', ATENDIMENTO)` nos dois tipos de página e verificam a navegação a partir do guia. | PASS |
| SEO-05 | `e2e/seo-especialidades-cascavel.spec.ts:96` compara o título existente. Linhas 97–103 verificam H1, descrição e limite com `.toBeLessThanOrEqual(160)`. O diff da home contém o import e o campo `metadata.description`. Os componentes de seções, o layout compartilhado e o CSS global apresentam diff vazio. | PASS |

## Testes

- `bun run lint` e `git diff --check 184a80e..06dc31b` passaram na revisão independente.
- `bun run test` passou na revisão independente com 97 testes e 1.165 asserções.
- O executor de Playwright concluiu a build de produção e registrou 78 testes aprovados. Os quatro skips existentes são checagens de desktop executadas sob o projeto mobile em `e2e/smoke.spec.ts:108`, `:142` e `:190`.

## Testes de regressão em cópia temporária

| Alteração introduzida | Evidência | Resultado |
| --- | --- | --- |
| Omitir `facetas-de-resina` da geração do sitemap | `bun test tests/sitemap-coverage.test.ts` retornou 0 na cópia íntegra e 1 com a alteração. A asserção em `:71` detectou a ausência. | Detectada |
| Trocar `ownerTreatment` do artigo de manutenção por um slug inexistente | `bun test tests/treatments.test.ts` retornou 0 na cópia íntegra e 1 com a alteração. A asserção em `:127` detectou o vínculo inválido. | Detectada |
| Remover o título absoluto do tratamento de facetas | Uma asserção com Bun chamou `generateMetadata` na cópia. Com os dados íntegros, o título das duas rotas passou. Com a remoção, a asserção esperava o título completo em `title.absolute` e recebeu o título base como string. | Detectada |

As três cópias temporárias foram descartadas.
