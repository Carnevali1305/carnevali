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

## 🎯 Seções da Página (Fluxo Otimizado)

A página foi estruturada para conduzir o usuário em uma jornada lógica de conversão:

| Seção | Descrição |
|---|---|
| **Hero** | Headline com efeito typewriter, painel HUD animado (chat simulado e visão CRM) e CTAs primários. |
| **Problema** | Simulação visual de uma caixa de entrada caótica com leads perdidos, evidenciando a dor da demora no atendimento. |
| **Solução** | 4 cards de benefícios focados na resolução do problema (24/7, fluxos, inteligência e integração). |
| **Como Funciona** | Explicação simplificada do processo em 3 passos lógicos. |
| **Calculadora de ROI** | Ferramenta interativa e comparativa para projetar ganhos financeiros mensais e anuais com a IA. |
| **Casos de Uso** | Cenários práticos de implementação (Imobiliária, Clínica, E-commerce). |
| **Tecnologias** | Marcas das inteligências artificiais parceiras (OpenAI, Gemini, Claude, etc). |
| **FAQ** | Accordion interativo com as objeções e dúvidas mais comuns. |
| **Sobre** | Apresentação de autoridade do especialista, focando na exclusividade do serviço. |
| **Footer / CTA** | Rodapé com links diretos para o WhatsApp e redes sociais. |

---

## ⚙️ Funcionalidades e UX (Atualizadas)

A página inclui diversas interações para melhorar a Experiência do Usuário (UX):

- **Calculadora de ROI Comparativa:** Novo formulário onde o usuário insere Leads, Taxa de Conversão e Ticket Médio. O script gera um cenário comparativo dinâmico (Hoje vs. Com IA), projetando ganhos adicionais anuais e mensais.
- **Menu Hamburger Mobile:** Navegação mobile amigável com botão hamburger animado e bloqueio de scroll quando aberto.
- **Active Nav Link (Scroll Spy):** Destaque automático do link no menu de navegação baseando-se na seção que o usuário está visualizando.
- **Sticky CTA Mobile:** Barra fixa de chamada de ação na versão mobile, desenhada de forma contextual (some automaticamente depois que o usuário passa da calculadora de ROI).
- **FAQ Interativo (Accordion):** Perguntas frequentes utilizando as tags semânticas `<details>` e `<summary>` nativas do HTML.
- **Links Otimizados:** Utilização de links diretos do WhatsApp (`wa.me`) com mensagens pré-formatadas para facilitar a conversão rápida, substituindo antigos links `mailto:`.
- **Animações Contínuas (Loop de 20s):** Simulação de chat e CRM no Hero rodando em loop infinito via reflow do DOM no JS.
- **Typewriter Effect:** Digitação animada alternando palavras-chave no Hero.
- **Scroll Reveal:** Elementos surgem suavemente ao fazer scroll utilizando a API `IntersectionObserver`.

---

## 🎨 Design System e Identidade Visual

O layout visual adota uma estética limpa, tecnológica e "premium", baseando-se em cores densas (dark mode) e detalhes em neon:

**Paleta de cores:**

```css
--bg0: #040814          /* Fundo principal escuro */
--bg1: #050b1a          /* Fundo secundário */
--neonBlue: #2d7dff     /* Azul vibrante principal */
--neonCyan: #25f3ff     /* Ciano neon de destaque */
--neonPurple: #9b5cff   /* Roxo neon para detalhes */
--text: #eaf1ff         /* Texto principal claro */
--muted: rgba(...)      /* Texto secundário/mutado */
```

**Técnicas visuais:**
- Design focado em Dark mode com gradientes complexos.
- Painéis HUD (Heads-Up Display) e UI simuladas via CSS (Chat, CRM, Caixa de Entrada).
- Glassmorphism (`backdrop-filter: blur`) amplamente utilizado em barras de navegação, CTA mobile e HUD.
- Design totalmente responsivo em coluna única para mobile, e estruturação robusta baseada em CSS Grid para Desktop.

---

## 🚀 Como Executar

O projeto é 100% estático, sem processos de build complexos ou dependências (Node/NPM).

1. **Clonar o repositório:**
   ```bash
   git clone <url-do-repositorio>
   ```

2. **Abrir no navegador:**
   Você pode simplesmente abrir o arquivo `index.html` em qualquer navegador:
   ```bash
   # Ou use um servidor local simples no terminal:
   npx serve .
   # ou
   python -m http.server 8000
   ```

---

## 🔧 Personalização Direta

Para adaptar o projeto ou trocar as informações, edite os arquivos listados abaixo:

| Arquivo | O que alterar |
|---|---|
| `index.html` | Trocar e-mails, telefone nos links `wa.me/` (verifique botões CTA), descrições de text e metadados SEO. |
| `index.html` | Logo da empresa e links de mídias sociais no rodapé. |
| `script.js` | Textos do efeito máquina de escrever (array `phrases` em `initTypewriter`). |
| `script.js` | Constante ou fórmulas de expectativa de ganhos na função da `calcularROI()`. |
| `index.css` | Cores, paletas no seletor `:root` e espaçamentos gerais. |

---

## 📄 Licença

Todos os direitos reservados © 2026 — **Carnevali Soluções Digitais**

> Desenvolvido com foco absoluto em performance, responsividade avançada, design moderno e conversão de leads. Sem frameworks pesados, rodando puramente na web nativa.
