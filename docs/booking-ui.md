# Agendamento após leitura — 2026-11-12

O bloco compartilhado `BlogCtaCard` atende blog, tratamentos e página Sobre.
A mudança deixa explícita a escolha entre WhatsApp e telefone, usando os mesmos
números, mensagem genérica e eventos já existentes. O texto clínico recebido
pelas propriedades `heading`/`body` permanece intacto.

O desenho mantém azul, serifada e tipografia do site. Texto à esquerda e ações
agrupadas à direita em desktop; fluxo vertical em telas menores. A ação principal
nomeia o WhatsApp e a secundária mostra o telefone. Não há botão flutuante novo,
modal, agendamento automático, novo serviço de analytics ou dado adicional.

O evento de WhatsApp preserva a etiqueta existente; telefone usa a mesma etiqueta
com sufixo `_phone`. Os dois passam pelo componente rastreado que já registra
canal, seção e caminho. Clique continua sendo intenção de contato, não consulta
marcada. Os testes não enviam mensagem nem fazem chamada.

Hipótese: tornar o canal visível e oferecer telefone no momento de decisão pode
facilitar contato. Verificar eventos por canal e página após publicação aprovada;
nenhuma promessa de aumento de cliques ou posição. Capturas antes/depois e checks
reais ficam na descrição do PR.
