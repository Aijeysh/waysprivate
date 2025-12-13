/**
 * Centralized Projects Data
 * 
 * Purpose: Single source of truth for all portfolio projects.
 * This file contains comprehensive information about each project including
 * metadata, descriptions, images, and SEO-optimized content.
 * 
 * Usage:
 * - Homepage: Displays featured projects
 * - Portfolio page: Shows all projects
 * - Individual project pages: Detailed project information
 * 
 * To add a new project:
 * 1. Add project images to /public folder
 * 2. Add new project object to the projects array below
 * 3. Set featured: true to show on homepage
 */

export interface Project {
    id: number;
    slug: string;
    title: string;
    category: "Feature Film" | "Theatre" | "Music Video" | "Brand Content" | "Documentary";
    tagline: string;
    shortDescription: string;
    fullDescription: string;
    coverImage: string;
    images: string[];
    year: string;
    duration?: string;
    featured: boolean;
    size?: 'large' | 'medium' | 'small';
    cast?: string[];
    crew?: {
        director?: string;
        producer?: string;
        writer?: string;
        cinematographer?: string;
        editor?: string;
        musicDirector?: string;
    };
    awards?: string[];
    keywords: string[];
}

export const projects: Project[] = [
    {
        id: 1,
        slug: "taraharu",
        title: "Taraharu",
        category: "Feature Film",
        tagline: "A Journey Through Stars and Emotions",
        shortDescription: "A cinematic journey showcasing emotion and storytelling",
        fullDescription: "Taraharu is a groundbreaking Nepali feature film that weaves together powerful storytelling with breathtaking cinematography. This emotional journey explores the complexities of human relationships, dreams, and the pursuit of happiness against the backdrop of Nepal's stunning landscapes. The film combines traditional Nepali cultural elements with contemporary filmmaking techniques, creating a unique cinematic experience that resonates with audiences across generations. Through compelling performances and a masterfully crafted narrative, Taraharu takes viewers on an unforgettable journey through the stars of hope and the depths of human emotion.",
        coverImage: "/Taraharu.jpeg",
        images: [
            "/Taraharu.jpeg",
        ],
        year: "2023",
        duration: "2h 15min",
        featured: true,
        size: 'large',
        crew: {
            director: "Ways Creative Team",
            producer: "Ways Private Limited",
        },
        keywords: [
            "Nepali movie Taraharu",
            "Nepali feature film production",
            "Nepal cinema",
            "Nepali film Ways Private Limited",
            "emotional Nepali drama",
            "contemporary Nepali cinema"
        ]
    },
    {
        id: 2,
        slug: "kaancho-dhaago",
        title: "Kaancho Dhaago",
        category: "Theatre",
        tagline: "The Golden Thread of Life",
        shortDescription: "Theatrical masterpiece exploring inner emotions",
        fullDescription: "Kaancho Dhaago (The Golden Thread) is a profound theatrical production that delves deep into the human psyche, exploring themes of connection, identity, and the invisible bonds that tie us together. This critically acclaimed stage performance combines traditional Nepali theatre techniques with modern dramatic elements, creating a powerful narrative that examines the delicate threads connecting family, society, and self. Through stunning set design, evocative lighting, and powerhouse performances, the production weaves together multiple storylines that converge in a thought-provoking climax. The play has been celebrated for its innovative approach to storytelling and its ability to address contemporary social issues while honoring Nepal's rich theatrical heritage.",
        coverImage: "/Kaancho-Dhaago.jpg",
        images: [
            "/Kaancho-Dhaago.jpg",
        ],
        year: "2022",
        duration: "1h 45min",
        featured: true,
        size: 'medium',
        crew: {
            director: "Ways Theatre Collective",
            producer: "Ways Private Limited",
        },
        keywords: [
            "Nepali theatre production",
            "Kaancho Dhaago play",
            "Nepal stage performance",
            "contemporary Nepali theatre",
            "theatrical production Nepal",
            "Nepali drama performance"
        ]
    },
    {
        id: 3,
        slug: "sath-sathi-aaideuna",
        title: "Sathi Sathi Aaideuna",
        category: "Theatre",
        tagline: "Come Together, Friends",
        shortDescription: "Life lessons through powerful performances",
        fullDescription: "Sathi Sathi Aaideuna is an uplifting theatrical experience that celebrates friendship, community, and the power of human connection. This heartwarming production brings together a diverse ensemble cast to tell interconnected stories of companionship, loyalty, and mutual support in the face of life's challenges. The play beautifully captures the essence of Nepali culture's emphasis on community and collective well-being, while addressing modern themes of isolation, digital disconnection, and the need for genuine human interaction. Through a blend of comedy, drama, and musical elements, the production creates an immersive experience that reminds audiences of the transformative power of friendship and togetherness.",
        coverImage: "/Sathi-Sathi-Aaideuna.jpg",
        images: [
            "/Sathi-Sathi-Aaideuna.jpg",
        ],
        year: "2021",
        duration: "1h 30min",
        featured: true,
        size: 'medium',
        crew: {
            director: "Ways Theatre Collective",
            producer: "Ways Private Limited",
        },
        keywords: [
            "Nepali theatre Sathi Sathi Aaideuna",
            "friendship themed play Nepal",
            "Nepali stage show",
            "community theatre Nepal",
            "Nepali cultural performance"
        ]
    },
    {
        id: 4,
        slug: "dhalkeko-saalaijo",
        title: "Dhalkeko Saalaijo",
        category: "Theatre",
        tagline: "The Fallen Match",
        shortDescription: "Universal storytelling for all audiences",
        fullDescription: "Dhalkeko Saalaijo is a poignant theatrical production that uses the metaphor of a fallen matchstick to explore themes of hope, resilience, and rebirth. This innovative performance piece combines physical theatre, spoken word, and visual storytelling to create a multi-sensory experience that transcends language barriers. The production examines how moments of apparent defeat can spark new beginnings, and how even the smallest flame can illuminate the darkest corners of human experience. With its universal themes and accessible storytelling approach, the play has resonated with audiences of all ages and backgrounds, making it one of the most inclusive productions in Nepal's contemporary theatre scene.",
        coverImage: "/Dhalkeko-Saalaijo.jpg",
        images: [
            "/Dhalkeko-Saalaijo.jpg",
        ],
        year: "2020",
        duration: "1h 20min",
        featured: true,
        size: 'small',
        crew: {
            director: "Ways Theatre Collective",
            producer: "Ways Private Limited",
        },
        keywords: [
            "Nepali theatre Dhalkeko Saalaijo",
            "metaphorical theatre Nepal",
            "physical theatre Nepal",
            "contemporary Nepali stage performance",
            "innovative theatre production Nepal"
        ]
    },
    {
        id: 5,
        slug: "bullet-and-the-buddha",
        title: "Bullet and the Buddha",
        category: "Theatre",
        tagline: "When Violence Meets Peace",
        shortDescription: "Contrasting philosophies in dramatic form",
        fullDescription: "Bullet and the Buddha is a provocative theatrical exploration of conflicting ideologies - the path of violence versus the way of peace. This bold production presents a dramatic confrontation between opposing worldviews, examining how these philosophies shape individuals and societies. Set against the backdrop of Nepal's own journey from conflict to peace, the play delves into questions of justice, revenge, forgiveness, and transformation. Through powerful dialogue, striking visual metaphors, and compelling character arcs, the production challenges audiences to contemplate the true cost of violence and the difficult path of peaceful resolution. The play has been praised for its balanced approach to complex themes and its relevance to contemporary global issues.",
        coverImage: "/Bullet-And-The-Buddha.jpg",
        images: [
            "/Bullet-And-The-Buddha.jpg",
        ],
        year: "2019",
        duration: "1h 50min",
        featured: true,
        size: 'small',
        crew: {
            director: "Ways Theatre Collective",
            producer: "Ways Private Limited",
        },
        keywords: [
            "Bullet and the Buddha play",
            "philosophical theatre Nepal",
            "peace and conflict drama",
            "Nepali political theatre",
            "thought-provoking stage performance Nepal"
        ]
    },
    {
        id: 6,
        slug: "katha-express",
        title: "Katha Express",
        category: "Theatre",
        tagline: "Stories That Move and Inspire",
        shortDescription: "Stories that move and inspire",
        fullDescription: "Katha Express is a dynamic anthology-style theatrical production that takes audiences on a journey through diverse narratives and human experiences. Like an express train stopping at different stations, the play presents a collection of interconnected stories featuring different characters, settings, and themes. Each segment offers a unique glimpse into Nepali life - from urban struggles to rural wisdom, from contemporary challenges to timeless values. The production celebrates the oral storytelling tradition of Nepal while employing modern theatrical techniques to bring these tales to vibrant life. With its ensemble cast and episodic structure, Katha Express showcases the extraordinary range of human experience and the universal truths that bind us all together.",
        coverImage: "/Katha-Express.jpg",
        images: [
            "/Katha-Express.jpg",
        ],
        year: "2021",
        duration: "2h 00min",
        featured: true,
        size: 'small',
        crew: {
            director: "Ways Theatre Collective",
            producer: "Ways Private Limited",
        },
        keywords: [
            "Katha Express theatre Nepal",
            "anthology play Nepal",
            "storytelling theatre production",
            "Nepali ensemble theatre",
            "narrative-driven stage performance Nepal"
        ]
    },
];

/**
 * Get all projects
 */
export function getAllProjects(): Project[] {
    return projects;
}

/**
 * Get featured projects for homepage
 */
export function getFeaturedProjects(): Project[] {
    return projects.filter(project => project.featured);
}

/**
 * Get project by slug
 */
export function getProjectBySlug(slug: string): Project | undefined {
    return projects.find(project => project.slug === slug);
}

/**
 * Get all project slugs for static generation
 */
export function getAllProjectSlugs(): string[] {
    return projects.map(project => project.slug);
}

/**
 * Get projects by category
 */
export function getProjectsByCategory(category: Project['category']): Project[] {
    return projects.filter(project => project.category === category);
}
