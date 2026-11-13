# Plano de SEO local e conteúdo — 13/11/2026

## Decisão de trabalho

Continuar melhorando o site e os artigos, em paralelo ao trabalho da clínica no
Perfil da Empresa. A sequência pergunta específica → leitura útil → tratamento
relacionado → contato em Cascavel é uma hipótese de aquisição a medir. Não é uma
garantia de que um artigo nacional vai gerar paciente nem de que ganhar uma
long-tail levará automaticamente ao topo de uma busca genérica.

Este plano registra a orientação aprovada pelo responsável pelo projeto para
preparar PRs. Não autoriza merge, publicação, novas alegações clínicas ou mudanças
no Perfil da Empresa. O responsável informou que já preparou um PDF para orientar
o cliente sobre o Perfil; o conteúdo desse PDF não foi revisado nesta rodada.

## Base da decisão

Fonte: coleta autenticada descrita no [PR #15](https://github.com/tmassoni/clinicamassoni/pull/15),
em `6c1f9b6`, e nos [CSVs](evidencias/). Não houve nova coleta nesta rodada.
Intervalo: 11/08–10/11/2026, Web (text), sem outros filtros.

| Evidência | Leitura para decidir trabalho |
|---|---|
| 52 cliques; aproximadamente 6,04 mil impressões | Há exposição e uma base pequena de cliques; não declarar sucesso de aquisição só pelo alcance |
| Recontorno: 11 cliques, 2.424 impressões, CTR 0,5%, posição 8,4 | Primeiro candidato a um teste de título/descrição, sem promessa de ganho |
| Home: 22 cliques, 1.177 impressões | Preservar a função de marca e descoberta da clínica |
| CSV: 6 consultas com `cascavel` ou `perto de mim`, somando 9 impressões | Sinal local pequeno neste recorte, não diagnóstico da causa nem total de todas as buscas locais |
| Consultas visíveis: 3 cliques e 1.489 impressões | A omissão de consultas impede atribuir a intenção e a cidade à maior parte dos cliques |
| Profilaxia: 553 impressões e 1 clique | Não priorizar nova expansão genérica agora; preservar o artigo útil existente |
| Home, tratamento e artigo aparecem na família bucomaxilofacial | Investigar cada consulta e função das URLs antes de falar em canibalização |

As séries mensais documentam aumento de impressões e cliques entre 11 e 20 em
agosto–outubro. Não isolam o efeito do blog. País Brasil não identifica a cidade
do visitante: não classificar todo clique informativo como paciente perdido ou
todo clique no Brasil como pessoa de Cascavel. Os CSVs são transcrições do painel,
não exports baixados; mantêm os arredondamentos e limites da coleta do #15.
O diagnóstico resumiu as buscas locais como cerca de 10 impressões em 7 consultas;
a contagem acima usa estritamente os dois termos presentes no CSV, sem ampliar
a amostra para atingir aquele total.

## Como qualificar as recomendações recebidas

- **Maps merece trabalho próprio.** O Google descreve relevância, distância e
  destaque como fatores locais; avaliações e links fazem parte desse conjunto.
  Não há base aqui para dizer que avaliações são sempre o fator principal ou
  que títulos locais já esgotaram o trabalho do site. [Fonte oficial 1](#fontes)
- **Pouca visibilidade local exige investigação.** Ainda faltam dados do Perfil,
  concorrência localizada e cobertura de indexação. Não concluir que falta de
  autoridade seja a única causa. A seleção de categoria deve representar a
  atividade real e ser confirmada pela clínica, sem escolher uma especialidade
  apenas para tentar ranquear.
- **Não prometer primeira página em 3–6 meses.** Esse prazo não foi demonstrado.
  Não verificamos uma SERP localizada de Cascavel para afirmar que diretórios
  sempre dominam ou que a concorrência de uma especialidade é pequena.
- **Conteúdo continua no plano.** Priorizar dúvidas próximas da decisão, com
  respostas úteis, limites clínicos e caminho para o tratamento. Não acrescentar
  “Cascavel” a todo título nem criar variantes por bairro para simular cobertura.
- **Links locais são relacionamento, não equivalência numérica.** Não há prova
  de que uma menção valha dez posts. Evitar compra de links e parcerias fictícias.
- **Avaliações e publicidade odontológica:** a rotina fica com a clínica e a
  revisão das regras aplicáveis. Este plano não valida a interpretação jurídica
  do texto recebido nem cria mensagens automáticas ou incentivos.

## Entregas sob nosso controle

Os três PRs desta rodada partem da branch do #15 para usar sua evidência e a
correção do sitemap. São independentes entre si; revisar o diff contra essa base.
Após mesclar o #15, retargetear para `main` e repetir os checks do head resultante.

| Entrega | Escopo | Aceite técnico e editorial | Medição |
|---|---|---|---|
| Este plano | Estratégia, responsabilidades e critérios; atualizar documentos de entrada | Links/documentos coerentes; sem tratar proposta como publicação | Revisão mensal do registro abaixo |
| Resultado de busca do recontorno | Título, descrição e data de alteração; mesma URL | Resumo fiel ao artigo, sem prometer número de sessões ou desgaste mínimo no snippet; corpo e FAQ preservados | Cliques e CTR por URL/consulta com contexto de posição e dispositivo |
| Links contextuais | Conectar termos já escritos aos tratamentos e artigos existentes | Texto clínico preservado; âncoras descritivas e destinos válidos | Fluxo de leitura, visitas a tratamentos e contatos, quando os relatórios permitirem |
| [#20 — atendimento em Cascavel](https://github.com/tmassoni/clinicamassoni/pull/20) | Entrega existente, não recriar: endereço, horários, mapa, foto real e canais | Conferir fatos com a clínica, preview, canonical, links e integração atual antes do merge | Visitas/contatos da URL; consultas de marca/endereço e interações no Perfil |

Revisão de fonte do #20, head `bbe7147`: canonical próprio, breadcrumb/WebPage,
endereço e horários compartilhados, navegação, sitemap, llms.txt e canais rastreados
já existem. Checks desse head estavam verdes. Ele parte de uma base anterior ao
#15; atualizar a branch e resolver o handoff/sitemap antes da integração. Esse
registro não substitui revalidação do preview ou confirma os fatos comerciais.
A URL local pode servir a quem quer chegar à clínica; decidir o destino do link
do Perfil conforme a ação desejada e a página publicada, sem assumir ganho de
ranking por trocar a home por essa URL.

## Próximos conteúdos: backlog, não fila automática de publicação

| Pergunta a investigar | Destino inicial | Razão e condição para avançar |
|---|---|---|
| Quando procurar um bucomaxilo? É dentista ou médico? | Artigo `cirurgiao-bucomaxilofacial-quando-procurar` | Consultas visíveis existem, mas com 1 impressão em algumas variantes; conferir resposta atual antes de expandir |
| Qual profissional avalia a extração de siso? | Artigo `extracao-de-siso` e serviço `extracao-de-sisos` | Há variantes visíveis “dentista que arranca/tira siso”; preservar explicação no blog e contratação no serviço |
| Como funciona o acompanhamento depois do implante? | Artigo já existente `perimplantite-manutencao-implantes` | Publicado depois do recorte; primeiro ligar o conteúdo existente e esperar dados, sem duplicar URL |
| Como comparar recontorno, faceta e reabilitação? | Seções dos artigos de resina já existentes | Recontorno tem exposição observada; novo texto só se houver pergunta mal respondida e pesquisa |

Para cada proposta: consulta ou dúvida real → lacuna no inventário → pesquisa
conforme [brief](pesquisa/brief.md) → proposta de seção → revisão clínica → PR.
Novas pautas sem evidência ficam como hipóteses. Não inventar volume por cidade,
repetir o artigo inteiro em uma nova URL ou publicar por uma meta de quantidade.

## O que depende da clínica

- Acesso e manutenção do Perfil, categoria real, fotos e rotina de avaliações.
- Nome, endereço, telefone e horários oficiais para corrigir cadastros externos.
- Relacionamentos para menções locais legítimas e confirmação de participação.
- Revisão clínica, autoria e permissões de fotografias já listadas no TODO.
- Agendamentos confirmados em totais agregados. `cta_click` mede um clique de
  contato, não prova conversa, ligação atendida ou consulta marcada.

Não bloqueiam a preparação dos PRs documentais, de metadados e de links. Podem
bloquear publicação de fatos ou textos que dependam dessas confirmações.

## Medição e registro de experimentos

Registrar publicação real, URL, commit e mudanças concorrentes. Os PRs e seus
previews não iniciam a janela. Guardar 28 dias completos antes e depois, com os
mesmos filtros; se o volume for insuficiente, acompanhar também 56/84 dias e
reportar contagens, sem fabricar significância. Mudanças de posição e do mix de
consultas confundem a leitura do CTR; anotá-las, não atribuir causalidade.
O Google pode reescrever título/snippet e precisa recrawlear a página.
[Fontes oficiais 2 e 3](#fontes)

| Camada | Recorte | O que observar | Limite |
|---|---|---|---|
| Orgânico local explícito | Consulta contendo `cascavel`, Web, por URL; separar marca e serviço quando visíveis | Cliques, impressões, posição e CTR | Amostra de buscas explícitas; não representa todo usuário local |
| Orgânico por intenção | URLs de tratamento e artigos priorizados, país/dispositivo registrados | Cliques, consultas visíveis, posição e CTR | O filtro por consulta omite parte da demanda; país não é cidade |
| Perfil da Empresa | Mesmo período, dados trazidos pela clínica | Cliques no site, botão de chamada e solicitações de rota disponíveis | São interações, não agendamentos; relatório separado do site |
| Site | `cta_click` por `path`, `channel`, `section` e `label` existentes | Contatos iniciados em blog, tratamento e localização | Não atribuir o contato ao primeiro artigo lido sem rastreamento de jornada |
| Recepção | Totais sem nomes ou detalhes clínicos | Agendamentos confirmados e origem declarada, inclusive “não informada” | Origem declarada tem incerteza; não cruzar pessoas nos CSVs públicos |

Registro a preencher após publicação, sem resultados antecipados:

| Experimento | URL/escopo | Publicação e commit | Janela anterior | Janela posterior | Resultado/limites | Próxima decisão |
|---|---|---|---|---|---|---|
| Recontorno: título/descrição | `/blog/recontorno-estetico-resina-composta` | Pendente | Pendente: 28 dias completos | Pendente | Pendente | Manter, ajustar ou reverter conforme dados |
| Links contextuais | 4 artigos; mapa no PR de links | Pendente | Pendente | Pendente | Pendente | Priorizar jornada e lacunas observadas |
| Atendimento local (#20) | `/locais-de-atendimento/cascavel` | Pendente | Sem histórico da nova URL | Pendente | Sem comparação artificial com zero | Conferir descoberta, uso e contatos |

Não somar impressões por página como total de propriedade: as agregações diferem.
Não somar cliques do Perfil, do Search Console e do site como pessoas únicas.
Não construir uma taxa blog → tratamento a partir de contagens independentes de
pageviews. Se for necessário medir essa transição, propor evento próprio e sua
validação em outro PR, sem coleta de consulta pesquisada ou dado de saúde.

## Fontes

Fontes oficiais abertas em 13/11/2026, além da coleta do #15:

1. [Google: classificação local](https://support.google.com/business/answer/7091?hl=pt-BR).
2. [Google: títulos dos resultados](https://developers.google.com/search/docs/appearance/title-link).
3. [Google: snippets e descrições](https://developers.google.com/search/docs/appearance/snippet).
4. [Google: links rastreáveis e âncoras](https://developers.google.com/search/docs/crawling-indexing/links-crawlable).
   Sustenta links úteis e descritivos; não garante ranking.
5. [Search Console: métricas e agregação](https://support.google.com/webmasters/answer/7576553?hl=pt-BR).
6. [Perfil da Empresa: métricas disponíveis](https://support.google.com/business/answer/9918094?hl=pt-BR).
