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
            console.error("SUPABASE ERROR ON INSERT:", {
                message: error.message,
                details: error.details,
                hint: error.hint,
                code: error.code,
                data: { user_id: userId, name: seriesDetails.name }
            })
            return new NextResponse(`Database error: ${error.message} (Code: ${error.code})`, { status: 500 })
        }

        return NextResponse.json(data ? data[0] : { success: true })
    } catch (error: any) {
        console.error("API ROUTE ERROR:", error)
        return new NextResponse(`Internal Server Error: ${error.message}`, { status: 500 })
    }
}
