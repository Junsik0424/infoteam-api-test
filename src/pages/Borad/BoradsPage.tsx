import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";

import { getAllBoards } from "../../api/boards";

const BoardsPage = () => {
  const {
    data: boards,
    isLoading: boardLoading,
    error: boardError,
  } = useQuery({
    queryKey: ["getAllBoards"],
    queryFn: getAllBoards,
  });

  if (boardLoading) return <div>로딩 중...</div>;

  if (boardError) {
    return (
      <div>게시물을 불러오는 중 오류가 발생했습니다: {boardError.message}</div>
    );
  }

  return (
    <div>
      {boards && boards.list.length > 0 ? (
        boards.list.map((board: { id: number; title: string }) => (
          <div key={board.id}>
            <Link to={`/boards/${board.id}`}>게시판 이름: {board.title}</Link>
          </div>
        ))
      ) : (
        <div>게시판이 없습니다.</div>
      )}
    </div>
  );
};

export default BoardsPage;
