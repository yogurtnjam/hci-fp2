# Digital Detox interactive prototype

This repository now contains a lightweight, self-contained research prototype that study
participants can open in any modern browser (desktop or mobile) to experience the
non-intrusive Digital Detox flows.

## Run the prototype

1. Use any static server or simply open `index.html` in your browser.
2. For local testing with live reload you can run, for example:
   ```bash
   npx serve .
   ```
3. The UI adapts in real time to simulated session length, scroll speed, and pauses.

## Screens & behaviors

- **Onboarding** – slider + context chips to seed adaptive cues.
- **Dashboard** – ambient stats, mindful streak, flow map.
- **Ambient cues** – color fading preview, breathing dot, doom-scroll slowdown lab.
- **Break suggestion** – passive prompt with wave animation + mock study data.
- **Reflection** – one-tap emoji logging to update streaks.
- **Settings** – adaptive toggle and cue intensity slider.

No frameworks or build tools are required—HTML, CSS, and vanilla JavaScript keep cognitive
load low for both researchers and participants.
