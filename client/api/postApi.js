import { api } from "./api";

const postApi = api.injectEndpoints({
    endpoints: (builder) => ({
        getExplorePosts: builder.query({
            query: ({ token }) => ({
                url: `/api/v1/post/explore`,
                method: 'GET',
                headers: { Authorization: `Bearer ${token}` },
            }),
            providesTags: (result) => 
                result
                    ? [
                        // Provides a tag for each post in the current page,
                        // as well as the 'PARTIAL-LIST' tag
                        ...result.map(({ id }) => ({ type: 'Posts', id })),
                        { type: 'Posts', id: 'PARTIAL-LIST' },
                      ]
                    : [{ type: 'Posts', id: 'PARTIAL-LIST' }],
        }),
        likePost: builder.mutation({
            query: ({ token, ...data}) => ({
                url: `/api/v1/post/like`,
                method: 'PATCH',
                headers: { Authorization: `Bearer ${token}` },
                body: data,
            }),
            invalidatesTags: (result, error, postId) => [
                { type: 'Posts', postId },
                { type: 'Posts', id: 'PARTIAL-LIST' }
            ],
        }),
    }),
    overrideExisting: false
});

export const {
    useGetExplorePostsQuery,
    useLikePostMutation,
} = postApi;