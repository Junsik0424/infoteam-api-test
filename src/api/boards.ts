import api from "./api";

interface BoardType {
  title: string;
}

export const getBoards = async () => {
  const response = await api.get<BoardType[]>("/boards");

  return response.data;
};

export const postBoard = async (board: BoardType) => {
  const response = await api.post("/boards", board);

  return response.data;
};

export const deleteBoard = async (id: number) => {
  const response = await api.delete(`/boards/${id}`);

  return response.data;
};
