
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://zaeyfjkymzbivfogfibw.supabase.co'
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InphZXlmamt5bXpiaXZmb2dmaWJ3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDgwMzQ1NTMsImV4cCI6MjA2MzYxMDU1M30.PA594P2mPB7kWF-wjKSqJu_aX51c30wqq7ZSLiR81xA'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
