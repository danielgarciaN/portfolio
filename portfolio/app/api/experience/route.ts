import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { timelineItems } from '@/lib/data';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('experiences')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;
    return NextResponse.json(data && data.length > 0 ? data : timelineItems);
  } catch {
    return NextResponse.json(timelineItems);
  }
}
