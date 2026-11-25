import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
import type { Id } from "./_generated/dataModel";
import { blogCategoryValidator, blogStatusValidator, subscriptionModeValidator } from "./schema";

function stripHtml(html: string): string {
    return html.replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/\s+/g, " ").trim();
}

function createSlug(title: string): string {
    const base = title
        .toLowerCase()
        .normalize("NFKD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
        .slice(0, 80);
    return `${base || "blog"}-${Date.now().toString(36)}`;
}

export const generateUploadUrl = mutation({
    args: {},
    handler: async (ctx) => ctx.storage.generateUploadUrl(),
});

export const saveBlog = mutation({
    args: {
        blogId: v.optional(v.id("blogs")),
        title: v.string(),
        subtitle: v.string(),
        category: blogCategoryValidator,
        tags: v.array(v.string()),
        subscriptionMode: subscriptionModeValidator,
        price: v.object({
            amount: v.number(),
            currency: v.string(),
        }),
        status: blogStatusValidator,
        fullContentHtml: v.string(),
        coverImageStorageId: v.optional(v.id("_storage")),
        coverImageUrl: v.optional(v.string()),
        coverImageData: v.object({
            alt: v.string(),
            caption: v.string(),
            fileName: v.optional(v.string()),
            fileSize: v.optional(v.number()),
            dimensions: v.optional(v.string()),
        }),
    },
    handler: async (ctx, args) => {
        const plainText = stripHtml(args.fullContentHtml);
        const wordCount = plainText ? plainText.split(/\s+/).length : 0;
        const readTime = `${Math.max(1, Math.ceil(wordCount / 200))} min read`;
        const resolvedCoverUrl = args.coverImageStorageId
            ? await ctx.storage.getUrl(args.coverImageStorageId)
            : args.coverImageUrl;

        const data = {
            title: args.title,
            subtitle: args.subtitle,
            excerpt: args.subtitle,
            previewContentHtml: args.fullContentHtml,
            fullContentHtml: args.fullContentHtml,
            fullContentHtmlForEdit: args.fullContentHtml,
            category: args.category,
            tags: args.tags,
            badgeLabel: args.tags[0] ?? "Technology",
            readTime,
            wordCount,
            status: args.status,
            subscriptionMode: args.subscriptionMode,
            price: args.price,
            coverImageStorageId: args.coverImageStorageId,
            coverImageUrl: resolvedCoverUrl ?? undefined,
            coverImageData: args.coverImageData,
            updatedAt: Date.now(),
        };

        if (args.blogId) {
            await ctx.db.patch(args.blogId, data);
            return { blogId: args.blogId };
        }

        const blogId = await ctx.db.insert("blogs", {
            ...data,
            slug: createSlug(args.title),
        });
        return { blogId };
    },
});

export const getByIdOrSlug = query({
    args: {
        identifier: v.string(),
        isUnlocked: v.optional(v.boolean()),
        includeFullForEdit: v.optional(v.boolean()),
    },
    handler: async (ctx, args) => {
        const blogBySlug = await ctx.db
            .query("blogs")
            .withIndex("by_status", (q) => q.eq("status", "published"))
            .unique();
        const blog = blogBySlug ?? await ctx.db.get(args.identifier as Id<"blogs">);
        if (!blog) return null;

        return {
            ...blog,
            authorizedHtml: args.includeFullForEdit
                ? blog.fullContentHtmlForEdit ?? blog.fullContentHtml
                : blog.previewContentHtml,
        };
    },
});

export const createBlog = mutation({
    args: {
        slug: v.string(),
        title: v.string(),
        subtitle: v.string(),
        excerpt: v.string(),
        previewContentHtml: v.string(),
        fullContentHtml: v.string(),
        category: blogCategoryValidator,
        readTime: v.string(),
        wordCount: v.number(),
        status: blogStatusValidator,
        subscriptionMode: subscriptionModeValidator,
        price: v.object({
            amount: v.number(),
            currency: v.string(),
        }),
        coverImageUrl: v.optional(v.string()),
        coverImageData: v.object({
            alt: v.string(),
            caption: v.string(),
        }),
        author: v.optional(
            v.object({
                id: v.string(),
                name: v.string(),
                role: v.string(),
            })
        ),
    },
    handler: async (ctx, args) => {
        return await ctx.db.insert("blogs", {
            ...args,
            updatedAt: Date.now(),
        });
    },
});

export const listBlogs = query({
    args: {},
    handler: async (ctx) => {
        return await ctx.db.query("blogs").order("desc").collect();
    },
});

export const listPublishedBlogs = query({
    args: {},
    handler: async (ctx) => {
        const blogs = await ctx.db
            .query("blogs")
            .withIndex("by_status", (q) => q.eq("status", "published"))
            .order("desc")
            .take(12);

        return blogs.map((blog) => ({
            _id: blog._id,
            _creationTime: blog._creationTime,
            title: blog.title,
            subtitle: blog.subtitle,
            excerpt: blog.excerpt,
            category: blog.category,
            badgeLabel: blog.badgeLabel,
            readTime: blog.readTime,
            subscriptionMode: blog.subscriptionMode,
            price: blog.price,
            coverImageUrl: blog.coverImageUrl,
            coverImageData: blog.coverImageData,
        }));
    },
});

export const getPublishedBlog = query({
    args: { identifier: v.string() },
    handler: async (ctx, args) => {
        const blogId = ctx.db.normalizeId("blogs", args.identifier);
        if (!blogId) return null;

        const blog = await ctx.db.get(blogId);
        if (!blog || blog.status !== "published") return null;

        return {
            _id: blog._id,
            _creationTime: blog._creationTime,
            title: blog.title,
            subtitle: blog.subtitle,
            excerpt: blog.excerpt,
            category: blog.category,
            readTime: blog.readTime,
            subscriptionMode: blog.subscriptionMode,
            price: blog.price,
            coverImageUrl: blog.coverImageUrl,
            coverImageData: blog.coverImageData,
            previewContentHtml: blog.previewContentHtml,
            author: blog.author,
        };
    },
});

export const getBlogBySlug = query({
    args: { slug: v.string() },
    handler: async (ctx) => {
        return await ctx.db
            .query("blogs")
            .withIndex("by_status", (q) => q.eq("status", "published"))
            .unique();
    },
});