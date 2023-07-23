import type { Database } from './supabase'

export type Talk = Database['public']['Tables']['talk']['Row']
