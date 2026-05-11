import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { skillCategories } from '@/lib/data';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('skills')
      .select('*')
      .order('order_index', { ascending: true });

    if (error) throw error;

    // Group by category
    const grouped = (data ?? []).reduce(
      (acc: Record<string, typeof data>, skill) => {
        if (!acc[skill.category]) acc[skill.category] = [];
        acc[skill.category].push(skill);
        return acc;
      },
      {}
    );

    return NextResponse.json(Object.keys(grouped).length > 0 ? grouped : skillCategories);
  } catch {
    return NextResponse.json(skillCategories);
  }
}
