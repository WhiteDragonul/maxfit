---
name: Liquid Vitality
colors:
  surface: '#111319'
  surface-dim: '#111319'
  surface-bright: '#37393f'
  surface-container-lowest: '#0c0e13'
  surface-container-low: '#191b21'
  surface-container: '#1d1f25'
  surface-container-high: '#282a30'
  surface-container-highest: '#33353b'
  on-surface: '#e2e2ea'
  on-surface-variant: '#c3c6d4'
  inverse-surface: '#e2e2ea'
  inverse-on-surface: '#2e3036'
  outline: '#8d909d'
  outline-variant: '#424752'
  surface-tint: '#adc6ff'
  primary: '#adc6ff'
  on-primary: '#002e69'
  primary-container: '#0c4da2'
  on-primary-container: '#a7c2ff'
  inverse-primary: '#265cb1'
  secondary: '#c6c6c6'
  on-secondary: '#2f3131'
  secondary-container: '#484949'
  on-secondary-container: '#b8b8b8'
  tertiary: '#ffb692'
  on-tertiary: '#562000'
  tertiary-container: '#883700'
  on-tertiary-container: '#ffb089'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#d8e2ff'
  primary-fixed-dim: '#adc6ff'
  on-primary-fixed: '#001a41'
  on-primary-fixed-variant: '#004494'
  secondary-fixed: '#e3e2e2'
  secondary-fixed-dim: '#c6c6c6'
  on-secondary-fixed: '#1a1c1c'
  on-secondary-fixed-variant: '#464747'
  tertiary-fixed: '#ffdbcb'
  tertiary-fixed-dim: '#ffb692'
  on-tertiary-fixed: '#341100'
  on-tertiary-fixed-variant: '#793000'
  background: '#111319'
  on-background: '#e2e2ea'
  surface-variant: '#33353b'
typography:
  display-lg:
    fontFamily: Inter
    fontSize: 34px
    fontWeight: '800'
    lineHeight: 41px
    letterSpacing: -0.5px
  headline-md:
    fontFamily: Inter
    fontSize: 24px
    fontWeight: '700'
    lineHeight: 30px
    letterSpacing: 0px
  headline-sm:
    fontFamily: Inter
    fontSize: 20px
    fontWeight: '600'
    lineHeight: 25px
  body-lg:
    fontFamily: Inter
    fontSize: 17px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 15px
    fontWeight: '400'
    lineHeight: 20px
  label-bold:
    fontFamily: Inter
    fontSize: 13px
    fontWeight: '600'
    lineHeight: 18px
  label-sm:
    fontFamily: Inter
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  display-lg-mobile:
    fontFamily: Inter
    fontSize: 28px
    fontWeight: '800'
    lineHeight: 34px
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  container-margin: 20px
  stack-gap: 16px
  element-padding: 12px
  glass-inner-padding: 24px
  section-spacing: 32px
---

## Brand & Style
This design system focuses on high-performance fitness through a premium, "Liquid Glass" aesthetic tailored for a high-end gym experience. The brand personality is energetic yet sophisticated, combining the intensity of physical training with the sleek, polished feel of a modern iOS application. 

The visual style is **Glassmorphism**, characterized by deep background blurs, multi-layered translucency, and specular highlights that mimic high-end hardware. The interface feels weightless and fluid, using organic "blob" shapes in the background to provide a sense of movement and vitality. The emotional response should be one of motivation and exclusivity, positioning the app as a premium personal training companion.

## Colors
The palette is rooted in a deep dark navy base to maintain a premium iOS feel. 
- **Primary Blue (#0C4DA2):** Used for primary actions and background glow elements to represent strength and stability.
- **Accent Orange (#F15A23):** Used sparingly for high-visibility highlights, progress indicators, and "Start" buttons to evoke energy.
- **Surface Strategy:** Layers are built using varying opacities of white over the navy base, creating the "Glass" effect. 
- **Background Blobs:** Large, blurred organic shapes in Primary Blue and Accent Orange sit behind the main content layers to create depth and visual interest without sacrificing readability.

## Typography
The system utilizes **Inter** (as a high-fidelity alternative to SF Pro) to maintain a native iOS feel. The hierarchy is "Top-Heavy," featuring large, bold titles in Romanian (e.g., "Antrenamentele Tale") to establish clear entry points.

- **Headlines:** Use Bold or Extra-Bold weights with tighter letter-spacing to feel impactful and modern.
- **Body:** Standardized at 17px for primary content to align with iOS Human Interface Guidelines.
- **Labels:** Used for metadata like "DURATĂ" or "CALORII," often utilizing semi-bold weights for legibility against glass backgrounds.

## Layout & Spacing
The layout follows a **Fluid iOS Grid** model. Content is contained within a 20px side margin. 
- **The Glass Stack:** Elements are not just placed; they are layered. A standard card uses a 24px inner padding to allow the frosted background enough room to "breathe."
- **Safe Areas:** Strictly adhere to iOS safe areas for the floating tab bar and top navigation.
- **Reflow:** On larger devices, cards expand horizontally but maintain a maximum readable width for content, centering the primary glass container.

## Elevation & Depth
Depth is achieved through **Backdrop Filtration** rather than traditional drop shadows.
- **The Glass Effect:** Surfaces use a `backdrop-filter: blur(20px)` combined with a subtle white inner glow (`box-shadow: inset 0 1px 1px rgba(255,255,255,0.2)`).
- **Specular Highlights:** Every glass container must have a 0.5px solid white border at 15-20% opacity to define its edge against the dark background.
- **Z-Axis Hierarchy:** 
    1. Base: Dark Navy with blurred blobs.
    2. Mid: Frosted glass cards for content.
    3. Top: Floating tab bar and high-priority modals with 40px+ blur.

## Shapes
The design system employs **Continuous-Curvature (Squircle)** radii to match the physical hardware of the iPhone. 
- **Primary Containers:** 24px corner radius.
- **Buttons & Small Chips:** 12px-16px corner radius.
- **Organic Elements:** Background decorative blobs should use irregular, non-symmetrical vector paths with extreme Gaussian blurs (80px+) to ensure they feel liquid and ethereal.

## Components
- **Glass Cards:** The primary container. Features a subtle gradient from top-left (more opaque) to bottom-right (more transparent).
- **Floating Tab Bar:** A detached, pill-shaped glass container at the bottom of the screen. Active states use the Primary Blue with a soft outer glow.
- **Day Filter Chips:** Horizontal scrolling list of days. Unselected: Glass with subtle border. Selected: Primary Blue with white text.
- **iOS Bottom Sheets:** Use a high-intensity blur (30px+) for the sheet itself, darkening the background content behind it. Includes a "grabber" handle at the top.
- **Pricing Cards:** Utilize the Accent Orange for "Cel mai popular" (Most Popular) badges, using a vibrant saturation to contrast the glass.
- **Input Fields:** Semi-transparent dark fills with a 1px glass border that glows Primary Blue when focused.