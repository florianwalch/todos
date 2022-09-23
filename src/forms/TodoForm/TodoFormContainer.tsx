import { type Todo } from '@/API';
import { TodoAPI } from '@/api/todo';

import { FormContainer } from '@/components/Forms/FormContainer';
import { TodoFormSkeleton } from '@/forms/TodoForm/TodoFormSkeleton';
import { TodoForm } from '@/forms/TodoForm/TodoForm';

// type of component props
type TodoFormContainerProps = {
  todo: Todo | null;
  onUpdate: (todo: Todo) => void;
};

/**
 * Container for todo form.
 *
 * @param {TodoFormContainerProps} props - component props
 */
export function TodoFormContainer({ todo, onUpdate }: TodoFormContainerProps) {
  if (todo == null) {
    return <TodoFormSkeleton />;
  }

  return (
    <FormContainer
      successNotificationMessage="Todo has been updated."
      onSubmit={TodoAPI.updateTodo}
      onSuccess={onUpdate}>
      <TodoForm todo={todo} />
    </FormContainer>
  );
}
