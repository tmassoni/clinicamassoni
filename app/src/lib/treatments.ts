import {
  CLINIC_ADDRESS_CITY,
  CLINIC_ADDRESS_STATE,
  CLINIC_WEBSITE,
  POST_AUTHORS,
  type PostAuthor,
  type PostAuthorId,
} from './constants'
import type { FAQItem } from './seo-schemas'

/**
 * Service pages are data, not nine near-identical route files. Adding
 * treatment #10 is an edit here — the `[slug]` route stays thin. Same shape
 * PATTERNS.md uses for location pages, for the same reason.
 */

export interface TreatmentBullet {
  /** Rendered bold, followed by an em dash. */
  term?: string
  text: string
}

export interface TreatmentSection {
  /** Phrased as the question a patient types. Sentence case. */
  heading: string
  paragraphs: string[]
  bullets?: TreatmentBullet[]
}

export interface Treatment {
  slug: string
  /** Patient-facing name. Becomes the h1. */
  name: string
  pageTitle: string
  metaDescription: string
  categories: string[]
  /** Plain-language definition, directly under the h1. */
  definition: string
  keywords: string[]
  procedureType: string[]
  bodyLocation: string
  preparation: string
  followup: string
  practitioner: PostAuthorId
  sections: TreatmentSection[]
  /** The "when this is not indicated" angle. Required — never omit. */
  notIndicated: TreatmentBullet[]
  /** Blog posts that support this cluster and link up to it. */
  relatedPosts: string[]
  faqs: FAQItem[]
  /** Controls hub order and prev/next. */
  order: number
}

