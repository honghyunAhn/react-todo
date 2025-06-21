import { useSetRecoilState } from "recoil";
import { Categories, IToDo, toDoState } from "../atoms";

import styled from "styled-components";

const ListItem = styled.li``;

const Text = styled.span``;

const ButtonGroup = styled.div``;

const Button = styled.button``;

function ToDo({ text, category, id }: IToDo) {
  const setToDos = useSetRecoilState(toDoState);

  const onClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    const {
      currentTarget: { name },
    } = event;

    setToDos((oldToDos) => {
      if (name === "delete") {
        return oldToDos.filter((toDo) => toDo.id !== id);
      }

      const targetIDX = oldToDos.findIndex((toDo) => toDo.id === id);
      const oldToDo = oldToDos[targetIDX];
      const newToDo = { ...oldToDo, category: name as Categories };

      return [
        ...oldToDos.slice(0, targetIDX),
        newToDo,
        ...oldToDos.slice(targetIDX + 1),
      ];
    });
  };

  return (
    <ListItem>
      <Text>{text}</Text>

      <ButtonGroup>
        {category !== Categories.DOING && (
          <Button name={Categories.DOING} onClick={onClick}>
            Doing
          </Button>
        )}

        {category !== Categories.TO_DO && (
          <Button name={Categories.TO_DO} onClick={onClick}>
            To Do
          </Button>
        )}

        {category !== Categories.DONE && (
          <Button name={Categories.DONE} onClick={onClick}>
            Done
          </Button>
        )}

        <Button name="delete" onClick={onClick}>
          Delete
        </Button>
      </ButtonGroup>
    </ListItem>
  );
}

export default ToDo;
