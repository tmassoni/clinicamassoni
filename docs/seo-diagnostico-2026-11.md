# Diagnóstico SEO — 11/11/2026

Escopo: leitura do código, documentos, PRs e cabeçalhos HTTP públicos.
Dados privados do Search Console não foram obtidos. As conclusões abaixo não
são uma avaliação de tráfego nem comprovação de consultas agendadas.

## Fatos observados

| Evidência | Resultado | Consequência |
|---|---|---|
| `gh pr list`, início da rodada | Nenhum PR aberto; último PR era o #12, mesclado | Não havia PR concorrente para editar |
| `git status`, início da rodada | Árvore limpa em `df/seo-fixes`; conteúdo idêntico a `origin/main` | Preservada a branch existente; novos PRs partem de `origin/main` |
| Rotas e sitemap | 32 URLs: 6 páginas estáticas, 9 tratamentos, 17 posts | Não criar URLs apenas para aumentar o inventário |
| Home, layout e HTML público | O título atual é longo; o HTML publicado NÃO repete o nome. A hipótese inicial de duplicação não se confirmou | PR #13 propõe título mais conciso e um contrato de intenção local |
| Páginas de local | Não existem; existe um endereço descrito no site | Não há duplicação home × página de local a corrigir |
| `ownerTreatment` e `OwnerTreatmentCard` | Todos os 17 posts têm dono válido e saída para tratamento | Candidato post → tratamento já implementado; não refazer o mapeamento |
| Metadados sociais na base | Páginas gerais usam `/images/og-brand.png`; 3 posts ilustrados usam a primeira foto do texto | Cartão institucional pode ganhar retratos reais; fotos clínicas dependem das pendências existentes |
| JSON-LD | `Dentist`, `MedicalBusiness`, `LocalBusiness`; `/sobre` com `ProfilePage` e um `mainEntity`; home aponta para o retrato de Enor | Preservar o grafo odontológico e a distinção entre pessoa e clínica |
| Descoberta | Canonicals, sitemap, robots, `llms.txt` e corpus `/llms-full.txt` têm contratos automatizados | Testes verificam consistência, não indexação real |
| Analytics | Vercel Analytics/Speed Insights e `cta_click`; nenhum GTM/GA4 montado no layout | Não acrescentar rastreador nesta rodada |
| Contatos | Constantes e links de WhatsApp/telefone existentes | Preservar destinos; nenhum contato de teste foi enviado |
| HTTP do domínio sem www | `307` para www, confirmado nesta rodada | Configuração externa continua pendente; não alterar produção |
| HTTP do sitemap com www | `200`, `application/xml` | Endpoint acessível; isso não prova envio ou indexação no Google |

## Search Console: informação ausente

A propriedade de domínio foi indicada pelo usuário, mas não foi possível abrir
o navegador: inventário retornou `The browser access host is unavailable`, e
duas tentativas pelo aplicativo Chrome expiraram. Não houve leitura das tabelas.
Não registrar ausência de acesso como ausência de tráfego.

| Pergunta | Estado | Dados necessários |
|---|---|---|
| Curva de 16 meses | Desconhecida | Série diária e agregação mensal de cliques e impressões |
| Busca local e URL que ranqueia | Desconhecidas | Consulta filtrada por Cascavel/PR e aba Páginas para cada consulta |
| 5 posts para CTR | Não selecionados | Últimos 3 meses: posição 5–12, ≥1.000 impressões, CTR <0,5%, com consultas por página |
| Canibalização observada | Não comprovada | Mesma consulta aparecendo para várias URLs; considerar intenção e contexto |
| 404 com impressões | Desconhecidos | Aba Páginas e verificação HTTP de cada candidato |
| Lacunas com ≥10 impressões | Desconhecidas | Consultas e inventário de intenções; não inferir demanda de uma pauta antiga |
| Conversão em agendamento | Não medida | Eventos agregados de contato e confirmação mínima pela recepção |

Ao retomar: selecionar a propriedade, fixar o intervalo e tipo de pesquisa,
registrar os filtros, ler Consultas e **clicar** na aba Páginas. Se a ferramenta
limitar a saída, paginar a extração em blocos pequenos e conferir total de linhas,
ordenação e limite do relatório. Não mudar filtros sem registrar a alteração.
Para a curva mensal, somar cliques/impressões; CTR mensal = soma de cliques /
soma de impressões. Mês parcial fica identificado. Não tirar média simples dos
CTRs diários. Proteger quaisquer exports e não registrar dados de pacientes.

## Hipóteses a testar

- Título mais curto pode tornar o resultado da home mais legível.
  Não há estimativa de ganho de CTR.
