//uuid 부분 수정 필요, 일단 오류만 안 뜨게 만들어 놓음

import React, { useState } from "react";
import { createPost } from "src/api/posts";
import styled from "styled-components";

const EntireDiv = styled.div`
  background-color: white;
  height: 100vh;
  width: 100vw;
`;

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [uuid, setUuid] = useState(1);
  const [message, setMessage] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newPost = {
      title,
      body,
      uuid,
    };

    try {
      const createdPost = await createPost(newPost);
      setMessage(`Post created successfully with ID: ${createdPost.id}`);
      setTitle("");
      setBody("");
      setUuid(1);
    } catch (error) {
      console.error("Error creating post:", error);
      setMessage("Failed to create post");
    }
  };

  return (
    <EntireDiv>
      <h1>새 게시물 생성하기</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <p>Uuid</p>
          <input
            type="number"
            value={uuid}
            onChange={(e) => setUuid(Number(e.target.value))}
            required
          />
        </div>
        <div>
          <p>제목:</p>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <p>내용:</p>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          />
        </div>
        <button type="submit">게시하기</button>
      </form>
      {message && <p>{message}</p>}
    </EntireDiv>
  );
};

export default CreatePost;
