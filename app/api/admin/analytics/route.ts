import { NextRequest, NextResponse } from 'next/server'
import { query } from '@/lib/db'
import { apiLogger } from '@/lib/logger'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const days = parseInt(searchParams.get('days') || '30')

    const startDate = new Date()
    startDate.setDate(startDate.getDate() - days)
    const startISO = startDate.toISOString()

    // Run all queries in parallel
    const [
      leadsResult,
      leadsAllTime,
      blogResult,
      plansResult,
      blogViewsResult,
    ] = await Promise.all([
      // Leads in date range
      query(
        `SELECT id, name, city, status, plan_interest, created_at
         FROM leads WHERE created_at >= $1 ORDER BY created_at DESC`,
        [startISO]
      ),
      // Total leads all time
      query('SELECT COUNT(*) as total FROM leads'),
      // Blog stats
      query(
        `SELECT id, title, slug, views, category, published, created_at
         FROM blog_posts ORDER BY views DESC`
      ),
      // Plans distribution from leads
      query(
        `SELECT plan_interest, COUNT(*) as count
         FROM leads WHERE plan_interest IS NOT NULL AND plan_interest != ''
         GROUP BY plan_interest ORDER BY count DESC`
      ),
      // Blog total views
      query('SELECT COALESCE(SUM(views), 0) as total_views FROM blog_posts WHERE published = 1'),
    ])

    const leads = leadsResult.rows
    const totalLeadsAllTime = parseInt(leadsAllTime.rows[0]?.total || '0')

    // Calculate lead stats
    const totalLeads = leads.length
    const byStatus: Record<string, number> = {}
    const byCity: Record<string, number> = {}
    const byDay: Record<string, number> = {}

    leads.forEach((lead: any) => {
      byStatus[lead.status] = (byStatus[lead.status] || 0) + 1
      byCity[lead.city] = (byCity[lead.city] || 0) + 1
      const day = lead.created_at.substring(0, 10) // YYYY-MM-DD
      byDay[day] = (byDay[day] || 0) + 1
    })

    const convertedCount = byStatus['converted'] || 0
    const conversionRate = totalLeads > 0 ? ((convertedCount / totalLeads) * 100) : 0

    // Fill missing days with 0
    const leadsByDay: { date: string; count: number }[] = []
    const current = new Date(startDate)
    const now = new Date()
    while (current <= now) {
      const dateStr = current.toISOString().substring(0, 10)
      leadsByDay.push({ date: dateStr, count: byDay[dateStr] || 0 })
      current.setDate(current.getDate() + 1)
    }

    // Blog stats
    const blogPosts = blogResult.rows
    const publishedPosts = blogPosts.filter((p: any) => p.published === 1)
    const totalBlogViews = parseInt(blogViewsResult.rows[0]?.total_views || '0')
    const topPosts = publishedPosts.slice(0, 5).map((p: any) => ({
      title: p.title,
      slug: p.slug,
      views: p.views,
      category: p.category,
    }))

    // Blog by category
    const blogByCategory: Record<string, number> = {}
    publishedPosts.forEach((p: any) => {
      blogByCategory[p.category] = (blogByCategory[p.category] || 0) + 1
    })

    // Plans popularity
    const planPopularity = plansResult.rows.map((r: any) => ({
      plan: r.plan_interest,
      count: parseInt(r.count),
    }))

    return NextResponse.json({
      success: true,
      data: {
        leads: {
          total: totalLeads,
          totalAllTime: totalLeadsAllTime,
          byStatus,
          byCity,
          byDay: leadsByDay,
          conversionRate: Math.round(conversionRate * 10) / 10,
          newToday: byDay[new Date().toISOString().substring(0, 10)] || 0,
        },
        blog: {
          totalPosts: publishedPosts.length,
          totalViews: totalBlogViews,
          topPosts,
          byCategory: blogByCategory,
        },
        plans: {
          popularity: planPopularity,
        },
      },
    })
  } catch (error) {
    apiLogger.error({ err: error }, 'Failed to fetch analytics')
    return NextResponse.json(
      { success: false, error: 'Failed to fetch analytics' },
      { status: 500 }
    )
  }
}
