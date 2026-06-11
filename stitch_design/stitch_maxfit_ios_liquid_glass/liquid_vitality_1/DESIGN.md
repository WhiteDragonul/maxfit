---
name: Liquid Vitality
colors:
  surface: '#1d100c'
  surface-dim: '#1d100c'
  surface-bright: '#463530'
  surface-container-lowest: '#170b07'
  surface-container-low: '#261814'
  surface-container: '#2b1c18'
  surface-container-high: '#362621'
  surface-container-highest: '#42312c'
  on-surface: '#f8ddd5'
  on-surface-variant: '#e2bfb4'
  inverse-surface: '#f8ddd5'
  inverse-on-surface: '#3d2d28'
  outline: '#aa8a80'
  outline-variant: '#5a4139'
  surface-tint: '#ffb59d'
  primary: '#ffb59d'
  on-primary: '#5d1800'
  primary-container: '#f85f28'
  on-primary-container: '#521400'
  inverse-primary: '#ad3400'
  secondary: '#ffb694'
  on-secondary: '#571f00'
  secondary-container: '#77320b'
  on-secondary-container: '#fe9c6d'
  tertiary: '#8ecdff'
  on-tertiary: '#00344f'
  tertiary-container: '#1599dd'
  on-tertiary-container: '#002d45'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#ffdbd0'
  primary-fixed-dim: '#ffb59d'
  on-primary-fixed: '#390b00'
  on-primary-fixed-variant: '#842500'
  secondary-fixed: '#ffdbcc'
  secondary-fixed-dim: '#ffb694'
  on-secondary-fixed: '#351000'
  on-secondary-fixed-variant: '#77320b'
  tertiary-fixed: '#cae6ff'
  tertiary-fixed-dim: '#8ecdff'
  on-tertiary-fixed: '#001e30'
  on-tertiary-fixed-variant: '#004b70'
  background: '#1d100c'
  on-background: '#f8ddd5'
  surface-variant: '#42312c'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 48px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 36px
    fontWeight: '800'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Inter
    fontSize: 32px
    fontWeight: '700'
    lineHeight: '1.2'
    letterSpacing: -0.01em
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Inter
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.5'
  label-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '600'
    lineHeight: '1.2'
    letterSpacing: 0.05em
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.2'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  unit: 8px
  container-margin: 24px
  gutter: 16px
  stack-sm: 12px
  stack-md: 24px
  stack-lg: 48px
---

## Brand & Style
The design system embodies "Liquid Vitality"—a high-energy, premium fitness aesthetic designed for MaxFit. The brand personality is aggressive yet refined, combining the raw energy of high-intensity training with the sophisticated polish of a modern tech interface. 

The visual style is **Glassmorphic** with a dark-mode-first approach. It utilizes deep charcoal surfaces to minimize eye strain while highlighting performance data with high-contrast accent colors. The "Liquid Glass" effect is central: UI surfaces should appear as frosted, translucent layers floating over a dynamic background. Specular highlights and subtle inner glows create a sense of physical depth, mimicking high-end sports equipment and premium wearable technology.

## Colors
The palette is built on a "Molten Charcoal" foundation. 

- **Primary (MaxFitness Orange):** Used exclusively for high-priority actions, active states, and critical performance metrics. 
- **Surface & Background:** The background is a near-black charcoal. To prevent a "flat" feel, the background should include two or three large, ultra-diffuse (blur radius > 200px) radial gradients in #F15A23 at 5-10% opacity, creating a warm, ambient glow.
- **Translucency:** Glass surfaces use a 60-80% opaque version of the surface color combined with a `backdrop-filter: blur(24px)`.
- **Accents:** Use a secondary lighter orange for data visualization trends and hover states to maintain monochromatic harmony.

## Typography
The system uses **Inter** for its systematic, utilitarian clarity. 

- **Display & Headlines:** Use heavy weights (700-800) with tight letter spacing to evoke strength and urgency. Titles should be "Impactful" and concise.
- **Body:** Standardized at 16px for optimal readability against dark backgrounds. Use the "Regular" weight (400) to ensure the glow from the background doesn't cause text "bleeding."
- **Labels:** Small labels and captions should use semi-bold weights and increased letter spacing to maintain legibility when rendered in secondary gray (#A0A0A0) over frosted surfaces.

## Layout & Spacing
This design system utilizes a **Fluid Grid** with an 8px base unit. 

- **Mobile:** 4-column grid with 24px side margins. Elements are primarily stacked vertically to emphasize the depth of the glass layers.
- **Desktop:** 12-column grid. Max-width of 1440px. 
- **The "Breath" Principle:** High-energy brands often feel cluttered; this system counters that with generous vertical padding (`stack-lg`) between major sections to allow the background glows to peak through and define the layout structure.

## Elevation & Depth
Depth is not communicated via traditional drop shadows, but through **Tonal Stacking and Refraction**.

1.  **Base:** The dark charcoal background with amber ambient blobs.
2.  **Surface:** Floating glass panels with a 1px solid top-border (white at 15% opacity) to simulate a "specular highlight" on the edge of the glass.
3.  **Active Elevation:** When an element is focused or active, increase the `backdrop-filter` intensity and add a subtle inner glow (#F15A23 at 20% opacity) rather than a bottom shadow.
4.  **Overlays:** Modals and menus should use a darker tint of the surface color to distinguish them from the primary content panels, maintaining the background blur.

## Shapes
The system utilizes **Organic Squircles** (Continuous Curvature). Standard geometric rounds are discouraged in favor of smoother transitions that feel more "liquid." 

- **Containers:** Use `rounded-xl` (1.5rem) to create a friendly, modern container feel.
- **Interactive Elements:** Buttons and input fields use `rounded-lg` (1rem).
- **Icons:** Should follow a 2px stroke weight with rounded terminals to match the squircle container language.

## Components
- **Buttons:** Primary buttons are solid MaxFitness Orange (#F15A23) with white text. Use a subtle gradient (top-to-bottom) from a slightly lighter orange to the base primary color to give a "tactile" physical appearance. Secondary buttons should be frosted glass with a white 1px border.
- **Cards:** Glassmorphic panels with `rounded-xl` corners. Headlines within cards should be white, while metadata uses the secondary gray.
- **Chips/Badges:** Small, pill-shaped elements used for workout tags. Use a low-opacity version of the primary orange (15% fill) with a solid orange text for an "active" look.
- **Input Fields:** Dark charcoal fills (#1A1A1A) with a bottom-only border that turns primary orange on focus.
- **Performance Progress Bars:** Use a "Glow-track" style—the background of the bar is a dark charcoal, while the progress indicator is a vibrant orange with a small drop-shadow of the same color to make the progress "light up" the interface.
- **Navigation:** Bottom-tab bars (mobile) or Side-bars (desktop) should be highly translucent with a strong blur, appearing to float 16px away from the screen edge.