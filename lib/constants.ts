
export const Languages = [
    {
        "language": "English",
        "countryCode": "US",
        "countryFlag": "🇺🇸",
        "modelName": "deepgram",
        "modelLangCode": "en-US"
    },
    {
        "language": "Spanish",
        "countryCode": "MX",
        "countryFlag": "🇲🇽",
        "modelName": "deepgram",
        "modelLangCode": "es-MX"
    },
    {
        "language": "German",
        "countryCode": "DE",
        "countryFlag": "🇩🇪",
        "modelName": "deepgram",
        "modelLangCode": "de-DE"
    },
    {
        "language": "Hindi",
        "countryCode": "IN",
        "countryFlag": "🇮🇳",
        "modelName": "fonadalab",
        "modelLangCode": "hi-IN"
    },
    {
        "language": "Marathi",
        "countryCode": "IN",
        "countryFlag": "🇮🇳",
        "modelName": "fonadalab",
        "modelLangCode": "mr-IN"
    },
    {
        "language": "Telugu",
        "countryCode": "IN",
        "countryFlag": "🇮🇳",
        "modelName": "fonadalab",
        "modelLangCode": "te-IN"
    },
    {
        "language": "Tamil",
        "countryCode": "IN",
        "countryFlag": "🇮🇳",
        "modelName": "fonadalab",
        "modelLangCode": "ta-IN"
    },
    {
        "language": "French",
        "countryCode": "FR",
        "countryFlag": "🇫🇷",
        "modelName": "deepgram",
        "modelLangCode": "fr-FR"
    },
    {
        "language": "Dutch",
        "countryCode": "NL",
        "countryFlag": "🇳🇱",
        "modelName": "deepgram",
        "modelLangCode": "nl-NL"
    },
    {
        "language": "Italian",
        "countryCode": "IT",
        "countryFlag": "🇮🇹",
        "modelName": "deepgram",
        "modelLangCode": "it-IT"
    },
    {
        "language": "Japanese",
        "countryCode": "JP",
        "countryFlag": "🇯🇵",
        "modelName": "deepgram",
        "modelLangCode": "ja-JP"
    }
]

export const DeepgramVoices = [
    {
        "model": "deepgram",
        "modelName": "aura-2-odysseus-en",
        "preview": "deepgram-aura-2-odysseus-en.wav",
        "gender": "male"
    },
    {
        "model": "deepgram",
        "modelName": "aura-2-thalia-en",
        "preview": "deepgram-aura-2-thalia-en.wav",
        "gender": "female"
    },
    {
        "model": "deepgram",
        "modelName": "aura-2-amalthea-en",
        "preview": "deepgram-aura-2-amalthea-en.wav",
        "gender": "female"
    },
    {
        "model": "deepgram",
        "modelName": "aura-2-andromeda-en",
        "preview": "deepgram-aura-2-andromeda-en.wav",
        "gender": "female"
    },
    {
        "model": "deepgram",
        "modelName": "aura-2-apollo-en",
        "preview": "deepgram-aura-2-apollo-en.wav",
        "gender": "male"
    }
]

export const FonadalabVoices = [
    {
        "model": "fonadalab",
        "modelName": "vaanee",
        "preview": "fonadalab-Vaanee.mp3",
        "gender": "female"
    },
    {
        "model": "fonadalab",
        "modelName": "chaitra",
        "preview": "fonadalab-Chaitra.mp3",
        "gender": "female"
    },
    {
        "model": "fonadalab",
        "modelName": "meghra",
        "preview": "fonadalab-Meghra.mp3",
        "gender": "male"
    },
    {
        "model": "fonadalab",
        "modelName": "nirvani",
        "preview": "fonadalab-Nirvani.mp3",
        "gender": "female"
    }
]

export const BackgroundMusic = [
    {
        id: "bg-1",
        name: "Trending Instagram Reels",
        url: "https://ik.imagekit.io/Tubeguruji/BgMusic/trending-instagram-reels-music-447249.mp3",
        duration: "0:60"
    },
    {
        id: "bg-2",
        name: "Marketing Music 1",
        url: "https://ik.imagekit.io/Tubeguruji/BgMusic/instagram-reels-marketing-music-384448.mp3",
        duration: "0:60"
    },
    {
        id: "bg-3",
        name: "Basketball Reels",
        url: "https://ik.imagekit.io/Tubeguruji/BgMusic/basketball-instagram-reels-music-461852.mp3",
        duration: "0:60"
    },
    {
        id: "bg-4",
        name: "Dramatic Hip Hop",
        url: "https://ik.imagekit.io/Tubeguruji/BgMusic/dramatic-hip-hop-music-background-jazz-music-for-short-video-148505.mp3",
        duration: "0:60"
    },
    {
        id: "bg-5",
        name: "Marketing Music 2",
        url: "https://ik.imagekit.io/Tubeguruji/BgMusic/instagram-reels-marketing-music-469052.mp3",
        duration: "0:60"
    }
]

export const VideoStyles = [
    {
        id: "style-1",
        name: "Realistic",
        image: "/video-style/realistic.png"
    },
    {
        id: "style-2",
        name: "Cinematic",
        image: "/video-style/cinematic.png"
    },
    {
        id: "style-3",
        name: "Anime",
        image: "/video-style/anime.png"
    },
    {
        id: "style-4",
        name: "3D Render",
        image: "/video-style/3d-render.png"
    },
    {
        id: "style-5",
        name: "Cyberpunk",
        image: "/video-style/cyberpunk.png"
    },
    {
        id: "style-6",
        name: "GTA Style",
        image: "/video-style/gta.png"
    }
]

export const CaptionStyles = [
    {
        id: "classic",
        name: "Classic",
        description: "Simple white text with a subtle black shadow.",
        animation: "fade",
        style: {
            color: "#FFFFFF",
            textShadow: "2px 2px 4px rgba(0,0,0,0.8)",
            fontWeight: "700"
        }
    },
    {
        id: "highlight",
        name: "Highlight",
        description: "Yellow highlight on the active word.",
        animation: "highlight",
        style: {
            color: "#FFFFFF",
            highlightColor: "#FACC15",
            fontWeight: "800"
        }
    },
    {
        id: "pop",
        name: "Pop-up",
        description: "Words pop in with a bouncy effect.",
        animation: "pop",
        style: {
            color: "#FFFFFF",
            textTransform: "uppercase",
            fontWeight: "900"
        }
    },
    {
        id: "beast",
        name: "The Beast",
        description: "Bold uppercase text with colorful boxes.",
        animation: "box",
        style: {
            color: "#000000",
            backgroundColor: "#FACC15",
            fontWeight: "900",
            padding: "4px 12px"
        }
    },
    {
        id: "gradient",
        name: "Gradient",
        description: "Vibrant gradient text with a subtle glow.",
        animation: "gradient",
        style: {
            color: "transparent",
            backgroundImage: "linear-gradient(to right, #6366f1, #a855f7, #ec4899)",
            backgroundClip: "text",
            fontWeight: "800"
        }
    },
    {
        id: "karaoke",
        name: "Karaoke",
        description: "Smooth color fill across words.",
        animation: "karaoke",
        style: {
            color: "rgba(255,255,255,0.3)",
            fillColor: "#22C55E",
            fontWeight: "700"
        }
    }
]

