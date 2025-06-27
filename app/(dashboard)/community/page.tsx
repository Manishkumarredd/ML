import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { prisma } from "@/lib/prisma"
import { PostForm } from "@/components/community/post-form"
import { PostCard } from "@/components/community/post-card"

async function getPosts() {
  return await prisma.post.findMany({
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
      likes: {
        select: {
          id: true,
          userId: true,
        },
      },
      comments: {
        include: {
          user: {
            select: {
              name: true,
            },
          },
        },
        orderBy: {
          createdAt: 'asc',
        },
      },
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
  })
}

export default async function Community() {
  const session = await getServerSession(authOptions)
  const posts = await getPosts()

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Community</h1>
        <p className="text-gray-600 mt-2">
          Connect with others on their wellness journey
        </p>
      </div>

      <div className="max-w-2xl mx-auto space-y-6">
        <PostForm />
        
        <div className="space-y-6">
          {posts.map((post) => (
            <PostCard 
              key={post.id} 
              post={post} 
              currentUserId={session?.user?.id}
            />
          ))}
          
          {posts.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500">No posts yet. Be the first to share!</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}