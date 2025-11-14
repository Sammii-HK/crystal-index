/**
 * Unified AI Provider Utility
 * 
 * This module provides a unified interface for AI model interactions,
 * making it easy to switch between providers (OpenAI, Anthropic, etc.)
 * as better models become available.
 * 
 * To switch models, simply update DEFAULT_MODEL_CONFIG below.
 * Examples:
 * - OpenAI: { provider: 'openai', model: 'gpt-4-turbo-preview' }
 * - Anthropic: { provider: 'anthropic', model: 'claude-3-opus-20240229' }
 */

import { openai } from '@ai-sdk/openai'
import { anthropic } from '@ai-sdk/anthropic'
import { generateText } from 'ai'
import type { CoreMessage } from 'ai'

export type AIModel = 'openai' | 'anthropic'
export type ModelConfig = {
  provider: AIModel
  model: string
  temperature?: number
}

/**
 * Default model configuration
 * 
 * Easy to change as better models become available:
 * - OpenAI: 'gpt-4-turbo-preview', 'gpt-4', 'gpt-3.5-turbo'
 * - Anthropic: 'claude-3-opus-20240229', 'claude-3-sonnet-20240229', 'claude-3-haiku-20240307'
 */
export const DEFAULT_MODEL_CONFIG: ModelConfig = {
  provider: 'openai',
  model: 'gpt-4-turbo-preview', // Switch to 'claude-3-opus-20240229' for Anthropic
  temperature: 0.7,
}

/**
 * Get the AI provider based on config
 */
function getProvider(config: ModelConfig) {
  switch (config.provider) {
    case 'openai':
      return openai(config.model)
    case 'anthropic':
      return anthropic(config.model)
    default:
      throw new Error(`Unsupported provider: ${config.provider}`)
  }
}

/**
 * Generate text using AI
 * 
 * @param messages - Array of messages (system, user, assistant)
 * @param config - Model configuration (optional, uses defaults)
 * @returns Generated text content
 */
export async function generateAIText(
  messages: CoreMessage[],
  config: Partial<ModelConfig> = {}
): Promise<string> {
  const modelConfig: ModelConfig = {
    ...DEFAULT_MODEL_CONFIG,
    ...config,
  }

  const provider = getProvider(modelConfig)

  const result = await generateText({
    model: provider,
    messages,
    temperature: modelConfig.temperature,
  })

  return result.text
}

/**
 * Generate structured JSON using AI
 * 
 * @param messages - Array of messages
 * @param config - Model configuration (optional)
 * @returns Parsed JSON object
 */
export async function generateAIJSON<T = any>(
  messages: CoreMessage[],
  config: Partial<ModelConfig> = {}
): Promise<T> {
  const text = await generateAIText(messages, config)
  
  try {
    return JSON.parse(text) as T
  } catch (error) {
    throw new Error(`Failed to parse AI response as JSON: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Convenience function for blog post generation
 */
export async function generateBlogPost(
  topic: string,
  context: {
    chakra?: string[]
    colour?: string[]
    [key: string]: any
  },
  config: Partial<ModelConfig> = {}
): Promise<string> {
  const messages: CoreMessage[] = [
    {
      role: 'system',
      content: 'You are a knowledgeable crystal expert writing engaging, SEO-optimized blog content.',
    },
    {
      role: 'user',
      content: `Write a comprehensive, SEO-optimized blog post about ${topic} crystal. Include:
- Introduction to the crystal
- Physical properties and appearance
- Healing properties and metaphysical meanings
${context.chakra ? `- Chakra associations: ${context.chakra.join(', ')}` : ''}
${context.colour ? `- Color properties: ${context.colour.join(', ')}` : ''}
- How to use and care for this crystal
- Common uses and rituals
- Conclusion

Make it engaging, informative, and approximately 1000-1500 words. Use proper headings and formatting.`,
    },
  ]

  return generateAIText(messages, config)
}

