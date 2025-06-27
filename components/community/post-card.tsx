"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { motion } from "framer-motion"
import { Heart, MessageCircle, User } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/utils"

interface PostCardProps {
  post: {
    id: string
    content: string
    createdAt: Date
    user: {
      name: string | null
      image: string | null
    }
    likes: { id: string; userId: string }[]
    comments: { id: string; content: string; user: { name: string | null } }[]
    _count: {
      likes: number
      comments: number
    }
  }
  currentUserId?: string
}

export function PostCard({ post, currentUserId }: PostCardProps) {
  const router = useRouter()
  const [liking, setLiking] = useState(false)
  
  const isLiked = post.likes.some(like => like.userId === currentUserId)

  const handleLike = async () => {
    if (!currentUserId || liking) return
    
    setLiking(true)
    try {
      const response = await fetch(`/api/posts/${post.id}/like`, {
        method: isLiked ? "DELETE" : "POST",
      })
      
      if (response.ok) {
        router.refresh()
      }
    } catch (error) {
      console.error("Error toggling like:", error)
    } finally {
      setLiking(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="hover:shadow-md transition-shadow">
        <CardHeader className="pb-3">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={post.user.image || ""} alt={post.user.name || ""} />
              <AvatarFallback>
                {post.user.name?.charAt(0) || <User className="h-4 w-4" />}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold text-gray-900">{post.user.name}</p>
              <p className="text-sm text-gray-500">{formatDate(post.createdAt)}</p>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>
          
          <div className="flex items-center space-x-4 pt-2 border-t border-gray-100">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleLike}
              disabled={liking || !currentUserId}
              className={`flex items-center space-x-2 ${
                isLiked ? "text-red-600 hover:text-red-700" : "text-gray-600 hover:text-red-600"
              }`}
            >
              <Heart className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`} />
              <span>{post._count.likes}</span>
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="flex items-center space-x-2 text-gray-600 hover:text-blue-600"
            >
              <MessageCircle className="h-4 w-4" />
              <span>{post._count.comments}</span>
            </Button>
          </div>

          {post.comments.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-gray-100">
              {post.comments.slice(0, 2).map((comment) => (
                <div key={comment.id} className="text-sm">
                  <span className="font-medium text-gray-900">{comment.user.name}</span>
                  <span className="text-gray-600 ml-2">{comment.content}</span>
                </div>
              ))}
              {post.comments.length > 2 && (
                <p className="text-sm text-gray-500">
                  View all {post.comments.length} comments
                </p>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </motion.div>
  )
}