import { confirmed, pending } from './helpers';
import type { LegalPage } from '@/config/types';

/**
 * These pages describe only what is actually true of this MVP. Anything that
 * has not been decided is marked `a-confirmar` instead of being invented.
 */

export const privacyPolicy: LegalPage = {
  title: confirmed('Política de Privacidade'),
  description: confirmed(
    'Como os dados enviados pelo formulário de lista de espera são tratados neste site.',
  ),
  lastReviewed: pending(
    'Versão inicial (MVP). Este texto ainda não passou por revisão jurídica.',
    'Necessária revisão jurídica e aprovação do profissional antes da publicação.',
  ),
  sections: [
    {
      id: 'controlador',
      heading: confirmed('Quem é responsável pelos dados'),
      paragraphs: [
        confirmed(
          'O responsável pelo tratamento dos dados coletados neste site é Felipe Gonzaga de Carvalho Gondim, psicólogo inscrito no CRP 02/23810, que atua em Pernambuco e realiza atendimento exclusivamente on-line.',
        ),
        pending(
          'O canal oficial para contato sobre privacidade ainda não foi definido e, por isso, não é divulgado nesta versão.',
          'Depende da definição do e-mail ou canal profissional oficial.',
        ),
      ],
    },
    {
      id: 'dados-coletados',
      heading: confirmed('Quais dados são coletados'),
      paragraphs: [
        confirmed(
          'Este site coleta apenas os dados que você digita voluntariamente no formulário de lista de espera:',
        ),
      ],
      bullets: [
        confirmed('Nome completo (obrigatório) — para saber com quem falar no contato.'),
        confirmed('E-mail (obrigatório) — para retornar o contato sobre a lista de espera.'),
        confirmed(
          'WhatsApp ou telefone (opcional) — alternativa de contato, caso você prefira.',
        ),
        confirmed(
          'Preferência de contato (opcional) — para usar o canal que você considera mais confortável.',
        ),
        confirmed(
          'Disponibilidade geral, por turno (opcional) — para organizar a agenda; não é um agendamento.',
        ),
        confirmed(
          'Como conheceu o trabalho (opcional) — informação de contexto, sem uso publicitário.',
        ),
        confirmed(
          'Aceite da Política de Privacidade (obrigatório) — registro de que você autorizou o contato.',
        ),
      ],
    },
    {
      id: 'dados-sensiveis',
      heading: confirmed('Dados que este site não coleta'),
      paragraphs: [
        confirmed(
          'O formulário não é uma triagem clínica. Ele não pergunta e não deve receber diagnóstico, sintomas, medicação, histórico de saúde, identidade de gênero, orientação sexual, relato clínico ou qualquer outro dado sensível. Se algum desses dados for enviado por engano em um campo livre, ele será descartado.',
        ),
        confirmed(
          'O site não utiliza cookies de rastreamento, não possui ferramentas de analytics, não usa pixels de redes sociais e não grava sessões de navegação. As fontes tipográficas são servidas pelo próprio site, sem requisições a serviços de terceiros durante a navegação.',
        ),
      ],
    },
    {
      id: 'finalidade',
      heading: confirmed('Para que os dados são usados'),
      paragraphs: [
        confirmed(
          'Os dados são usados exclusivamente para entrar em contato quando houver disponibilidade na agenda e verificar se você ainda tem interesse em iniciar o acompanhamento. Não há envio de newsletter, não há publicidade e os dados não são vendidos, alugados ou compartilhados para fins comerciais.',
        ),
        pending(
          'A base legal aplicável a cada finalidade (consentimento e/ou procedimentos preliminares relacionados a um contrato) ainda será validada juridicamente.',
          'Depende de validação jurídica da base legal segundo a LGPD.',
        ),
      ],
    },
    {
      id: 'destino',
      heading: confirmed('Para onde os dados vão'),
      paragraphs: [
        confirmed(
          'O envio do formulário é processado no próprio servidor do site. Esta versão pode operar em dois modos: em modo de teste, nenhum dado é armazenado nem transmitido a terceiros — o envio apenas simula o resultado; em modo de integração, os dados são encaminhados para um único destino configurado pelo profissional.',
        ),
        pending(
          'O destino definitivo dos dados (e o eventual serviço de terceiro envolvido) ainda não foi contratado nem configurado.',
          'Depende da escolha do canal operacional: e-mail, planilha, CRM ou outro serviço.',
        ),
        confirmed(
          'Os registros técnicos do servidor guardam apenas informações não identificáveis sobre o envio — data e hora e o resultado da operação. O conteúdo dos campos preenchidos não é registrado em log.',
        ),
      ],
    },
    {
      id: 'retencao',
      heading: confirmed('Por quanto tempo os dados são guardados'),
      paragraphs: [
        pending(
          'A previsão de referência é manter os contatos da lista de espera por até 180 dias, contados do envio, ou até que você peça a exclusão. Esse prazo ainda precisa ser confirmado pelo profissional.',
          'Prazo de retenção de 180 dias é uma referência do estúdio e depende de confirmação.',
        ),
      ],
    },
    {
      id: 'direitos',
      heading: confirmed('Seus direitos'),
      paragraphs: [
        confirmed(
          'A Lei Geral de Proteção de Dados garante a você, entre outros, o direito de confirmar a existência de tratamento, acessar seus dados, corrigir dados incompletos ou desatualizados, solicitar a exclusão dos dados tratados com base no consentimento e revogar o consentimento a qualquer momento.',
        ),
        pending(
          'O canal específico para exercer esses direitos ainda não foi definido nesta versão. Enquanto isso, o pedido pode ser feito em resposta a qualquer contato recebido do profissional.',
          'Depende da definição do canal oficial de atendimento ao titular.',
        ),
      ],
    },
    {
      id: 'seguranca',
      heading: confirmed('Segurança'),
      paragraphs: [
        confirmed(
          'O formulário aplica medidas básicas de proteção: validação dos dados no servidor, limite de envios por origem, campo-armadilha contra robôs e ausência de registro dos valores preenchidos. Nenhum dado enviado pelo formulário aparece na barra de endereços, em links de compartilhamento ou em mensagens automáticas.',
        ),
        confirmed(
          'Nenhuma medida de segurança é absoluta. Por isso, evite escrever informações sensíveis nos campos livres do formulário.',
        ),
      ],
    },
    {
      id: 'menores',
      heading: confirmed('Público'),
      paragraphs: [
        confirmed(
          'O atendimento e este site são destinados a pessoas adultas. O formulário não deve ser preenchido por menores de 18 anos.',
        ),
      ],
    },
    {
      id: 'alteracoes',
      heading: confirmed('Alterações desta política'),
      paragraphs: [
        confirmed(
          'Esta política pode ser atualizada conforme o site evoluir ou conforme novos serviços forem contratados. Mudanças relevantes serão refletidas nesta página.',
        ),
      ],
    },
  ],
};

