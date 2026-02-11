# Landing Page - Carnevali Soluções

Plano de Implementação: Migração para Novo Layout
🎯 Objetivo
Adaptar o conteúdo atual da landing page para o novo design system fornecido, mantendo todo o conteúdo existente (ROI calculator, seções, textos) mas com o visual e estrutura do novo layout.

📋 Análise Comparativa
Layout Atual
Design dark mode futurista com glassmorphism
7 seções: Hero, Problem, Solution, How It Works, ROI Calculator, Case Studies, About Us
Calculadora ROI interativa
Logo no header
Navegação fixa
Novo Layout (Referência)
Design minimalista com glassmorphism refinado
Cores mais suaves e gradientes sutis
Grid system mais limpo
Cards com efeitos de blur e bordas
Hero com painel HUD tecnológico
Seção de problema com inbox simulado
Footer com CTA destacado
Sticky CTA mobile
🔄 Mudanças Principais
1. Sistema de Cores
Antes:

css
--deep-navy: #0a0e27
--neon-blue: #00d4ff
--electric-purple: #a855f7
Depois:

css
--bg0: #040814
--bg1: #050b1a
--neonBlue: #2d7dff
--neonCyan: #25f3ff
--neonPurple: #9b5cff
2. Estrutura do Header
Mudanças:

Logo como div colorido (placeholder) → Manter logo.png atual
Adicionar subtítulo "Agentes de IA • Automação • Integrações"
Navegação com links para seções
Dois CTAs: "Ver resultados" e "Ver Agente em Ação"
3. Hero Section
Novo formato:

Grid 1.2fr / 0.8fr (texto + painel)
Kicker badge com dot animado
Headline mais direta
Dois botões com subtextos
Pills de confiança (microtrust)
Painel HUD tecnológico (novo elemento visual)
4. Seção Problema
Novo formato:

Grid 1fr / 1fr (inbox simulado + cards de problemas)
Inbox com mensagens não respondidas (elemento visual forte)
3 cards de problemas em grid
Badge de urgência
5. Seção Solução
Manter:

6 benefícios em grid 4 colunas
Ícones SVG inline
Cards com glassmorphism
6. Como Funciona
Novo formato:

3 steps em grid horizontal
Números destacados com cores diferentes
Cards mais compactos
7. ROI Calculator
Decisão:

IMPORTANT

Manter a calculadora ROI existente, mas adaptar estilos para o novo design system

8. Casos de Sucesso
Novo formato:

Cards com quotes
Tags de categoria
CTAs após os casos
9. Footer
Novo formato:

Grid 1.2fr / 0.8fr
CTA destacado à esquerda
Links sociais à direita
Background com blur
10. Sticky CTA Mobile
Novo elemento:

Barra fixa no bottom (mobile only)
CTA para WhatsApp
Display: none no desktop
📁 Arquivos a Modificar
[MODIFY] 
index.html
Reestruturar todo o HTML seguindo o novo layout
Manter conteúdo atual (textos, calculadora ROI)
Adicionar novos elementos visuais (HUD, inbox, sticky CTA)
Atualizar classes CSS
[MODIFY] 
index.css
Substituir design system completo
Manter estilos da calculadora ROI
Adicionar novos componentes (HUD, inbox, sticky-cta)
Ajustar responsividade
[MODIFY] 
script.js
Manter lógica da calculadora ROI
Remover efeitos 3D (já removido)
Manter smooth scroll e animações básicas
🎨 Novos Componentes Visuais
1. HUD Panel (Hero)
html
<div class="hero-panel">
  <div class="hud">
    <div class="hud-top">
      <span class="hud-badge">IA em operação</span>
      <span>Conectado • WhatsApp • CRM</span>
    </div>
    <div class="hud-lines">
      <!-- Linhas animadas -->
    </div>
    <div class="hud-foot">
      <div class="stat">24/7</div>
      <div class="stat">5s</div>
    </div>
  </div>
</div>
2. Inbox Simulado (Problema)
html
<div class="inbox">
  <h3>Caixa de entrada (simulação)</h3>
  <div class="msg">
    <div class="avatar"></div>
    <div>
      <b>Cliente: "Tem disponibilidade hoje?"</b>
      <span>há 17 min • sem resposta</span>
    </div>
  </div>
  <!-- Mais mensagens -->
  <div class="badge-urgent">⚠️ Urgente: leads esfriam em minutos</div>
</div>
3. Sticky CTA Mobile
html
<div class="sticky-cta">
  <div class="inner wrap">
    <div class="label">
      <b>Pronto para ver o Agente em ação?</b><br />
      Clique e receba a demonstração no WhatsApp.
    </div>
    <a class="btn btn-primary" href="...">Abrir WhatsApp</a>
  </div>
</div>
📊 Mapeamento de Conteúdo
Seção Atual	Nova Seção	Mudanças
Hero	Hero	Adicionar HUD panel, kicker badge, microtrust pills
Problem	Problema	Adicionar inbox simulado, reorganizar em grid 2 colunas
Solution (6 cards)	Solução	Manter 6 benefícios, adaptar para grid 4 colunas
How It Works	Como Funciona	Simplificar para 3 steps horizontais
ROI Calculator	ROI Calculator	Manter funcionalidade, adaptar estilos
Case Studies	Casos	Formato quote + tag, adicionar CTAs após
About Us	Sobre	Manter texto "Arquitetos de Eficiência"
Footer	Footer	Grid 2 colunas, CTA destacado
-	Sticky CTA	Novo: barra mobile bottom
✅ Checklist de Implementação
Fase 1: CSS (Design System)
 Copiar variáveis CSS do novo layout
 Copiar reset e base styles
 Copiar componentes: nav, btn, card, grid
 Adicionar novos componentes: HUD, inbox, sticky-cta
 Adaptar estilos da calculadora ROI
 Copiar media queries responsivas
Fase 2: HTML (Estrutura)
 Atualizar header/nav
 Reestruturar hero com HUD panel
 Criar seção problema com inbox
 Adaptar seção solução (6 benefícios)
 Simplificar "Como Funciona" (3 steps)
 Manter calculadora ROI (adaptar classes)
 Reformatar casos de sucesso
 Atualizar sobre nós
 Criar novo footer
 Adicionar sticky CTA mobile
Fase 3: JavaScript
 Manter lógica calculadora ROI
 Manter smooth scroll
 Remover partículas (simplificar)
 Manter animações básicas
Fase 4: Ajustes Finais
 Testar responsividade
 Verificar calculadora ROI funcionando
 Ajustar espaçamentos
 Validar todos os CTAs
 Screenshot de todas as seções
🎯 Resultado Esperado
Uma landing page com:

✅ Mesmo conteúdo (textos, calculadora, seções)
✅ Novo visual (design system minimalista e moderno)
✅ Novos elementos (HUD, inbox, sticky CTA)
✅ Melhor hierarquia visual
✅ Responsividade aprimorada
✅ Performance mantida
⚠️ Pontos de Atenção
WARNING

Calculadora ROI: Manter toda a lógica JavaScript e inputs. Apenas adaptar estilos CSS para o novo design.

IMPORTANT

Logo: Manter o logo.png atual. O novo layout usa um placeholder, mas vamos usar nossa imagem.

NOTE

WhatsApp Links: O novo layout tem placeholders "SEUNUMEROAQUI". Vamos manter os links atuais ou usar um número genérico.
