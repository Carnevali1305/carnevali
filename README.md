# 🤖 Carnevali Soluções Digitais — Landing Page

> Landing page de alta conversão para apresentação de serviços de Agentes de IA personalizados para empresas que desejam automatizar operações — atendimento, suporte, qualificação, agendamentos, processos internos e pós-venda.

![Status](https://img.shields.io/badge/status-produção-brightgreen)
![Stack](https://img.shields.io/badge/stack-HTML%20%7C%20CSS%20%7C%20JS-blue)
![Hospedagem](https://img.shields.io/badge/deploy-GitHub%20Pages-222?logo=github)

**🔗 Live:** [carnevali1305.github.io/carnevali](https://carnevali1305.github.io/carnevali/index.html)

---

## ✨ Visão Geral

Este projeto é uma landing page estática desenvolvida com **HTML, CSS e JavaScript puro**, seguindo o modelo **AIDA** (Atenção → Interesse → Desejo → Ação) para maximizar a taxa de conversão.

O site apresenta os serviços da **Carnevali Soluções Digitais**, especialista em implementação de Agentes de IA focados em resultados — automatizando operações completas em qualquer canal ou sistema que a empresa utilize.

---

## 🗂️ Estrutura do Projeto

```
Landing Page_CarnevaliSoluções/
├── index.html            # Estrutura principal da página (SEO otimizado)
├── index.css             # Design system completo (~2430 linhas)
├── script.js             # Funcionalidades interativas (~960 linhas, JS puro)
├── logo.png              # Logotipo da empresa
├── hero-background.png   # Imagem de fundo do hero (fallback)
└── README.md             # Este arquivo
```

---

## 🎯 Seções da Página (Fluxo de Conversão)

A página foi estruturada para conduzir o usuário em uma jornada lógica de conversão:

| # | Seção | ID | Descrição |
|---|---|---|---|
| 1 | **Hero** | `#hero` | Headline com efeito typewriter (6 frases rotativas: Atendimento, Suporte, Agendamentos, Processos Internos, Pós-Venda), painel HUD animado (chat simulado + visão CRM multi-canal), CTAs primários e badges de confiança. |
| 2 | **Problema** | `#problema` | Simulação visual de caixa de entrada caótica com oportunidades perdidas, estatística de conversão (9× MIT) e cards de dor (demora, sobrecarga, demandas acumuladas). |
| 3 | **Solução** | `#solucao` | 4 cards de benefícios com ícones SVG (atendimento 24/7, fluxos inteligentes, análise avançada, integração nativa). |
| 4 | **Como Funciona** | `#como-funciona` | Processo em 3 passos com cards numerados e ícones. |
| 5 | **Calculadora de ROI** | `#roi` | Ferramenta interativa e comparativa para projetar ganhos financeiros mensais e anuais com IA. |
| 6 | **Casos de Uso** | `#casos` | 5 cenários práticos — Imobiliária, Clínica, E-commerce, Suporte Técnico SaaS e Pós-Venda/Logística — com cards descritivos. |
| 7 | **Diagnóstico** | `#diagnostico` | Wizard multi-step (5 etapas) com cálculo de ROI personalizado e envio via WhatsApp. |
| 8 | **Tecnologias** | `#tecnologias` | Marcas de IA parceiras (OpenAI, Gemini, Claude, Microsoft, Meta AI, Google). |
| 9 | **FAQ** | `#faq` | 7 perguntas frequentes em accordion interativo (`<details>`/`<summary>`). |
| 10 | **Sobre Nós** | `#sobre` | Layout 2 colunas — texto de autoridade ("Especialista em Automação com Inteligência Artificial") + **Globo 3D wireframe interativo** com d3-geo. |
| 11 | **Footer / CTA** | — | CTA final com link WhatsApp + botão de agendamento. |

---

## ⚙️ Funcionalidades e Recursos

### 🌐 Animações de Fundo

| Recurso | Tecnologia | Descrição |
|---|---|---|
| **Partículas Flutuantes** | tsParticles 2.12.0 | Rede neural com nodos conectados, efeito *grab* no hover, posicionado como fundo fixo em toda a página. |
| **Globo Wireframe 3D** | d3-geo 3.x (Canvas) | Globo terrestre interativo com projeção ortográfica, pontos halftone nos continentes, rotação automática, drag para girar manualmente e suporte a touch. Integrado à seção "Sobre Nós". |

### 🧠 Interações do Usuário

| Funcionalidade | Função JS | Descrição |
|---|---|---|
| **Typewriter Effect** | `initTypewriter()` | Digitação animada alternando 6 palavras no hero ("Piloto Automático", "Atendimento", "Suporte ao Cliente", "Agendamentos", "Processos Internos", "Pós-Venda"). |
| **Loop de Animação** | `initAnimationLoop()` | Simulação de chat multi-canal + CRM no hero com auto-scroll, transição suave e loop de 20s. |
| **Scroll Reveal** | `initScrollReveal()` | Elementos surgem suavemente ao scrollar via `IntersectionObserver`. |
| **Contadores Animados** | `initCounters()` | Números incrementam de 0 ao valor final quando visíveis. |
| **Menu Hamburger** | `initHamburger()` | Navegação mobile com animação, bloqueio de scroll e fechamento automático. |
| **Active Nav Link** | `initActiveNavLink()` | Destaque do link no menu baseado na seção visível (scroll spy). |
| **Sticky CTA Mobile** | `initStickyCTA()` | Barra fixa de CTA no mobile, desaparece após a calculadora de ROI. |
| **Calculadora de ROI** | `initROICalculator()` / `calcularROI()` | Formulário comparativo (Hoje vs. Com IA) com projeção de ganhos mensais e anuais. |

### 📋 Wizard de Diagnóstico (5 etapas)

| Etapa | Função | Conteúdo |
|---|---|---|
| 1 | `diagShowStep()` | Segmento do negócio + tamanho da equipe |
| 2 | `diagShowStep()` | Volume de leads e canais de atendimento |
| 3 | `diagShowStep()` | Dores e prioridades do negócio |
| 4 | `diagCalcularROI()` | Resultado com projeção de ROI animada |
| 5 | `diagEnviar()` | Formulário de contato → envio via WhatsApp |

### 💬 Simulador de Chat Multi-canal (Hero)

O painel HUD do hero exibe uma conversa simulada entre um lead e o Agente de IA (conectado em multi-canal + CRM), seguida de uma visão CRM:

| Fase | Timing | Descrição |
|---|---|---|
| **Chat** | 0s – 12s | 8 mensagens aparecem sequencialmente (delay de 1.5s entre cada), com **auto-scroll suave** acompanhando a última mensagem visível. |
| **CRM** | 12.5s – 17s | Painel CRM surge com card do lead, badge de status (LEAD → REUNIÃO) e notificação pop-up, **sem sobrepor o footer de stats**. |
| **Restart** | 20s | Loop reinicia com clone+replace dos nós DOM e re-setup do auto-scroll. |

**Arquitetura de camadas (z-index):**
- `z-index: 3` — Footer stats ("24/7" e "5s") — sempre visível
- `z-index: 2` — CRM view (`bottom: 72px`, `overflow: hidden`) — contida acima do footer
- `z-index: 1` — Chat messages — área com scroll automático

### 🌍 Globo 3D Wireframe

| Recurso | Implementação |
|---|---|
| **Renderização** | Canvas 2D com d3-geo (projeção ortográfica) |
| **Dados geográficos** | GeoJSON Natural Earth 110m (~15KB, carregado async) |
| **Pontos halftone** | Gerados via point-in-polygon sobre cada continente |
| **Rotação automática** | 0.35°/frame, pausa ao arrastar, retoma após 2s |
| **Interatividade** | Drag (mouse + touch) para rotacionar manualmente |
| **Performance** | IntersectionObserver pausa quando fora do viewport |
| **Responsivo** | Adapta tamanho ao container, DPR-aware |
| **Cores** | Tema neon integrado (cyan borda, purple pontos) |

---

## 🎨 Design System e Identidade Visual

O layout adota estética **dark premium** com destaques neon:

### Paleta de cores

```css
:root {
    --bg0: #040814;          /* Fundo principal escuro */
    --bg1: #050b1a;          /* Fundo secundário */
    --neonBlue: #2d7dff;     /* Azul vibrante principal */
    --neonCyan: #25f3ff;     /* Ciano neon de destaque */
    --neonPurple: #9b5cff;   /* Roxo neon para detalhes */
    --text: #eaf1ff;         /* Texto principal claro */
    --glass: rgba(255,255,255,.07);  /* Glassmorphism */
    --radius: 18px;          /* Border radius padrão */
    --max: 1120px;           /* Largura máxima do conteúdo */
}
```

### Técnicas visuais

- **Dark mode** com gradientes radiais multi-camada no body
- **Glassmorphism** (`backdrop-filter: blur`) em navbar, CTA mobile e painéis HUD
- **Animações CSS** — hover effects, transições suaves, glow neon
- **Painéis HUD** simulados via CSS (chat, CRM, caixa de entrada)
- **Partículas de fundo** com efeito de rede neural conectada
- **Globo 3D** com glow radial cyan/purple
- **Design responsivo** — CSS Grid para desktop, coluna única para mobile

---

## 📦 Dependências Externas (CDN)

O projeto não usa Node.js, npm ou bundlers. Todas as dependências são carregadas via CDN:

| Biblioteca | Versão | Tamanho (gzip) | Uso |
|---|---|---|---|
| **tsParticles** | 2.12.0 | ~80 KB | Animação de partículas de fundo |
| **d3-array** | 3.x | ~5 KB | Utilitários de array para d3-geo |
| **d3-geo** | 3.x | ~40 KB | Projeção geográfica do globo 3D |

**Total de dependências:** ~125 KB gzip

---

## 🚀 Como Executar

O projeto é 100% estático, sem processos de build ou instalação.

### Opção 1: Abrir diretamente
```bash
# Basta abrir o arquivo no navegador
xdg-open index.html          # Linux
open index.html               # macOS
start index.html              # Windows
```

### Opção 2: Servidor local
```bash
# Python
python3 -m http.server 8000

# Node.js
npx serve .

# PHP
php -S localhost:8000
```

### Opção 3: GitHub Pages
O site está publicado automaticamente via GitHub Pages em:
```
https://carnevali1305.github.io/carnevali/index.html
```

---

## 🔧 Personalização

| Arquivo | O que alterar |
|---|---|
| `index.html` | Textos, telefone nos links `wa.me/`, metadados SEO (`<title>`, `<meta description>`), logo e links de redes sociais. |
| `script.js` | Palavras do typewriter (array `phrases` em `initTypewriter` — atualmente 6 frases rotativas), fórmulas da calculadora (`calcularROI()`), configuração das partículas (`initParticles()`), cores do globo (objeto `COLORS` em `initGlobe()`). |
| `index.css` | Cores e tokens no seletor `:root`, espaçamentos, breakpoints responsivos. |
| `logo.png` | Substituir pelo logotipo da empresa (recomendado: PNG transparente ≤ 200×60px). |

---

## 📊 Performance

| Métrica | Valor |
|---|---|
| **Projeto total** | ~170 KB (sem CDNs) |
| **CDNs (gzip)** | ~125 KB |
| **Requests externos** | 4 (3 CDNs + 1 GeoJSON async) |
| **Framework JS** | Nenhum — vanilla JS puro |
| **Framework CSS** | Nenhum — CSS customizado |
| **Otimizações** | IntersectionObserver (partículas/globo/scroll reveal), debounce em resize, auto-scroll no chat, camadas z-index para evitar sobreposição |

---

## 📄 Licença

Todos os direitos reservados © 2026 — **Carnevali Soluções Digitais**

> Desenvolvido com foco absoluto em performance, responsividade avançada, design moderno e automação inteligente de operações. Sem frameworks pesados, rodando puramente na web nativa.
