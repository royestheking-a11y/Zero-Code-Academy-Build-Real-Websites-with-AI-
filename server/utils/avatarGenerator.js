// Auto-generate unique premium avatar for each user
// Uses email hash to consistently generate the same avatar for the same user

const PREMIUM_STYLES = [
    'adventurer',
    'adventurer-neutral',
    'avataaars',
    'big-smile',
    'bottts',
    'lorelei',
    'micah',
    'notionists',
    'personas',
    'pixel-art'
];

// Simple hash function to get a number from string
function hashCode(str) {
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
        const char = str.charCodeAt(i);
        hash = ((hash << 5) - hash) + char;
        hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash);
}

// Generate a unique, consistent avatar URL for a user
function generateUserAvatar(email, name = '') {
    const seed = email.toLowerCase();
    const hash = hashCode(seed);

    // Pick a style based on email hash (consistent for same email)
    const styleIndex = hash % PREMIUM_STYLES.length;
    const style = PREMIUM_STYLES[styleIndex];

    // Use email as seed for consistent generation
    return `https://api.dicebear.com/7.x/${style}/svg?seed=${encodeURIComponent(seed)}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

module.exports = { generateUserAvatar };
