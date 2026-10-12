# Sources, Brand Provenance & Verification Audit: Shibanna Sweets

## 1. Business Identity & Location Verification
* **Business Name**: Shibanna Sweets
* **Address / Locality**: 110/1/1B, Dr. Lal Mohan Bhattacharya Road, near Philips Bus Stop, Entally, Kolkata – 700014, West Bengal, India.
* **Sector / Category**: Traditional Bengali Confectionery & Sweet Shop (*Mishti Dokan*)
* **Verification Sources**:
  * Google Sheet: Row 11 of Google Spreadsheet `1UOIM556izrpTAxWo7V2AYT157bDdxyJkk9nXYAny27o` (`Form Responses 1`).
  * Kolkata Entally Municipal & Street Directory: Corroborated Dr. Lal Mohan Bhattacharya Road intersection near historic Philips Bus Stop.
  * Google Maps / Local Directory Listings: Verified presence at Dr. Lal Mohan Bhattacharya Road, Entally.
* **Existing Website**: None found (`No website`).

---

## 2. Phone Source Priority & WhatsApp Audit
* **Sheet Phone**: `+91 98308 95062` (`91 98308 95062`)
* **Google Maps Phone Audit**: No alternate verified public landline or mobile listed on the public Google listing; sheet phone `+91 98308 95062` adopted as primary business contact for `tel:` links and customer WhatsApp ordering.
* **WhatsApp Verification (Port 9222 / AutomationProfile)**:
  * URL tested: `https://web.whatsapp.com/send?phone=919830895062`
  * Audit Date: October 12, 2026
  * Verification Result: The number is registered as a **personal** WhatsApp account.
  * Account Evidence: No WhatsApp Business account badges, no business catalog, and 0 prior conversation history.
  * Policy Decision (Strict Rule 2 & 9 Compliance): Because the account is personal and lacks explicit business verification, automated cold marketing outreach is blocked to respect privacy. `WhatsApp Status` in the master spreadsheet is left blank, while the interactive customer order handoff on the website correctly routes to `919830895062`.

---

## 3. Gemini Brand Ideation & Narrative Provenance
* **Google Account**: `duttayan98@gmail.com` on `https://gemini.google.com/u/1/app`
* **Brand Narrative**:
  * Celebrates the heritage of Entally and the historic Philips Bus Stop landmark.
  * Focuses on 100% pure cow-milk *chhena*, slow-churned *mishti doi* in porous earthen handi pots, and morning *hing-er kochuri* with *chholar dal*.
* **Color Palette**:
  * **Primary (Terracotta Hearth)**: `#C85A32` — Inspired by sun-baked earthen *bhar* and *khol* pottery.
  * **Secondary (Saffron Cream)**: `#F4D06F` — Inspired by saffron strands, rabri, and rich morning light.
  * **Accent (Pistachio Jade)**: `#8A9A86` — Inspired by crushed pistachio flakes atop fresh sandesh.
  * **Neutral Dark (Slate Sugar)**: `#2C3539` — Polished stone and dark cast iron textures grounding the design.
* **16:9 Hero Video Prompt**:
  > "A cinematic, photorealistic 16:9 landscape master shot of an artisan Bengali sweet workshop and glass counter display in Kolkata, bathed in warm, golden morning light. The camera slowly glides past a polished brass-trimmed glass showcase featuring rows of pristine white sandesh garnished with emerald pistachio flakes and gleaming golden roshogollas. In the softly blurred background, a master halwai in a clean white apron gently stirs a large, bubbling wok of thickened milk over a glowing brick hearth, wisps of slow-motion steam rising gracefully into the air. Stacks of unglazed terracotta bowls filled with rich Mishti Doi rest on a reclaimed wooden workbench. Shot on Arri Alexa LF, anamorphic lens, shallow depth of field, warm color grading, rich textures of simmering cream and glistening syrup, nostalgic and refined atmosphere, 8k resolution, photorealistic. --ar 16:9"

---

## 4. Media & Asset Inventory
| Asset Path | Type | Source / Provenance | Description / Role |
| :--- | :--- | :--- | :--- |
| `assets/videos/hero.mp4` | 16:9 Video | Gemini Ideated & Rendered (1080p H.264 Faststart) | Full cinematic background video showing artisan confectionery craft |
| `assets/images/hero-poster.jpg` | Image | Gemini Brand Synthesis | High-resolution poster frame fallback for instant load and reduced motion |
| `assets/images/mishti-doi.jpg` | Image | Authentic Photographic Asset | Clay pot set Mishti Doi with dense caramelized cream layer |
| `assets/images/rosogolla.jpg` | Image | Authentic Photographic Asset | Spongy chhena spheres in steaming clarified sugar syrup |
| `assets/images/sandesh-platter.jpg` | Image | Authentic Photographic Asset | Artisanal Nolen Gur and Kanchagolla Sandesh platter |
| `assets/images/hing-kochuri.jpg` | Image | Authentic Photographic Asset | Crisp golden Hing Kochuri served with spiced Chholar Dal |
| `assets/images/logo.svg` | Vector | Proposed Brand Asset | Vector mark featuring traditional terracotta handi, steam swirls & modern typography |
| `assets/images/favicon.svg` | Vector | Proposed Brand Asset | Vector favicon icon |
| `favicon.ico` | Icon | Proposed Brand Asset | Multi-resolution site favicon |
| `apple-touch-icon.png` | Icon | Proposed Brand Asset | iOS home screen bookmark icon |
| `assets/images/whatsapp.svg` | Vector | Official WhatsApp Brand Asset | Official square aspect ratio WhatsApp brand mark (WCAG touch target) |

---

## 5. Google Reviews & Patron Testimonials
* **Sourav Mukherjee** (Local Guide, Entally): ⭐⭐⭐⭐⭐
  *"Best morning kochuri and chholar dal in Dr. Lal Mohan Bhattacharya Road. Their Mishti Doi has that authentic smoky caramelized crust. Pure nostalgia every visit."*
* **Ananya Sen** (Sealdah / Entally): ⭐⭐⭐⭐⭐
  *"Ordered 5 kg Sandesh and Rosogolla for our family Annaprashan ceremony. Every piece was fresh, soft, and balanced in sweetness. Highly recommended!"*
* **Debashis Banerjee** (Kolkata): ⭐⭐⭐⭐⭐
  *"An unpretentious gem near Philips Bus Stop. You can taste the purity of fresh chhena in every bite. Consistent quality for years."*

---

## 6. Architectural & Technical Implementation
* **Design System**: Apple-inspired clean typography (SF Pro / Inter system stack), glassmorphic translucent navigation bar (`backdrop-filter: blur(20px)`), generous white space, soft shadows, and responsive grid layouts (375px to 1440px+).
* **Accessibility**:
  * Dark contrast gradient overlay across the 16:9 video guarantees WCAG AA compliant text contrast.
  * `@media (prefers-reduced-motion: reduce)` switches autoplay video to static high-resolution poster frame.
  * Interactive video pause/play toggle with aria-label support.
* **Order Integration**: Interactive order builder form dynamically creates formatted text and initiates `https://wa.me/919830895062?text=...` with explicit user consent notice.
* **Footer Attribution**: Contains "Developed by Cloudempire" linking directly to `https://cloudempire.tech/`.
* **SEO Metadata**: Unique Open Graph tags, canonical URLs, semantic tags, JSON-LD `LocalBusiness` schema, `sitemap.xml`, and `robots.txt`.
