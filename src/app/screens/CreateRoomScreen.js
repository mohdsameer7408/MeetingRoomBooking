import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

import { FormInput, SubmitButton } from "./AuthScreen";
import axios from "../features/axios";
import { selectUser } from "../features/authSlice";

function CreateRoomScreen() {
  const user = useSelector(selectUser);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [time, setTime] = useState("");
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const imageChangeHandler = (event) => {
    if (event.target.files) {
      setImage(event.target.files[0]);
    }
  };

  const createRoomHandler = async (event) => {
    event.preventDefault();
    if (!name || !image || !description || !time)
      return alert("Incomplete form!");

    try {
      setIsLoading(true);
      const imageForm = new FormData();
      imageForm.append("file", image, image.name);
      const imageUrl = (
        await axios.post("/upload/image", imageForm, {
          headers: {
            accept: "application/json",
            "Accept-Language": "en-us,en;q=0.8",
            "Content-Type": `multipart/form-data; boundary=${imageForm._boundary}`,
          },
        })
      ).data.filename;

      await axios.post(
        "/room/add",
        { name, description, time, imageUrl },
        { headers: { "auth-token": user.token } }
      );
      setIsLoading(false);
      setName("");
      setDescription("");
      setTime("");
      setImage(null);
      alert("Room created successfully!");
    } catch ({ response }) {
      setIsLoading(false);
      alert(response.data);
    }
  };

  return (
    <CreateRoomScreenContainer>
      <RoomForm>
        <FormTitle>Create A Court</FormTitle>
        <FormInput
          placeholder="Enter court name..."
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <FormInput
          placeholder="Enter court description..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <FormInput
          placeholder="Enter time range eg-(9-17)..."
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />
        <FormInput
          type="file"
          id="image"
          accept="image/*"
          onChange={imageChangeHandler}
        />
        <SubmitButton disabled={isLoading} onClick={createRoomHandler}>
          {isLoading ? "Creating..." : "Create"}
        </SubmitButton>
      </RoomForm>
    </CreateRoomScreenContainer>
  );
}

export default CreateRoomScreen;

const CreateRoomScreenContainer = styled.section`
  display: flex;
  width: 100%;
  height: calc(100vh - 60px);
  justify-content: center;
  align-items: center;
`;

const RoomForm = styled.form`
  display: flex;
  flex-direction: column;
  width: 250px;
  padding: 30px;
  border-radius: 20px;
  background: #fff;
  box-shadow: 1px 2px 2px 0 rgba(0, 0, 0, 0.2),
    0 2px 2px 2px rgba(0, 0, 0, 0.15);
`;

const FormTitle = styled.h2`
  margin-bottom: 20px;
`;
