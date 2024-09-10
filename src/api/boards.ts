import api from "./api";

interface BoardType {
  id: number;
  title: string;
}

interface BoardsResponse {
  count: number;
  list: BoardType[];
}

export const getAllBoards = async () => {
  const response = await api.get<BoardsResponse>("/boards");

  return response.data;
};
export const postBoard = async (board: BoardType) => {
  const response = await api.post("/boards", board);

  return response.data;
};

export const deleteBoard = async (uuid: number) => {
  const response = await api.delete(`/boards/${uuid}`);

  return response.data;
};
