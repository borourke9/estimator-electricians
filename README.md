# Electrician Instant Estimator

A Next.js application that provides instant estimates for electrical work including generator installs, panel upgrades, and EV charger installations.

## Features

- **Multi-step UI**: 3-step process to gather service requirements
- **Real-time estimates**: Instant ballpark pricing based on service, property type, and scope
- **Lead capture**: Gated contact form to collect lead information
- **Webhook integration**: Sends leads to configured webhook URL
- **Mobile-first design**: Responsive UI built with Tailwind CSS

## Services

- Generator install
- Panel upgrade  
- EV charger install

## Property Types

- Single-family homes
- Condo/Townhomes
- Commercial properties

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Set up environment variables:
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your webhook URL
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Configuration

The estimator configuration is located in `config/estimator.ts`. You can modify:
- Service options
- Property types
- Scope options
- Pricing ranges
- Brand name and currency

## API Endpoints

- `POST /api/estimate` - Get pricing estimate based on service, property, and scope
- `POST /api/lead` - Submit lead information to webhook

## Environment Variables

- `ESTIMATOR_WEBHOOK_URL` - Webhook URL for lead submissions (Zapier, Make, etc.)

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- React 18
