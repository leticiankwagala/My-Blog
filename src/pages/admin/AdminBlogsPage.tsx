import { useMemo, useState } from 'react'
import {
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Eye,
  Pencil,
  Plus,
  RotateCcw,
  Search,
} from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Link } from '@/navigation/RouterContext'
import { PATHS } from '@/navigation/paths'

export function AdminBlogsPage() {
  const blogs = useQuery(api.blog.listBlogs)
  const [search, setSearch] = useState('')
  const [category, setCategory] = useState('All Categories')
  const [tier, setTier] = useState('All Tiers')
  const [status, setStatus] = useState('All Statuses')
  const [pageSize, setPageSize] = useState(5)
  const [page, setPage] = useState(1)

  const filteredBlogs = useMemo(() => {
    if (!blogs) return []
    const normalizedSearch = search.trim().toLowerCase()

    return blogs.filter((blog) => {
      const matchesSearch =
        !normalizedSearch ||
        blog.title.toLowerCase().includes(normalizedSearch) ||
        blog.category.toLowerCase().includes(normalizedSearch)
      const matchesCategory =
        category === 'All Categories' || blog.category === category
      const matchesTier =
        tier === 'All Tiers' ||
        (tier === 'Free' && blog.subscriptionMode === 'free') ||
        (tier === 'Paid' && blog.subscriptionMode === 'paid')
      const matchesStatus =
        status === 'All Statuses' ||
        (status === 'Published' && blog.status === 'published') ||
        (status === 'Draft' && blog.status === 'draft')

      return matchesSearch && matchesCategory && matchesTier && matchesStatus
    })
  }, [blogs, search, category, tier, status])

  const pageCount = Math.max(1, Math.ceil(filteredBlogs.length / pageSize))
  const safePage = Math.min(page, pageCount)
  const visibleBlogs = filteredBlogs.slice((safePage - 1) * pageSize, safePage * pageSize)
  const publishedCount = blogs?.filter((blog) => blog.status === 'published').length ?? 0
  const draftCount = blogs?.filter((blog) => blog.status === 'draft').length ?? 0

  const resetFilters = () => {
    setSearch('')
    setCategory('All Categories')
    setTier('All Tiers')
    setStatus('All Statuses')
    setPage(1)
  }

  return (
    <div className="flex w-full max-w-[840px] flex-1 flex-col">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="font-serif text-[28px] font-normal tracking-tight text-foreground">
            Blogs
          </h1>
          <p className="mt-2 text-[10px] text-[#a66e84]">
            Manage archived blogs, editorial review drafts, and subscriber access tiers.
          </p>
        </div>
        <Link
          to={PATHS.ADMIN_CREATE_BLOG}
          className="inline-flex items-center gap-2 rounded-md bg-[#db2777] px-3.5 py-2 text-[10px] font-semibold text-white shadow-sm"
        >
          <Plus aria-hidden="true" className="size-3.5" />
          <span>Create New Blog</span>
        </Link>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-3">
        <div className="relative rounded-lg border border-[#f5c7d9] bg-white px-4 py-3.5">
          <p className="text-[9px] font-semibold tracking-[0.12em] text-[#9b9994] uppercase">Published</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-[28px] leading-none text-[#29231f]">{publishedCount}</span>
            <span className="text-[9px] text-[#9b9994]">blogs in circulation</span>
          </div>
          <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-[#f5b7cf] bg-[#fff1f7] px-2 py-1 text-[8px] font-semibold text-[#be185d]">
            <span className="size-1.5 rounded-full bg-[#ec4899]" />
            Live &amp; Dispatched
          </span>
        </div>
        <div className="relative rounded-lg border border-[#e8b8cb] bg-white px-4 py-3.5">
          <p className="text-[9px] font-semibold tracking-[0.12em] text-[#9b9994] uppercase">Drafts</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-[28px] leading-none text-[#be185d]">{draftCount}</span>
            <span className="text-[9px] text-[#9b9994]">awaiting final peer sign-off</span>
          </div>
          <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-[#edbdd1] bg-[#fff7fa] px-2 py-1 text-[8px] font-semibold text-[#be185d]">
            <span className="size-1.5 rounded-full bg-[#f472b6]" />
            In Editorial Review
          </span>
        </div>
        <div className="relative rounded-lg border border-[#f0d5e1] bg-white px-4 py-3.5">
          <p className="text-[9px] font-semibold tracking-[0.12em] text-[#9b9994] uppercase">Archived</p>
          <div className="mt-3 flex items-baseline gap-2">
            <span className="font-serif text-[28px] leading-none text-[#29231f]">0</span>
            <span className="text-[9px] text-[#9b9994]">retracted to permanent cold vault</span>
          </div>
          <span className="absolute top-3 right-3 flex items-center gap-1.5 rounded-full border border-[#ecc8d8] bg-[#fdf2f7] px-2 py-1 text-[8px] font-semibold text-[#9d6078]">
            <span className="size-1.5 rounded-full bg-[#d8a1b7]" />
            Deprecating / Retired
          </span>
        </div>
      </div>

      <div className="mt-5 overflow-hidden rounded-lg border border-[#f3d7e3] bg-white">
        <div className="flex items-center gap-2 border-b border-[#f7dfe9] p-2.5">
          <label className="relative flex-1">
            <Search aria-hidden="true" className="absolute top-1/2 left-3 size-3 -translate-y-1/2 text-[#c28fa2]" />
            <input
              value={search}
              onChange={(event) => {
                setSearch(event.target.value)
                setPage(1)
              }}
              placeholder="Search blogs by title..."
              className="h-8 w-full rounded-md border border-[#f3d7e3] bg-white pr-3 pl-8 text-[9px] text-[#6f3d51] outline-none placeholder:text-[#c28fa2] focus:border-[#db2777]"
            />
          </label>
          <SelectFilter
            value={category}
            onChange={setCategory}
            options={[
              'All Categories',
              'Web Dev & Design',
              'Operations & Data',
              'Career & Learning',
            ]}
          />
          <SelectFilter value={tier} onChange={setTier} options={['All Tiers', 'Free', 'Paid']} />
          <SelectFilter value={status} onChange={setStatus} options={['All Statuses', 'Published', 'Draft']} />
          <button
            type="button"
            onClick={resetFilters}
            aria-label="Reset filters"
            className="flex size-8 items-center justify-center rounded-md border border-[#f3d7e3] text-[#a66e84] hover:bg-[#fff1f7]"
          >
            <RotateCcw aria-hidden="true" className="size-3" />
          </button>
        </div>

        {blogs === undefined ? (
          <div className="py-16 text-center text-[11px] text-[#a66e84]">Loading blogs...</div>
        ) : (
          <table className="w-full table-fixed border-collapse">
            <thead>
              <tr className="h-11 border-b border-[#f7dfe9] text-left">
                <th className="w-[14%] pl-2.5 text-[8px] font-semibold tracking-[0.12em] text-[#87847e] uppercase">Date</th>
                <th className="w-[40%] text-[8px] font-semibold tracking-[0.12em] text-[#87847e] uppercase">Title</th>
                <th className="w-[15%] text-[8px] font-semibold tracking-[0.12em] text-[#87847e] uppercase">Category</th>
                <th className="w-[12%] text-[8px] font-semibold tracking-[0.12em] text-[#87847e] uppercase">Subscription</th>
                <th className="w-[12%] text-[8px] font-semibold tracking-[0.12em] text-[#87847e] uppercase">Status</th>
                <th className="w-[7%] pr-2 text-right text-[8px] font-semibold tracking-[0.12em] text-[#87847e] uppercase">Actions</th>
              </tr>
            </thead>
            <tbody>
              {visibleBlogs.map((blog) => {
                return (
                  <tr key={blog._id} className="h-14 border-b border-[#f8e6ed] last:border-b-0">
                    <td className="pl-2.5 text-[9px] text-[#a66e84]">
                      {new Intl.DateTimeFormat('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                      }).format(new Date(blog.updatedAt))}
                    </td>
                    <td className="max-w-0 truncate font-serif text-[12px] text-[#6f3d51]">{blog.title}</td>
                    <td>
                      <span className="inline-flex rounded-full border border-[#f3c0d4] bg-[#fdf0f6] px-2 py-1 text-[8px] font-semibold text-[#be185d]">
                        {blog.category}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`inline-flex rounded-full border px-2 py-1 text-[8px] font-semibold ${
                          blog.subscriptionMode === 'paid'
                            ? 'border-[#efb2ca] bg-[#fff1f7] text-[#be185d]'
                            : 'border-[#ecc8d8] bg-[#fdf2f7] text-[#9d6078]'
                        }`}
                      >
                        {blog.subscriptionMode === 'paid' ? '↗ Paid' : 'Free'}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-1 text-[8px] font-semibold ${
                          blog.status === 'published'
                            ? 'border-[#f5b7cf] bg-[#fff1f7] text-[#be185d]'
                            : 'border-[#edbdd1] bg-[#fff7fa] text-[#be185d]'
                        }`}
                      >
                        <span
                          className={`size-1.5 rounded-full ${
                            blog.status === 'published' ? 'bg-[#ec4899]' : 'bg-[#f472b6]'
                          }`}
                        />
                        {blog.status === 'published' ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="pr-2">
                      <div className="flex items-center justify-end gap-2">
                        <Link
                          to={PATHS.ADMIN_CREATE_BLOG}
                          search={`?editId=${blog._id}`}
                          aria-label={`Edit ${blog.title}`}
                          className="text-[#a66e84] hover:text-[#db2777]"
                        >
                          <Pencil aria-hidden="true" className="size-3" />
                        </Link>
                        {blog.status === 'published' ? (
                          <Link
                            to={PATHS.BLOG_DETAILS}
                            search={`?id=${blog._id}&from=create`}
                            aria-label={`View ${blog.title}`}
                            className="text-[#a66e84] hover:text-[#db2777]"
                          >
                            <Eye aria-hidden="true" className="size-3" />
                          </Link>
                        ) : null}
                      </div>
                    </td>
                  </tr>
                )
              })}
              {visibleBlogs.length === 0 && blogs.length > 0 ? (
                <tr>
                  <td colSpan={6} className="h-32 text-center text-[10px] text-[#a66e84]">
                    No blogs match these filters.
                  </td>
                </tr>
              ) : null}
              {blogs.length === 0 ? (
                <tr>
                  <td colSpan={6} className="h-32 text-center text-[10px] text-[#a66e84]">
                    No blogs yet. Create your first article.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        )}

        <div className="flex h-12 items-center justify-between border-t border-[#f7dfe9] px-2.5">
          <div className="flex items-center gap-2 text-[9px] text-[#a66e84]">
            <span>
              Showing {filteredBlogs.length === 0 ? 0 : (safePage - 1) * pageSize + 1} to{' '}
              {Math.min(safePage * pageSize, filteredBlogs.length)} of {filteredBlogs.length} written blogs
            </span>
            <span className="text-[#c28fa2]">Per page:</span>
            <select
              value={pageSize}
              onChange={(event) => {
                setPageSize(Number(event.target.value))
                setPage(1)
              }}
              className="h-7 rounded border border-[#f3d7e3] bg-white px-2 text-[9px] outline-none"
            >
              {[5, 10, 20].map((size) => (
                <option key={size} value={size}>{size}</option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-1">
            <button
              type="button"
              onClick={() => setPage((current) => Math.max(1, current - 1))}
              disabled={safePage === 1}
              aria-label="Previous page"
              className="flex size-7 items-center justify-center rounded text-[#a66e84] disabled:opacity-30"
            >
              <ChevronLeft aria-hidden="true" className="size-3" />
            </button>
            {Array.from({ length: pageCount }, (_, index) => index + 1).slice(0, 3).map((number) => (
              <button
                key={number}
                type="button"
                onClick={() => setPage(number)}
                className={`flex size-7 items-center justify-center rounded text-[9px] ${
                  safePage === number ? 'bg-[#db2777] text-white' : 'text-[#a66e84]'
                }`}
              >
                {number}
              </button>
            ))}
            {pageCount > 3 ? (
              <button
                type="button"
                onClick={() => setPage((current) => Math.min(pageCount, current + 1))}
                aria-label="Next page"
                className="flex size-7 items-center justify-center rounded text-[#a66e84]"
              >
                <ChevronRight aria-hidden="true" className="size-3" />
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  )
}

function SelectFilter({
  value,
  onChange,
  options,
}: {
  value: string
  onChange: (value: string) => void
  options: string[]
}) {
  return (
    <label className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="h-8 appearance-none rounded-md border border-[#f3d7e3] bg-white py-0 pr-8 pl-3 text-[9px] text-[#7f4a60] outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>{option}</option>
        ))}
      </select>
      <ChevronDown aria-hidden="true" className="pointer-events-none absolute top-1/2 right-2 size-3 -translate-y-1/2 text-[#a66e84]" />
    </label>
  )
}
