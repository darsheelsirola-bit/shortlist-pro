import { NextRequest, NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  const requestUrl = new URL(request.url);
  const code = requestUrl.searchParams.get('code');
  const next = requestUrl.searchParams.get('next') || '/app';

  if (code && isSupabaseConfigured) {
    try {
      await supabase.auth.exchangeCodeForSession(code);
    } catch (error) {
      console.error('Error exchanging OAuth code for session:', error);
      return NextResponse.redirect(new URL(`/login?error=oauth_exchange_failed`, request.url));
    }
  }

  // Redirect to application dashboard or requested path
  return NextResponse.redirect(new URL(next, request.url));
}
