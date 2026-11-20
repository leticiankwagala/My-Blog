import { Plus } from 'lucide-react'
import { useQuery } from 'convex/react'
import { api } from '../../../convex/_generated/api'
import { Link } from '@/navigation/RouterContext'
import { PATHS } from '@/navigation/paths'

export function AdminBlogsPage() {
  const blogs = useQuery(api.blog.listBlogs)

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <h1 className="font-serif text-3xl font-normal tracking-tight text-foreground">
          Articles &amp; Essays
        </h1>
        <Link
          to={PATHS.ADMIN_CREATE_BLOG}
          className="inline-flex self-start items-center gap-2 rounded-lg bg-primary px-4 py-2 text-xs font-medium text-primary-foreground shadow-2xs sm:self-auto"
        >
          <Plus aria-hidden="true" className="size-3.5" />
          <span>Create New Blog</span>
        </Link>
      </div>

      {blogs === undefined ? (
        <div className="py-16 text-sm text-muted-foreground">Loading blogs...</div>
      ) : blogs.length === 0 ? (
        <div className="my-auto py-16 text-center">
          <p className="text-sm text-muted-foreground">
            No blogs yet. Create your first article.
          </p>
        </div>
      ) : (
        <div className="mt-8 grid gap-4">
          {blogs.map((blog) => (
            <article
              key={blog._id}
              className="flex flex-col gap-4 rounded-xl border border-border bg-card p-4 sm:flex-row sm:items-center"
            >
              {blog.coverImageUrl ? (
                <img
                  src={blog.coverImageUrl}
                  alt={blog.coverImageData.alt}
                  className="h-28 w-full rounded-lg object-cover sm:w-44"
                />
              ) : (
                <div className="flex h-28 w-full items-center justify-center rounded-lg bg-secondary text-xs text-muted-foreground sm:w-44">
                  No cover
                </div>
              )}
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span
                    className={`rounded-full px-2 py-1 text-[10px] font-semibold uppercase ${
                      blog.status === 'published'
                        ? 'bg-emerald-50 text-emerald-700'
                        : 'bg-amber-50 text-amber-700'
                    }`}
                  >
                    {blog.status}
                  </span>
                  <span className="text-[10px] text-muted-foreground">
                    {blog.category}
                  </span>
                </div>
                <h2 className="mt-2 font-serif text-lg font-semibold text-foreground">
                  {blog.title}
                </h2>
                <p className="mt-1 line-clamp-2 text-xs text-muted-foreground">
                  {blog.subtitle}
                </p>
              </div>
              <div className="flex gap-2">
                <Link
                  to={PATHS.ADMIN_CREATE_BLOG}
                  search={`?editId=${blog._id}`}
                  className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground"
                >
                  Edit
                </Link>
                {blog.status === 'published' ? (
                  <Link
                    to={PATHS.BLOG_DETAILS}
                    search={`?id=${blog._id}&from=create`}
                    className="rounded-lg border border-border px-3 py-2 text-xs font-semibold text-foreground"
                  >
                    View
                  </Link>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  )
}
