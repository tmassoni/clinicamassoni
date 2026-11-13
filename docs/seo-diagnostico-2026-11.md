# Diagnóstico SEO — Search Console, coleta de 13/11/2026

## Fonte, recorte e limites

Leitura autenticada da propriedade `sc-domain:clinicamassoni.com.br` no Search
Console, pelo navegador, em 13/11/2026 (painel com "última atualização há 13
horas"). Substitui a evidência parcial do print, que continua em
[evidencias/](evidencias/search-console-performance-print-2026-11-13.png) e
confere com os totais abaixo.

| Campo | Valor |
|---|---|
| Intervalo principal | 11/08/2026 a 10/11/2026 (predefinição "3 months") |
| Tipo de pesquisa | Web (text) |
| Outros filtros | nenhum (país, dispositivo e aparência de pesquisa abertos) |
| Totais | 52 cliques · 6,04 mil impressões · CTR 0,9% · posição média 11,9 |
| Linhas | 238 consultas · 32 páginas · 52 países |
| Histórico disponível | desde 18/03/2026 (o seletor de 16 meses começa aí) |

Dados brutos versionados:

- [Páginas, 11/08–10/11](evidencias/gsc-2026-08-11_2026-11-10-paginas.csv)
- [Consultas, 11/08–10/11](evidencias/gsc-2026-08-11_2026-11-10-consultas.csv)
- [Série mensal, 18/03–10/11](evidencias/gsc-mensal-2026-03-18_2026-11-10.csv)

**Limite principal: consultas anonimizadas.** As 238 consultas visíveis somam
3 dos 52 cliques e 1.489 das ~6.040 impressões (cerca de 25%). O Google omite
consultas raras por privacidade; com volume tão baixo, a maior parte do tráfego
não tem consulta associada. Exemplos: `/blog/implante-dentario-passo-a-passo`
tem 131 impressões e nenhuma consulta visível; `/sobre` tem 249 impressões e
14 visíveis. A tabela de páginas é a evidência mais completa; a de consultas
indica o tipo de demanda, não o total.

A soma das páginas (6.470 impressões) passa do total do site (6.040) porque o
Search Console conta impressões por URL quando várias URLs do site aparecem no
mesmo resultado. Não é erro de transcrição.

Cliques de pesquisa não são contatos nem consultas marcadas.

## Série mensal

| Mês | Cliques | Impressões | CTR | Posição |
|---|---:|---:|---:|---:|
| mar/26 (desde 18/03) | 1 | 42 | 2,4% | 6,5 |
| abr/26 | 5 | 263 | 1,9% | 5,8 |
| mai/26 | 11 | 231 | 4,8% | 5,9 |
| jun/26 | 1 | 317 | 0,3% | 5,8 |
| jul/26 | 16 | 346 | 4,6% | 6,3 |
| ago/26 | 19 | 1.350 | 1,4% | 13,6 |
| set/26 | 20 | 1.780 | 1,1% | 12,7 |
| out/26 | 11 | 2.240 | 0,5% | 10,4 |
| nov/26 (até 10/11) | 6 | 787 | 0,8% | 11,1 |

Ago, set e out acima de 1.000 aparecem arredondados na interface (1.35K etc.).
A soma confere com o total de 16 meses: 90 cliques, 7,35 mil impressões.

Leitura: o blog entrou no ar em 10/08 (#7). A partir de agosto, as impressões
crescem de ~300 para 1.350–2.240 por mês, a posição média piora de ~6 para
~11–13 e o CTR cai. É o efeito esperado de passar a aparecer em consultas
informativas nacionais, mais abaixo na página; não indica, por si só, perda de
posição das páginas antigas. Os cliques não acompanharam: 11 a 20 por mês, com
outubro (11) abaixo de setembro (20) apesar de mais impressões. Com números
tão pequenos, a variação mensal de cliques não sustenta conclusão de tendência.

## Páginas

Todas as 34 URLs do sitemap foram conferidas contra a tabela:

- 31 aparecem com impressões; `/politica-de-privacidade` não aparece.
- `bruxismo-apertar-ranger-dentes` e `perimplantite-manutencao-implantes`
  foram publicados em 12–13/11, depois do intervalo; ainda sem dados.
- `https://clinicamassoni.com.br/` (sem www) teve 1 impressão — compatível com a
  pendência do redirect 307→308 do domínio em [CURRENT_STATE](CURRENT_STATE.md).

Concentração: home (22 cliques) e `recontorno-estetico-resina-composta`
(11 cliques, 2.424 impressões) somam 33 dos 52 cliques. Nenhuma outra URL
passa de 3 cliques; 17 URLs têm zero clique.

| URL | Cliques | Impressões | CTR | Posição | Consultas visíveis (principais) |
|---|---:|---:|---:|---:|---|
| `/` | 22 | 1.177 | 1,9% | 6,6 | 39 visíveis; `enor massoni` (2 cliques, pos. 1,2), `dentista bucomaxilofacial` (13 impr., 5,7), `bucomaxilofacial` (9, 7,9) |
| `/blog/recontorno-estetico-resina-composta` | 11 | 2.424 | 0,5% | 8,4 | 28 visíveis, todas da família "recontorno estético/em resina", pos. 7,7–13,5 (632 impr. visíveis) |
| `/blog/profilaxia-dental` | 1 | 553 | 0,2% | 39,8 | 58 visíveis; definições genéricas ("o que é profilaxia") em pos. 63–77 |
| `/blog/protese-fixa-sobre-implantes` | 1 | 297 | 0,3% | 10,7 | 8 visíveis, pos. 11–45 |
| `/blog/traumatismo-facial-fraturas` | 0 | 258 | 0% | 11,0 | 9 visíveis (16 impr.), "fratura de face/no rosto", pos. 35–61 |
| `/sobre` | 3 | 249 | 1,2% | 7,3 | 4 visíveis; `enor massoni` (11 impr., 4,8) |
| `/blog/cirurgia-guiada-3d` | 2 | 149 | 1,3% | 6,6 | 1 visível |
| `/tratamentos/extracao-de-sisos` | 2 | 136 | 1,5% | 6,9 | 7 visíveis, "dentista que tira siso", pos. 1–7 |
| `/tratamentos/protese-dentaria` | 2 | 131 | 1,5% | 7,8 | 3 visíveis |
| `/blog/implante-dentario-passo-a-passo` | 0 | 131 | 0% | 8,6 | nenhuma visível |
| `/blog/lesoes-e-cistos-na-boca` | 1 | 113 | 0,9% | 15,8 | 21 visíveis, "caroço/cisto na boca", pos. 12–35 |
| `/tratamentos/cirurgia-bucomaxilofacial` | 1 | 111 | 0,9% | 8,3 | 12 visíveis, "clínica/dentista bucomaxilofacial", pos. 2–12 |
| `/blog/cirurgiao-bucomaxilofacial-quando-procurar` | 1 | 98 | 1% | 24,1 | 12 visíveis, `bucomaxilofacial` (16 impr., 34,4), `bucomaxilo` (12, 45,7) |
| `/blog/gengiva-sangrando` | 1 | 73 | 1,4% | 29,9 | 17 visíveis, pos. 5–49 |
| `/blog/tipos-de-protese-dentaria` | 0 | 37 | 0% | 29,9 | 11 visíveis, pos. 33–42 |

Demais URLs, com menos de 90 impressões cada: ver o CSV de páginas.
Consultas por URL lidas filtrando cada URL (correspondência exata) no mesmo
intervalo; tabelas com mais de 10 linhas foram lidas nas 10 primeiras, ordenadas
por cliques e impressões. Recontorno foi lida por inteiro (28 linhas); a home
teve as 39 linhas carregadas, mas só as primeiras foram transcritas.

Outros cortes, mesmo intervalo: Brasil 43 cliques / 5.575 impressões
(posição 11,9); celular 34 / 4.275 (8,9); computador 18 / 1.741 (19,4).

## O que os dados mostram

1. **Recontorno é a maior exposição e o pior aproveitamento relativo.**
   40% das impressões do site, posição 8,4, CTR 0,5%. As consultas visíveis são
   todas sobre o procedimento, de intenção informativa e sem cidade. A página
   já está na primeira página para essa família; o que limita cliques é o
   resultado em si (título, descrição, recursos da SERP) ou a intenção da busca.
   Os dados não dizem qual dos dois.

2. **Busca local quase não aparece.** Só 7 consultas com cidade ou
   "perto de mim", somando cerca de 10 impressões: `dentista cascavel pr`
   (pos. 57), `dentista em cascavel pr` (67), `dentistas cascavel` (82),
   `cascavel pr` (12,5). O Search Console não mede o pacote local/Maps; a
   visibilidade no Perfil da Empresa precisa ser verificada lá. Pelo orgânico,
   o site não compete hoje por "dentista em Cascavel".

3. **Marca funciona.** `enor massoni` em posição 1,2 na home e 4,8 em `/sobre`.

4. **Profilaxia tem volume, mas não ranqueia.** 553 impressões, quase todas em
   definições genéricas na posição 63–77 (página 7+). Disputa nacional de
   intenção escolar; retorno provável baixo para a clínica.

5. **Bucomaxilofacial aparece em três URLs.** Home (pos. 5,7–7,9), página de
   tratamento (8,3–9,5) e artigo (34–46). É candidato a investigação de
   intenção, não prova de canibalização: as consultas visíveis têm 1 a 16
   impressões cada.

6. **Posts informativos em posição 20–45**: gengiva sangrando, cistos,
   tipos de prótese, traumatismo. Fora da primeira página; sem cliques.

## Propostas para aprovação

Nada abaixo foi alterado. Conteúdo clínico depende de revisão do dentista
(`docs/compliance-guidelines.md`).

| # | Proposta | Base | O que muda | Aprovação |
|---|---|---|---|---|
| 1 | Revisar título e meta description de `recontorno-estetico-resina-composta` para responder à busca no próprio resultado | 2.424 impr., pos. 8,4, CTR 0,5% | Frontmatter; sem alterar o corpo clínico | Texto proposto antes de publicar |
| 2 | Verificar Perfil da Empresa no Google (categoria, endereço, site com www) e sinais locais da home/tratamentos | ~10 impr. locais em 3 meses | Fora do repositório; depois, possível ajuste de copy | Acesso da clínica ao Perfil |
| 3 | Não investir em profilaxia agora | pos. 63–77 nas consultas genéricas | Nada | — |
| 4 | Investigar papel de home × `/tratamentos/cirurgia-bucomaxilofacial` × artigo | 3 URLs para a mesma família | Somente análise, nesta etapa | — |

Para a proposta 1, medir 28 dias completos antes e depois, mesma URL e filtros,
registrando a data de publicação. Uma mudança de posição no período invalida a
leitura do CTR.

## O que já está no código

Árvore sincronizada com `origin/main` em `4128901`: #13 (título da home), #14
(cartão de compartilhamento), #16 (bruxismo) e #17 (perimplantite) mesclados.
Inventário conferido nesta revisão: 19 posts, 9 tratamentos, 6 rotas estáticas,
34 URLs no sitemap. Todos os posts declaram `ownerTreatment`.

## Validação

- Coleta: navegador autenticado, leitura direta das tabelas; nenhum export
  baixado, nenhuma configuração da propriedade alterada.
- O print anterior confere com os totais (52 / 6,04 mil / 0,9% / 11,9).
- Código: só a data da home em `app/sitemap.ts` (ver descrição do PR).
