import { useRecoilState, useRecoilValue } from "recoil";
import { Categories, categoryState, toDoSelector } from "../atoms";

import CreateToDo from "./CreateToDo";
import ToDo from "./toDo";

import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 1440px;
  margin: 50px auto;
  padding: 20px;
  background-color: ${(props) => props.theme.bgColor};
  border-radius: 15px;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
`;

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

          <TaskList>
            {toDos[Categories.TO_DO].length > 0 ? (
              toDos[Categories.TO_DO].map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
              ))
            ) : (
              <EmptyMessage>No tasks in To Do</EmptyMessage>
            )}
          </TaskList>
        </ToDoCard>

        <ToDoCard>
          <Title>Doing</Title>

          <TaskList>
            {toDos[Categories.DOING].length > 0 ? (
              toDos[Categories.DOING].map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
              ))
            ) : (
              <EmptyMessage>No tasks in Doing</EmptyMessage>
            )}
          </TaskList>
        </ToDoCard>

        <ToDoCard>
          <Title>Done</Title>

          <TaskList>
            {toDos[Categories.DONE].length > 0 ? (
              toDos[Categories.DONE].map((toDo) => (
                <ToDo key={toDo.id} {...toDo} />
              ))
            ) : (
              <EmptyMessage>No tasks in Done</EmptyMessage>
            )}
          </TaskList>
        </ToDoCard>
      </CategoryContainer>
    </Container>
  );
}

export default ToDoList;
