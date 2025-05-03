import { createClient } from '@supabase/supabase-js'

// Create a single supabase client for interacting with your database
// const supabase = createClient('https://xyzcompany.supabase.co', 'public-anon-key')

let supabaseClient = null

async function initializeSupabase() {
  try {
    if (!supabaseClient) {
      supabaseClient = createClient(
        'https://zioidarzslgqquzvzhks.supabase.co',
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inppb2lkYXJ6c2xncXF1enZ6aGtzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDYxOTI0NDUsImV4cCI6MjA2MTc2ODQ0NX0.9tAmkTBt65ErOyo7BWjJ7Iq8xE9YYk32f_7b0-X7Q-4'
      )
    }
    return supabaseClient
  } catch (error) {
    console.error('Failed to initialize Supabase:', error)
    throw error
  }
}

async function saveSurveyResponse() {
  try {
    if (!supabaseClient) {
      await initializeSupabase()
    }

    // // Get user info from DOM
    // const userData = document.getElementById('userData')
    // const ican_id = userData ? userData.dataset.userId : null
    // const ican_email = userData ? userData.dataset.email : null

    // console.log('ican_id:', ican_id)
    // console.log('ican_email:', ican_email)

    // console.log('supabaseClient', supabaseClient)
    const { data: surveyResponse, error: responseError } =
      await supabaseClient
        .from('survey_responses')
        .insert({
          ican_id: 576867,
          ican_email: "yfj@gmail.com",
          depression: 7,
          anxiety: 7,
          stress: 8,
          life_satisfaction: 8,
          taken_at: new Date().toISOString()
        })
        .select()
        .single()

    if (responseError) throw responseError
    return surveyResponse
  } catch (error) {
    console.error('Error saving survey response:', error)
    throw error
  }
}

await initializeSupabase()
await saveSurveyResponse()