export const TREATMENTS: Treatment[] = [
  {
    slug: 'implantes-dentarios',
    name: 'Implantes dentários',
    pageTitle: 'Implantes dentários em Cascavel, PR',
    metaDescription:
      'Implantes unitários, múltiplos e em área estética, com planejamento por tomografia. Avaliação de osso, indicações e limites do tratamento.',
    categories: ['Implantodontia', 'Cirurgia'],
    definition:
      'O implante dentário substitui a raiz de um dente perdido por um pino de titânio instalado no osso, sobre o qual se instala uma coroa, ponte ou prótese. O que torna o tratamento previsível é a osseointegração — a união direta entre o osso e a superfície do implante —, e é ela que define os prazos de cada etapa.',
    keywords: [
      'implantes dentários Cascavel',
      'implante dentário',
      'implantodontia Cascavel',
      'implante unitário',
      'osseointegração',
    ],
    procedureType: [
      'Implantes dentários unitários',
      'Implantes dentários múltiplos',
      'Implantes imediatos em área estética',
      'Cirurgias guiadas com tecnologia 3D',
    ],
    bodyLocation: 'Maxila e mandíbula',
    preparation:
      'Avaliação clínica, histórico de saúde e tomografia computadorizada para medir altura, espessura e qualidade do osso disponível e localizar estruturas nobres.',
    followup:
      'Acompanhamento durante a osseointegração, instalação da prótese e consultas periódicas de manutenção dos tecidos ao redor do implante.',
    practitioner: 'enor',
    sections: [
      {
        heading: 'Quem pode fazer implante dentário?',
        paragraphs: [
          'Pacientes com osso suficiente ou com possibilidade de reconstruí-lo, e com a saúde bucal estabilizada. A avaliação define qual dos dois cenários se aplica.',
          'Condições sistêmicas não impedem automaticamente o tratamento, mas mudam o planejamento e a conversa sobre prognóstico. Diabetes bem controlado não é impedimento; descompensado, aumenta o risco. O tabagismo eleva de forma consistente o risco de falha e de perimplantite.',
        ],
        bullets: [
          { term: 'Ausência de um dente', text: 'o implante unitário repõe sem envolver os dentes vizinhos, ao contrário da ponte fixa.' },
          { term: 'Ausência de vários dentes', text: 'implantes múltiplos ou prótese sobre implantes, conforme o caso.' },
          { term: 'Dente irrecuperável', text: 'em situações selecionadas, a extração e o implante podem ocorrer no mesmo tempo cirúrgico.' },
          { term: 'Área estética', text: 'exige planejamento adicional de posição e de tecido gengival.' },
        ],
      },
      {
        heading: 'Quanto tempo leva o tratamento?',
        paragraphs: [
          'De três a seis meses entre a instalação do implante e a coroa definitiva, que é o tempo da osseointegração. Casos que exigem enxerto ósseo prévio somam alguns meses a esse prazo.',
          'Há situações de carga imediata, com prótese provisória instalada na mesma sessão, mas isso depende de o implante atingir estabilidade inicial suficiente durante a cirurgia. É uma decisão tomada no momento do procedimento, não uma promessa feita antes.',
        ],
      },
      {
        heading: 'Como é feito o planejamento?',
        paragraphs: [
          'A tomografia mostra o osso em três dimensões e a posição do nervo alveolar inferior, do seio maxilar e das raízes vizinhas. Combinada ao escaneamento intraoral, permite definir a posição de cada implante antes de qualquer procedimento.',
          'Esse planejamento parte de onde o dente precisa ficar, e não apenas de onde há osso disponível. Um implante instalado no osso mas fora da posição protética adequada gera uma prótese difícil de higienizar e de carga mal distribuída.',
        ],
      },
    ],
    notIndicated: [
      { term: 'Doença periodontal ativa', text: 'precisa ser tratada antes; instalar implante em boca com periodontite não controlada compromete o resultado.' },
      { term: 'Osso insuficiente sem preparo', text: 'não descarta o implante, mas coloca o enxerto ósseo antes dele no cronograma.' },
      { term: 'Crescimento ósseo incompleto', text: 'em pacientes muito jovens, o implante pode ficar em posição inadequada com o tempo.' },
      { term: 'Condições sistêmicas descompensadas', text: 'até que estejam controladas.' },
      { term: 'Ausência de disposição para manutenção', text: 'a perimplantite é a principal causa de perda tardia, e ela depende de acompanhamento periódico.' },
    ],
    relatedPosts: ['implante-dentario-passo-a-passo', 'cirurgia-guiada-3d'],
    faqs: [
      {
        question: 'A cirurgia de implante dói?',
        answer:
          'Durante o procedimento não, porque é feito com anestesia local e o osso não tem terminações nervosas de dor. O pós-operatório de um implante unitário costuma ser mais tranquilo do que a maioria das pessoas imagina, com desconforto controlado por medicação nos primeiros dias.',
      },
      {
        question: 'Implante dentário tem rejeição?',
        answer:
          'Rejeição no sentido imunológico não acontece: o titânio é biocompatível. O que pode ocorrer é a falha na osseointegração, ou a perimplantite — inflamação com perda óssea ao redor de um implante já integrado. Tabagismo, diabetes descompensado e higiene inadequada são os principais fatores associados.',
      },
      {
        question: 'Quanto tempo dura um implante dentário?',
        answer:
          'Não há prazo garantido. Implantes bem indicados, bem instalados e mantidos com higiene e consultas regulares podem durar décadas. O que compromete a longevidade não costuma ser o implante em si, mas a saúde dos tecidos ao redor, que depende de manutenção contínua.',
      },
      {
        question: 'Preciso repor um dente que não aparece ao sorrir?',
        answer:
          'Frequentemente sim, e não por estética. A ausência permite que o dente antagonista extrua, que os vizinhos se inclinem para o espaço e que o osso da região se reabsorva. Isso altera a mordida e pode tornar a reabilitação futura mais complexa. A decisão é individual e depende de avaliação.',
      },
    ],
    order: 1,
  },

  {
    slug: 'enxerto-osseo',
    name: 'Enxerto ósseo',
    pageTitle: 'Enxerto ósseo dental em Cascavel, PR',
    metaDescription:
      'Reconstrução de osso para viabilizar implantes: enxerto particulado, em bloco, levantamento de seio maxilar e preservação alveolar.',
    categories: ['Implantodontia', 'Cirurgia'],
    definition:
      'O enxerto ósseo repõe volume ósseo perdido na maxila ou na mandíbula, criando condições para instalar um implante com estabilidade e na posição correta. Ele existe porque o osso que sustenta os dentes é funcional: sem o estímulo da mastigação através do dente, ele é reabsorvido.',
    keywords: [
      'enxerto ósseo Cascavel',
      'enxerto ósseo dental',
      'levantamento de seio maxilar',
      'perda óssea maxilar',
      'preservação alveolar',
    ],
    procedureType: [
      'Enxerto ósseo com materiais sintéticos e biológicos',
      'Levantamento de seio maxilar',
      'Preservação alveolar',
      'Regeneração óssea guiada',
    ],
    bodyLocation: 'Rebordo alveolar da maxila e da mandíbula',
    preparation:
      'Tomografia computadorizada para classificar o defeito ósseo, avaliação de infecção ativa e estabilização da saúde periodontal.',
    followup:
      'Acompanhamento da cicatrização por quatro a nove meses antes da instalação do implante, com orientações pós-operatórias específicas.',
    practitioner: 'enor',
    sections: [
      {
        heading: 'Por que falta osso justamente onde havia um dente?',
        paragraphs: [
          'Porque o osso alveolar existe para sustentar dentes. Removido o dente, o estímulo mecânico cessa e o organismo reabsorve a estrutura que deixou de ter função.',
          'A perda é mais acentuada nos primeiros seis a doze meses após a extração e continua, mais lentamente, ao longo dos anos. Perde-se altura e, principalmente, espessura.',
        ],
        bullets: [
          { term: 'Doença periodontal', text: 'destrói osso ao redor de dentes ainda presentes.' },
          { term: 'Infecção ou cisto', text: 'consome osso na região afetada.' },
          { term: 'Prótese total removível de uso prolongado', text: 'apoia carga sobre o rebordo e acelera a reabsorção.' },
          { term: 'Pneumatização do seio maxilar', text: 'reduz a altura óssea disponível nos molares superiores.' },
        ],
      },
      {
        heading: 'Quais são os tipos de enxerto?',
        paragraphs: [
          'A escolha depende do defeito, medido na tomografia, e não da preferência.',
        ],
        bullets: [
          { term: 'Enxerto particulado', text: 'material em grânulos para preencher defeitos e ganhar espessura, frequentemente com membranas que orientam a formação óssea.' },
          { term: 'Enxerto em bloco', text: 'indicado para defeitos maiores, geralmente com osso do próprio paciente.' },
          { term: 'Levantamento de seio maxilar', text: 'eleva a membrana do seio para ganhar altura na região dos molares superiores.' },
          { term: 'Preservação alveolar', text: 'enxerto feito no mesmo momento da extração, para reduzir a reabsorção antes que ela ocorra.' },
        ],
      },
      {
        heading: 'Quanto tempo espero entre o enxerto e o implante?',
        paragraphs: [
          'Em geral de quatro a nove meses, dependendo do tipo e do volume do enxerto.',
          'Em alguns casos é possível instalar o implante no mesmo tempo cirúrgico, quando ainda existe osso suficiente para dar estabilidade inicial. Essa decisão vem da tomografia, não da conveniência do cronograma.',
        ],
      },
    ],
    notIndicated: [
      { term: 'Infecção ativa na região', text: 'precisa ser resolvida antes de qualquer enxerto.' },
      { term: 'Doença periodontal não controlada', text: 'compromete a cicatrização e o resultado.' },
      { term: 'Tabagismo intenso', text: 'afeta a vascularização e a cicatrização de forma consistente; vale a conversa franca antes de um procedimento de recuperação relevante.' },
      { term: 'Quando existe alternativa sem enxerto', text: 'implantes mais curtos ou posições alternativas podem atender com menos intervenção.' },
      { term: 'Enxerto isolado, sem plano protético', text: 'o enxerto é meio, não fim: só faz sentido dentro de um plano completo de reabilitação.' },
    ],
    relatedPosts: ['enxerto-osseo-dental', 'implante-dentario-passo-a-passo'],
    faqs: [
      {
        question: 'De onde vem o material do enxerto?',
        answer:
          'Existem quatro origens: osso do próprio paciente retirado de outra região da boca, osso de doador humano processado por banco de tecidos, osso de origem animal também processado, e materiais sintéticos. A escolha depende do volume necessário, da região e do tipo de defeito ósseo.',
      },
      {
        question: 'O enxerto ósseo dói muito?',
        answer:
          'Enxertos pequenos com material particulado, feitos no mesmo local do implante, costumam ter pós-operatório semelhante ao de uma cirurgia oral comum. Enxertos maiores que exigem retirada de osso do próprio paciente têm recuperação mais desconfortável, porque há dois locais cirúrgicos em vez de um.',
      },
      {
        question: 'É possível evitar o enxerto?',
        answer:
          'Às vezes, e a melhor forma é a preservação alveolar: enxertar o alvéolo no mesmo momento da extração, o que reduz de forma significativa a reabsorção posterior. Em outros casos é possível usar implantes mais curtos ou posições alternativas. Quando o enxerto é necessário, contorná-lo tende a comprometer a estabilidade do implante.',
      },
      {
        question: 'O que faz o enxerto dar certo?',
        answer:
          'Vascularização, estabilidade e ausência de infecção, nessa ordem. O enxerto funciona como arcabouço para que o osso do próprio paciente cresça através dele, o que depende de sangue chegando ao local e de o enxerto não se mover durante a cicatrização. Por isso as orientações pós-operatórias são mais rígidas que em outras cirurgias.',
      },
    ],
    order: 2,
  },

  {
    slug: 'protocolo-all-on-4',
    name: 'Protocolo sobre implantes (All-on-4)',
    pageTitle: 'Protocolo sobre implantes e prótese fixa em Cascavel',
    metaDescription:
      'Prótese fixa parafusada sobre implantes para reabilitar a arcada inteira. Indicações, alternativas removíveis e a manutenção que o tratamento exige.',
    categories: ['Implantodontia', 'Reabilitação oral'],
    definition:
      'O protocolo sobre implantes reabilita uma arcada inteira com uma prótese fixa parafusada sobre implantes instalados no osso. A técnica All-on-4 é uma variante dessa família, na qual quatro implantes — dois retos na frente e dois inclinados atrás — sustentam a arcada completa.',
    keywords: [
      'protocolo dentário Cascavel',
      'all on 4 Cascavel',
      'prótese fixa sobre implantes',
      'reabilitação de arcada total',
      'substituir dentadura',
    ],
    procedureType: [
      'Protocolo sobre implantes (All-on-4)',
      'Prótese fixa parafusada sobre implantes',
      'Sobredentadura sobre implantes',
      'Reabilitações completas',
    ],
    bodyLocation: 'Arcada superior e inferior',
    preparation:
      'Tomografia para avaliar osso disponível nas regiões anterior e posterior, avaliação dos dentes remanescentes e do prognóstico de cada um.',
    followup:
      'Prótese provisória durante a osseointegração quando indicado, instalação da prótese definitiva e manutenções periódicas com remoção profissional da peça para limpeza e revisão.',
    practitioner: 'enor',
    sections: [
      {
        heading: 'Que problema o protocolo resolve?',
        paragraphs: [
          'A instabilidade e a perda de função de quem usa prótese total removível, sobretudo na arcada inferior.',
          'Uma prótese total apoia-se sobre a gengiva e o rebordo. Isso reduz a força de mastigação, permite movimento durante a fala e a alimentação, e mantém a carga sobre a gengiva — o que acelera a reabsorção do osso e piora a adaptação com o tempo. O protocolo transfere essa carga para o osso, através dos implantes.',
        ],
      },
      {
        heading: 'Por que quatro implantes e não um para cada dente?',
        paragraphs: [
          'Porque a prótese é uma peça única que distribui a carga entre os implantes, o que dispensa um implante por dente.',
          'A técnica posiciona os implantes posteriores de forma inclinada, permitindo ancorá-los em regiões de osso mais disponível e evitando estruturas como o seio maxilar. Dependendo do caso podem ser usados quatro, seis ou mais implantes — o número vem do planejamento, não do nome da técnica.',
        ],
      },
      {
        heading: 'Existe alternativa menos complexa?',
        paragraphs: [
          'Sim, e ela merece estar na comparação: a sobredentadura, uma prótese removível que se prende a dois ou mais implantes por encaixes.',
          'Ela ganha muita estabilidade em relação à dentadura convencional e mantém a vantagem de ser removida pelo paciente para higiene, o que a torna adequada para quem tem limitação de destreza manual ou depende de cuidador. É uma opção frequentemente pouco mencionada.',
        ],
      },
    ],
    notIndicated: [
      { term: 'Quando ainda há dentes com bom prognóstico', text: 'preservar dentes saudáveis quase sempre supera substituí-los; extrair dentes viáveis para instalar um protocolo é uma indicação que precisa ser questionada.' },
      { term: 'Doença periodontal ou infecção ativa', text: 'precisa ser tratada antes.' },
      { term: 'Osso insuficiente mesmo com implantes inclinados', text: 'o enxerto entra no plano antes do protocolo.' },
      { term: 'Tabagismo intenso e diabetes descompensado', text: 'elevam o risco de falha e de perimplantite.' },
      { term: 'Impossibilidade de manutenção', text: 'a higiene sob a prótese exige técnica específica; nesse cenário a sobredentagem removível pode ser mais adequada.' },
    ],
    relatedPosts: ['protese-fixa-sobre-implantes', 'tipos-de-protese-dentaria'],
    faqs: [
      {
        question: 'Qual a diferença entre protocolo e dentadura?',
        answer:
          'A dentadura é uma prótese total removível apoiada sobre a gengiva, retirada pelo paciente para higiene. O protocolo é uma prótese fixa parafusada sobre implantes, que só o dentista remove. A diferença mais sentida é a estabilidade: o protocolo não se move ao mastigar ou falar, e não apoia carga sobre a gengiva.',
      },
      {
        question: 'É verdade que saio com os dentes no mesmo dia?',
        answer:
          'Em muitos casos sim, com uma prótese provisória instalada na mesma sessão. Mas isso depende de os implantes atingirem estabilidade inicial suficiente durante a cirurgia, o que nem sempre acontece. A prótese definitiva vem depois, tipicamente após alguns meses de osseointegração.',
      },
      {
        question: 'Como se higieniza uma prótese fixa sobre implantes?',
        answer:
          'Diariamente e com técnica específica, porque a prótese não é removida pelo paciente. Envolve escovação, escovas interdentais e passadores de fio para limpar sob a estrutura, além de irrigador em muitos casos. É o ponto que mais falha na prática e o que mais compromete o resultado a longo prazo.',
      },
      {
        question: 'Quanto tempo dura o protocolo?',
        answer:
          'Não há prazo garantido. Os implantes podem durar décadas quando bem mantidos; a prótese sobre eles é uma peça sujeita a desgaste e costuma exigir reparos, ajustes e eventualmente substituição ao longo dos anos, o que é previsível e faz parte do plano.',
      },
    ],
    order: 3,
  },

  {
    slug: 'cirurgia-bucomaxilofacial',
    name: 'Cirurgia e traumatologia buco-maxilo-facial',
    pageTitle: 'Cirurgia buco-maxilo-facial em Cascavel, PR',
    metaDescription:
      'Dentes retidos, cistos e lesões, traumatismo facial e cirurgias pré-protéticas. A especialidade que trata cirurgicamente boca, maxilares e face.',
    categories: ['Cirurgia', 'Especialidade'],
    definition:
      'A cirurgia e traumatologia buco-maxilo-facial é a especialidade odontológica que diagnostica e trata cirurgicamente as doenças, lesões e alterações da boca, dos maxilares e da face. É a área que assume o que está além do escopo da clínica odontológica de rotina.',
    keywords: [
      'cirurgia buco-maxilo-facial Cascavel',
      'cirurgião bucomaxilofacial Cascavel',
      'cirurgia oral oeste do Paraná',
      'traumatologia buco-maxilo-facial',
      'biópsia oral',
    ],
    procedureType: [
      'Cirurgias de cistos e tumores bucomaxilofaciais',
      'Extração de dentes retidos',
      'Traumatismo e fraturas faciais',
      'Frenectomias',
      'Biópsias orais',
      'Cirurgias pré-protéticas',
    ],
    bodyLocation: 'Boca, maxilares e face',
    preparation:
      'Anamnese detalhada com histórico de saúde e medicações em uso, exame clínico e exames de imagem — radiografia panorâmica e, quando necessário, tomografia computadorizada.',
    followup:
      'Acompanhamento pós-operatório com controle de cicatrização e, nos casos de lesão, resultado do exame anatomopatológico e conduta subsequente.',
    practitioner: 'enor',
    sections: [
      {
        heading: 'O que a especialidade trata?',
        paragraphs: [
          'O campo é mais amplo do que a maioria das pessoas imagina e se concentra em cinco frentes.',
        ],
        bullets: [
          { term: 'Dentes retidos e inclusos', text: 'sisos, caninos e outros elementos que não irromperam ou irromperam em posição inadequada.' },
          { term: 'Cistos, tumores benignos e lesões', text: 'diagnóstico, biópsia e remoção de lesões dos tecidos moles e dos ossos maxilares.' },
          { term: 'Implantes e reconstrução óssea', text: 'incluindo casos com pouco osso disponível ou anatomia desfavorável.' },
          { term: 'Traumatismo facial', text: 'fraturas de mandíbula, maxila, órbita e ossos da face.' },
          { term: 'Deformidades dos maxilares', text: 'cirurgia ortognática, em conjunto com o ortodontista.' },
        ],
      },
      {
        heading: 'Quando o dentista encaminha ao especialista?',
        paragraphs: [
          'Quando o procedimento exige experiência cirúrgica ou envolve estruturas de risco. Ser encaminhado não significa que o caso é grave — na maior parte das vezes significa que o procedimento pede um profissional que o realiza com frequência.',
        ],
        bullets: [
          { text: 'Siso incluso, horizontalizado ou próximo ao nervo alveolar inferior.' },
          { text: 'Lesão ou nódulo que precisa de biópsia para diagnóstico.' },
          { text: 'Achado radiográfico no osso que precisa ser investigado.' },
          { text: 'Necessidade de implante em região com pouco osso.' },
          { text: 'Indicação de cirurgia ortognática feita com o ortodontista.' },
          { text: 'Trauma facial com suspeita de fratura.' },
        ],
      },
      {
        heading: 'A cirurgia é feita no consultório ou no hospital?',
        paragraphs: [
          'Depende do porte. A maior parte dos procedimentos — extração de sisos, remoção de pequenos cistos, frenectomia, biópsia — é feita em consultório, com anestesia local.',
          'Procedimentos de maior porte, como cirurgia ortognática e tratamento de fraturas faciais, são realizados em ambiente hospitalar, com anestesia geral.',
        ],
      },
      {
        heading: 'Atendimento em Cascavel e região oeste do Paraná',
        paragraphs: [
          `A clínica atende em ${CLINIC_ADDRESS_CITY}, ${CLINIC_ADDRESS_STATE}, e recebe pacientes encaminhados por dentistas de toda a região oeste do Paraná.`,
          'Para quem vem de outra cidade, vale organizar a avaliação e os exames de imagem no mesmo deslocamento sempre que possível — algo que pode ser combinado no agendamento. Se você foi encaminhado, leve os exames já realizados e o relato do profissional que encaminhou.',
        ],
      },
    ],
    notIndicated: [
      { term: 'Quando acompanhar é a conduta correta', text: 'existem lesões e dentes inclusos assintomáticos em que o acompanhamento radiográfico periódico supera a cirurgia.' },
      { term: 'Infecção aguda', text: 'costuma exigir controle antes do procedimento eletivo.' },
      { term: 'Condições sistêmicas descompensadas', text: 'podem adiar procedimentos eletivos até a estabilização.' },
      { term: 'Antes do diagnóstico', text: 'lesões de natureza indefinida pedem biópsia e resultado antes de qualquer conduta definitiva.' },
    ],
    relatedPosts: [
      'cirurgiao-bucomaxilofacial-quando-procurar',
      'lesoes-e-cistos-na-boca',
      'traumatismo-facial-fraturas',
    ],
    faqs: [
      {
        question: 'Qual a diferença entre dentista e cirurgião bucomaxilofacial?',
        answer:
          'Todo cirurgião bucomaxilofacial é cirurgião-dentista; a diferença está na especialização. O clínico geral cuida da saúde bucal de rotina. O bucomaxilofacial é o especialista habilitado a operar boca, maxilares e face, incluindo dentes retidos, cistos, tumores benignos, fraturas faciais e deformidades dos maxilares.',
      },
      {
        question: 'Preciso de encaminhamento para consultar?',
        answer:
          'Não é obrigatório. A maioria dos pacientes chega encaminhada pelo próprio dentista, pelo ortodontista ou por outro profissional de saúde, mas é possível agendar uma avaliação diretamente. O que não muda é a necessidade de exame clínico e, na maioria dos casos, de exame de imagem antes de qualquer indicação cirúrgica.',
      },
      {
        question: 'Quando devo procurar sem esperar encaminhamento?',
        answer:
          'Ferida na boca que não cicatriza em duas semanas, nódulo ou área endurecida, dormência persistente no lábio ou queixo, dificuldade para abrir a boca que não melhora, trauma facial com alteração da mordida, ou inchaço que cresce rapidamente. Nenhum desses sinais significa doença grave por si só, mas todos merecem avaliação.',
      },
      {
        question: 'O que acontece na primeira consulta?',
        answer:
          'Anamnese com histórico de saúde e medicações, exame clínico da boca e dos maxilares, e exames de imagem quando indicados. O plano é discutido em seguida, incluindo alternativas, riscos e o que acontece se nada for feito. Uma avaliação cirúrgica raramente termina com cirurgia marcada no mesmo dia.',
      },
    ],
    order: 4,
  },

  {
    slug: 'extracao-de-sisos',
    name: 'Extração de sisos e dentes retidos',
    pageTitle: 'Extração de siso em Cascavel, PR',
    metaDescription:
      'Nem todo siso precisa sair. Critérios objetivos de indicação, quando acompanhar em vez de extrair, e como é o pós-operatório.',
    categories: ['Cirurgia'],
    definition:
      'A extração de siso é a remoção cirúrgica dos terceiros molares, os últimos dentes a irromper. É indicada quando esses dentes causam ou têm risco documentado de causar problemas — e não simplesmente porque existem.',
    keywords: [
      'extração siso Cascavel',
      'extração de siso',
      'siso incluso',
      'cirurgia de terceiro molar',
      'dente retido',
    ],
    procedureType: [
      'Extração de sisos',
      'Extração de dentes retidos e inclusos',
      'Cirurgia de terceiros molares',
    ],
    bodyLocation: 'Terceiros molares, maxila e mandíbula',
    preparation:
      'Radiografia panorâmica em todos os casos e tomografia quando há proximidade com o nervo alveolar inferior ou com o seio maxilar.',
    followup:
      'Retorno para avaliação da cicatrização e remoção de sutura quando indicado, com orientações específicas de pós-operatório.',
    practitioner: 'enor',
    sections: [
      {
        heading: 'Quando a extração é indicada?',
        paragraphs: ['Os critérios são objetivos e clínicos.'],
        bullets: [
          { term: 'Pericoronarite de repetição', text: 'inflamação recorrente da gengiva que cobre o dente, com dor e dificuldade de abrir a boca.' },
          { term: 'Cárie no siso ou no dente vizinho', text: 'em posição que impede restauração adequada; o segundo molar costuma ser a vítima real.' },
          { term: 'Impossibilidade de higienização', text: 'com acúmulo crônico de placa na região.' },
          { term: 'Cisto ou lesão associada', text: 'ao folículo do dente incluso, identificado em imagem.' },
          { term: 'Reabsorção da raiz do dente vizinho', text: 'causada pela pressão do siso incluso.' },
          { term: 'Indicação ortodôntica ou pré-protética', text: 'quando o dente compromete o plano de tratamento.' },
        ],
      },
      {
        heading: 'Como é feito o procedimento?',
        paragraphs: [
          'Na maior parte dos casos em consultório, com anestesia local, em uma sessão.',
          'Após a avaliação e a imagem, faz-se o acesso com afastamento da gengiva quando o dente está incluso. A remoção pode incluir a divisão do dente em partes, o que costuma ser menos traumático do que removê-lo inteiro. Ao final, limpeza e sutura.',
        ],
      },
      {
        heading: 'Como é o pós-operatório?',
        paragraphs: [
          'O inchaço costuma atingir o pico entre 48 e 72 horas e reduzir ao longo da primeira semana.',
        ],
        bullets: [
          { term: 'Ajuda', text: 'compressa fria nas primeiras 24 a 36 horas, alimentação fria ou morna e macia, repouso relativo, cabeça elevada para dormir.' },
          { term: 'Atrapalha', text: 'fumar, bochechar com força nas primeiras 24 horas, esforço físico intenso, canudo, e interromper a medicação por conta própria.' },
          { term: 'Procure atendimento', text: 'se houver dor que aumenta a partir do terceiro dia, febre, sangramento que não cessa, inchaço progressivo ou dificuldade para engolir.' },
        ],
      },
    ],
    notIndicated: [
      { term: 'Siso irrompido e funcional', text: 'em posição adequada, com gengiva saudável e possível de higienizar, não precisa ser removido apenas por ser siso.' },
      { term: 'Siso profundamente incluso e assintomático', text: 'sem lesão associada, quando a remoção traria risco maior que a manutenção; a conduta correta costuma ser acompanhamento radiográfico periódico.' },
      { term: 'Infecção aguda em curso', text: 'costuma exigir controle antes do procedimento eletivo.' },
    ],
    relatedPosts: ['extracao-de-siso', 'cirurgiao-bucomaxilofacial-quando-procurar'],
    faqs: [
      {
        question: 'Todo mundo precisa extrair os sisos?',
        answer:
          'Não. Sisos que irromperam totalmente, estão em posição funcional, têm gengiva saudável ao redor e podem ser higienizados não precisam ser removidos apenas por serem sisos. A indicação vem de um problema presente ou de um risco documentado, não da existência do dente.',
      },
      {
        question: 'Qual a melhor idade para extrair o siso?',
        answer:
          'Quando há indicação, o período entre o fim da adolescência e por volta dos 25 anos costuma ser mais favorável: a raiz ainda não está completamente formada e o osso é menos denso, o que tende a tornar a recuperação mais rápida. Isso não significa que extrair depois seja impossível.',
      },
      {
        question: 'Posso extrair os quatro sisos de uma vez?',
        answer:
          'Em muitos casos sim, com a vantagem prática de um único pós-operatório. A decisão depende da complexidade de cada dente, das condições de saúde e da tolerância prevista ao procedimento. Casos mais complexos costumam ser divididos por lado, o que permite mastigar do lado oposto durante a recuperação.',
      },
      {
        question: 'Extrair o siso pode causar dormência no lábio?',
        answer:
          'É um risco real, embora pouco frequente, nos sisos inferiores próximos ao nervo alveolar inferior, e a alteração de sensibilidade é temporária na grande maioria dos casos. Por isso a tomografia é indicada quando a radiografia sugere proximidade com o nervo: ela mostra a relação em três dimensões e permite planejar com esse dado em mãos.',
      },
    ],
    order: 5,
  },

  {
    slug: 'cirurgia-ortognatica',
    name: 'Cirurgia ortognática',
    pageTitle: 'Cirurgia ortognática em Cascavel, PR',
    metaDescription:
      'Correção da posição dos maxilares quando a ortodontia isolada não alcança. Indicações, as três fases do tratamento e o cronograma real.',
    categories: ['Cirurgia', 'Ortognática'],
    definition:
      'A cirurgia ortognática reposiciona a maxila, a mandíbula, ou ambas, para corrigir desproporções esqueléticas entre elas. É indicada quando a alteração está no osso, e não apenas na posição dos dentes — situação em que a ortodontia isolada pode compensar, mas não resolver.',
    keywords: [
      'cirurgia ortognática Cascavel',
      'cirurgia ortognática',
      'mordida cruzada',
      'deformidade dentofacial',
      'ortodontia com cirurgia',
    ],
    procedureType: [
      'Cirurgia ortognática de maxila',
      'Cirurgia ortognática de mandíbula',
      'Cirurgia ortognática bimaxilar',
      'Planejamento virtual em 3D',
    ],
    bodyLocation: 'Maxila e mandíbula',
    preparation:
      'Documentação ortodôntica, fotografias, modelos e tomografia, com planejamento conjunto entre ortodontista e cirurgião. Ortodontia pré-cirúrgica de 12 a 18 meses.',
    followup:
      'Internação de um a dois dias, dieta adaptada, acompanhamento da consolidação óssea por meses e ortodontia pós-cirúrgica de finalização.',
    practitioner: 'enor',
    sections: [
      {
        heading: 'Como saber se o caso é ortodôntico ou cirúrgico?',
        paragraphs: [
          'A diferença está em onde mora o problema. Quando os maxilares têm posição adequada e só os dentes estão desalinhados, o tratamento é ortodôntico. Quando existe desproporção entre as bases ósseas, mover dentes apenas compensa a discrepância.',
          'Compensações têm custo: inclinação excessiva dos dentes, retração gengival e instabilidade do resultado.',
        ],
        bullets: [
          { text: 'Queixo muito projetado ou muito retraído em relação ao rosto.' },
          { text: 'Mordida cruzada de um lado ou dos dois.' },
          { text: 'Mordida aberta, com os dentes da frente sem contato.' },
          { text: 'Assimetria facial evidente.' },
          { text: 'Dificuldade real de mastigação, mordendo apenas em alguns pontos.' },
          { text: 'Respiração bucal e ronco relacionados à posição da mandíbula.' },
        ],
      },
      {
        heading: 'Quais são as fases do tratamento?',
        paragraphs: [
          'São três, e a cirurgia é o evento mais curto de um tratamento longo — raramente menos de um ano e meio no total.',
        ],
        bullets: [
          { term: 'Ortodontia pré-cirúrgica', text: '12 a 18 meses. Alinha os dentes dentro de cada arcada e os descompensa, preparando o encaixe pós-operatório. Pode piorar temporariamente a aparência da mordida, e isso é esperado.' },
          { term: 'Cirurgia', text: 'em ambiente hospitalar, sob anestesia geral, com acessos por dentro da boca na maioria dos casos. Os ossos são reposicionados e fixados com placas e parafusos de titânio.' },
          { term: 'Ortodontia pós-cirúrgica', text: '6 a 12 meses. Finaliza o encaixe na nova posição óssea e estabiliza o resultado.' },
        ],
      },
      {
        heading: 'Como é a recuperação?',
        paragraphs: [
          'O inchaço é significativo na primeira semana e reduz de forma importante ao longo do primeiro mês, embora um edema residual possa permanecer por meses.',
          'A dieta é líquida e depois pastosa por várias semanas. O retorno ao trabalho costuma acontecer entre duas e quatro semanas em atividades sem esforço físico. A consolidação óssea leva meses.',
        ],
      },
    ],
    notIndicated: [
      { term: 'Crescimento facial ainda em curso', text: 'operar antes do fim do crescimento arrisca recidiva; em geral aguarda-se por volta dos 18 anos, com avaliação individual.' },
      { term: 'Discrepância pequena e compensável', text: 'quando a ortodontia resolve sem prejuízo aos dentes e ao periodonto.' },
      { term: 'Doença periodontal ativa ou cáries não tratadas', text: 'a saúde bucal precisa estar estabilizada antes.' },
      { term: 'Expectativa puramente estética', text: 'sem alteração funcional que justifique, a indicação precisa ser reavaliada com honestidade.' },
      { term: 'Impossibilidade de aderir ao tratamento longo', text: 'incluindo a fase ortodôntica e o acompanhamento pós-operatório.' },
    ],
    relatedPosts: ['cirurgia-ortognatica', 'cirurgiao-bucomaxilofacial-quando-procurar'],
    faqs: [
      {
        question: 'Cirurgia ortognática é estética ou funcional?',
        answer:
          'É funcional, com efeito estético. A indicação nasce de um problema de função — mastigação, respiração, fala, sobrecarga da articulação — causado pela posição desproporcional dos maxilares. A mudança na aparência do rosto é consequência de corrigir essa posição, não o objetivo que justifica a cirurgia.',
      },
      {
        question: 'Preciso usar aparelho antes da cirurgia?',
        answer:
          'Na grande maioria dos casos, sim. A ortodontia pré-cirúrgica alinha os dentes dentro de cada arcada e os posiciona de modo que, quando os maxilares forem movidos, encaixem corretamente. Sem essa fase, a cirurgia move ossos que não têm onde se encaixar.',
      },
      {
        question: 'Vou ficar com a boca fechada com arames?',
        answer:
          'Raramente, hoje. As técnicas atuais usam fixação interna rígida com placas e parafusos de titânio, o que na maioria dos casos dispensa o bloqueio maxilomandibular prolongado. Costuma-se usar elásticos guias para orientar a mordida durante a cicatrização.',
      },
      {
        question: 'Quanto tempo dura o tratamento completo?',
        answer:
          'Na maioria dos casos entre um ano e meio e três anos, somando ortodontia pré-cirúrgica, cirurgia e ortodontia de finalização. Quem procura a cirurgia esperando uma solução rápida precisa saber disso antes de começar.',
      },
    ],
    order: 6,
  },

  {
    slug: 'cirurgia-plastica-periodontal',
    name: 'Cirurgia plástica periodontal',
    pageTitle: 'Cirurgia plástica periodontal em Cascavel, PR',
    metaDescription:
      'Recobrimento de recessões gengivais, aumento de coroa clínica e gengivoplastia. Quando a gengiva exige cirurgia e quando não exige.',
    categories: ['Cirurgia', 'Periodontia'],
    definition:
      'A cirurgia plástica periodontal reúne os procedimentos que corrigem a posição, o volume e o contorno da gengiva. Trata desde raízes expostas por retração gengival até desproporções entre dente e gengiva que comprometem função e aparência.',
    keywords: [
      'cirurgia plástica periodontal Cascavel',
      'recessão gengival Cascavel',
      'recobrimento de raízes Cascavel',
      'aumento de coroa clínica',
      'gengivoplastia',
    ],
    procedureType: [
      'Cirurgia plástica periodontal',
      'Recobrimento de recessões gengivais',
      'Tratamento de raízes expostas',
      'Aumento de coroa clínica',
      'Gengivoplastia estética',
    ],
    bodyLocation: 'Gengiva e tecidos periodontais',
    preparation:
      'Controle prévio da doença periodontal, avaliação da causa da retração — escovação traumática, fatores oclusais, anatomia — e planejamento do tipo de enxerto quando indicado.',
    followup:
      'Cuidados específicos de higiene na área operada durante a cicatrização e acompanhamento periódico, incluindo correção do fator causal.',
    practitioner: 'enor',
    sections: [
      {
        heading: 'O que a retração gengival causa?',
        paragraphs: [
          'A exposição da raiz, que não é coberta por esmalte. Isso produz sensibilidade, maior risco de lesão de cárie radicular e alteração no contorno do sorriso.',
          'A retração tem causas identificáveis, e tratá-las é parte do tratamento: doença periodontal, escovação com força excessiva e cerdas duras, fatores oclusais e características anatômicas do tecido.',
        ],
      },
      {
        heading: 'Quando o recobrimento de raiz é indicado?',
        paragraphs: [
          'Quando há sensibilidade persistente, progressão da retração, risco de cárie radicular, ou quando a exposição compromete o contorno do sorriso — e quando as condições do tecido permitem prever cobertura.',
          'O resultado depende do tipo de defeito. Recessões com osso e papilas interdentais preservados têm prognóstico de recobrimento melhor do que aquelas com perda óssea interproximal, e essa distinção deve ser explicada antes do procedimento.',
        ],
      },
      {
        heading: 'O que é aumento de coroa clínica?',
        paragraphs: [
          'É o procedimento que expõe mais estrutura dental, reposicionando gengiva e, quando necessário, osso.',
          'Tem duas indicações distintas: funcional, quando uma fratura ou cárie se estende abaixo da gengiva e é preciso expor margem sadia para restaurar; e estética, quando a proporção entre dente e gengiva compromete a harmonia do sorriso — o chamado sorriso gengival, que também pode ter outras causas.',
        ],
      },
    ],
    notIndicated: [
      { term: 'Doença periodontal ativa', text: 'precisa ser tratada e estabilizada antes de qualquer cirurgia plástica.' },
      { term: 'Causa não corrigida', text: 'operar sem mudar a escovação traumática ou o fator oclusal tende a produzir recidiva.' },
      { term: 'Perda óssea interproximal importante', text: 'limita o recobrimento previsível; a expectativa precisa ser ajustada antes.' },
      { term: 'Tabagismo intenso', text: 'compromete a vascularização e a previsibilidade do enxerto gengival.' },
      { term: 'Sensibilidade sem retração', text: 'quando a causa é outra, o tratamento é dessensibilizante ou restaurador, não cirúrgico.' },
    ],
    relatedPosts: ['gengiva-sangrando', 'sensibilidade-nos-dentes'],
    faqs: [
      {
        question: 'A gengiva retraída volta ao lugar sozinha?',
        answer:
          'Não. A retração gengival não se reverte espontaneamente. O que se pode fazer é interromper a progressão corrigindo a causa, e em casos selecionados recobrir a raiz cirurgicamente. Por isso identificar e corrigir o fator causal vem antes de qualquer decisão cirúrgica.',
      },
      {
        question: 'O recobrimento de raiz sempre cobre toda a exposição?',
        answer:
          'Nem sempre, e isso depende do tipo de defeito. Recessões com osso e papilas interdentais preservados têm prognóstico de recobrimento mais previsível; quando há perda óssea entre os dentes, a cobertura tende a ser parcial. Essa expectativa deve ser alinhada antes do procedimento.',
      },
      {
        question: 'A cirurgia de gengiva dói?',
        answer:
          'Durante o procedimento não, porque é feito com anestesia local. O desconforto pós-operatório costuma ser moderado e maior quando há área doadora de enxerto no palato. A cicatrização inicial leva cerca de duas semanas, com cuidados específicos de higiene na área operada.',
      },
      {
        question: 'Escovar com mais força limpa melhor?',
        answer:
          'Não, e é uma das causas mais comuns de retração gengival. Força excessiva com cerdas duras desgasta o esmalte próximo à gengiva e contribui para a retração. A limpeza depende de técnica e de tempo, não de pressão.',
      },
    ],
    order: 7,
  },

  {
    slug: 'dentistica-restauradora',
    name: 'Dentística restauradora',
    pageTitle: 'Dentística restauradora em Cascavel, PR',
    metaDescription:
      'Restaurações diretas e indiretas em resina e porcelana, com foco em preservar estrutura dental. Cárie, fraturas, desgastes e estética anterior.',
    categories: ['Dentística', 'Estética'],
    definition:
      'A dentística restauradora trata as alterações da estrutura do dente — cárie, fratura, desgaste, manchas, restaurações antigas com falha — devolvendo forma, função e aparência. O princípio que a orienta é a odontologia minimamente invasiva: remover o mínimo necessário de tecido sadio.',
    keywords: [
      'dentística restauradora Cascavel',
      'restauração de resina composta',
      'facetas em resina composta',
      'restauração em porcelana',
      'estética dental Cascavel',
    ],
    procedureType: [
      'Restaurações diretas em resina composta',
      'Restaurações indiretas em resina e porcelana',
      'Facetas em resina composta e porcelana',
      'Recontorno estético',
      'Reabilitação com resina composta',
    ],
    bodyLocation: 'Dentes anteriores e posteriores',
    preparation:
      'Exame clínico com identificação do fator causal — dieta, higiene, bruxismo, refluxo —, avaliação da mordida e planejamento de forma e cor.',
    followup:
      'Consultas periódicas com polimento, checagem de margens e reparo precoce de infiltrações, além do controle do fator causal.',
    practitioner: 'thiago',
    sections: [
      {
        heading: 'Por que preservar estrutura dental importa?',
        paragraphs: [
          'Porque um dente não regenera esmalte nem dentina, e cada procedimento que remove tecido o deixa mais frágil. A perda é cumulativa ao longo da vida.',
          'A sequência clássica — restauração pequena, depois maior, depois coroa, depois canal, depois extração — não é o destino inevitável de um dente. É o resultado de intervenções sucessivas, cada uma removendo um pouco mais. Interromper esse ciclo cedo é o objetivo da especialidade.',
        ],
        bullets: [
          { text: 'Nem toda mancha escura é cárie que exige broca: lesões iniciais em esmalte, sem cavitação, podem ser remineralizadas e acompanhadas.' },
          { text: 'Nem toda restauração antiga precisa ser trocada: se está íntegra e selada, trocá-la remove estrutura sem ganho.' },
          { text: 'Nem todo dente escurecido precisa de faceta: clareamento pode resolver sem desgaste.' },
        ],
      },
      {
        heading: 'Restauração direta ou indireta?',
        paragraphs: [
          'A escolha depende de quanto sobrou do dente, de onde ele está na arcada e da carga que vai receber — não da preferência por um material.',
        ],
        bullets: [
          { term: 'Direta', text: 'resina aplicada e esculpida no próprio dente, em sessão única. Indicada quando resta estrutura suficiente para dar suporte. Custo menor, reparável na cadeira, permite abordagem aditiva.' },
          { term: 'Indireta', text: 'peça confeccionada fora da boca, em resina ou porcelana, e cimentada depois. Indicada quando a perda de estrutura é grande, especialmente em dentes posteriores. Melhor reprodução da anatomia e melhor comportamento sob carga.' },
        ],
      },
      {
        heading: 'O que faz a restauração durar?',
        paragraphs: [
          'Três fatores, e nenhum deles é a marca do material.',
        ],
        bullets: [
          { term: 'O diagnóstico da causa', text: 'restaurar sem mudar o que produziu a cárie repete o problema em outro dente, ou no mesmo.' },
          { term: 'O isolamento durante o procedimento', text: 'a adesão da resina ao dente depende de campo seco.' },
          { term: 'A manutenção', text: 'higiene diária e consultas periódicas que detectam infiltração enquanto o reparo ainda é pequeno.' },
        ],
      },
    ],
    notIndicated: [
      { term: 'Dor espontânea, prolongada ou noturna', text: 'sugere comprometimento da polpa e pode indicar tratamento de canal antes de qualquer restauração.' },
      { term: 'Estrutura remanescente muito reduzida', text: 'pode exigir coroa, o que já é território de prótese.' },
      { term: 'Doença periodontal ativa', text: 'não faz sentido restaurar dentes cujo suporte está sendo perdido.' },
      { term: 'Bruxismo não controlado', text: 'fratura restaurações novas com a mesma facilidade com que desgastou as antigas; a placa de proteção faz parte do plano.' },
      { term: 'Desgaste generalizado com perda de altura da mordida', text: 'é caso de reabilitação, não de restaurações isoladas.' },
    ],
    relatedPosts: [
      'dentistica-restauradora',
      'dente-quebrado-o-que-fazer',
      'recontorno-estetico-resina-composta',
    ],
    faqs: [
      {
        question: 'Qual a diferença entre restauração direta e indireta?',
        answer:
          'A direta é feita em sessão única, com a resina aplicada e esculpida diretamente no dente. A indireta é confeccionada fora da boca, em resina ou porcelana, a partir de molde ou escaneamento, e depois cimentada. A indireta costuma ser indicada quando a perda de estrutura é grande, por permitir melhor reprodução da anatomia.',
      },
      {
        question: 'Restauração de resina escurece com o tempo?',
        answer:
          'Pode escurecer e manchar nas margens ao longo dos anos, especialmente com café, chá, vinho e tabaco. Polimento nas consultas de manutenção recupera boa parte do brilho e da cor. É uma característica do material, prevista desde o início, e não necessariamente sinal de que a restauração falhou.',
      },
      {
        question: 'Preciso trocar restaurações antigas de amálgama?',
        answer:
          'Não pela idade nem pelo material em si. A troca se justifica quando há fratura, infiltração, cárie na margem ou fratura do dente ao redor. Substituir restaurações íntegras remove mais estrutura sadia a cada troca, o que enfraquece o dente ao longo da vida.',
      },
      {
        question: 'Dente restaurado pode ter cárie de novo?',
        answer:
          'Pode. A cárie recorrente aparece na interface entre a restauração e o dente, onde a placa se acumula e a higiene não alcança. Restaurar sem mudar o que causou a cárie tende a repetir o problema, e por isso o tratamento inclui identificar o fator de risco.',
      },
    ],
    order: 8,
  },

  {
    slug: 'protese-dentaria',
    name: 'Prótese dentária',
    pageTitle: 'Prótese dentária em Cascavel, PR',
    metaDescription:
      'Coroas, pontes, próteses removíveis e próteses sobre implantes. Como se escolhe entre elas e o que cada uma exige de manutenção.',
    categories: ['Prótese', 'Reabilitação oral'],
    definition:
      'A prótese dentária substitui dentes perdidos ou recobre dentes muito comprometidos, devolvendo mastigação, fala e estética. Os tipos se organizam por duas variáveis: se são removíveis pelo paciente ou fixas, e sobre o que se apoiam — dentes, gengiva ou implantes.',
    keywords: [
      'prótese dentária Cascavel',
      'coroa dentária',
      'ponte fixa',
      'prótese removível',
      'sobredentadura',
    ],
    procedureType: [
      'Próteses unitárias e de múltiplos elementos',
      'Coroas e pontes fixas',
      'Próteses parciais e totais removíveis',
      'Próteses sobre implantes',
      'Sobredentaduras',
    ],
    bodyLocation: 'Arcadas dentárias',
    preparation:
      'Avaliação dos dentes remanescentes e do suporte ósseo, tratamento prévio de cárie e doença periodontal, e definição do tipo de prótese conforme função, higiene e manutenção possíveis.',
    followup:
      'Ajustes iniciais, reembasamentos em próteses removíveis, revisão periódica de componentes e avaliação dos tecidos de suporte.',
    practitioner: 'thiago',
    sections: [
      {
        heading: 'Quais são os tipos de prótese?',
        paragraphs: [
          'Eles se distinguem pelo apoio e pela possibilidade de remoção.',
        ],
        bullets: [
          { term: 'Coroa unitária', text: 'recobre um dente comprometido. Exige preparo, ou seja, desgaste do dente — por isso é indicada quando resta pouca estrutura.' },
          { term: 'Ponte fixa', text: 'repõe dentes ausentes apoiando-se nos vizinhos, que precisam ser preparados. Desgasta dois dentes saudáveis para repor um ausente.' },
          { term: 'Prótese parcial removível', text: 'apoia-se nos remanescentes e na gengiva, presa por grampos ou encaixes. Custo mais acessível, estabilidade menor.' },
          { term: 'Prótese total removível', text: 'a dentadura. Apoia sobre o rebordo; a carga sobre a gengiva contribui para a reabsorção óssea ao longo dos anos.' },
          { term: 'Prótese sobre implantes', text: 'coroa unitária, sobredentadura ou protocolo fixo, sem envolver os dentes vizinhos.' },
        ],
      },
      {
        heading: 'Como se escolhe entre elas?',
        paragraphs: [
          'Por quatro perguntas, nesta ordem — e a última costuma ser a mais determinante.',
        ],
        bullets: [
          { term: 'O que ainda existe', text: 'quantos dentes, com que suporte ósseo e qual prognóstico. Dentes com bom prognóstico se preservam.' },
          { term: 'Quanto osso há disponível', text: 'define se implantes são viáveis sem enxerto, com enxerto, ou não são.' },
          { term: 'Quais as condições de saúde e higiene', text: 'diabetes, tabagismo, destreza manual, disponibilidade para retornos.' },
          { term: 'O que o paciente consegue manter', text: 'uma prótese excelente no papel e impossível de higienizar é uma escolha ruim.' },
        ],
      },
      {
        heading: 'Prótese fixa é sempre melhor que removível?',
        paragraphs: [
          'É mais estável na maioria dos casos, mas nem sempre a mais indicada — e apresentar as duas como equivalentes em tudo seria impreciso.',
          'Removíveis são retiradas para higiene, o que é uma vantagem real para quem tem limitação de destreza manual ou depende de cuidador. Também podem ser a opção viável quando falta suporte ósseo ou dentário para uma solução fixa.',
        ],
      },
    ],
    notIndicated: [
      { term: 'Doença periodontal ativa', text: 'prótese sobre suporte doente falha; tratar antes, sempre.' },
      { term: 'Cáries não tratadas nos dentes de apoio', text: 'comprometem o pilar e, com ele, toda a prótese.' },
      { term: 'Dentes de prognóstico duvidoso como pilares', text: 'se o pilar for perdido, a prótese é perdida junto.' },
      { term: 'Ponte fixa quando o implante é viável', text: 'desgastar dois dentes saudáveis para repor um ausente merece ser comparado com a alternativa que não os envolve.' },
      { term: 'Expectativa incompatível', text: 'nenhuma prótese devolve exatamente a sensação de um dente natural, e nenhuma dispensa manutenção.' },
    ],
    relatedPosts: ['tipos-de-protese-dentaria', 'reabilitacao-bucal-resina-composta'],
    faqs: [
      {
        question: 'Qual é a melhor prótese dentária?',
        answer:
          'Não existe uma melhor em abstrato — existe a adequada para cada situação. A escolha depende de quantos dentes faltam, do estado dos remanescentes, da quantidade de osso disponível, das condições de saúde geral e da capacidade de higienização.',
      },
      {
        question: 'Coroa dentária precisa desgastar o dente?',
        answer:
          'Sim. A coroa envolve o dente, e para isso ele precisa ser preparado; o desgaste é inerente à técnica. Por isso a coroa é indicada quando já há grande perda de estrutura, fratura extensa ou dente tratado endodonticamente e fragilizado. Quando resta bastante dente sadio, uma restauração costuma preservar mais.',
      },
      {
        question: 'Prótese removível machuca no começo?',
        answer:
          'É comum haver pontos de pressão nas primeiras semanas, resolvidos com ajustes. Dor persistente, ferida que não cicatriza ou prótese que solta com frequência não são adaptação — são sinal de que a peça precisa ser ajustada ou reavaliada.',
      },
      {
        question: 'Posso trocar minha dentadura por algo fixo?',
        answer:
          'Frequentemente sim, com implantes. As duas rotas mais comuns são a sobredentadura, removível mas presa a implantes, e o protocolo, que é uma prótese fixa parafusada. A viabilidade depende do osso disponível, avaliado por tomografia, e das condições de manutenção.',
      },
    ],
    order: 9,
  },
]

