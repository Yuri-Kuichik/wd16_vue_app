import { defineStore } from 'pinia'

export const usePosts = defineStore('posts', {
    state() {
      return {
          postListData: {},
          getParams: {
              author__course_group: '15',
              limit: '2',
              offset: '',
              search: ''
          },
          nextOffset: '',
          previousOffset: '',
          postData: {}
      }
    },

    getters: {
        getPostListData: (state) => {
            state.postListData.results
        },
        getPostData: (state) => {
            state.postData
        }
    },

    actions: {
        async getPostList() {
            try {
                const postsUrl = `https://studapi.teachmeskills.by/blog/posts/${this.setGetParams()}`
                const response = await fetch(postsUrl)
                if (response.ok) {
                    this.postListData = await response.json()

                    //Записываем значения offset для следующей и предыдущей страницы. Подробнее см. ПАГИНАЦИЯ
                    this.setOffsetNext()
                    this.setOffsetPrevious()
                }
            } catch (error) {
                console.log(error.message)
            }
        },
        // Функция проходится по объекту this.getParams, собирает все не пустые параметры и склеивает их в единую строку.
        setGetParams() {
            const currentParams = this.getParams
            // Задаём изначально пустую строку. В случае отсутствия get параметров, в url подставится пустая строка.
            let getParamsString = ''
            // Проходимся по объекту и, если строка не пустая, то соединяем амперсандом, иначе – знаком вопроса,
            // т.к. это начало строки get параметров.
            for (const key in currentParams) {
                if (!!currentParams[key]) {
                    getParamsString += getParamsString.length > 0
                        ? `&${key}=${currentParams[key]}`
                        : `?${key}=${currentParams[key]}`;
                }

            }

            return getParamsString
        },

        // ПАГИНАЦИЯ
        /* За перелистывание страниц, по сути, отвечает один get параметр offset.
        * Поэтому было принято решение от этого и отталкиваться.
        * Пагинация работает следующим образом: */

        /* При получении postListData у нас в ней есть свойства next и previous. При наличии url в них,
         * сохраняем значения offset для каждого свойства. */
        getOffsetFromUrl(url) {
            const re = new RegExp("(?<=offset=)[0-9]+")
            const searchResult = url?.match(re)
            return searchResult ? searchResult[0] : ''
        },

        setOffsetNext() {
            this.nextOffset = this.postListData.next ? this.getOffsetFromUrl(this.postListData.next) : ''
        },

        setOffsetPrevious() {
            this.previousOffset = this.postListData.previous ? this.getOffsetFromUrl(this.postListData.previous) : ''
        },

        /* При клике на кнопку "Предыдущая" или "Следующая" в функцию turnThePage передаётся параметр next или previous.
        * В зависимости от этого параметра, соответствующий offset записывается в getParams.offset. Затем вызывается
        * функция getPostList, которая получит новый список постов, с учётом актуальных get параметров. */
        turnPage(to) {
            this.getParams.offset = to === 'next' ? this.nextOffset : this.previousOffset
            this.getPostList()
        },

        //ОТКРЫТЬ ПОСТ
        /* При клике на конкретный пост в функцию showPostPage попадает id поста и пользователь перенаправляется
        * на страницу поста. */
        showPostPage(postId) {
            this.router.push({name: 'post', params: {id: postId}})
        },

        /* На странице поста из router получаем параметр id текущего поста и запрашиваем по нему данные у сервера.
        * Если ответ имеет положительный статус ОК, то записываем полученные данные в postData.
        * Иначе перенаправляем пользователя на страницу "Пост не найден".  */
        async getPostOrFail() {
            const currentId = this.router.currentRoute._value.params.id
            try {
                const postUrl = `https://studapi.teachmeskills.by/blog/posts/${currentId}`
                const response = await fetch(postUrl)

                if (response.ok) {
                    this.postData = await response.json()
                } else {
                    this.postNotFound()
                }
            } catch(error) {
                console.log(error.message)
            }
        },

        postNotFound() {
            this.router.push({name: 'postNotFound', param: 'post-not-found'})
        }

    }
})
