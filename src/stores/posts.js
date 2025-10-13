import { reactive } from 'vue'

export const usePosts = reactive({
    async getPostList() {
        const postsUrl = 'https://studapi.teachmeskills.by/blog/posts/?author__course_group=15&limit=5'
        const response = await fetch(postsUrl)
        const data = await response.json()
        return data.results
    },
    async getPostOrFail(postId) {
        const postUrl = `https://studapi.teachmeskills.by/blog/posts/${postId}/`
        const response = await fetch(postUrl)

        return response.ok ? await response.json() : response.ok
    }
})