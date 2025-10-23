import { defineStore } from "pinia";

export const usePostsStore = defineStore("posts", {
  state: () => ({
    postListData: null,
    postData: null,
    loading: false,
    limit: '',
    author__course_group: 15,
    search: '',
    queryStr: ''
  }),

  getters: {
    getPosts: (state) => state.postListData?.results,

    isNextPageUrl() {
      return this.postListData?.next
    },

    isPrevPageUrl() {
      return this.postListData?.previous
    }
  },

  actions: {
    async getPostList(query) {
        this.loading = true
        this.setQueryStr()
        
        const urlStr = `https://studapi.teachmeskills.by/blog/posts/${query ? query : this.queryStr}`

        try {
            const res = await fetch(urlStr)
            if (res.ok) {
                this.postListData = await res.json()
            }
        } catch(error) {
            console.log(error.message)
        } finally {
            this.loading = false
        }
    },

    async getPost(id) {
        try {
            const res = await fetch(`https://studapi.teachmeskills.by/blog/posts/${id}/`)
            if (res.ok) {
                this.postData = await res.json()   
            }
        } catch (error) {
            console.log(error)
        }
    },

    async getNextPage() {
        const queryStr = '?' + this.postListData.next.split('?')[1]
        await this.getPostList(queryStr)
    },

    async getPrevPage() {
        const queryStr = '?' + this.postListData.previous.split('?')[1]
        await this.getPostList(queryStr)
    },

    async serchPosts() {
        await this.getPostList()
    },

    setQueryStr() {
        this.queryStr = ''

        const objectParams = { 
            author__course_group: this.author__course_group,  
            search: this.search, 
            limit: this.limit, 
        }
        const paramKeysArray = Object.keys(objectParams)

        // const paramsArray = paramKeysArray.reduce((acc, param) => {
        //     return objectParams[param] ? [...acc, `${param}=${objectParams[param]}`] : acc
        // }, [])

        // this.queryStr = '?' + paramsArray.join('&')
        
        paramKeysArray.forEach( (key, index) => {
            if (!objectParams[key]) return
            this.queryStr += `${index === 0 ? '?' : '&'}${key}=${objectParams[key]}`     
        })
    }
  },
});