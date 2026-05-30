---
name: frontend-design
description: Create distinctive, production-grade frontend interfaces with high design quality. Use this skill when the user asks to build web components, pages, artifacts, posters, or applications (examples include websites, landing pages, dashboards, React components, HTML/CSS layouts, or when styling/beautifying any web UI). Generates creative, polished code and UI design that avoids generic AI aesthetics.
license: Complete terms in LICENSE.txt
---

This skill guides creation of distinctive, production-grade frontend interfaces that avoid generic "AI slop" aesthetics. Implement real working code with exceptional attention to aesthetic details and creative choices.

The user provides frontend requirements: a component, page, application, or interface to build. They may include context about the purpose, audience, or technical constraints.

## Design Thinking

Before coding, understand the context and commit to a BOLD aesthetic direction:
- **Purpose**: What problem does this interface solve? Who uses it?
- **Tone**: Pick an extreme: brutally minimal, maximalist chaos, retro-futuristic, organic/natural, luxury/refined, playful/toy-like, editorial/magazine, brutalist/raw, art deco/geometric, soft/pastel, industrial/utilitarian, etc. There are so many flavors to choose from. Use these for inspiration but design one that is true to the aesthetic direction.
- **Constraints**: Technical requirements (framework, performance, accessibility).
- **Differentiation**: What makes this UNFORGETTABLE? What's the one thing someone will remember?

**CRITICAL**: Choose a clear conceptual direction and execute it with precision. Bold maximalism and refined minimalism both work - the key is intentionality, not intensity.

Then implement working code (HTML/CSS/JS, React, Vue, etc.) that is:
- Production-grade and functional
- Visually striking and memorable
- Cohesive with a clear aesthetic point-of-view
- Meticulously refined in every detail

## Expert Panel

When the work includes a style direction, visual system, or style guide, consult this four-voice panel before finalising the aesthetic choices. The panel should push back on the draft, and any unresolved objections should be fixed in the design rather than merely acknowledged.

### 1. James Fox - Colour

- **Who:** Art historian and broadcaster. *The World According to Color: A Cultural History* (2021); *A History of Art in Three Colours* (BBC).
- **Lens:** Colour carries cultural and emotional baggage. Choosing a hue is choosing what it means, not just how it looks.

Ask:

1. Does the target audience read this colour the way you intend, or are you assuming a universal meaning that does not hold across cultures, generations, or contexts?
2. What is this hue's social register: old wealth, blood, autumn, mourning, fashion, tradition? Does that match the brand's position?
3. Is the palette emotionally coherent, or are you combining colours whose meanings clash beneath the surface?
4. Are you using a colour because it is fashionable, or because it is true to the brand?
5. What is this palette not, and is that exclusion deliberate?

### 2. Erik Spiekermann - Typography

- **Who:** Typographer and designer. Founder of MetaDesign and FontShop; typeface designer of FF Meta, Fira, and ITC Officina.
- **Lens:** Type is a voice. The goal is to make the reader hear the writer, not notice the setting.

Ask:

1. Does this typeface do real work, or is it decoration?
2. Are you pairing fonts because they contrast or because they cooperate?
3. Is the type setting hospitable to reading, or has novelty been prioritised over comfort?
4. Would the brand pick this voice if it walked into the room as a person?
5. Is this font choice fashionable right now, or characterful for this brand specifically?

### 3. Michael Bierut - Brand identity

- **Who:** Pentagram partner since 1990. Designer for MIT, Saks Fifth Avenue, The New York Times, and Hillary Clinton 2016.
- **Lens:** Identity is the visual evidence of a strategy. If the visuals do not make the strategy more legible, they are decoration.

Ask:

1. Could a visitor identify this brand in five seconds without seeing the logo?
2. Does the visual language serve the strategic position, or are you optimising for craft for its own sake?
3. What is the one thing this brand is, and does the design make that one thing more obvious?
4. Is anything here a trend you will regret in 18 months?
5. If you stripped the colour and typography back to black and white at 50% size, does the structure still tell the story?

### 4. Frank Chimero - Web as medium

- **Who:** Designer and writer. *The Shape of Design* (2012); long-running essays on web design as a creative discipline.
- **Lens:** The web has its own grain: it scrolls, responds, links, and behaves. A good site uses that grain rather than fighting it.

Ask:

1. Does this feel like a site, or a brochure pretending to be one?
2. Is the composition doing something print could not, or is it static layout flattened onto a screen?
3. Does the page respond to scroll and viewport as a designed behaviour, not an afterthought?
4. Is there one moment a visitor will remember, and is it a web moment?
5. Does the page reward attention, or is everything visible in the first frame?

### How to use the panel

1. In the style-direction phase, test the draft palette, typography, motion, spatial composition, and component language against the four critiques in order.
2. Where a valid objection is raised and the draft does not answer it, adjust the design.
3. Where a critique is consciously rejected, record the rejection and the reason in the design notes.
4. When generating a `style-guide.md`, append a final section titled `Panel critique` that records, for each panellist, two or three sentences on what they would say about the final decisions.
5. Plan and Build stages should read that `Panel critique` section and must not contradict it without logging the deviation in `decisions.md`.

### Context weighting

- For landing pages with short visitor sessions, prioritise Bierut and Chimero.
- For content-heavy sites, prioritise Spiekermann and Chimero.
- For brand systems intended to scale across products, prioritise Bierut and Fox.
- For single-product or campaign sites, prioritise Fox and Spiekermann.

## Frontend Aesthetics Guidelines

Focus on:
- **Typography**: Choose fonts that are beautiful, unique, and interesting. Avoid generic fonts like Arial and Inter; opt instead for distinctive choices that elevate the frontend's aesthetics; unexpected, characterful font choices. Pair a distinctive display font with a refined body font.
- **Color & Theme**: Commit to a cohesive aesthetic. Use CSS variables for consistency. Dominant colors with sharp accents outperform timid, evenly-distributed palettes.
- **Motion**: Use animations for effects and micro-interactions. Prioritize CSS-only solutions for HTML. Use Motion library for React when available. Focus on high-impact moments: one well-orchestrated page load with staggered reveals (animation-delay) creates more delight than scattered micro-interactions. Use scroll-triggering and hover states that surprise.
- **Spatial Composition**: Unexpected layouts. Asymmetry. Overlap. Diagonal flow. Grid-breaking elements. Generous negative space OR controlled density.
- **Backgrounds & Visual Details**: Create atmosphere and depth rather than defaulting to solid colors. Add contextual effects and textures that match the overall aesthetic. Apply creative forms like gradient meshes, noise textures, geometric patterns, layered transparencies, dramatic shadows, decorative borders, custom cursors, and grain overlays.

NEVER use generic AI-generated aesthetics like overused font families (Inter, Roboto, Arial, system fonts), cliched color schemes (particularly purple gradients on white backgrounds), predictable layouts and component patterns, and cookie-cutter design that lacks context-specific character.

Interpret creatively and make unexpected choices that feel genuinely designed for the context. No design should be the same. Vary between light and dark themes, different fonts, different aesthetics. NEVER converge on common choices (Space Grotesk, for example) across generations.

**IMPORTANT**: Match implementation complexity to the aesthetic vision. Maximalist designs need elaborate code with extensive animations and effects. Minimalist or refined designs need restraint, precision, and careful attention to spacing, typography, and subtle details. Elegance comes from executing the vision well.

Remember: Claude is capable of extraordinary creative work. Don't hold back, show what can truly be created when thinking outside the box and committing fully to a distinctive vision.
