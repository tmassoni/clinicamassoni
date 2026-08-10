import {
  CLINIC_ADDRESS_CITY,
  CLINIC_ADDRESS_FULL,
  CLINIC_ADDRESS_STATE,
  CLINIC_HOURS_FORMATTED,
  CONTACT_PHONE_NUMBER,
  CONTACT_WHATSAPP_FORMATTED,
  DOCTOR_CRO,
  DOCTOR_NAME,
  DOCTOR_THIAGO_CRO,
  DOCTOR_THIAGO_NAME,
} from './constants'
import type { FAQItem } from './seo-schemas'

/**
 * Practice-level questions only — location, hours, how the first visit works.
 *
 * Deliberately *not* clinical: those belong to the treatment pages, which
 * already carry their own FAQPage schema. Repeating clinical FAQs here would
 * put the same question on two URLs, which is the cannibalization the
 * ownership table exists to prevent.
 *
 * Every answer below is derived from a fact already in `constants.ts`. Nothing
 * here asserts a practice policy that has not been supplied.
 *
 * TODO_CLIENT: two questions patients demonstrably ask are missing because the
 * answers are not in the brief — which health plans/convênios are accepted, and
 * payment terms. Note that art. 44 I of the Código de Ética prohibits
 * advertising prices and payment methods, so the second may not be publishable
 * at all; confirm with counsel before adding.
 */
export const HOME_FAQS: FAQItem[] = [
  {
    question: 'Onde fica a clínica?',
    answer: `A clínica fica em ${CLINIC_ADDRESS_FULL}. O atendimento é em ${CLINIC_ADDRESS_CITY}, ${CLINIC_ADDRESS_STATE}, e recebe pacientes encaminhados por dentistas de toda a região oeste do Paraná.`,
  },
  {
    question: 'Qual é o horário de atendimento?',
    answer: `${CLINIC_HOURS_FORMATTED.weekdays}. ${CLINIC_HOURS_FORMATTED.saturday}. ${CLINIC_HOURS_FORMATTED.sunday}.`,
  },
  {
    question: 'Como agendar uma consulta?',
    answer: `Pelo WhatsApp ${CONTACT_WHATSAPP_FORMATTED} ou pelo telefone ${CONTACT_PHONE_NUMBER}. O WhatsApp costuma ser o canal mais rápido para verificar horários disponíveis.`,
  },
  {
    question: 'Preciso de encaminhamento para marcar?',
    answer:
      'Não é obrigatório. Muitos pacientes chegam encaminhados pelo próprio dentista ou pelo ortodontista, mas é possível agendar uma avaliação diretamente. Se você foi encaminhado, leve os exames já realizados e o relato do profissional que encaminhou.',
  },
  {
    question: 'Quem são os profissionais que atendem?',
    answer: `${DOCTOR_NAME} (${DOCTOR_CRO}), especialista em Cirurgia e Traumatologia Buco-Maxilo-Facial, e ${DOCTOR_THIAGO_NAME} (${DOCTOR_THIAGO_CRO}), especialista em Dentística Restauradora. As áreas de atuação de cada um estão descritas na página Sobre.`,
  },
  {
    question: 'O que acontece na primeira consulta?',
    answer:
      'Anamnese com histórico de saúde e medicações em uso, exame clínico e, quando necessário, exames de imagem. O plano de tratamento é discutido em seguida, incluindo alternativas e o que acontece se nada for feito. Uma avaliação cirúrgica raramente termina com procedimento marcado no mesmo dia.',
  },
]
