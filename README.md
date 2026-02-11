# Landing Page - Carnevali Soluções

Landing Page - Sistema de Animação com Transição Limpa
🎯 Visão Geral
Sistema de animação em duas fases com transição limpa entre a conversa do cliente e o painel do gestor.

✅ Fase 1: Conversa com o Cliente (0-11s)
8 mensagens aparecem sequencialmente mostrando uma conversa natural:

Cliente: "Olá! Gostaria de saber sobre os planos." (0s)
IA: "Olá! 👋 Claro, posso te ajudar..." (1.5s)
Cliente: "Preciso de atendimento 24/7" (3s)
IA: "Perfeito! Qual seu nome..." (4.5s)
Cliente: "João Silva" (6s)
IA: "Ótimo, João! Vou agendar uma consultoria..." (7.5s)
Cliente: "Amanhã às 14h" (9s)
IA: "✅ Agendado! Você receberá confirmação..." (10.5s)
Chat em Andamento
Review
Chat em Andamento

🔄 Transição Limpa (11.5-12.5s)
11.5s: Chat desaparece com fade-out
12s: Tela limpa (sem sobreposição)
12.5s: CRM começa a aparecer
Transição Limpa
Review
Transição Limpa

🎯 Fase 2: Painel do Gestor (12.5-17s)
📊 Cabeçalho CRM
📊 Painel CRM | Visão do Gestor
💳 Card do Lead (13s)
Avatar: "JS" (João Silva)
Origem: WhatsApp • Agora
Status: LEAD → REUNIÃO
🔄 Transição de Status
Badge "LEAD" (amarelo) (13s)
Badge "REUNIÃO" (verde) (15s)
📋 Detalhes
📅 Amanhã às 14h
💼 Atendimento 24/7
🔔 Notificação (16s)
🔔 Nova Reunião Agendada
João Silva • Amanhã 14h
CRM Completo
Review
CRM Completo

🎨 Implementação Técnica
CSS - Transição Limpa
css
/* Chat desaparece */
.chat-sequence {
    animation: chatFadeOut 0.5s ease forwards;
    animation-delay: 11.5s;
}
/* CRM aparece depois */
.crm-view {
    opacity: 0;
    visibility: hidden;
    animation: fadeInView 0.6s ease forwards;
    animation-delay: 12.5s;
}
⏱️ Timeline Completa
Tempo	Evento
0-10.5s	Chat: 8 mensagens aparecem
11.5s	Chat começa a desaparecer
12s	Tela limpa (transição)
12.5s	CRM começa a aparecer
13s	Lead card entra
15s	Status muda para REUNIÃO
16s	Notificação aparece
💡 Benefícios
✅ Transição Limpa - Sem sobreposição de elementos
✅ Duas Perspectivas - Cliente E gestor
✅ Profissional - Mudança de tela suave
✅ Engajamento - 17+ segundos de demonstração
✅ Prova Completa - Mostra todo o fluxo de valor

🚀 Como Visualizar
Abra a landing page
Role até "IA em operação"
Aguarde 17 segundos
Observe as duas fases
Dica: Pressione Ctrl+Shift+R para limpar cacheMEROAQUI". Vamos manter os links atuais ou usar um número genérico.
