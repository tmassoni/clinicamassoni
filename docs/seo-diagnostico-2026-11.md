# Diagnóstico SEO — revisão de 13/11/2026

## Evidência disponível e limite da revisão

O PR #15 original, de 11/11, documentou uma coleta que não ocorreu. Esta revisão
incorpora o print enviado pelo responsável pelo projeto em 13/11 e sincroniza
as referências com `main` em `4128901`. A leitura autenticada das tabelas do
Search Console continua pendente. Não apresentar esta revisão como auditoria
completa de desempenho nem como seleção de oportunidades por página.

Propriedade indicada pelo usuário: `sc-domain:clinicamassoni.com.br`.
O recorte não mostra o seletor da propriedade; a associação ao domínio vem da
mensagem e dos links fornecidos pelo usuário, não de uma verificação autenticada.

- [Desempenho no Search Console](https://search.google.com/search-console/performance/search-analytics?resource_id=sc-domain%3Aclinicamassoni.com.br)
- [Print original fornecido pelo usuário](evidencias/search-console-performance-print-2026-11-13.png)

## Números efetivamente visíveis no print

| Campo | Valor exibido |
|---|---|
| Intervalo selecionado | 3 months |
| Tipo de pesquisa | Web (text) |
| Total de cliques | 52 |
| Total de impressões | 6.04K, aproximadamente 6.040 |
| CTR médio | 0.9%, ou 0,9% |
| Posição média | 11.9, ou 11,9 |
| Granularidade do gráfico | Daily |
| Atualização informada na captura | 12.5 hours ago |

Os números são transcrições da interface, com o arredondamento original.
52 ÷ 6.040 ≈ 0,86%, compatível com o CTR de 0,9% exibido; 6.040 não é um total
exato exportado. As marcações do eixo vão de 11/08/2026 a 03/11/2026 e a curva
continua depois da última marcação. Elas não fixam as datas inicial/final do
relatório. O recorte também não permite confirmar todos os filtros ativos.
A data de recebimento do print não comprova a data de captura.

Há cliques e impressões no recorte. Isso corrige a ausência total de números no
PR original. Não permite concluir quais páginas atraem esse tráfego, quais
consultas são locais, se o CTR de uma página está abaixo do esperado ou se houve
crescimento mensal. A posição média agregada não é a posição de cada página.
Cliques de pesquisa não demonstram contatos nem agendamentos.

## Tentativa de coleta nesta revisão

Em 13/11, `cua.getState()` retornou `The browser access host is unavailable`.
Duas tentativas de selecionar o aplicativo Chrome pela interface nativa expiraram
em 30 e 60 segundos. Nenhuma página autenticada, tabela ou export foi lido.
O bloqueio é da ferramenta nesta sessão; não demonstra problema na propriedade
nem ausência de permissão da conta Google.

## O que já está no código

Verificação da árvore sincronizada com `origin/main` em `4128901`:

- #13, título da home e contrato de intenção local: mesclado.
- #14, cartão institucional com retratos reais: mesclado.
- #16, artigo de bruxismo, e #17, perimplantite/manutenção: mesclados.
- Inventário atual: 19 posts, 9 tratamentos e 6 páginas estáticas, totalizando
  34 URLs geradas pelo sitemap. Os 17 posts/32 URLs do diagnóstico anterior eram
  o inventário de 11/11, anterior aos dois artigos.
- Todos os posts declaram `ownerTreatment`; o encaminhamento para tratamento
  já existe e não deve ser apresentado como implementação futura deste PR.
- `/sobre` e `docs/compliance-guidelines.md` já existem. As duas correções na
  estratégia permanecem pertinentes.

Merge no GitHub não comprova implantação nem aprovação clínica. Esta revisão
não verificou produção, configuração de domínio, indexação ou revisão dos textos
pelos dentistas. Os antigos resultados de HTTP e testes pertencem à rodada de
11/11; não são verificações atuais desta revisão documental.

## Coleta necessária para decidir a próxima alteração

1. Restabelecer o browser tool e abrir a propriedade indicada. Registrar datas
   exatas, tipo de pesquisa, país, dispositivo e todos os filtros ativos.
2. No mesmo intervalo de três meses, exportar Consultas e Páginas com cliques,
   impressões, CTR e posição. Registrar total de linhas e eventual limite.
3. Para cada candidato, filtrar a URL e ler suas consultas; para consultas de
   marca, Cascavel e tratamentos, conferir quais URLs aparecem. Comparar com
   o inventário atual antes de propor outra página.
4. Obter série diária de até 16 meses, conforme disponibilidade. Agregar cliques
   e impressões por mês; calcular CTR pela divisão das somas. Identificar meses
   parciais e usar períodos completos para comparações.
5. Só então selecionar mudanças de título/conteúdo ou redirects. Conferir HTTP
   e equivalência de intenção para cada URL candidata a redirecionamento.

Não há obrigação de encontrar cinco posts nem de aplicar um corte universal de
CTR. Com apenas o total agregado, não sabemos quantas páginas têm amostra útil.
Consultas em várias URLs são candidatas a investigação, não prova automática de
canibalização. Um recorte de consultas também não revela toda a demanda possível.
Exports devem ficar restritos ao necessário, sem credenciais ou dados de pacientes.

## Decisões possíveis agora

- Manter os números do print como baseline parcial e preservar sua origem.
- Retirar da lista de trabalho futuro os títulos, cartão e artigos já mesclados.
- Manter sensibilidade e siso como hipóteses editoriais, sem prioridade atribuída
  ao Search Console. Perimplantite já tem artigo e pesquisa na base.
- Preservar o brief de pesquisa e a revisão clínica antes de novos textos.

Ainda não há fundamento por URL para mudar títulos de posts, expandir textos,
criar redirects ou prometer ganho de tráfego. Essas decisões dependem da coleta
acima e de uma proposta concreta para cada página.

## Medição após uma alteração aprovada

Registrar URL e data de publicação. Comparar 28 dias completos antes/depois com
os mesmos filtros, por página e consulta; anotar posição, mix de consultas,
sazonalidade e recrawl. A comparação não isola causalidade.
Acompanhar contatos e agendamentos separadamente em totais agregados.

## Validação desta revisão

Mudança documental, com anexo do print, sem alteração de conteúdo clínico ou
código da aplicação. Os comandos executados estão na descrição atualizada do PR;
testes do PR original não são apresentados como nova execução.
