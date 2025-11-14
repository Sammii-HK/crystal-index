# AI SDK Setup Guide

## Overview

The app now uses **Vercel AI SDK** for all text generation, making it easy to switch between AI providers (OpenAI, Anthropic) as better models become available.

## Architecture

- **Unified Interface**: All AI calls go through `lib/ai.ts`
- **Easy Model Switching**: Change `DEFAULT_MODEL_CONFIG` in `lib/ai.ts` to switch providers/models
- **Provider Support**: OpenAI and Anthropic (easily extensible)

## Environment Variables

### Required

```bash
# OpenAI (if using OpenAI provider)
OPENAI_API_KEY="sk-..."

# Anthropic (if using Anthropic provider)
ANTHROPIC_API_KEY="sk-ant-..."
```

### Setup

1. **Local (.env.local)**:
   ```bash
   OPENAI_API_KEY="your-openai-key"
   # ANTHROPIC_API_KEY="your-anthropic-key"  # Optional, if switching to Anthropic
   ```

2. **Production (Vercel)**:
   - Add `OPENAI_API_KEY` in Vercel → Settings → Environment Variables
   - Add `ANTHROPIC_API_KEY` if you want to use Anthropic models

## Switching Models

### Current Default

Located in `lib/ai.ts`:

```typescript
export const DEFAULT_MODEL_CONFIG: ModelConfig = {
  provider: 'openai',
  model: 'gpt-4-turbo-preview',
  temperature: 0.7,
}
```

### Switch to Different OpenAI Model

```typescript
export const DEFAULT_MODEL_CONFIG: ModelConfig = {
  provider: 'openai',
  model: 'gpt-4',  // or 'gpt-3.5-turbo'
  temperature: 0.7,
}
```

### Switch to Anthropic

1. Add `ANTHROPIC_API_KEY` to environment variables
2. Update `lib/ai.ts`:

```typescript
export const DEFAULT_MODEL_CONFIG: ModelConfig = {
  provider: 'anthropic',
  model: 'claude-3-opus-20240229',  // or 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'
  temperature: 0.7,
}
```

### Per-Call Override

You can override the default model for specific calls:

```typescript
import { generateBlogPost } from '@/lib/ai'

// Use Anthropic for this specific call
const content = await generateBlogPost(
  'Amethyst',
  { chakra: ['Crown'], colour: ['Purple'] },
  { provider: 'anthropic', model: 'claude-3-opus-20240229' }
)
```

## Available Models

### OpenAI
- `gpt-4-turbo-preview` (default) - Latest GPT-4 Turbo
- `gpt-4` - Standard GPT-4
- `gpt-3.5-turbo` - Faster, cheaper option

### Anthropic
- `claude-3-opus-20240229` - Most capable
- `claude-3-sonnet-20240229` - Balanced performance
- `claude-3-haiku-20240307` - Fastest, cheapest

## Usage Examples

### Generate Blog Post

```typescript
import { generateBlogPost } from '@/lib/ai'

const content = await generateBlogPost(
  'Amethyst',
  {
    chakra: ['Crown', 'Third Eye'],
    colour: ['Purple', 'Violet']
  }
)
```

### Generate Custom Text

```typescript
import { generateAIText } from '@/lib/ai'

const text = await generateAIText([
  {
    role: 'system',
    content: 'You are a helpful assistant.'
  },
  {
    role: 'user',
    content: 'Explain quantum computing in simple terms.'
  }
])
```

### Generate Structured JSON

```typescript
import { generateAIJSON } from '@/lib/ai'

interface CrystalInfo {
  info: string
  chakra: string[]
  colour: string[]
}

const data = await generateAIJSON<CrystalInfo>([
  {
    role: 'user',
    content: 'Describe Amethyst crystal in JSON format...'
  }
])
```

## Benefits

1. **Future-Proof**: Easy to adopt new models as they're released
2. **Cost Optimization**: Switch to cheaper models when appropriate
3. **Performance**: Use faster models for real-time features
4. **Unified API**: Same code works with any provider
5. **Type Safety**: Full TypeScript support

## Installation

Dependencies are already in `package.json`:

```bash
pnpm install
```

Required packages:
- `ai` - Core AI SDK
- `@ai-sdk/openai` - OpenAI provider
- `@ai-sdk/anthropic` - Anthropic provider

## Migration Notes

- **Blog Generation**: Migrated from direct OpenAI SDK to AI SDK
- **Replicate**: Still uses Replicate SDK directly (image models, not supported by AI SDK)
- **Backward Compatible**: Old OpenAI SDK still installed but not used

## Troubleshooting

**"Missing API key" error:**
- Check environment variables are set
- Restart dev server after adding env vars

**"Unsupported provider" error:**
- Make sure provider package is installed (`@ai-sdk/openai` or `@ai-sdk/anthropic`)
- Check provider name matches exactly: `'openai'` or `'anthropic'`

**Model not found:**
- Verify model name is correct (check provider docs)
- Some models may require API access approval



