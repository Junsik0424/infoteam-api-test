//이미지도 보이게끔 만들기
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { getAPost } from "src/api/posts";
import styled from "styled-components";

const EntireDiv = styled.div`
  background-color: white;
  height: 100vh;
  width: 100vw;
`;

const TitleDiv = styled.div`
  padding: 30px;
  font-size: 30px;
  font-weight: bold;
`;

const BodyDiv = styled.div`
  padding: 20px;
  font-size: 25px;
`;

const CommentDiv = styled.div`
  padding: 30px 30px 10px;
  font-size: 25px;
  font-weight: bold;
`;

interface Post {
  uuid: number;
  id: number;
  title: string;
  body: string;
}

const PostDetail = () => {
  const { id } = useParams<{ id: string }>();

  const {
    data: post,
    isLoading: postLoading,
    error: postError,
  } = useQuery<Post, Error>({
    queryKey: ["post", id],
    queryFn: () => getAPost(Number(id!)),
    enabled: !!id,
  });

  if (postLoading) return <div>로딩 중...</div>;

  if (postError) {
    return (
      <div>포스트를 불러오는 중 오류가 발생했습니다: {postError.message}</div>
    );
  }

  return (
    <EntireDiv>
      <TitleDiv>제목: {post?.title}</TitleDiv>
      <BodyDiv>{post?.body}</BodyDiv>
      <CommentDiv>댓글</CommentDiv>
    </EntireDiv>
  );
};

export default PostDetail;
