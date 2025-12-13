/**
 * Slugify Utility Module
 * 
 * Purpose: Converts text strings into URL-friendly slugs for blog posts,
 * ensuring consistent, SEO-optimized URLs.
 * 
 * Features:
 * - Lowercase conversion
 * - Space to hyphen replacement
 * - Special character removal
 * - Trim leading/trailing hyphens
 * - Unique slug generation
 * 
 * @module lib/slugify
 */

/**
 * Convert String to URL-Friendly Slug
 * 
 * Transforms any text string into a clean, URL-safe slug by:
 * 1. Converting to lowercase
 * 2. Trimming whitespace
 * 3. Replacing spaces with hyphens
 * 4. Removing special characters
 * 5. Consolidating multiple hyphens
 * 6. Trimming edge hyphens
 * 
 * @param {string} text - The text to convert to a slug
 * @returns {string} URL-friendly slug
 * 
 * @example
 * ```typescript
 * slugify('Hello World!') // => 'hello-world'
 * slugify('Top 10 Films')  // => 'top-10-films'
 * slugify('  Spaced   Out  ') // => 'spaced-out'
 * slugify('Special @#$ Characters!') // => 'special-characters'
 * ```
 */
export function slugify(text: string): string {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-') // Replace spaces with -
        .replace(/[^\w\-]+/g, '') // Remove all non-word chars
        .replace(/\-\-+/g, '-') // Replace multiple - with single -
        .replace(/^-+/, '') // Trim - from start of text
        .replace(/-+$/, ''); // Trim - from end of text
}

/**
 * Generate Unique Slug
 * 
 * Creates a unique slug by appending an incrementing number to the base
 * slug if it already exists in the provided array. Useful for preventing
 * duplicate blog post URLs.
 * 
 * @param {string} baseSlug - The base slug to make unique
 * @param {string[]} existingSlugs - Array of existing slugs to check against
 * @returns {string} Unique slug with number suffix if needed
 * 
 * @example
 * ```typescript
 * const existing = ['my-post', 'my-post-1', 'my-post-2'];
 * 
 * makeUniqueSlug('my-post', existing) 
 * // => 'my-post-3'
 * 
 * makeUniqueSlug('new-post', existing)
 * // => 'new-post' (no conflict)
 * ```
 * 
 * @performance O(n) where n is the number of conflicts. Stops at first available number.
 */
export function makeUniqueSlug(baseSlug: string, existingSlugs: string[]): string {
    let slug = baseSlug;
    let counter = 1;

    while (existingSlugs.includes(slug)) {
        slug = `${baseSlug}-${counter}`;
        counter++;
    }

    return slug;
}