- Retratos reais podem melhorar reconhecimento nos compartilhamentos; isso não
  demonstra ganho de ranking nem controla a miniatura escolhida pelo Google.
- Melhorar respostas dentro dos clusters existentes pode ser mais útil que abrir
  novas URLs. A prioridade depende de consultas reais e revisão dos dentistas.

Não extrapolar curvas de outros projetos como previsão para esta clínica.

## Destino dos candidatos

1. **Busca da cidade:** encurtar título da home e proteger títulos únicos. As
   páginas de tratamento mantêm suas intenções locais específicas, conforme
   `seo-strategy.md`; não concentrar todos os serviços na busca genérica da home.
2. **CTR:** aguarda dados; não alterar cinco posts arbitrariamente.
3. **Redirects:** aguarda URLs com impressões e equivalência de intenção. O
   redirect `/servicos` → `/tratamentos` já existe. Nenhum novo foi inventado.
4. **Post → tratamento:** já existe em todos os posts. Mapeamentos menos óbvios,
   como profilaxia → cirurgia plástica periodontal, seguem para revisão clínica.
5. **Compartilhamento:** proposta independente com retratos existentes da equipe,
   PNG e teste do HTML final. Não reutilizar novas fotos clínicas sem autorização.
6. **Pauta:** `pesquisa/pauta-posts-2026-11.md`, explicitamente provisória.
7. **Expansão:** primeiro `pesquisa/brief.md`, depois pesquisa por tema e aprovação
   para alterar texto publicado. Nenhum corpo clínico foi modificado nesta rodada.

## Decisões da clínica

- Identificar revisor clínico e prazo, confirmar autoria e precisão dos textos.
- Resolver consentimento, autoria dos casos e uso das fotos dos três posts
  ilustrados, conforme `TODO.md`. Não guardar TCLE nem identificação de pacientes
  neste repositório.
- Confirmar credenciais e contagens conflitantes de experiência; não substituir
  uma estimativa antiga por outra sem confirmação.
- Revisar as associações de tratamento que não correspondem diretamente ao título.
- Revalidar normas odontológicas quando necessário. A documentação de compliance
  foi verificada em agosto; esta rodada não fez atualização normativa. É CFO/CRO-PR,
  e as regras de outros conselhos não devem ser importadas automaticamente.
- Manter revisão de privacidade, propriedade de contas e configuração de domínio
  como pendências externas, sem tratá-las como corrigidas por testes verdes.

## Como medir depois

Registrar data de publicação aprovada e cada URL alterada. Comparar 28 dias
completos antes × 28 depois, com os mesmos filtros de país, dispositivo e tipo
de pesquisa. Separar por página e consulta: cliques, impressões, CTR e posição.
Anotar alteração de posição, sazonalidade, mix de consultas e tempo de recrawl;
uma comparação antes/depois não isola causalidade.

Separadamente, acompanhar `cta_click` por página/canal e agendamentos confirmados
em totais agregados. Clique de contato não é consulta marcada. Sem dados pessoais
ou de saúde em URLs, mensagens automáticas ou analytics.

## Reprodução local

Usar Bun e Node 24.18.0. O ambiente desta sessão herdou
`NODE_ENV=development`; o prerender do build falhou nesse estado. Executar
`NODE_ENV=production bun run build` e
`NODE_ENV=production bun run test:e2e --headed --workers=2` resolveu essa
inconsistência sem alteração no componente apontado pelo erro.
Não copiar essa variável para configuração de produção sem necessidade.

O CI ainda declara Node 22 e `ubuntu-latest`. Isso difere do alvo local pedido;
não houve troca preventiva de runner nem dependências nesta auditoria. Caso a
execução apresente incompatibilidade de Playwright, tratar em PR separado com
evidência do log e `ubuntu-24.04`.

## PRs e validação

- [#13](https://github.com/tmassoni/clinicamassoni/pull/13): título absoluto da
  home e E2E de unicidade nas 32 URLs. Lint, 94 contratos e build passaram;
  52 E2E passaram, 4 ignorados. Checks do GitHub passaram na consulta desta rodada.
- [#14](https://github.com/tmassoni/clinicamassoni/pull/14): cartão institucional
  com retratos reais, Sharp 0.35.3 preservado e HTML de OG/Twitter verificado.
  Lint, 94 contratos e build passaram; 54 E2E passaram, 4 ignorados.

Os testes ignorados verificam trilhos laterais exclusivos de desktop. Os dois
PRs partem de `main`, são independentes e permanecem em rascunho; sugestão de
ordem: #13 → #14. Preview gerado automaticamente não é produção nem aprovação.
