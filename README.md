# 🤖 Carnevali Soluções Digitais — Landing Page

> Landing page de alta conversão para apresentação e venda de serviços de Agentes de IA personalizados para empresas que desejam automatizar atendimento, qualificação de leads e agendamentos.

---

## ✨ Visão Geral

Este projeto é uma landing page estática desenvolvida com **HTML, CSS e JavaScript puro**, seguindo o modelo **AIDA** (Atenção → Interesse → Desejo → Ação) para maximizar a taxa de conversão.

O site apresenta os serviços da **Carnevali Soluções Digitais**, especialista em implementação de Agentes de IA focados em conversão de leads via WhatsApp e outras plataformas de mensagens.

---

## 🗂️ Estrutura do Projeto

```
Landing Page/
├── index.html        # Estrutura principal da página
├── index.css         # Estilos e design system completo
├── script.js         # Funcionalidades interativas (JS puro)
├── logo.png          # Logotipo da empresa
└── README.md         # Este arquivo
```

---

## 🎯 Seções da Página

| Seção | Descrição |
|---|---|
| **Hero** | Headline com efeito typewriter, painel HUD animado (chat + CRM) e CTAs |
| **Problema** | Inbox simulada com leads perdidos + estatística com fonte (MIT) |
| **Solução** | 4 cards de benefícios com ícones SVG |
| **Como Funciona** | 3 passos do processo de implementação |
| **Calculadora de ROI** | Ferramenta interativa para estimar ganhos com automação |
| **Casos de Uso** | Modelos de implementação documentados no mercado |
| **Tecnologias** | Marcas parceiras: OpenAI, Gemini, Claude AI, Microsoft, Meta, Google |
| **FAQ** | 7 perguntas frequentes com accordion interativo |
| **Sobre** | Apresentação do especialista e diferenciais |
| **Footer / CTA** | Call to action final com link para WhatsApp |

---

## ⚙️ Funcionalidades JavaScript

- **Typewriter Effect** — alterna frases no título do hero
- **Animação de Chat + CRM** — loop infinito de 20s com clonagem de nós DOM
- **ROI Calculator** — cálculo dinâmico baseado em leads, ticket e taxa de conversão
- **Scroll Reveal** — animação de entrada das seções via `IntersectionObserver`
- **Active Nav Link** — destaque automático do link de navegação conforme a seção visível
- **Hamburger Menu** — menu mobile com animação e bloqueio de scroll
- **Sticky CTA** — barra fixa mobile que some após o usuário passar pela calculadora

---

## 🎨 Design System

**Paleta de cores:**

```css
--bg0: #040814          /* Fundo principal */
--bg1: #050b1a          /* Fundo secundário */
--neonBlue: #2d7dff     /* Azul neon */
--neonCyan: #25f3ff     /* Ciano neon */
--neonPurple: #9b5cff   /* Roxo neon */
--text: #eaf1ff         /* Texto principal */
--muted: rgba(234,241,255,.74)  /* Texto secundário */
```

**Técnicas visuais:**
- Dark mode com gradientes radiais no background
- Glassmorphism (`backdrop-filter: blur`) em cards, nav e HUD
- Animações CSS com `@keyframes` para chat, CRM e scroll reveal
- Layout responsivo com CSS Grid e `clamp()` para tipografia fluida

---

## 🚀 Como Usar

Por ser um projeto estático (sem servidor ou dependências), basta:

1. **Clonar o repositório:**
   ```bash
   git clone https://github.com/seu-usuario/landing-page.git
   ```

2. **Abrir no navegador:**
   ```bash
   # Diretamente pelo sistema de arquivos
   open index.html

   # Ou com um servidor local (recomendado)
   npx serve .
   # ou
   python3 -m http.server 8000
   ```

3. **Nenhuma instalação de dependências necessária** — o projeto usa apenas HTML, CSS e JavaScript nativos.

---

## 📱 Responsividade

A página é totalmente responsiva com breakpoints em:

- **Mobile** — `< 480px`: layout em coluna única, hamburger menu ativo
- **Tablet** — `480px – 768px`: grids ajustados para 2 colunas
- **Desktop** — `> 768px`: layout completo com hero grid e HUD panel

---

## 🔧 Personalização

Para adaptar o projeto para outro negócio, os principais pontos a alterar são:

| Arquivo | O que alterar |
|---|---|
| `index.html` | Textos, número do WhatsApp nos links `wa.me/`, link do Instagram |
| `index.html` | Logo (`logo.png`), nome da empresa no `<title>` e cabeçalho |
| `script.js` | Frases do typewriter (array `phrases` na função `initTypewriter`) |
| `script.js` | Custo estimado do agente (variável `agentCost` na calculadora ROI) |
| `index.css` | Variáveis de cor em `:root` para mudar toda a identidade visual |

---

## 📄 Licença

Todos os direitos reservados © 2026 — **Carnevali Soluções Digitais**

---

> Desenvolvido com foco em performance, acessibilidade e conversão. Sem frameworks, sem dependências externas.
