# Digital Detox – Mobile Prototype Specification

## 1. Concept Overview
- **Goal**: Offer non-intrusive, ambient, psychologically adaptive screen-time interventions for university students (18–22) based on cognitive load theory, working memory limits, Hick-Hyman law, Fitts law, and cognitive offloading.
- **Platform**: Mobile (iOS + Android friendly), single-column responsive layout with large tap targets (>56 px) and smooth 60 fps animations.
- **Tone**: Supportive, neutral, non-judgmental (“Let’s make space to breathe ☁️”).
- **Interaction Principle**: No pop-ups, modals, or alerts. Interventions live within main surfaces via color, motion, or gentle content shifts.

## 2. Adaptive Logic Model
| Trigger | Signals | Adaptive Response | Theoretical Basis |
| --- | --- | --- | --- |
| Extended session | App open >12 min, no pause | Gradual background warmth, breathing dot amplitude increase | Working memory fatigue, cognitive load | 
| Fast scrolling / doom-scrolling | Scroll velocity > set threshold for >3 s | Ease scroll physics (15% slower), show inline message “Let’s take things slow 🌿” | Fitts + Hick-Hyman (slower stream reduces selection rate) |
| Micro-pauses | No touch input for 6–8 s | Surface inline breathing dot + soft timer arc | Cognitive offloading, mindfulness cue |
| Task completion / checkpoint | Completing reading timer, finishing to-do | Offer ambient break suggestion strip | Positive reinforcement |
| Break accepted | User taps “Log mindful break” chip | Update streak count, show reflection screen | Habit formation |
| Break ignored | User scrolls past cue within 5 s | Dismiss cue, schedule next in 3 min | Non-judgmental design |

## 3. Component System
- **Ambient Gradient Canvas**: Soft pastel gradient (#F4F0FF → #CFE8FF). Saturation increases with load.
- **Breathing Dot**: 12 px circle expanding to 22 px over 6 s; color transitions with session context.
- **Cue Strip**: 100% width, 64 px height, inline message, breathing dot, optional slider for intensity.
- **One-tap Chips**: Rounded 48 px height chips for context selection, mood check, intensity. Large targets, 12 px padding.
- **Slowdown Overlay**: Transparent overlay (rgba(255,255,255,0.04)) with text anchored to bottom.
- **Soft Goal Card**: 88 px card with subtle gradient icon and message.

## 4. Screen Specifications

### 4.1 Onboarding
- **Flow**: welcome → slider for screen habits → context chips → soft goal confirmation. No more than 3 steps.
- **Visual**: gradient background, illustration of floating orbs.
- **Elements**:
  - Welcome copy: “Hey Riley 👋 Ready to make space for mindful breaks today?”
  - Slider: “How do screens feel today?” scale from “Overwhelming” to “Balanced” with emoji anchors.
  - Context chips: Studying, Relaxing, Social Scroll; one tap toggles. Selected chip glows softly.
  - Soft goal card: “Let’s try for 2 mindful pauses ☁️”.
  - CTA button: “Float On” (full width, 56 px height) that transitions into dashboard with fade.
- **Animations**: slider handle leaves trailing glow, background gradient slow drift.

### 4.2 Dashboard
- **Layout**: Top greeting + streak, center ambient canvas with breathing dot, bottom mindful break log.
- **Components**:
  - Streak indicator: “Mindful streak: 3 days of gentle resets”. Includes tiny leaf icon.
  - Session timer: non-numeric ring slowly filling (avoid exact numbers). Display label “In-flow for a bit”.
  - Mindful break chip: “Tap when you take a breath”.
  - Break log card: “Today: 1 micro-pause • 1 stretch”.
- **Adaptive cues**: background warms and dot pulse speeds up as session length extends.

### 4.3 Ambient Cues Surface
1. **Color Fading Cue**
   - Entire screen shifts from cool purple to warm peach over 90 seconds.
   - Subtle text fades in bottom corner: “Space is opening up ✨”.
2. **Breathing Dot Cue**
   - Dot sits near nav bar, pulsing inhale/exhale (6 s). Dot color matches context (e.g., teal for study).
   - Surrounding concentric rings lighten to reduce cognitive load.
3. **Gentle Slowdown**
   - Scroll deceleration factor increases by 0.15. Message anchored inline: “Let’s take things slow 🌿”.
   - After user lifts finger, haptic tick (optional) suggests release.

### 4.4 Break Suggestion
- **Presentation**: Inline card sliding up from bottom (occupies bottom 25%). Not a modal.
- **Content**:
  - Title: “You’ve been focused for a while”.
  - Copy: “Want a 20-second stretch? I’ll keep time.”
  - Breathing animation in card background.
  - Buttons: only one primary (“Log mindful break”) plus “Maybe later” text link.
- **Behavior**: if ignored, card auto-fades after 8 s, updates next check.

### 4.5 Reflection / Check-in
- **Trigger**: After user taps “Log mindful break”.
- **Layout**: Single row of large emoji chips (Relaxed 😊, Neutral 😌, Still tense 😅) + note field placeholder (optional voice note button).
- **Copy**: “How did that pause feel?”
- **Interaction**: One tap logs mood; checkmark animation and shimmering gradient confirms log.

### 4.6 Settings
- **Items**:
  - Adaptive Mode toggle (default ON). Copy: “Let cues learn from your rhythms”.
  - Intensity slider (Low ←→ Deep) controlling gradient saturation and cue frequency.
  - Notification summary: “Next mindful window around 3 pm”.
  - Data export button (rounded). No nested menus.
- **Visual**: minimal list with cards separated by soft dividers.

## 5. Interaction Flow Map
1. **Onboarding** → context + goal.
2. **Dashboard** displays streak + cues.
3. Based on activity → ambient cues escalate.
4. When signals satisfied → Break suggestion card.
5. User logs break → Reflection screen.
6. After logging → Dashboard updates streak.
7. Settings accessible via top-right icon.

## 6. Sample Interaction Scenarios
- **Scenario A**: Student studying, after 15 min gradient warms, breathing dot pulses faster. Slowdown triggers due to fast scroll; student notices message and reduces pace.
- **Scenario B**: Student pauses >6 s; break suggestion card nudges for 20-second stretch. Student taps “Log mindful break”, selects mood, streak increases.

## 7. Research Alignment
- Cognitive load & working memory: limited choices, preattentive cues, no numeric overload.
- Hick-Hyman & Fitts: one-tap chips, large buttons, no branching flows.
- Cognitive offloading: persistent streak card, timer ring, context chips visually encode state.
- Emotion: all copy supportive, no warnings.

## 8. Mock Data
| Metric | Value |
|---|---|
| Mindful streak | 3 days |
| Today’s pauses | 2 (breath, stretch) |
| Session context | Studying |
| Adaptive mode | ON (Intensity 60%) |

## 9. Prototype Notes for Researchers
- Build clickable prototype in Figma / ProtoPie using described components.
- Ensure animations capped at 6–8 s cycles to avoid distraction.
- Include instrumentation to log user interactions for empirical HCI testing.
- Provide toggles for A/B testing cue intensities.

