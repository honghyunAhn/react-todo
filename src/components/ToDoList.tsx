import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";

import CreateToDo from "./CreateToDo";
import ToDo from "./toDo";

import styled from "styled-components";

const Container = styled.div``;

const Title = styled.h1``;

const ToDoCard = styled.div``;
const TaskList = styled.ul``;

const Select = styled.select``;

const CategoryContainer = styled.div``;

const EmptyMessage = styled.div``;

function ToDoList() {
  const toDos = useRecoilValue(toDoSelector);
  const [category, setCategory] = useRecoilState(categoryState);

  const onInput = (event: React.FormEvent<HTMLSelectElement>) => {
    setCategory(event.currentTarget.value as Categories);
  };

  return (
    <Container>
      <Title>TO DO LIST</Title>

      <Select value={category} onInput={onInput}>
        <option value={Categories.TO_DO}>To Do</option>
        <option value={Categories.DOING}>Doing</option>
        <option value={Categories.DONE}>Done</option>
      </Select>

      <CreateToDo />

      <CategoryContainer>
        <ToDoCard>
          <Title>To Do</Title>
        </ToDoCard>

        <ToDoCard>
          <Title>Doing</Title>
        </ToDoCard>

        <ToDoCard>
          <Title>Done</Title>
        </ToDoCard>
      </CategoryContainer>
    </Container>
  );
}

export default ToDoList;
