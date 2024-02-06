import { defineStore } from 'pinia'

export const usePostsStore = defineStore('postsStore', () => {
  const { data: getAllPosts } = useFetch(`${BASE_URL}/api/posts`)
  const posts = getAllPosts.value

  return { posts }  
})