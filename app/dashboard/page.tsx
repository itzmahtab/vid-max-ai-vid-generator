import { currentUser } from '@clerk/nextjs/server'
import { createClient } from '@supabase/supabase-js'
import { redirect } from 'next/navigation'

export default async function DashboardPage() {
    const user = await currentUser()

    if (!user) {
        redirect('/sign-in')
    }

    // Initialize Supabase Admin Client (Service Role)
    // We use service_role to bypass RLS for the initial insert/sync check
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

    if (!serviceRoleKey) {
        console.error('Missing SUPABASE_SERVICE_ROLE_KEY')
        return <div>Error: System configuration missing.</div>
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        serviceRoleKey
    )

    console.log('Dashboard: Checking user sync for', user.id)

    // Check if user exists in Supabase
    // We check 'user_id' because 'id' is now an auto-incrementing int8
    const { data: existingUser, error: selectError } = await supabase
        .from('users')
        .select('user_id')
        .eq('user_id', user.id)
        .single()

    if (selectError && selectError.code !== 'PGRST116') { // PGRST116 is "Row not found"
        console.error('Dashboard: Error checking user existence:', selectError)
    }

    if (!existingUser) {
        console.log('Dashboard: User not found in DB. Inserting...')
        // Insert new user matching the schema from the screenshot
        const { error: insertError } = await supabase.from('users').insert({
            user_id: user.id,
            'e-mail': user.emailAddresses[0]?.emailAddress,
            name: `${user.firstName} ${user.lastName}`.trim(),
            // 'id' is likely auto-generated (int8)
            // 'credits' is likely default null or 0
        })

        if (insertError) {
            console.error('Dashboard: Error syncing user to Supabase:', insertError)
        } else {
            console.log('Dashboard: User successfully synced to Supabase:', user.id)
        }
    } else {
        console.log('Dashboard: User already exists in DB.')
    }

    return (
        <div className="container mx-auto py-10">
            <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
            <p className="text-muted-foreground">Welcome back, {user.firstName}!</p>

            <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                <div className="p-6 border rounded-lg shadow-sm bg-card">
                    <h2 className="text-xl font-semibold mb-2">My Videos</h2>
                    <p className="text-sm text-muted-foreground">You haven't generated any videos yet.</p>
                </div>

                <div className="p-6 border rounded-lg shadow-sm bg-card">
                    <h2 className="text-xl font-semibold mb-2">Context Sync</h2>
                    <p className="text-sm text-muted-foreground">
                        User ID Synced: <span className="font-mono bg-muted px-1 rounded">{user.id}</span>
                    </p>
                </div>
            </div>
        </div>
    )
}
