import api from "./api";

interface PostType {
  boarduuid: number;
  uuid: number;

  title: string;
  body: string;
  tags: string[];
}

interface newPostType {
  uuid: number;

  title: string;
  body: string;
  tags: string[];
}

export type newpost = Omit<PostType, "boarduuid">;

export type GetAllPostsResponse = PostType[];

export const getAllPosts = async () => {
  const response = await api.get<GetAllPostsResponse>("/posts");

  return response.data;
};

export const createPost = async (newpost: newPostType) => {
  const response = await api.post<PostType>("/posts", { newpost });

  return response.data;
};

export const getAPost = async (uuid: number) => {
  const response = await api.get<PostType>(`/posts/${uuid}`);

  return response.data;
};

export const deleteAPost = async (uuid: number) => {
  const response = await api.delete<PostType>(`/posts/${uuid}`);

  return response.data;
};

export const updateAPost = async (
  uuid: number,
  updatedPost: Omit<PostType, "uuid">,
) => {
  const response = await api.patch<PostType>(`/posts/${uuid}`, updatedPost);
  return response.data;
};

export const createImage = async (uuid: number) => {
  const response = await api.post(`/posts/${uuid}/image`);
  return response.data;
};

export const deleteImage = async (uuid: number, imageId: number) => {
  const response = await api.delete(`/posts/${uuid}/image/${imageId}`);
  return response.data;
};

export const getSearch = async (keyword: string) => {
  const response = await api.get<GetAllPostsResponse>(
    `/posts/search?keyword=${keyword}`,
  );
  return response.data;
};
