import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://qssshfcbwzqzdnvumugk.supabase.co'   // Supabase API Settings에서 복사
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFzc3NoZmNid3pxemRudnVtdWdrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTUzMDU2NTIsImV4cCI6MjA3MDg4MTY1Mn0.hcfq5fPvxHalVXG1MOe60CUUXN4WsAtRT18vAKBXK9A'      // anon public 키
export const supabase = createClient(supabaseUrl, supabaseKey)

