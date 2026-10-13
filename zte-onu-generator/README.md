# ZTE ONU Configuration Script Generator

Deterministic OLT CLI syntax generator for ZTE optical network units.

A simple web tool that takes provisioning parameters (PPPoE credentials, serial number, ONU type, frame/slot/port, ONU ID, SVLAN) and generates three ready-to-use ZTE OLT CLI scripts:

1. **ONU Config Script** – full service configuration
2. **ONU Type Add Script** – register ONU type on the OLT
3. **Remote Access Only Script** – enable management protocols

## Features

- Strict template engine (zero alteration / rewriting)
- Clean modern UI matching professional network-provisioning tools
- Copy-to-clipboard for each script
- Load example / Clear buttons
- Input validation with Zod
- Fully client + API route based (no external services)

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS**
- **react-hook-form + Zod**
- **lucide-react** icons

## Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Build & Production

```bash
npm run build
npm start
```

## Deploy on Render

1. Push this repository to GitHub.
2. Go to [render.com](https://render.com) → **New** → **Web Service**.
3. Connect the repository.
4. Configure:
   - **Runtime**: Node
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
5. Click **Create Web Service**.

Render will provide a public URL (e.g. `https://zte-onu-generator.onrender.com`).

## Project Structure

```
src/
├── app/
│   ├── api/generate/route.ts   # POST endpoint that returns the 3 scripts
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── ProvisioningForm.tsx    # Main form + state
│   └── ScriptOutput.tsx        # Tabbed code viewer with copy
└── lib/
    ├── scripts/
    │   ├── onu-config.ts
    │   ├── onu-type-add.ts
    │   └── remote-access.ts
    ├── types.ts
    └── utils.ts
```

## License

MIT
