# Links contextuais no blog — 13/11/2026

## Mudança preparada

Seis links em quatro artigos, usando palavras que já estavam nos parágrafos.
Não há nova frase clínica, recomendação, serviço ou URL. A alteração preserva
todos os links existentes, os cartões de tratamento, CTAs, FAQ e imagens.

| Artigo | Âncora | Destino |
|---|---|---|
| Recontorno | recontorno estético com resina composta | `/tratamentos/dentistica-restauradora` |
| Recontorno | Bruxismo | `/blog/bruxismo-apertar-ranger-dentes` |
| Quando procurar um bucomaxilofacial | cirurgião bucomaxilofacial | `/tratamentos/cirurgia-bucomaxilofacial` |
| Implante passo a passo | Implante dentário | `/tratamentos/implantes-dentarios` |
| Implante passo a passo | avaliação dos tecidos ao redor do implante | `/blog/perimplantite-manutencao-implantes` |
| Prótese fixa sobre implantes | Protocolo sobre implantes | `/tratamentos/protocolo-all-on-4` |

Os dois artigos novos já estão em main (#16/#17), mas o recorte de desempenho do
#15 termina antes da sua publicação. Linká-los não pressupõe demanda comprovada.
Os quatro tratamentos de destino já possuem intenção local e identificação da
clínica; não repetir “Cascavel” em toda âncora nem criar uma segunda página para
uma intenção existente. O termo recontorno leva à área responsável, não promete
que todos os procedimentos da especialidade sejam o mesmo tratamento.

## Hipótese e limites

Facilitar a passagem da explicação à página de tratamento e a dúvidas relacionadas
no momento da leitura. O cartão final já fazia o caminho post → tratamento;
este PR complementa esse caminho dentro dos parágrafos. Não se trata de corrigir
links quebrados nem de implementar um funil que antes não existia.

Base: [diagnóstico do #15](../seo-diagnostico-2026-11.md). Recontorno tem exposição;
bucomaxilofacial aparece em várias URLs; implante e protocolo são jornadas já
cobertas. Os dados não demonstram conversão nem qual link o visitante usou.
O PR não mede transições entre páginas e não adiciona coleta de dados.

Referência oficial, aberta em 13/11/2026:
[Google: links e âncoras](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
O benefício proposto é navegação contextual; ranking permanece hipótese.

## Aceite e medição

- Comparar os corpos com a base removendo apenas as seis marcações novas:
  o texto deve permanecer idêntico. FAQs, autoria e publicação original intactas.
- Conferir as seis âncoras renderizadas e cada destino, incluindo os tratamentos
  em Cascavel. Validar lint, contratos e build. Sem novas fotos clínicas.
- `lastModified` registra edição de links, não revisão clínica nem prova de deploy.
- Registrar publicação/commit; comparar períodos completos de 28 dias, também
  56/84 se necessário, com filtros consistentes e mudanças concorrentes anotadas.
- Observar páginas de tratamento e `cta_click` por caminho/canal. Não calcular
  uma taxa de transição pela divisão de pageviews independentes nem atribuir o
  primeiro artigo lido a um contato sem evidência de jornada.

| Publicação real/commit | Janela anterior | Janela posterior | Resultado e limites |
|---|---|---|---|
| Pendente | Pendente | Pendente | Pendente |
