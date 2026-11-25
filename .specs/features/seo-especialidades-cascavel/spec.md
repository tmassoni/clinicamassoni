# SEO de especialidades em Cascavel

## Objetivo

Atrair buscas específicas por atendimento odontológico em Cascavel e dar ao paciente um caminho até a avaliação. O Search Console registrou 57 cliques e 6,54 mil impressões de 24/08 a 23/11/2026. O recontorno reuniu 2.764 impressões e 14 cliques. O recorte de consultas que incluem “Cascavel” teve 5 impressões e zero cliques.

## Requisitos

| ID | Aceite |
| --- | --- |
| SEO-01 | Ao abrir `/tratamentos/facetas-de-resina`, o paciente recebe HTTP 200, vê o H1 “Facetas de resina”, Dr. Thiago Massoni e CRO-PR 35209, encontra indicações, limites, avaliação, manutenção e o link “Agendar avaliação” para o WhatsApp da clínica. |
| SEO-02 | Ao abrir `/blog/faceta-de-resina-cuidados`, o leitor recebe HTTP 200, vê o H1 “Faceta de resina: cuidados e manutenção”, o crédito de Thiago e uma orientação sobre polimento ou reparo. O artigo leva ao tratamento de facetas e aparece em “Leia também” nesse tratamento. A página de Dentística e o artigo de recontorno levam diretamente ao serviço de facetas. |
| SEO-03 | As duas rotas novas declaram canonical próprio em `www.clinicamassoni.com.br`, título HTML com o sufixo “Clínica Massoni” e autoria de Thiago. Cada rota consta uma vez no sitemap com data editorial de 25/11/2026. `llms.txt` acompanha o inventário e `llms-full.txt` inclui as duas páginas. |
| SEO-04 | O guia existente sobre quando procurar um bucomaxilo apresenta “O que levar à primeira consulta?”, incluindo encaminhamento e exames já realizados quando disponíveis, além de informações sobre medicamentos. O cartão de agendamento em artigos e serviços leva à página de atendimento em Cascavel. |
| SEO-05 | A descrição de busca da home apresenta os dois profissionais e suas áreas em até 160 caracteres. O título de busca, o H1 e a composição aprovada continuam iguais. |

## Decisões editoriais

- Facetas é uma hipótese de demanda comercial específica. A oferta e o profissional constam no site atual. O núcleo do novo artigo é manutenção de uma faceta existente. O recontorno segue com a URL e o serviço principal atuais.
- Para cirurgia bucomaxilofacial, o checklist complementa o guia que já explica encaminhamento e primeira consulta. Reutilizamos a ilustração editorial de avaliação oral para as duas páginas de facetas.
- As rotas usam os templates estáticos atuais, com aprovação dos textos por Thiago e Enor antes do merge para produção. O responsável pelo site conduz a publicação e solicita indexação depois de checar a versão pública. Avaliações do Google ficam em paralelo.
- Fontes de apoio editorial. [American Dental Association sobre facetas](https://www.mouthhealthy.org/all-topics-a-z/veneers) · [Estudo clínico sobre facetas diretas em resina](https://pubmed.ncbi.nlm.nih.gov/35379471/) · [Queen Elizabeth Hospital sobre preparação para a consulta](https://www.qehkl.nhs.uk/services/oral-and-maxillofacial-surgery/your-appointment/).

## Execução

1. Facetas e manutenção · registro de tratamentos, blog, links existentes, catálogo de ilustrações, sitemap, `llms.txt` e Playwright · verificar SEO-01 a SEO-03 · `feat(seo): adicionar facetas de resina e guia de manutenção`.
2. Preparação e chegada · guia atual de bucomaxilofacial, cartão de agendamento, CTA dos tratamentos, sitemap e Playwright · verificar SEO-04 · `feat(seo): orientar a primeira consulta em Cascavel`.
3. Descrição da home e plano de lançamento · metadados, sitemap, estratégia, Playwright e capturas de revisão · verificar SEO-05 · `fix(seo): incluir as duas áreas na descrição da home`.
4. Atribuição nos resultados de busca · metadados das duas páginas de facetas e Playwright · verificar título e autoria em SEO-03 · `fix(seo): atribuir as páginas de facetas à clínica e ao profissional`.

Cada etapa roda os contratos de conteúdo. A rodada termina com lint, build e Playwright desktop e mobile. A revisão independente registra o resultado em `validation.md`.

## Publicação e acompanhamento

1. Aprovar os textos de facetas com o Dr. Thiago e o checklist com o Dr. Enor. Registrar a data real do deploy ao publicar a revisão.
2. Conferir HTTP 200, canonical próprio e as duas entradas na versão pública do [sitemap.xml](https://www.clinicamassoni.com.br/sitemap.xml). No Search Console, solicitar a indexação de `/tratamentos/facetas-de-resina` e `/blog/faceta-de-resina-cuidados` e acompanhar a página de [atendimento em Cascavel](https://www.clinicamassoni.com.br/locais-de-atendimento/cascavel).
3. Passados 28 dias completos, comparar as páginas existentes com a janela anterior. Para as URLs novas, registrar data de indexação, consultas visíveis, impressões e cliques como primeira linha de base. Acompanhar `cta_click` por URL no Vercel Analytics e contabilizar avaliações marcadas quando a recepção tiver o dado.
4. Usar as consultas por página e as dúvidas da recepção para decidir a próxima pauta. Candidatos são preparo para avaliação de ortognática ou dúvidas de decisão sobre implantes, depois de verificar o que os textos existentes já cobrem.
