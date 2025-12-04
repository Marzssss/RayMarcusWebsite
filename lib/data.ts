export const artistData = {
    name: "Ray Marcus",
    bio: "Digital native exploring the boundaries between 2000s nostalgia and futuristic soundscapes. Creating audio-visual experiences that transport you to a simpler, glitchier time.",
    socials: {
        instagram: "https://instagram.com/raymarcus",
        spotify: "https://spotify.com/artist/raymarcus",
        youtube: "https://youtube.com/raymarcus",
    },
    releases: [
        {
            id: "neon-nights",
            title: "Neon Nights",
            year: "2024",
            cover: "/textures/cover-neon.svg",
            link: "#",
        },
        {
            id: "digital-love",
            title: "Digital Love",
            year: "2023",
            cover: "/textures/cover-digital.svg",
            link: "#",
        },
        {
            id: "cyber-heart",
            title: "Cyber Heart",
            year: "2023",
            cover: "/textures/cover-cyber.svg",
            link: "#",
        },
    ],
    videos: [
        {
            id: "glitch-mode",
            title: "Glitch Mode",
            thumbnail: "/textures/thumb-glitch.jpg",
            url: "#",
        },
        {
            id: "system-failure",
            title: "System Failure",
            thumbnail: "/textures/thumb-system.jpg",
            url: "#",
        },
    ],
};

export type Release = typeof artistData.releases[0];
export type Video = typeof artistData.videos[0];