export const terms: LegalPage = {
  title: confirmed('Termos de uso'),
  description: confirmed(
    'Condições e avisos sobre o uso deste site e da lista de espera.',
  ),
  lastReviewed: pending(
    'Versão inicial (MVP). Este texto ainda não passou por revisão jurídica.',
    'Necessária revisão jurídica e aprovação do profissional antes da publicação.',
  ),
  sections: [
    {
      id: 'natureza',
      heading: confirmed('O que este site é'),
      paragraphs: [
        confirmed(
          'Este site é um espaço informativo sobre o trabalho de Felipe Gonzaga de Carvalho Gondim, psicólogo inscrito no CRP 02/23810. Ele apresenta a forma de atendimento e permite entrar em uma lista de espera.',
        ),
        confirmed(
          'O conteúdo publicado aqui tem caráter informativo e não constitui atendimento psicológico, avaliação, diagnóstico, orientação clínica individualizada nem substitui uma consulta.',
        ),
      ],
    },
    {
      id: 'emergencia',
      heading: confirmed('Este não é um canal de emergência'),
      paragraphs: [
        confirmed(
          'O site, o formulário de lista de espera e eventuais canais de mensagem não são monitorados de forma contínua e não servem para situações de urgência ou risco. Em caso de risco imediato à vida, procure um serviço de emergência.',
        ),
        pending(
          'Os contatos oficiais de emergência ainda não foram validados e por isso não são divulgados nesta versão.',
          'Depende de validação oficial dos números e serviços antes de qualquer publicação.',
        ),
      ],
    },
    {
      id: 'lista-de-espera',
      heading: confirmed('Sobre a lista de espera'),
      paragraphs: [
        confirmed(
          'Entrar na lista de espera não é um agendamento, não reserva horário e não garante o início do acompanhamento. O contato acontece quando houver disponibilidade na agenda, sem prazo previsto.',
        ),
        confirmed(
          'O atendimento é on-line, particular, com sessões de 50 minutos realizadas pelo Google Meet, e destinado a pessoas adultas. É emitida Receita Saúde, que pode ser usada para solicitar reembolso a alguns convênios, conforme as regras de cada plano. O reembolso não é garantido e depende exclusivamente do plano de saúde.',
        ),
      ],
    },
    {
      id: 'sem-promessas',
      heading: confirmed('Ausência de promessas de resultado'),
      paragraphs: [
        confirmed(
          'Nenhum conteúdo deste site promete cura, resultado, prazo, eficácia garantida ou superioridade em relação a outros profissionais. O processo terapêutico é singular e seus efeitos variam de pessoa para pessoa.',
        ),
      ],
    },
    {
      id: 'uso-adequado',
      heading: confirmed('Uso adequado do formulário'),
      paragraphs: [
        confirmed(
          'Ao preencher o formulário, você se compromete a informar dados verdadeiros e a não incluir informações sensíveis de saúde, relatos clínicos ou dados de terceiros. Envios automatizados, abusivos ou em volume anormal podem ser bloqueados.',
        ),
      ],
    },
    {
      id: 'propriedade',
      heading: confirmed('Conteúdo e marca'),
      paragraphs: [
        confirmed(
          'Os textos, a identidade visual e os demais materiais deste site pertencem ao profissional e ao estúdio responsável pelo desenvolvimento, conforme acordado entre as partes. A reprodução sem autorização não é permitida.',
        ),
      ],
    },
    {
      id: 'etica',
      heading: confirmed('Conformidade profissional'),
      paragraphs: [
        confirmed(
          'A divulgação deste trabalho segue as diretrizes do Conselho Federal de Psicologia: identificação completa do profissional e do registro, ausência de valores, ausência de promessas de resultado e ausência de depoimentos ou casos clínicos.',
        ),
      ],
    },
    {
      id: 'privacidade',
      heading: confirmed('Privacidade'),
      paragraphs: [
        confirmed(
          'O tratamento dos dados enviados pelo formulário está descrito na Política de Privacidade, que é parte integrante destes termos.',
        ),
      ],
    },
    {
      id: 'mudancas',
      heading: confirmed('Alterações'),
      paragraphs: [
        confirmed(
          'Estes termos podem ser atualizados a qualquer momento para refletir mudanças no site ou nos serviços oferecidos.',
        ),
      ],
    },
  ],
};
