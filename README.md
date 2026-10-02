# Carnevali Soluções Digitais: Landing Page

Landing page de apresentação dos serviços de Agentes de IA personalizados (atendimento, qualificação, agendamento, suporte e pós-venda), com diagnóstico de ROI que envia o resultado ao WhatsApp.

**Produção:** [carnevali-solucoes.vercel.app](https://carnevali-solucoes.vercel.app/)

Stack: HTML, CSS e JavaScript puros, sem build. Deploy automático no Vercel a cada push na `main`.

---

## Estrutura

```
Landing Page_CarnevaliSoluções/
├── index.html            # Página (SEO, seções e conteúdo)
├── index.css             # Design system e estilos
├── script.js             # Interações (reveal, menu, pan horizontal, diagnóstico)
├── fonts/                # Geist (variável, woff2), hospedada junto ao projeto
├── logo.png              # Logotipo (usado como favicon)
├── hero-background.png   # Imagem antiga do hero (sem uso atual)
├── vercel.json           # Rewrites e cache
└── README.md
```

> **Cache:** o `vercel.json` marca os assets como imutáveis por 1 ano. Ao alterar `index.css` ou `script.js`, aumente o `?v=` nas tags `<link>` e `<script>` do `index.html`.

---

## Seções

| Seção | ID | Conteúdo |
|---|---|---|
| Hero | `#topo` | Título animado, CTA e celular com conversa do agente |
| Números | n/a | 24/7, 5s, 21 dias, 2 produtos (contadores animados) |
| Problema | `#problema` | Estatística 9× (MIT / InsideSales.com), caixa de entrada com leads perdidos e 3 custos |
| Solução | `#solucao` | Bento com 4 benefícios |
| Como funciona | `#como-funciona` | 3 passos que empilham ao rolar |
| Diagnóstico | `#diagnostico` | Wizard de 5 etapas, ROI estimado e envio por WhatsApp |
| Produtos | `#produtos` | Lumina (clínicas) e Fechei Imóveis (corretores) |
| Casos de uso | `#casos` | 6 segmentos, rolagem horizontal fixada no desktop e scroll-snap no mobile |
| Tecnologias | `#tecnologias` | Faixa com as marcas e ferramentas usadas |
| FAQ | `#faq` | 8 perguntas em `<details>` |
| Sobre | `#sobre` | Apresentação do especialista |
| Contato | `#contato` | CTA final, WhatsApp, Instagram e LinkedIn |

---

## Design

- **Tema:** grafite escuro (`#0b0d0c`) com um único acento verde-lima (`#b5f26b`).
- **Tipografia:** Geist, com títulos grandes e espaçamento justo.
- **Formas:** pílula para botões e controles, 28px para painéis, 14px para itens internos. Painéis com moldura dupla (shell e core).
- **Ícones:** Phosphor Icons (estilo light), via CDN.
- **Movimento:** reveal com fade e blur, linhas do título com máscara, contadores, menu mobile em tela cheia. Tudo respeita `prefers-reduced-motion`, e a transparência tem fallback para `prefers-reduced-transparency`.
- **Sem listeners de scroll:** usa `IntersectionObserver` e GSAP ScrollTrigger (apenas no pan dos casos de uso, em telas acima de 960px).

Tokens de cor, raios e easing ficam no `:root` do `index.css`.

---

## Dependências externas (CDN)

| Biblioteca | Uso |
|---|---|
| GSAP 3.12.5 + ScrollTrigger (cdnjs, com SRI) | Pan horizontal dos casos de uso |
| Phosphor Icons 2.1.1 (unpkg) | Ícones |

Se o GSAP não carregar, os casos de uso continuam navegáveis por scroll horizontal nativo.

---

## Como executar

```bash
# Abrir direto
xdg-open index.html

# Ou servidor local
python3 -m http.server 8080
```

---

## Personalização

| Arquivo | O que alterar |
|---|---|
| `index.html` | Textos, telefone nos links `wa.me/`, metadados SEO, links sociais e cidade no rodapé |
| `script.js` | Fórmulas do ROI em `calc()` (ganho de 30% de conversão, 60% de leads com resposta lenta e 40% recuperáveis) e a mensagem do WhatsApp em `send()` |
| `index.css` | Cores, raios e espaçamentos no `:root` |

---

## Histórico

A versão anterior (tema azul e roxo neon, hero 3D em Three.js, partículas e globo d3) está no histórico do git, antes do commit `5a37079`.

---

Todos os direitos reservados © 2026, Carnevali Soluções Digitais.
