import { createClient } from '@/lib/supabase/server'
import { auth } from '@clerk/nextjs/server'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
    try {
        const { userId } = await auth()

        if (!userId) {
            return new NextResponse("Unauthorized", { status: 401 })
        }

        const supabase = await createClient()
        const body = await req.json()

        const {
            niche,
            language,
            voice,
            modelName,
            videoStyle,
            bgMusic,
            captionStyle,
            script,
            seriesDetails
        } = body

        if (!seriesDetails?.name) {
            return new NextResponse("Series name is required", { status: 400 })
        }

        const { data, error } = await supabase
            .from('series')
            .insert([
                {
                    user_id: userId,
                    name: seriesDetails.name,
                    niche,
                    language,
                    voice,
                    model_name: modelName,
                    video_style: videoStyle,
                    bg_music: bgMusic,
                    caption_style: captionStyle,
                    script: script || null,
                    duration: seriesDetails.duration,
                    platforms: seriesDetails.platforms,
                    publish_time: seriesDetails.publishTime,
                    status: 'pending'
                }
            ])
            .select()

        if (error) {
            console.error("Supabase error:", error)
            return new NextResponse(error.message, { status: 500 })
        }

        return NextResponse.json(data[0])
    } catch (error) {
        console.error("API Error:", error)
        return new NextResponse("Internal Server Error", { status: 500 })
    }
}
