# Creative Inference — ComfyUI Media & Visual Pipeline

All visual assets for `creativeinference.com` are generated locally via **ComfyUI** using:
- **Stills:** `Flux 3 Klein (NVFP4)` (`flux3-image-klein-nvfp4.safetensors` + `qwen3vl_4b_int8_convrot.safetensors` + `flux2-vae.safetensors`)
- **Looping Cinemagraphs:** `Wan 2.2 TI2V 5B` (`wan2.2_ti2v_5B_fp16.safetensors` + `umt5_xxl_fp8_e4m3fn_scaled.safetensors` + `wan2.2_vae.safetensors`, VP9 `.webm`)

> **Art Direction Rule:** Never bake typography or UI mockups into generated imagery. All prompts enforce pure visual composition; badges, code snippets, and telemetry overlays are rendered natively in crisp HTML/CSS/SVG.

---

## Asset Manifest

| Asset | Files | Role |
|-------|-------|------|
| **Studio Hero Observatory** | `media/hero-studio.webp`, `media/hero-studio.webm`, `img/hero-bg.jpg` | Full-bleed hero background cinemagraph (glowing incandescent filament sphere & golden optical fibers over dark topographic city relief) |
| **BarDC Nightlife Showcase** | `media/bardc-showcase.webp`, `media/bardc-showcase.webm`, `img/bardc-thumb.jpg` | Flagship BarDC card & Tour Stop 03 visual (stylized DC rooftop cocktails overlooking brick nightlife corridor & Capitol twilight horizon) |
| **Autonomous Agent Swarm** | `media/tour-agents.webp`, `media/tour-agents.webm` | Tour Stop 01 visual (noir illustrated nocturnal city blocks swept by golden & cyan intelligence beams) |
| **Simone Living Plates** | `media/simone/{lounge-idle,speakeasy,jazz,rooftop}.{webp,webm}` | Tour Stop 02 interactive multi-world cinemagraph switcher demonstrating canonical persona consistency across 4 distinct art styles |
| **Hybrid GPU + Cloud Forge** | `media/tour-hybrid-gpu.webp`, `media/tour-hybrid-gpu.webm` | Hybrid Architecture section visual (matte-black dual local GPU blades with glowing amber copper conduits rising into cloud strata) |
| **3D Spatial City Map** | `media/tour-spatial-map.webp` | Tour Stop 04 visual (isometric obsidian DC blocks with glowing venue pins & golden walkable Night Pass ribbon) |
| **Coming Soon — New Cities & Dining** | `media/coming-cities.webp` | Upcoming platform card 1 (ligne claire lantern-lit courtyard wine garden & metropolitan harbor skyline) |
| **Coming Soon — Cultural & Music Radars** | `media/coming-radars.webp` | Upcoming platform card 2 (mid-century UPA gouache cutaway of live music stage, vinyl bar, and gallery night) |
| **Brand & Social** | `img/ci_logo.png`, `img/og-image.jpg` | Studio emblem & 1200×630 Open Graph preview card |
