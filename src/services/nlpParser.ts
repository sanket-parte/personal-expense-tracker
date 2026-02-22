/**
 * NLP Parser Service (Mock)
 *
 * Processes natural language input ("Spent $15 on coffee yesterday")
 * into a structured expense for the Quick Add flow.
 */

import type { ParsedExpenseData } from '@/types';
import { subDays } from 'date-fns';

/**
 * A basic heuristic local text parser.
 * In a real app, this would hit an LLM endpoint.
 */
export async function parseNaturalLanguageExpense(text: string): Promise<ParsedExpenseData> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      try {
        const lowerText = text.toLowerCase();

        // 1. Extract Amount ($X or "X dollars")
        let amount = '';
        const dollarMatch = text.match(/\$\s*([\d.]+)/);
        const numberMatch = text.match(/\b([\d.]+)\b/);

        if (dollarMatch) {
          amount = dollarMatch[1];
        } else if (numberMatch) {
          amount = numberMatch[1];
        }

        // 2. Extract relative date ("yesterday", "today")
        let date = new Date();
        if (lowerText.includes('yesterday')) {
          date = subDays(new Date(), 1);
        } else if (lowerText.includes('days ago')) {
          const daysMatch = lowerText.match(/(\d+)\s+days ago/);
          if (daysMatch) {
            date = subDays(new Date(), parseInt(daysMatch[1], 10));
          }
        }

        // 3. Very naive category mapping
        let categoryId = null;
        if (
          lowerText.includes('food') ||
          lowerText.includes('coffee') ||
          lowerText.includes('lunch')
        ) {
          categoryId = 1; // Food
        } else if (
          lowerText.includes('uber') ||
          lowerText.includes('gas') ||
          lowerText.includes('transit')
        ) {
          categoryId = 2; // Transport
        } else if (lowerText.includes('movie') || lowerText.includes('game')) {
          categoryId = 3; // Entertainment
        }

        // 4. Clean up title
        // Remove amount, dollars strings, and date strings to leave mostly "the thing"
        const cleanTitle = text
          .replace(/\$\s*[\d.]+/gi, '')
          .replace(/\b[\d.]+\s*(dollars|bucks)\b/gi, '')
          .replace(/\byesterday\b/gi, '')
          .replace(/\btoday\b/gi, '')
          .replace(/\b(?:spent|on|bought|for)\b/gi, '')
          .replace(/\s+/g, ' ')
          .trim();

        // Ensure we provide some string even if cleaning wiped it
        const title = cleanTitle.length > 0 ? cleanTitle : text.trim();

        resolve({
          amount,
          title: title.charAt(0).toUpperCase() + title.slice(1),
          date: date.toISOString(),
          categoryId,
        });
      } catch {
        reject(new Error('Failed to parse text.'));
      }
    }, 1000); // Simulate network/LLM latency
  });
}
