import { type ComponentProps } from 'react';

import { type Todo } from '@/API';
import { TodoAPI } from '@/api/todo';

import { FormContainer } from '@/components/Forms/FormContainer';
import { TodoForm } from '@/forms/TodoForm/TodoForm';

// type of component props
type TodoFormContainerProps = {
  todo: ComponentProps<typeof TodoForm>['todo'];
  onCreate: (todo: Todo) => void;
  onCancel: () => void;
};

/**
 * Container for form to create new todos.
 *
 * @param {TodoFormContainerProps} props - component props
 */
export function CreateTodoFormContainer({
  todo,
  onCreate,
  onCancel,
}: TodoFormContainerProps) {
  return (
    <FormContainer
      successNotificationMessage="Todo has been created."
      onSubmit={TodoAPI.createTodo}
      onSuccess={onCreate}>
      <TodoForm todo={todo} onCancel={onCancel} />
    </FormContainer>
  );
}