export const TREATMENTS_BY_ORDER = [...TREATMENTS].sort((a, b) => a.order - b.order)

export function getTreatmentBySlug(slug: string): Treatment | null {
  return TREATMENTS.find((treatment) => treatment.slug === slug) ?? null
}

export function getAllTreatmentSlugs(): string[] {
  return TREATMENTS.map((treatment) => treatment.slug)
}

export function getTreatmentPath(slug: string): string {
  return `/tratamentos/${slug}`
}

export function getTreatmentUrl(slug: string): string {
  return `${CLINIC_WEBSITE}${getTreatmentPath(slug)}`
}

export function getTreatmentPractitioner(treatment: Treatment): PostAuthor {
  return POST_AUTHORS[treatment.practitioner]
}

/** Previous and next sibling in hub order, for the prev/next links. */
export function getTreatmentSiblings(slug: string): {
  previous: Treatment | null
  next: Treatment | null
} {
  const index = TREATMENTS_BY_ORDER.findIndex((treatment) => treatment.slug === slug)
  if (index === -1) return { previous: null, next: null }

  return {
    previous: TREATMENTS_BY_ORDER[index - 1] ?? null,
    next: TREATMENTS_BY_ORDER[index + 1] ?? null,
  }
}

/** MedicalProcedure node, cross-referencing the sitewide graph by @id. */
export function generateTreatmentSchema(treatment: Treatment) {
  const practitioner = getTreatmentPractitioner(treatment)
  const url = getTreatmentUrl(treatment.slug)

  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalProcedure',
    '@id': url,
    url,
    name: treatment.name,
    description: treatment.definition,
    procedureType: treatment.procedureType,
    bodyLocation: {
      '@type': 'AnatomicalStructure',
      name: treatment.bodyLocation,
    },
    preparation: treatment.preparation,
    followup: treatment.followup,
    howPerformed: treatment.sections
      .map((section) => section.paragraphs.join(' '))
      .join(' '),
    inLanguage: 'pt-BR',
    performer: {
      '@type': 'Physician',
      name: practitioner.name,
      jobTitle: practitioner.title,
      knowsAbout: practitioner.knowsAbout,
      hasCredential: {
        '@type': 'EducationalOccupationalCredential',
        credentialCategory: 'Registro Profissional',
        identifier: practitioner.cro,
        recognizedBy: {
          '@type': 'Organization',
          name: 'Conselho Regional de Odontologia do Paraná',
          alternateName: 'CRO-PR',
          url: 'https://www.cropr.org.br',
        },
      },
      worksFor: { '@id': `${CLINIC_WEBSITE}/#organization` },
    },
    areaServed: {
      '@type': 'City',
      name: CLINIC_ADDRESS_CITY,
      addressRegion: CLINIC_ADDRESS_STATE,
    },
    isPartOf: { '@id': `${CLINIC_WEBSITE}/#website` },
  }
}

/** Hub-level schema: the organization's service catalogue. */
export function generateTreatmentsHubSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'MedicalOrganization',
    '@id': `${CLINIC_WEBSITE}/tratamentos#catalog`,
    url: `${CLINIC_WEBSITE}/tratamentos`,
    name: 'Tratamentos — Dr. Enor Massoni',
    parentOrganization: { '@id': `${CLINIC_WEBSITE}/#organization` },
    availableService: TREATMENTS_BY_ORDER.map((treatment) => ({
      '@type': 'MedicalProcedure',
      '@id': getTreatmentUrl(treatment.slug),
      name: treatment.name,
      description: treatment.definition,
    })),
  }
}
